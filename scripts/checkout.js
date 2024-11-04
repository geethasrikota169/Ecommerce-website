import {cart,removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js'; //importing to serach the array for full product details
import { formatCurreny } from './utils/money.js';  //..(2dots) represnts the folder outside the current folder. .(1dot)means the current folder means we are going to the current folder is scripts then we will go to utils ad locate money.js
 
let cartSummaryHTML = ''; //each time we loop through the cart we are going to add html to this so we can combine it

cart.forEach((cartItem)=>{
  const productId = cartItem.productId; //getting productid out of the cart
  
  let matchingProduct; //variable to save the results of matching products

  products.forEach((product)=>{
    if (product.id === productId){
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
});//foreach cartitem we will generate html

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click',() => {
        const productId = link.dataset.productId; 
        removeFromCart(productId);
      });
    });//we are adding an eventlistner for all the delete buttons. then giving the function suhc that the product is removed from the cart and then the html is updated for that we need to know which item to delete so we are assigning an data attribute to the delete button.




/*to create the html for checkout page using the products we are 1st looping through the cart and then we will search the for the items using id to get other details of the items like name,price.. etc */
/* another problem is that using the html generator in the checkout page for the delivery option we are using aa type called radio. the way radioselectors work is that if a set of radio selectors have the same name then we can only select one 
syntax for radio selector
  <input type="radio" name="name1">
the problem in this js is we are generating the html code for the radioselectors with the same name so we are only able to select one option in the given 6 deliveryoptions(default cartItems) t resolve this we need to assign different radio selector name for different products.
instead of using delivery-option-1 name for everytime. each product is going to use differnt name insted of 1 we will substite with producid
*/
