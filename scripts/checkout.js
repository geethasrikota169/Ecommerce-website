import {cart} from '../data/cart.js';
import {products} from '../data/products.js'; //importing to serach the array for full product details

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
          $${matchingProduct.priceCents/100}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary">
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
              name="delivery-option-1">
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
              name="delivery-option-1">
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
              name="delivery-option-1">
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

console.log(cartSummaryHTML);




/*to create the html for checkout page using the products we are 1st looping through the cart and then we will search the for the items using id to get other details of the items like name,price.. etc */