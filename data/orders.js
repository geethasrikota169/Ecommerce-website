export const orders = JSON.parse(localStorage.getItem('orders')) || [];

//function to add orders to the array. giving the fnction an order object
export function addOrder(order){
  orders.unshift(order);
  saveToStorage(); //when we modify the array saving to storage.
}

//function to saveto localstorage

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}



/*
 unshift method will add the order to the front of the array instead of back
 const orders = JSON.parse(localStorage.getItem('orders')) || [];   //here we are giving an default value(by using ||) to the orders as in the begining there will be no orders in the loacalStorage.
 */