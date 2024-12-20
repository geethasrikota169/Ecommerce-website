import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-oop.js';  //this syntax will run all the code in the file without importing anything
//import '../data/cart-class.js'; 
//import '../data/backend-practice.js';

Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{
      resolve('value1'); 
    });
  }),

  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then((values)=>{ //after loading the cart we will render the pages
  console.log(values); //it will return an array of values. in array we will find the values passed by each promise is any are present
  renderOrderSummary();
  renderPaymentSummary();
});//array of promises. the promise.all() will wait for all promises to finish before going to the next step
//both promises in the promise.all() are runned at the same time instead of waiting for each promise one bye one

/*
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value1'); 
  });

}).then((value)=>{ //here for next step instead of renders we will load the cart. by returning a new promise. in value the the string value1 is stored
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{ //after loading the cart we will render the pages
  renderOrderSummary();
  renderPaymentSummary();
});
//loadProducts will execute and wait for it to finish call resolve then it will go to the next 2nd step by creating new promise then wait for the cart loading to finish call resolve then we go to the 3rd step 
*/


/* //using promise instead of callback
loadProducts(()=>{
  //changed the code into 2 sections order section and price summary section in checkout folder
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  });
}); //this is the problem for more callbacks there will be lot of nesting. even when it is working correct. it is hard to work with
*/
/* 
we dont need to create a function with name everytime we can just create a anonymous function(function without a name). and then give it to loadProducts to run in the future(callback)
the anonymous function will not run in products.js in loadProducts funtion inside the parameter fun. and we call fun after we loaded all the products 


Promises:
better way to handle asynchronous code
similar to done() function
let us wait for some code to finish before going to the next step
promise is a class.it is a builtin class and when we create it we need to give it a function. so when we create this function its going to run this function immediately
we give this function a prameter called resolve. resolve is a function similar to done() function in jasmine. resolve lets us control when to go to the next step
why do we use promise:
callbacks have a big problem. which is multiple callbakcs cause a lot of nesting. promises flatten the code


new Promise((resolve)=>{
  loadProducts(()=>{
    resolve(); //calling resolve to go to the next step
  });//once loadProduct says finished it will run the function in loadProducts
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
}) //giving a next step for resolve once it is finished
//first the promise will execute the loadProduct function and wait for products to load after it is finised it will eecute the code in it and then it will execute the function present in then()
2 more features of promise are we can give resolve values. whatever value we give to resolve is going to be saved in paramter inside .then() . inside the then function we will give a parameter.

while writing multiple promises it runs serially after one promise is done next promise will execute. for executing promises at a time we use promise.all()
Promise.all() lets us run multipole promises at the same time.inside promise.all() we give an array. inside the array we give multiple promises to wait
*/