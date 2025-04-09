# LaCuenta

**LaCuenta** es un proyecto personal diseñado para llevar la contabilidad de gastos de una pareja. Además, incluye una sección para gestionar la lista de compras del supermercado, facilitando la organización y el control del presupuesto familiar.

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Tecnologías](#tecnologías)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Características

- **Contabilidad de Gastos:** Permite registrar, visualizar y categorizar los gastos de la pareja.
- **Lista de Compras:** Administra una lista interactiva de productos para el supermercado, facilitando la planificación de la compra.
- **Interfaz Intuitiva:** Diseño sencillo y amigable que facilita la navegación y el uso diario.
- **Historial y Reportes:** Visualiza el historial de gastos y obtiene reportes que ayudan a identificar hábitos de consumo y optimizar el presupuesto.

## Instalación

Sigue estos pasos para clonar y ejecutar **LaCuenta**:

## Clonar repositorio e instalar dependencias


```bash
   git clone https://github.com/mayomatias/LaCuenta.git
   cd LaCuenta
   npm install 
```
> [!IMPORTANT]
> Si intentan ejecutar "npm run dev", no funcionará, ya que previamente debemos configurar firebase para configurar las **variables de entorno**.   

<br>
<br>

## 🔧 Configuración de Firebase

Para que **LaCuenta** funcione correctamente, es necesario conectar el proyecto con [Firebase](https://firebase.google.com/). Seguí estos pasos para configurar tu entorno:

### 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/).
2. Haz clic en **"Agregar proyecto"**.
3. Asigna un nombre (por ejemplo: `LaCuenta`) y sigue los pasos para crearlo.

### 2. Agregar el servicio **Cloud Firestore**

1. En el panel del proyecto, ve a **"Firestore Database"**.
2. Haz clic en **"Crear base de datos"**.
3. Elegí el modo de inicio: **modo de prueba** (podés cambiarlo luego).
4. Seleccioná una ubicación y completá el proceso.

### 3. Configurar las reglas de seguridad

1. Ir a **"Cloud Firestore"** → pestaña **"Reglas"**.
2. Reemplazá el contenido con el siguiente script:

   ```js
   rules_version = '2';

   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }```

### 4. Activar el servicio de Authentication

1. En el panel izquierdo, ve a **"Authentication"**.
2. Haz clic en **"Comenzar"**.
3. Agregá el proveedor **"Correo electrónico/contraseña"**.
4. Ir al tab **"Usuarios"**.
5. Luego **"Agregar usuario"**, los cuales tendran acceso a la app.


### 5. Iniciar colecciones

Antes de comenzar a utilizar la aplicación vamos a tener que crear dos colecciones en **Firestore**:
**users** y **categories**

1. Ir al servicio **Firestore Database**
2. Hacer click en **Iniciar colección** y en **ID de la colección** establecer **users** (muy importante que se llame así para que funcione el sistema)
3. Luego cuando pida **Agregar el primer documento** agregar el **nombre de un usuario** en el **ID de documento**
4. Guardar
5. Hacer click en **Iniciar colección** y en **ID de la colección** establecer **categories**
6. Luego cuando pida **Agregar el primer documento** agregar **categories** en el **ID de documento** y en el campo también **categories** y establecer que sea un array de **strings**.
   

   
