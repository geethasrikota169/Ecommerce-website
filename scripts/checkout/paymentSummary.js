import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;
  
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents*cartItem.quantity

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents+shippingPriceCents;
  const taxCents = totalBeforeTaxCents*0.1;
  const totalCents = totalBeforeTaxCents+taxCents;

  //console.log(totalBeforeTaxCents);

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)} 
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

document.querySelector('.js-payment-summary')
   .innerHTML=paymentSummaryHTML;
   
   document.querySelector('.js-place-order')
     .addEventListener('click', async () => {
      //adding error handling
      try{
        const response = await fetch('https://supersimplebackend.dev/orders',{
          method : 'POST',
          headers : {
            'Content-Type':'application/json'
          },
          body : JSON.stringify({
            cart: cart
          })
        });//giving fetch 2nd parameter (POST) to send data to backend 2nd parameter is a object.
       const order = await response.json();
       addOrder(order);

      }catch(error){
        console.log('Unexpected Error. Try Again later.')
      }

      //changing the url on the browser
     window.location.href = 'orders.html'; 
      
    });//when we click the button we are going to make a request to the backend to create the order.
     //for this example a url path is seted up in the backend for orders. here we need to sedn some data to the backend(we need to send the cart) inorder to create an order

     
}


/*
To send data in a request 
we need to use a different type of request.
4 types of requests:
GET = get something from the backend
POST = create something
PUT = update something
DELETE = delete something
GET request dont really let us send data to the backend. POST lets us send data to the backend.

2nd parameter to the fetch is a object and in the object some parameters are given they are
method paramter - indicates the type of the request
headers - it gives the backend more information about our request
   content type tells the backend wt type of data we are sending in our request. here /json means js object
body - in the body we will send the actual data
  according to the documentation(docmentation of backend in this case for documentation url is https://supersimplebackend.dev/documentation ) we need to send an object with an property called cart and this contains our cart array.
  we can't send an object directly in request to we are converting it to into string

after we send the request we need to wait for the response to comeback to do that fetch returns a promise. we are using aync await to wait for the response.
to use await for fetch the function it is in need to be async. as we are usig await we can save the response in a vairable.
to get data from response we need to use response.json. as response.json is also a promise we need to wait for the promise to finish before going to the next line this response.json will give the data attached to the response

window.location is a special object by js. it will let us control the url at the top of the browser. if we change the location object it will change the url.
location has a property called .href this gives us the url of the top of the browser. if we change it will change the url in browser.
window.location.href = 'orders.html';  //this will replace the path after the slah(/) in the url
orders.html is a filepath. the current file iz checkout.html




*/