import {cart,removeFromCart,updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js'; //importing to serach the array for full product details
import  formatCurreny from './utils/money.js';  //..(2dots) represnts the folder outside the current folder. .(1dot)means the current folder means we are going to the current folder is scripts then we will go to utils ad locate money.js
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';  //importing esm version of a hello function external library. instead of path we will give url of the page
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';  //import from dayjs esm verison
import {deliveryOptions} from '../data/deliveryOptions.js';


hello();
const today = dayjs();
const deliveryDate = today.add(7,'day'); //it will add 7 days to the todays date
console.log(deliveryDate.format('dddd, MMMM D')); //inside the () we will give a string. this string tells dayjs wt kind of format we wnat

let cartSummaryHTML = ''; //each time we loop through the cart we are going to add html to this so we can combine it

cart.forEach((cartItem)=>{
  const productId = cartItem.productId; //getting productid out of the cart
  
  let matchingProduct; //variable to save the results of matching products

  products.forEach((product)=>{
    if (product.id === productId){
      matchingProduct = product;
    }
  });

  //getting delivery option id out of the cart into a variable
  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,'days'
  );
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  cartSummaryHTML += `
    <div class="cart-item-container 
         js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurreny(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct,cartItem)}
        </div>
      </div>
    </div>
    `;
});//foreach cartitem we will generate html

//function for generating html using js for delivery-optins
function deliveryOptionsHTML(matchingProduct,cartItem){
  let html = '';

  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs(); //getting today's date using dayjs function
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    ); //changing into easy to read format

    const priceString = deliveryOption.priceCents
     === 0 
     ? 'FREE'
     : `$${formatCurreny(deliveryOption.priceCents)} -`;

     //for which option to be checked
     const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    
     html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}"> 
        <input type="radio"
        ${isChecked ?'checked' :''} 
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
    //${isChecked ?'checked' :''}  is used to check the option
  });
  return html;
}

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click',() => {
        const productId = link.dataset.productId; 
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove(); //every element we get with a dom has a method remove
      });
    });//we are adding an eventlistner for all the delete buttons. then giving the function suhc that the product is removed from the cart and then the html is updated for that we need to know which item to delete so we are assigning an data attribute to the delete button.

document.querySelectorAll('.js-delivery-option')
   .forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
    });
   });


/*to create the html for checkout page using the products we are 1st looping through the cart and then we will search the for the items using id to get other details of the items like name,price.. etc */
/* another problem is that using the html generator in the checkout page for the delivery option we are using aa type called radio. the way radioselectors work is that if a set of radio selectors have the same name then we can only select one 
syntax for radio selector
  <input type="radio" name="name1">
the problem in this js is we are generating the html code for the radioselectors with the same name so we are only able to select one option in the given 6 deliveryoptions(default cartItems) t resolve this we need to assign different radio selector name for different products.
instead of using delivery-option-1 name for everytime. each product is going to use differnt name insted of 1 we will substite with producid
steps to update the html on the page
 use the dom to get the element to remove
 use .remove() method. to remove the container for the product we will need to assign an id for each container containing products. so we will add a special class, class="js-cart-item-container-${productId}" in the cart-item-container
 then we will target the class and remove the product to change the html on the page

dayjs dates format => deliveryDate.format(''); here we can give a string which will represent the format we want for that in the documentation of dayjs there are special characters we cam put into the string
example for day of the week we can type dddd into the string and this will give us string in which the text is replaced by the actual day of the week
if we want to add a comma or space we can directly use them
and for fullmonth use MMMM. adn ti insert the day of the month use D for that

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';  
this synatx is called an defualt export. it is another way of exporting. we can use it when we only want to export 1 thing
example in utilies folder open money.js we have a function formatCurrency. we can set it as an default export using the syntax
export default formatCurrency at the end of the file. so when we ipmort this we can import without using {} curly brackets
---each file can only have 1 default export

steps for function deliveryOptionHTML:
1.loop through the deliveryOptions
2.for each option generate some html
3.combine the html together

dayj has an add method to add the number of days 
deliveryDate = today.add(
      deliveryOption.deliveryDays,'days'
    ); here deliveryOption.deliverydays is the 1st parameter that is how many days to add. 2nd parameter we will give the length of time we want to add which is a string 'days'


const {productId,deliveryOptionId} =element.dataset; this is a shorthand property of
const productId=element.dataset.productId;
const deliveryOptionId=element.dataset.deliveryOptionId;

*/
