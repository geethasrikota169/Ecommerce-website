import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
//import '../data/cart-oop.js';  //this syntax will run all the code in the file without importing anything
//import '../data/cart-class.js'; 
//import '../data/backend-practice.js';


loadProducts(()=>{

  //changed the code into 2 sections order section and price summary section in checkout folder
  renderOrderSummary();
  renderPaymentSummary();

});

/* 
we dont need to create a function with name everytime we can just create a anonymous function(function without a name). and then give it to loadProducts to run in the future(callback)
the anonymous function will not run in products.js in loadProducts funtion inside the parameter fun. and we call fun after we loaded all the products 
*/