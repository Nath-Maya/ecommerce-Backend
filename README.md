# Proyecto de Backend

### ☑️ Dependencias:

- Node.js 
- npm 
- Express.js


### 💻 Instalación:

1. Clonar el repositorio: 

```shell
git clone https://github.com/Nath-Maya/proyecto-Backend.git
````
2. Navega hasta el directorio del proyecto.
```shell
cd src/app.js
````
3. Instalar las dependencias para el servidor.
```shell
npm install
````

### ▶️ Uso
Para iniciar la aplicación, ejecuta el siguiente comando:
```shell
nodemon ./src/app.js
````
## 🗂️ Estructura del proyecto


📂-- src/
-   📁--- controllers/
-   📁--- models/
-   📁--- router/
-   📁--- public/  
🔐 LICENSE
📒 app.js
📄 README.md
📄 package.json



### ⚙️ Funciones & Características:

✅    **Crear productos:**  La instancia ProductManager cuenta con un metodo addProducts con el cual se pueden generar los productos agregandolos 

✅    **Ruta Products:** Visualizar la totalidad de productos contenidos en el archivo
```shell  
src/productos.txt
````
por medio del navegador consultando en el endpoint:
```shell  
http://localhost:8080/products
````

✅    **Filtro por id:** Indicando un # de id  se puede visualizar el producto correspondiente al id. Ejemplo:

```shell  
http://localhost:8080/products/2
````

✅    **Definir el limit:** Estableciendo en la ruta un limit se puede visualizar la cantidad especificada en el navegador. 

```shell  
http://localhost:8080/products/?limit=3
````

✅    **Servidor:** Se levanta el servidor con *Express js*.


## 🔐 Licencia

Este proyecto está licenciado bajo la Licencia MIT. 
