/*//saving data by creating object inside array
const products = [{
  image:'images/products/athletic-cotton-socks-6-pairs.jpg',
  name : 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating :{
    stars: 4.5,
    count:87
  },
  priceCents:1090
},{
  image:'images/products/intermediate-composite-basketball.jpg',
  name : 'Intermediate Size Basketball',
  rating :{
    stars: 4,
    count:127
  },
  priceCents:2095
},{
  image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name : 'Adults Plain Cotton T-Shirt - 2 Pack',
  rating :{
    stars: 4.5,
    count:56
  },
  priceCents:799
},{
  image:'images/products/black-2-slot-toaster.jpg',
  name : '2 Slot Toaster - Black',
  rating :{
    stars:5,
    count:2197
  },
  priceCents:1899
}]; we are using the data given which is already existed */

//importing the variable from other file. in the {} we will give the name of the varible. then we will tell form which file we need t get the varible. inside the '' we will give the file path
//filepath '' this amazon.js is inside the scripts folder so we need to get out of the scripts folder for that we are putting (..)2dots indicating folder outside the current folder and then (/) to go outisde of the scripts folder. after that we are going to go inside data folder by typing data/ and then the filename where the varible is present in
import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

//combining individual strings(products) into one
let productsHTML = ''; //each time we go through the loop we will add the html string into this string

//generating html using js and data without adding html manually for every product
products.forEach((product)=>{
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents/100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}"> 
        Add to Cart
      </button>
    </div>
  `;
});
  //console.log(productsHTML);
  document.querySelector('.js-products-grid').innerHTML=productsHTML; //replacing the innerhtml to js produced html productsHTML

  
  
  function updateCartQuantity(){
    //updating the cart total quantity on the amazon page
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
    });
      //changing the cartqunatity on the page using innerHtML
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button)=>{
      button.addEventListener('click',()=>{
        const productId = button.dataset.productId; //accessing productname from all the datasets of the button.the name is converted form kabab case to camel case(in data-product-id , product-id to productId)
        //putting code into functions to make it understand easy. and putting the function addtocart in cart.js as it is good pratice to put the code releated to cart in one file and using import and export
        addToCart(productId); 
        updateCartQuantity();
      });//dataset property gives all the data attributes attached to the button
    }); //selecting all add to cart buttons and looping through them and adding eventlistner















  //foreach takes object from products array and saves it in product parameter and runs it,
//for stars : ratings are in point and we cant save img in points so multiple with 10

//document.querySelector('.js-products-grid') ---> using this text we can change the html inside the class js-products-grid to do that we use the property called innerhtml.
//we are using the dom tp put the js generated html into the page

/*to show 2 decimals after price we are using a method called .toFixed()  tofixed will convert a number into string and we can tell it how many decimals we want in brackets  */

/* DATA ATTRIBUTE
   it is just another html attribute
   allows us to attach any infromation to an element
   example <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-name="${product.name}"> 
      //now eachof these buttons have a data attribute.using this we can attach any information to an element(example button in this case)
      we can also attach product image or price.sp now when we click this button we will get the name
  Syntax: has to start with data-  then give it any name.but we shoud seperate the word with dash
    //it is not good to use product name cause we can have different items with same id soo we will use id.as id is unique for every product
 
  MODULUES:
    1. put all imports at the top of the file
    2. for modulues to work we need to use live server

  BENEFITS:
    1. no naming conflicts it will arise only when we import a varible and then use same varibale in the file
    import {cart as myCart} from '../data/cart.js'; this syntax will renmae the varible cart to myCart so we will use the myCart variable in this file
    */