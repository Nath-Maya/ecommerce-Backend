# Backend / Ecommerce

### ☑️ Dependencias:

- Node.js 
- npm 
- Express.js
- Handlebars
- Mongoose


### 💻 Instalación:

1. Clonar el repositorio: 

```shell
git clone https://github.com/Nath-Maya/proyecto-Backend.git
```
2. Navega hasta el directorio del proyecto.

```shell
src/app.js
```
3. Instalar las dependencias para el servidor.
```shell
npm i express
npm i handlebars
npm i mongoose
```

### ▶️ Uso
Para iniciar la aplicación, ejecuta el siguiente comando:
```shell
npm start 
```

### 🌐 Servidor:

✅    Se levanta el servidor con *Express js*.

Aplicacion debe abrirse en el puerto: 

#### `http://localhost:8080`

### 🔀 Rutas:

📍   **Consulta Productos:** 

- ⚠️ GET `/products`: Obtiene la lista de productos.
  - ⚠️ GET PRODUCT BY ID: `/products/:idProduct`: Obtiene un producto por su ID.
- 📥 POST `/products`: Agrega un nuevo producto.
- 🔃 PUT `/products/:idProduct` Actualiza un producto existente por su ID.
- ❌ DELETE `/products/:idProduct`: Elimina un producto indicandole su ID.

📍   **Consulta Carritos:** 

- ⚠️ GET `/cart`: Obtiene la lista de carritos creados.
  - ⚠️ GET CART BY ID`/cart/:idCart`: Obtiene un carrito por su ID.
- 📥 POST `/cart`: Agrega un nuevo carrito.
  - 📥 POST PRODUCT IN CART `/cart/:idCart/products/:idProduct`: Agrega un nuevo producto a determinado carrito.
- 🔃 PUT `/cart/:idCart` Actualiza un carrito existente por su ID.
  - 🔃 PUT QUANTITY PRODUCT `/cart/:idCart/products/:idProduct` Actualiza la cantidad de un producto contenido en un carrito
- ❌ DELETE `/cart/:idCart`: Elimina un carrito indicandole su ID.
  - ❌ DELETE PRODUCT IN CART `/cart/:idCart/products/:idProduct`: Elimina un producto de un carrito, indicandole su ID.



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
