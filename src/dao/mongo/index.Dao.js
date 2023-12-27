
import CartDAO  from "./cartsDao.js";
// import { TicketsDAO } from "./tickets/tickets.dao.js";
import  ProductsDAO  from "./productsDao.js"
import  UsersDAO  from "./usersDao.js"


const usersDao = new UsersDAO();
//const ticketsDao = new TicketsDAO();
const cartsDao = new CartDAO();
const productsDao = new ProductsDAO();

export const getDAOS = () => {
  return {
    usersDao,
   // ticketsDao,
    cartsDao,
    productsDao,
  }
}