# ═══════════════════════════════════════════════════════════════════════
# PARCHE KP · Mu para los portales (pegar en kp826.py, justo DESPUÉS de la
# función _api_recoger, la ruta "/api/recoger"). Usa lo que ya existe:
# _ent_app, _jsonify, _request, _kp_app_actual, _en_hilo_tk,
# app.coins_manager y app.daily_summary_manager.
#
#   GET  /api/mu      → {"aspecto": "...", "mu": 42}
#   POST /api/gastar  {"cantidad": 1, "motivo": "Portal → Planeta Funk", "mundo": "musicosmos"}
#        200 {"ok": true, "mu": 41} · 402 {"ok": false, "error": "Mu insuficiente", "mu": 0}
#        409 sin aspecto en sesión (los universos lo toman como viaje libre)
# ═══════════════════════════════════════════════════════════════════════

@_ent_app.route("/api/mu")
def _api_mu():
    """Saldo de Mu del aspecto en sesión (para que los universos muestren el precio)."""
    app = _kp_app_actual()
    if app is None or not getattr(app, "coins_manager", None):
        return _jsonify({"aspecto": None, "mu": None}), 409
    return _jsonify({"aspecto": app.current_user, "mu": app.coins_manager.get_coins(app.current_user)})


@_ent_app.route("/api/gastar", methods=["POST"])
def _api_gastar():
    """Un universo cobra Mu: cruzar un portal, abrir uno propio, etc."""
    app = _kp_app_actual()
    if app is None or not getattr(app, "coins_manager", None):
        return _jsonify({"ok": False, "error": "Entra a KP con un aspecto"}), 409
    d = _request.get_json(force=True, silent=True) or {}
    try:
        cantidad = max(1, min(100, int(d.get("cantidad", 1))))
    except (TypeError, ValueError):
        cantidad = 1
    motivo = str(d.get("motivo", "Portal"))[:80]
    mundo = str(d.get("mundo", ""))[:20]

    def _hacer():
        cm = app.coins_manager
        saldo = cm.get_coins(app.current_user)
        if saldo < cantidad:
            return {"ok": False, "error": "Mu insuficiente", "mu": saldo}
        cm.set_coins(app.current_user, saldo - cantidad)
        app.cosmic_coins = cm.get_coins(app.current_user)
        try:
            app.update_cosmic_coins()
        except Exception:
            pass
        try:   # queda en el resumen diario, como las demás compras
            app.daily_summary_manager.add_purchase(app.current_user, f"{motivo} ({mundo})" if mundo else motivo, cantidad)
        except Exception:
            pass
        return {"ok": True, "mu": app.coins_manager.get_coins(app.current_user)}

    try:
        r = _en_hilo_tk(_hacer, espera=6.0)
        return _jsonify(r), (200 if r.get("ok") else 402)
    except TimeoutError:
        return _jsonify({"ok": False, "error": "KP ocupado"}), 503
    except Exception as e:
        return _jsonify({"ok": False, "error": str(e)}), 500
