import { products } from "../data/products.js";

export const cart=[{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2
},{
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1
}]; //this varible can be used outside cart.js by adding export 

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
}