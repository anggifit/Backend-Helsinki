# Asignaciones Fullstack Helsinki - Backend (Parte 3).

Este repositorio contiene la solución a los ejercicios de la Parte 3 del curso Fullstack Helsinki, enfocada en el desarrollo de backend y la conexión con MongoDB. Aquí se implementa un servidor backend para la aplicacion "Phonebook" que gestiona datos y se conecta a una base de datos MongoDB para almacenar y recuperar información.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

- **/dist**: Contiene el frontend compilado y actualizado hasta el momento de la app Phonebook, desarrollada en la parte 2 (https://github.com/anggifit/fullstackHelsinki/tree/main/Parte-2).
- **/models**: Configuración de Mongoose, esquemas y modelos de datos.
- **/requests**: Ejemplos de solicitudes `.rest` para probar la API directamente en Visual Studio Code.
- **.env**: Archivo de configuración para variables de entorno.
- **Otros archivos**: Configuración de Node.js, Express y scripts de ejecución.

## Requisitos Previos

- **Node.js**: Asegúrate de tener Node.js instalado.
- **MongoDB Atlas**: Debes tener una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) y una base de datos configurada.
- **Variables de entorno**: Define las siguientes variables en un archivo `.env`:
  ```env
  MONGODB_URI=tu_cadena_de_conexión_mongodb
  PORT=3001
  
## Instrucciones

1. **Clona el repositorio:**
   Ejecuta el siguiente comando en tu terminal para clonar el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/anggifit/Backend-Helsinki.git

   ```

2. **Instalar dependencias**
   Navega hasta la carpeta del proyecto e instala las dependencias necesarias para ejecutar la aplicación. 

   ```bash
   cd Backend-Helsinki
   npm install

   ```

3. **Instalar dependencias**

4. **Configurar MongoDB**
    - Crea una base de datos en MongoDB Atlas.
    - Obtén la cadena de conexión (MONGODB_URI) desde MongoDB Atlas.
    - Crea un archivo .env en la raíz del proyecto y define las variables de entorno:
  ```env
  MONGODB_URI=tu_cadena_de_conexión_mongodb
  PORT=3001
  ```

5. **Ejecutar el Servidor**

   Abre una terminal y ejecuta el siguiente comando para iniciar el servidor JSON en el puerto 3001:

   ```bash
       npm run dev
   ```
   
  El servidor estará disponible en http://localhost:3001.

# Rutas de la API

Puedes interactuar con la API utilizando herramientas como Postman o los archivos `.rest` incluidos en la carpeta `/requests`. Aquí tienes algunos ejemplos de rutas:

- **GET** `/api/persons`: Obtener todas las personas agendadas.
- **GET** `/api/info`: Obtener información acerca de la agenda (cuántas personas están agendadas y la fecha de la solicitud).
- **GET** `/api/persons/:id`: Obtener una persona específica por ID.
- **DELETE** `/api/persons/:id`: Eliminar una persona.
- **POST** `/api/persons`: Crear una nueva persona.
- **PUT** `/api/persons/:id`: Actualizar una persona existente.

  
## Probar la API con Archivos .rest
  En la carpeta /requests encontrarás archivos .rest que contienen ejemplos de solicitudes HTTP. Puedes ejecutarlas directamente en Visual Studio Code usando la extensión REST Client.
  Ejemplo de un archivo .rest:
  ```rest
    GET  http://localhost:3001/api/info
  ```

## Despliegue 
  El proyecto está desplegado en Render y puede accederse desde:
  
  **https://backend-phonebook-qofs.onrender.com**
  
## Contributing

Si tienes alguna pregunta, sugerencia o encuentras un problema con los ejercicios, abre un issue en este repositorio o envía una pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)
