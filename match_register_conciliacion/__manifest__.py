# -*- coding: utf-8 -*-

{
    "name": "Match Register Conciliación",
    "version": "18.0.1.0.0",
    "author": "cesaraugusto000@gmail.com <Setrac>",
    "summary": "Módulo para gestionar conciliaciones bancarias con matches",
    "description": """
        Módulo para gestionar conciliaciones bancarias:
        - Subir extractos desde Excel/CSV
        - Detectar matches automáticos con pagos
        - Revisar y confirmar matches
        - Crear extractos bancarios y reconciliar automáticamente
    """,
    "depends": [
        'base',
        'account',
        'account_statement_base',
        'account_reconcile_oca',
        'account_reconcile_model_oca',
    ],
    "data": [
        'security/ir.model.access.csv',
        'data/match_register_conciliacion_data.xml',
        'wizard/import_match_wizard_views.xml',
        'views/match_register_conciliacion_views.xml',
    ],
    "installable": True,
    "application": True,
    "license": "OPL-1",
}

