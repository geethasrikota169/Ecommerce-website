//code for automated test for formatcurrency function
import {formatCurrency} from '../../scripts/utils/money.js';

//name for the group of tests releated (also called test suite)
console.log('test suite: formatCurrency')

//giving name for the testcase
console.log('converts cents into dollars');
//basic testcase
if (formatCurrency(2095) === '20.95'){
  console.log('passed');
}else{
  console.log('failed');
}

//giving name for 2nd testcase
console.log('works with 0');

//edge testcases
if (formatCurrency(0) === '0.00'){
  console.log('passed');
}else{
  console.log('failed');
}

//giving name for 3nd testcase
console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01'){
  console.log('passed');
}else{
  console.log('failed');
}







/*testing is of 2 types 
1.manual testing
2.automated testing

manual testing is when we create the situations and check them but they have defaults so we use autmated testing
automated testing means using code to test code instead of manually opening the website and clicking around to try our code 
we going to tell the computer to do these tests for us. these will save time and effort

they are 2 types of testcases
1.basic test cases  2.edge test cases(tricky ones)
*/