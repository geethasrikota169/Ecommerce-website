class Cart { //naming convention has to use PascalCase for name of class
  cartItems; //same as cartItems = undefined;
  localStorageKey;

  //creating a constructor
  constructor(localStorageKey){ //constructor method works like a normal method it will run the code inside it.special thing about it is when we generate an object it will run the constructor method automatically
    this.localStorageKey = localStorageKey; 
    this.loadFromStorage();
  }//"this" points to the object we generate

  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));  

    if(!this.cartItems){ 
      this.cartItems = [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1'
      },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'2'
      }]; 
    }
  }
  
  saveToStorage(){  
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
  }

  addToCart(productId){
    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    }); 
  
    if(matchingItem){
      matchingItem.quantity++;
    }else{
      this.cartItems.push({
        productId:productId,
        quantity:1,
        deliveryOptionId:'1' 
      });
    }
    this.saveToStorage(); 
  }

  removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId != productId){
        newCart.push(cartItem);
      }
    });
  
    this.cartItems=newCart;
  
    this.saveToStorage();
  }

  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId=deliveryOptionId;
    this.saveToStorage();
  }


}

//creating new object using the class
const cart = new Cart('cart-oop'); //when we call the class ,between the brackets we can give the parameters for the constructor
const businessCart = new Cart('cart-business');

// //we have a property called localStorage to give a value to that the syntax is
// cart.localStorageKey = 'cart-oop';
// businessCart.localStorageKey = 'cart-business';

// cart.loadFromStorage();
// businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart); //returns true


/*
oop = organizing our code into objects
class = a feature that helps us generate these objects

a class is nothing but a object generator.
a naming convention is to use PascalCase for things that genertae objects
inside class we will put the properties and method that we want for each object we generate
syntax:
class Cart { 
  cartItems = undefined;  //we put = instead of : and semicolon at the end instead of a ,(comma)
  and for method at the end no need for comma remaning all same 
}

each object we generate from class is called a instance of th class. example here cart,businessCart are instances of class Cart()
we can check is an object is an instance of a class using the cose
console.log(businessCart instanceof Cart);

cart.localStorageKey = 'cart-oop';
businessCart.localStorageKey = 'cart-business';
this is a setup code for giving values for localStorageKey. but inorder to give multiple values it will be difficult and messy
Constructor :
a constructor lets us put this setup code inside the class this makes our code cleaner because we can group everything together inside a class
//constructor method works like a normal method it will run the code inside it.special thing about it is when we generate an object it will run the constructor method automatically
1.method has to be names constructor
2.should not return anything from a constructor

 */