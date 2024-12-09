//this file is going to contain utilities that are related to money
//now we are going to share this function formatCurrency between checkout.js and amazon.js

export function formatCurrency(priceCents){
  return (Math.round(priceCents)/100).toFixed(2);
}
//tofixed has an issue it doesnt roundoff .0005 type issues. so we will round the pricecents 1st

export default formatCurrency;
//now when importing formatCurrency no need to use {}