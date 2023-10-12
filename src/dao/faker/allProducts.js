import { faker } from '@faker-js/faker';
import  fs  from 'fs';


const stockProducts = 100; // Especifico el limite de productos que quiero generar
const products = [];

for (let i = 0; i < stockProducts; i++) {
  const product = {
    title: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
    stock: faker.datatype.number()
  };
  products.push(product);
}

// Guardamos los datos generados en un archivo JSON
const jsonData = JSON.stringify(products, null, 2);
fs.writeFileSync('products.json', jsonData, 'utf-8');

console.log(`Se generaron ${stockProducts} productos y se guardaron en 'products.json'.`);