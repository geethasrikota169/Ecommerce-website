import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-oop.js';  //this syntax will run all the code in the file without importing anything
//import '../data/cart-class.js'; 
//import '../data/backend-practice.js';


async function loadPage(){

  //handing error in async await
  try{

    //throw 'error1'; //manually creating am error. when we do this it will skip the rest of the code and goes to catch and then error1 is saved in paramter error in catch

    await loadProductsFetch();  
  
    const value = await new Promise((resolve,reject)=>{
      //throw 'error2'; //when we await a promise it will go directly to catch instead of going to .catch(). await makes it behave like synchronous code
      loadCart(()=>{
        //reject('error3');
        resolve('value3');
      });
    });  //value3 is stored in value variable
    //if any of the code inside try gets an error we can catch it using the code below and handle it by running the code inside catch.

  }catch(error){
    //the parameter error has the information regarding the error
    console.log('Unexpected error. Please try again later.')
  }



  renderOrderSummary();
  renderPaymentSummary();  
} //load the products and then we will wait for it to finish.then we will load the cart and wait for it to finish and run the rest of the code
loadPage();


/*
async function loadPage(){
  console.log('load page');
  
  await loadProductsFetch();  //loads products from backend. this await waits for the line(loadproductsfetch) to finish before going to next line in the code
  //it will wait until the products are loaded then mov to next line
  return 'value2';    //this is will converted into resolve('value2'); in promises
}
loadPage().then((value)=>{  //as the function loadpage returns a promise we are using .then to add next step to the promise. value2 will be saved in the parameter value
  console.log('next step');
});
*/

/*
Promise.all([
  loadProductsFetch(),  //this will return a promise and we can use it with promise.all().fetch returns a promise. 

  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then((values)=>{ 
  console.log(values); 
  renderOrderSummary();
  renderPaymentSummary();
});

*/




/*
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
*/
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

async await= even better way to handle asynchronous code.
we are using promises before but promises creates a lot of code like resolve, then..
async await is a shortcut for promises. when async word is kept infornt of a function it will make the function to return a promise.
async = makes a function return a promise
loadPage().then(); as the function returns a promise we can give it .then and add nextstep to the promise.
async let us use another feature await. await=lets us wait for a promise to finish before going to the next line

loadProductsFetch().then(()=>{}) --> here the then function is runned after loadproductsfetch is finished. here instead of using .then we can use await.
await loadProductsfetch();  --> await lets us write asynchronous code like normal code
we can only use await, when we are inside async function.

closet function has to be async. if a promise resolves with a value we can save the value in a variable when we use await. when we use await the value in resolve will get returned so we can save it in a variable
use async await over promises and callback as it is more cleaner to read

we can use try/catch with synchronous code(or normal code). when ever we get an error in try it will skip the rest of the code and go directly to the catch. 
try/catch or anyother error handling methods are used when there are unexpected errors.
we can manually create an error in async await by using throw

if we are using promises there are 2 ways to manually create errors
1. using throw example throw 'error2';
2. inside a promise if we need to create an error in the future then we need to use different code.
   throw doesnt work in the future.instead promise gve another way to create error
   when we create a promise it gives us a secound parameter reject. reject() is a function and it lets us create an error in the future


*/