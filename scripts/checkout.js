import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-oop.js';  //this syntax will run all the code in the file without importing anything
//import '../data/cart-class.js'; 
import '../data/backend-practice.js';

//changed the code into 2 sections order section and price summary section in checkout folder
renderOrderSummary();
renderPaymentSummary();