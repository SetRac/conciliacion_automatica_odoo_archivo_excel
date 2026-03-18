/**
 * Botones de guardar y regresar flotantes que reusan las acciones del Form.
 */
import { registry } from '@web/core/registry';

const serviceRegistry = registry.category('services');

function createFloatingSaveButton() {
    const existing = document.getElementById('acm-floating-save');
    if (existing) {
        return existing;
    }
    const btn = document.createElement('button');
    btn.id = 'acm-floating-save';
    btn.type = 'button';
    btn.className = 'o_btn acm-floating-save';
    btn.title = 'Guardar';
    btn.innerText = 'Guardar';
    document.body.appendChild(btn);
    return btn;
}

function createFloatingBackButton() {
    const existing = document.getElementById('acm-floating-back');
    if (existing) {
        return existing;
    }
    const btn = document.createElement('button');
    btn.id = 'acm-floating-back';
    btn.type = 'button';
    btn.className = 'o_btn acm-floating-back';
    btn.title = 'Regresar';
    btn.innerText = 'Regresar';
    document.body.appendChild(btn);
    return btn;
}

function canSave() {
    // Busca el botón nativo de guardar de Odoo
    const form = document.querySelector('.o_form_view');
    if (!form) return false;
    
    // Verifica que esté en modo edición
    const isEditing = !!document.querySelector('.o_form_view .o_form_editable');
    if (!isEditing) return false;
    
    // Buscar el botón de guardar nativo de Odoo
    let nativeSaveBtn = document.querySelector('.o_form_button_save');
    if (!nativeSaveBtn) {
        nativeSaveBtn = document.querySelector('button[name="save"]');
    }
    if (!nativeSaveBtn) {
        // Buscar el icono de nube en el control panel (indicador de cambios pendientes)
        const cloudBtn = document.querySelector('.o_control_panel [title*="Guardar"], .o_control_panel [title*="Save"], .o_control_panel .fa-cloud, .o_control_panel .fa-cloud-upload-alt');
        if (cloudBtn && cloudBtn.offsetParent !== null) {
            return true;
        }
    }
    
    // Si encontramos el botón nativo, verificar que esté visible
    if (nativeSaveBtn) {
        const computedStyle = window.getComputedStyle(nativeSaveBtn);
        const isVisible = nativeSaveBtn.offsetParent !== null && 
                         computedStyle.display !== 'none' &&
                         computedStyle.visibility !== 'hidden' &&
                         !nativeSaveBtn.classList.contains('d-none') &&
                         !nativeSaveBtn.classList.contains('o_invisible_modifier');
        return isVisible;
    }
    
    return false;
}

function canGoBack() {
    // Verifica si hay un botón de cancelar/cerrar disponible
    const cancelBtn = document.querySelector('.o_form_button_cancel, button[name="cancel"]');
    if (cancelBtn) {
        const computedStyle = window.getComputedStyle(cancelBtn);
        if (cancelBtn.offsetParent !== null && 
            computedStyle.display !== 'none' &&
            computedStyle.visibility !== 'hidden' &&
            !cancelBtn.classList.contains('d-none') &&
            !cancelBtn.classList.contains('o_invisible_modifier')) {
            return true;
        }
    }
    
    // Verificar si hay historial de navegación (solo si estamos en una vista de formulario)
    const hasForm = !!document.querySelector('.o_form_view');
    if (hasForm && window.history.length > 1) {
        const currentUrl = window.location.pathname;
        if (currentUrl && currentUrl !== '/' && currentUrl !== '/web') {
            return true;
        }
    }
    
    return false;
}

function clickNativeSave() {
    // Busca el botón nativo de guardar del formulario y lo dispara
    let native = document.querySelector('.o_form_button_save, button[name="save"]');
    if (native && native.offsetParent !== null) {
        native.click();
        return true;
    }
    
    // Buscar el icono de nube (botón de guardar en Odoo 18)
    const cloudBtn = document.querySelector('.o_control_panel [title*="Guardar"], .o_control_panel [title*="Save"]');
    if (cloudBtn && cloudBtn.offsetParent !== null) {
        cloudBtn.click();
        return true;
    }
    
    // Fallback: botón de guardar en barra de herramientas
    const toolbarSave = document.querySelector('[data-hotkey="ctrl+s"], .o_control_panel .o_cp_action_menus button[type="submit"]');
    if (toolbarSave && toolbarSave.offsetParent !== null) {
        toolbarSave.click();
        return true;
    }
    return false;
}

function clickNativeCancel() {
    // Busca el botón nativo de cancelar/cerrar del formulario
    const cancelBtn = document.querySelector('.o_form_button_cancel, button[name="cancel"], button.o_form_button_cancel');
    if (cancelBtn && cancelBtn.offsetParent !== null) {
        cancelBtn.click();
        return true;
    }
    // Fallback: botón de cerrar en barra de herramientas
    const closeBtn = document.querySelector('.o_control_panel .o_cp_action_menus button[aria-label*="Close"], .o_control_panel .o_cp_action_menus button[aria-label*="Cerrar"]');
    if (closeBtn && closeBtn.offsetParent !== null) {
        closeBtn.click();
        return true;
    }
    // Último fallback: navegar hacia atrás solo si hay historial
    if (window.history.length > 1) {
        window.history.back();
        return true;
    }
    return false;
}

const friendlySaveService = {
    dependencies: [],
    start(env, { services }) {
        const saveBtn = createFloatingSaveButton();
        const backBtn = createFloatingBackButton();

        const updateVisibility = () => {
            // Solo mostrar botón guardar si realmente hay algo que guardar
            // Sincronizado exactamente con el botón nativo de Odoo
            const shouldShowSave = canSave();
            saveBtn.style.display = shouldShowSave ? 'flex' : 'none';
            
            // El botón regresar se oculta cuando el botón guardar está oculto
            // Además verifica si realmente hay algo a donde regresar
            const shouldShowBack = shouldShowSave && canGoBack();
            backBtn.style.display = shouldShowBack ? 'flex' : 'none';
        };

        const onSaveClick = (ev) => {
            ev.preventDefault();
            clickNativeSave();
            // Esperar un momento para que Odoo actualice el estado antes de verificar de nuevo
            setTimeout(updateVisibility, 300);
            setTimeout(updateVisibility, 600);
            setTimeout(updateVisibility, 1000);
        };

        const onBackClick = (ev) => {
            ev.preventDefault();
            clickNativeCancel();
        };

        saveBtn.addEventListener('click', onSaveClick);
        backBtn.addEventListener('click', onBackClick);

        // Observar cambios en el DOM, especialmente en los botones nativos
        const observer = new MutationObserver(() => updateVisibility());
        observer.observe(document.body, { 
            attributes: true, 
            childList: true, 
            subtree: true,
            attributeFilter: ['class', 'disabled', 'aria-disabled', 'style'] 
        });

        // Observar específicamente los botones de guardar nativos
        const observeNativeButtons = () => {
            const nativeSave = document.querySelector('.o_form_button_save, button[name="save"]');
            if (nativeSave) {
                const nativeObserver = new MutationObserver(() => updateVisibility());
                nativeObserver.observe(nativeSave, {
                    attributes: true,
                    attributeFilter: ['class', 'disabled', 'aria-disabled', 'style']
                });
            }
        };

        // Intervalo más frecuente para mejor sincronización
        const interval = setInterval(() => {
            updateVisibility();
            observeNativeButtons();
        }, 200);
        
        updateVisibility();
        observeNativeButtons();
    },
};

serviceRegistry.add('friendly_save', friendlySaveService);


