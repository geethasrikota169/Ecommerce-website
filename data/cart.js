import { products } from "../data/products.js";

//we need to get the cart from the local storage instea using the default value
export let cart = JSON.parse(localStorage.getItem('cart'));//it takes one string that is the name of wt we saved early

if(!cart){//if cart is empty
  cart = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2
  },{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1
  }]; 
}//when we 1st use the website we might not have a cart in local storage and local storgae will give null so we are giving a default value


//function to save the cart to local storage
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}// converting the cart into string using json.stringify. here the 1st parameter cart is a reference to the data we are storing

export function addToCart(productId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  }); //looping through the cart to see if the item is already in the cart if yes then saving it in the matchingItem varible so that we can add its quantity 

  if(matchingItem){
    matchingItem.quantity++;
  }else{
    cart.push({
      productId:productId,
      quantity:1
    });//pushing object to the cart created in cart.js
  }
  saveToStorage();//whenever we update the cart we need to save it to local storage
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.productId != productId){
      newCart.push(cartItem);
    }
  });

  cart=newCart;

  saveToStorage();
}








/*
 steps to remove an product from the cart
1.create a new array
2.loop through the vart
3.add eachporduct to the new array. expect for this porductId
 
we are going to use the local storage to save the products as varibles when refreshed will reset. so we will use local storage
local storage can only store strings. and setitem takes 2 strings 1 is the name for whatever we are going to save and 2 is the data and
 it can only save string so we will convert it into string then save it.we can convert anything into string using JSON.stringify
whenever we update the cart we need to save it to local storage so doesnt get reset when we update the cart
JSON.parse it is used to convert the string back to array or previously determined data type 
*/