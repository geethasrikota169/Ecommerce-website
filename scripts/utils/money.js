//this file is going to contain utilities that are related to money
//now we are going to share this function formatCurrency between checkout.js and amazon.js

export function formatCurreny(priceCents){
  return (priceCents/100).toFixed(2);
}

export default formatCurreny;
//now when importing formatCurreny no need to use {}