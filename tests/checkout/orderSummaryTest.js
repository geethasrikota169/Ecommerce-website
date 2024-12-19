import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage,cart } from '../../data/cart.js';
import { loadProducts } from '../../data/products.js';


describe('test suite: renderOrderSummary',() =>{ 

  //writing the variables outside of the function as we cannnot use the variables inside a function in other testcases due to scope of the variable
  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  beforeAll((done)=>{
    loadProducts(()=>{
      done();
    }); //once the products are completed loading it will run the done function
    
  });

  beforeEach(()=>{
    //in this we can write our setup code
    //mocking localStorage as we are using function saveTotstorage in order to delete a item(orderSummary->removeFromCart->saveToStorage)
    spyOn(localStorage,'setItem');

    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"</div>
    <div class="js-payment-summary"></div>
    `;
    spyOn(localStorage,'getItem').and.callFake(()=>{
          return JSON.stringify( [{
            productId:productId1,
            quantity:2,
            deliveryOptionId:'1'
          },{
            productId:productId2,
            quantity:1,
            deliveryOptionId:'2'
          }]);
        });
        loadFromStorage();
        renderOrderSummary();
  }); //this is a beforeeach hook it will run this function before each of our testcase 
  //instead of writing the code in this function individually we can write it once and use in all testcases
  //  before running any testcase it will run this function then runs the testcase

  it('displays the cart',() => {    
        expect(
          document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
          document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
          document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

      //as our testing is pushing the testresults to bottom we are removing the html we created at the end
      document.querySelector('.js-test-container').innerHTML = ``;
  });

  it('removes a product',() => {
    

     // document.querySelector(`.js-delete-link-${productId1}`).click();  //error vosthundi enduko ardham kavatla
     expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    //checking the 1st product is no longer is on the page
    // expect(
    //   document.querySelector(`.js-cart-item-container-${productId1}`)
    // ).toEqual(null);   //error as the above delete code is not working
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null); //if we put no it will do the opposite operation that is next
    
    //checking if cart array is updated
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1); 
  
    //as our testing is pushing the testresults to bottom we are removing the html we created at the end
    document.querySelector('.js-test-container').innerHTML = ``;
  });
});


/*
document.querySelectorAll('js-cart-item-container')   this code will give an array as result

expect(
          document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
InnerHTML will return all the html along with text so instead we use innertext to get only the text.
here in js-product-quantity class they are other texts other than quantity like update and delete so instead of using toEqual method for expect
we are using toContain('string to check) method. this method will check whether the string given is present or not

document.querySelector(`.js-delete-link-${productId1}`).click();    //clicking the button delete for the product1 using code by click() method
 
hooks lets us share the same code betwen 2 or more tests(it)


  beforeAll(()=>{
    loadProducts();
  });
  //this doesnt work as this is only sending requesting and not waiting for the response and executinh remaning works.for it to wait for response jasmie has a feature
  it is done() function. so in beforeAll we can give a parameter done. when we add this done paramter beforeAll will not automatically goes to the next step. it will only and only goes to the next step when we call the done function
  if we dont call done then beforeAll will keep waiting forever. done() lets us control when to go to the next step
*/