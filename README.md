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
npm start ./src/app.js
````

### 🌐 Servidor:

✅    **Servidor:** Se levanta el servidor con *Express js*.

**Para realizar las consultas debe ser con el servidor:**

por medio del navegador consultando en el endpoint:
```shell  
http://localhost:8080/
````

✅    **Filtro por id:** Indicando un # de id  se puede visualizar el producto correspondiente al id. Ejemplo:

```shell  
http://localhost:8080/products/2
````

✅    **Definir el limit:** Estableciendo en la ruta un limit se puede visualizar la cantidad especificada en el navegador. 

```shell  
http://localhost:8080/products/?limit=3
````

### 🔀 Rutas:

1. Productos:
```
http://localhost:8080/api/products
```
2. Carritos:
```
http://localhost:8080/api/cart
```
## 🗂️ Estructura del proyecto:


📂-- src/
-   📁--- controllers/
-------📄 CartManager.js
-------📄 ProductManager.js
-   📁--- models/
-------📄 carts.json
-------📄 products.json
-   📁--- public/
-   📁--- router/
-------📄 cart.routes.js
-------📄 product.router.js
🔐 LICENSE
📒 app.js
📄 README.md
📄 package.json



### ⚙️ Funciones & Características:

✅    **ProductMaganer:**  La instancia  cuenta con un las 4 operaciones básicas CRUD que se pueden realizar en el sistema de gestion de datos.

- ➕ **addProduct:** Agregar un producto en el método POST, asignando un id de forma de que no se repita. Los productos tienen la siguiente estructura: 

```
{
    "title": "Producto 1",
    "description": "Descripción del Producto 1",
    "code": "P001",
    "price": 19.99,
    "status": true,
    "stock": 50,
    "category": "Electrónica",
    "thumbnails": [
      "imagen1.jpg",
      "imagen2.jpg"
    ]
  }
```
- **getAllProducts:** Permite visualizar con el método GET de http, los productos agregados previamente.
También se cuenta con un método para visualizar un producto con su respectivo id: **getProductId**

- 🔁 **updateProducts:** Actualiza un producto que ya este agregado previamente, recibe como parametro el id del mismo. 

- ❌ **deleteProductId:** También, recibiendo un id como parametro, se elimina un producto. 

✅    **CartMaganer:**  De igual forma que el ProductManager, maneja la misma interacción con los datos.

-  ➕ 🛒 **addCart:** Crear un carrito con un id generado automaticamente y no repetible; y con un arreglo donde se agregaran los productos existentes en el archivo products.json. 

-  ▶️ 🛒  **getCart:** Se consultan los carritos creados. 

-  📦 ➕ 🛒 **addProductCart:** Teniendo en cuenta el id del carrito seleccionado, se adiciona un producto de los existentes. 



## 🔐 Licencia

Este proyecto está licenciado bajo la Licencia MIT. 
