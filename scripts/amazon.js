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

  document.querySelectorAll('.js-add-to-cart')
     .forEach((button)=>{
      button.addEventListener('click',()=>{
        const productId = button.dataset.productId; //accessing productname from all the datasets of the button.the name is converted form kabab case to camel case(in data-product-id , product-id to productId)
        
        let matchingItem;
        cart.forEach((item)=>{
          if(productId === item.productId){
            matchingItem = item;
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
        console.log(cart);
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
 
  */