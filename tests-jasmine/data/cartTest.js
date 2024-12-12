//testing code using jasmine for cart.js in data folder of our project.
//we are testing addToCart function here

import { addToCart,cart,loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  it('adds an exisiting product to the cart', () => {
    spyOn(localStorage,'setItem');
    //1st we need to setup the cart so that it already containes the product for that we need to mock the getItem
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId:'1'
     }]);//now when we use localStorage.getItem it will give back this array as the starting cart
    });
    loadFromStorage(); //after sypOn we need to reload the cart from localStorage
  
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1); //checking if the length of cart is 1
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //checking if setItem method is called 1 times 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');//checking if 1st product in the cart is matching with the product added 
    expect(cart[0].quantity).toEqual(2);//checking when adding new product the quantity is 1
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1); //checking if the length of cart is 1
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //checking if setItem method is called 1 times 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');//checking if 1st product in the cart is matching with the product added 
    expect(cart[0].quantity).toEqual(1);//checking when adding new product the quantity is 1
  }); // we still get errors we need to reload the cart after mocking the cart to resolve the error. here order matters so we need to mock setItem first then addToCart

});




/* 
expect(cart.length).toEqual(1); here we are assuming the cart is empty and when the given function adds a item the length will be 1.
this test will fail as we are gettig the cart from localstorage and if the localstorage is not empty then the test will fail.
this test will pass when the localstorage cart is empty
this is called an flaky test. flaky test= test that sometimes passees and sometimes fails.

to solve this problem we are gng to use a feature of jasmine called mocks
Mocks = lets us replace a method with a fake version. then we can make the fakeversion do anything we want
example when we load the cart from local storage we are using localstorgae.getitem so we can use a mock to create a fake version of getitem and we can make the fake version do anything we want like return an empty array
we can create a mock using jasmine function called spyOn();
we give it 2 paramters 1st is the object in this case it is localstorage and 2nd is string is it the method we want to mock in this case it is getItem,
    spyOn(localStorage,'getItem'); ---=>this will replace localstorgae.getItem with a fake verison. we can make this fake verison anything we want
   spyOn gives us an object and it has a property called and we can use it will result in an object and this object has a method called callFake() we give callfake an function. 
   this function is what we want getItem to do. so we are overridding the original getItem with whatever is inside the function.
   in this case we want getItem to return empty array so we will give that in function. as local storage supports only strings so we need to return (return []) as string to do that we will do JSON.stringfy(). here it will be (return JSON.stringify([]))
here in the addToCart function at the end there is saveToStroage but we dont need to save the testcases to storage. in SaveTostorage we have getItem method we will mock it in order to not saveToStorage.
....decribe runs in order as u wrote the code

inorder for addToCart to work we need to make sure saveToStorage is working. but we cant setItem to storage as it is testcode so we will see if setItem is called using below code after mocking setItem
spyOn() records everytime a method is used
 expect(localStorage.setItem).toHaveBeenCalledTimes(1); so this method checks how many times localTsorgae.setItem is called. we can compare it to 1. this will only work if setItem is mocked.
after we mock a method we can check how many times the method is called
a mock only lasts for 1 test

*/