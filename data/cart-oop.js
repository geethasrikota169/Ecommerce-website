//as copying lot of code for multiply objects can be messy so
//  we are using a function to create multiple objects. and passing parameter for localStorage
function Cart(localStorageKey){  //in oop a naming convention is to use PascalCase for things that generate objects
  const cart = {
    cartItems:undefined,  //export let cart -- this line is made an property. so cart is changed as cartItem to avoid confusion
 
   //loadFromStorage :function(){ shortcut for this line is below. and changing the cart into cart.cartItems to access the value cart
   loadFromStorage(){
     this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));  //as we will be loading from same localtsorge everytime will create a problm we are gng to use a parameter instead
 
     if(!this.cartItems){ //if cart is empty
       this.cartItems = [{
         productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
         quantity:2,
         deliveryOptionId:'1'
       },{
         productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
         quantity:1,
         deliveryOptionId:'2'
       }]; 
     }
   },//by replacing the object name with "this". the method will always work even when object name is changed
 
   saveToStorage(){  //this is shortcut for saveToStorage : function () {
     localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
   },
 
   addToCart(productId){
     let matchingItem;
     this.cartItems.forEach((cartItem)=>{
       if(productId === cartItem.productId){
         matchingItem = cartItem;
       }
     }); 
   
     if(matchingItem){
       matchingItem.quantity++;
     }else{
       this.cartItems.push({
         productId:productId,
         quantity:1,
         deliveryOptionId:'1' 
       });
     }
     this.saveToStorage(); //as savToStorage is inside the cart object to access it we need to write it as cart.saveToStorage here cart(the object) can also be referred using "this".
   },
 
   removeFromCart(productId){
     const newCart = [];
   
     this.cartItems.forEach((cartItem)=>{
       if(cartItem.productId != productId){
         newCart.push(cartItem);
       }
     });
   
     this.cartItems=newCart;
   
     this.saveToStorage();
   },
 
   updateDeliveryOption(productId,deliveryOptionId){
     let matchingItem;
     this.cartItems.forEach((cartItem)=>{
       if(productId === cartItem.productId){
         matchingItem = cartItem;
       }
     });
     matchingItem.deliveryOptionId=deliveryOptionId;
     this.saveToStorage();
   }
 
 };

 return cart;
} //this way everytime we run the function we get a cart

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');


cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);


//converting the whole cart.js code into objects
//to convert the code into oop we need to group all data and functions into object together

/*
//creating object.
const cart = {
   cartItems:undefined,  //export let cart -- this line is made an property. so cart is changed as cartItem to avoid confusion

  //loadFromStorage :function(){ shortcut for this line is below. and changing the cart into cart.cartItems to access the value cart
  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));

    if(!this.cartItems){ //if cart is empty
      this.cartItems = [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1'
      },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'2'
      }]; 
    }
  },//by replacing the object name with "this". the method will always work even when object name is changed

  saveToStorage(){  //this is shortcut for saveToStorage : function () {
    localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
  },

  addToCart(productId){
    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    }); 
  
    if(matchingItem){
      matchingItem.quantity++;
    }else{
      this.cartItems.push({
        productId:productId,
        quantity:1,
        deliveryOptionId:'1' 
      });
    }
    this.saveToStorage(); //as savToStorage is inside the cart object to access it we need to write it as cart.saveToStorage here cart(the object) can also be referred using "this".
  },

  removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId != productId){
        newCart.push(cartItem);
      }
    });
  
    this.cartItems=newCart;
  
    this.saveToStorage();
  },

  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId=deliveryOptionId;
    this.saveToStorage();
  }

};
*/

//cart.loadFromStorage(); //as loadFromStorage is moved inside the object to access it we need to access by cart.save...
// cart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d'); //the addToCart is also working correctly using objects
// console.log(cart);

/*
//using oop we can create another cart simply by copying the previous cart with very less modifications(localstorage name)
const businessCart = {
  cartItems:undefined,  //export let cart -- this line is made an property. so cart is changed as cartItem to avoid confusion

 //loadFromStorage :function(){ shortcut for this line is below. and changing the cart into cart.cartItems to access the value cart
 loadFromStorage(){
   this.cartItems = JSON.parse(localStorage.getItem('cart-business'));

   if(!this.cartItems){ //if cart is empty
     this.cartItems = [{
       productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
       quantity:2,
       deliveryOptionId:'1'
     },{
       productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
       quantity:1,
       deliveryOptionId:'2'
     }]; 
   }
 },//by replacing the object name with "this". the method will always work even when object name is changed

 saveToStorage(){  //this is shortcut for saveToStorage : function () {
   localStorage.setItem('cart-business',JSON.stringify(this.cartItems));
 },

 addToCart(productId){
   let matchingItem;
   this.cartItems.forEach((cartItem)=>{
     if(productId === cartItem.productId){
       matchingItem = cartItem;
     }
   }); 
 
   if(matchingItem){
     matchingItem.quantity++;
   }else{
     this.cartItems.push({
       productId:productId,
       quantity:1,
       deliveryOptionId:'1' 
     });
   }
   this.saveToStorage(); //as savToStorage is inside the cart object to access it we need to write it as cart.saveToStorage here cart(the object) can also be referred using "this".
 },

 removeFromCart(productId){
   const newCart = [];
 
   this.cartItems.forEach((cartItem)=>{
     if(cartItem.productId != productId){
       newCart.push(cartItem);
     }
   });
 
   this.cartItems=newCart;
 
   this.saveToStorage();
 },

 updateDeliveryOption(productId,deliveryOptionId){
   let matchingItem;
   this.cartItems.forEach((cartItem)=>{
     if(productId === cartItem.productId){
       matchingItem = cartItem;
     }
   });
   matchingItem.deliveryOptionId=deliveryOptionId;
   this.saveToStorage();
 }

};
*/











/*
inside object export or let words are not correct
function inside an object is called method

***** for more clarity in "this" see supersimpledev js video at time 17:44:20
in cart.cartItems we are accessing cartItems that are in cart object but this cart.carItem doesnt work if the name of the object(cart) is changed so for that js has a word 'this' 
instead of using the object name we can use "this". "this" gives us the object that contains the function

advantages of oop is that we can easily multiply the number of same objects example two cart. oop makes it easy to create multiple objects


PascalCase = start every word with a capital including first word
*/