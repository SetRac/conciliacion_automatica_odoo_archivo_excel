# Módulos Odoo v18 - Soluciones de Conciliación y Usabilidad

Este repositorio contiene una selección de módulos para **Odoo 18.0** enfocados en optimizar los procesos contables y mejorar la experiencia de usuario.

---

## 🚀 Módulo Destacado: **Match Register Conciliación**

Módulo avanzado diseñado para agilizar y automatizar la **conciliación bancaria** en Odoo, permitiendo procesar grandes volúmenes de transacciones mediante la carga de archivos externos.

### 📋 Características Principales

*   **⚡ Importación Flexible**: Sube extractos bancarios desde archivos **Excel (.xlsx)** o **CSV**.
*   **⚙️ Mapeo Dinámico**: Configura fácilmente qué columnas del archivo representan la *Fecha*, *Referencia*, *Monto*, *Descripción* y *RIF/NIT*.
*   **🧠 Matching Inteligente**: Algoritmos que buscan coincidencias automáticas basadas en:
    *   Referencia exacta o parcial.
    *   Monto exacto o con margen de tolerancia (5%).
    *   Identificación de Cliente/Proveedor (VAT/RIF/NIT).
    *   Proximidad de fechas.
*   **✅ Interfaz de Revisión**: Visualiza los matches encontrados antes de procesarlos, permitiendo seleccionar y confirmar solo las operaciones correctas.
*   **🔗 Reconciliación Automática**: Crea los extractos y ejecuta la reconciliación apoyándose en la robusta lógica de OCA (`account_reconcile_oca`).

---

## 🛠️ Otros Módulos

### **Web Friendly Save Button**
Mejora la usabilidad en formularios añadiendo un botón de guardado flotante y siempre visible, previniendo la pérdida de datos y mejorando el flujo de trabajo sin alterar la lógica nativa de Odoo.

---

## 📦 Instalación y Dependencias

Para el correcto funcionamiento del módulo de conciliación, asegúrate de contar con los módulos base de Odoo (`account`) y las siguientes dependencias (incluidas o requeridas):

1.  `account_statement_base`
2.  `account_reconcile_oca`
3.  `account_reconcile_model_oca`

> [!NOTE]
> Para la carga de archivos Excel (.xlsx), es necesario que el servidor cuente con la librería `openpyxl` (`pip install openpyxl`).

---

**Autor/Contacto:** cesaraugusto000@gmail.com <Setrac>
