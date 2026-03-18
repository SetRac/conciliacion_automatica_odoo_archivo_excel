{
    'name': 'Web Friendly Save Button',
    'summary': 'Botón de Guardar flotante y visible en formularios',
    'description': '''
        Añade un botón flotante y visible para guardar en vistas formulario.
        No duplica lógica de Odoo: invoca la acción de guardar existente.
    ''',
    'version': '18.0.1.0.0',
    'category': 'Web',
    'license': 'LGPL-3',
    'author': 'cesaraugusto000@gmail.com <Setrac>',
    'website': 'https://github.com/setrac',
    'depends': ['web'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'web_friendly_save_button/static/src/js/friendly_save.js',
            'web_friendly_save_button/static/src/scss/friendly_save.scss',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}

