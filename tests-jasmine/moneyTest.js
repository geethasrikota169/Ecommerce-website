import {formatCurrency} from '../scripts/utils/money.js';

//this code works same as moneyTest.js in tests folder.only difference is it is simple and more organised to view in website
describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent',()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});















/* 
describe is a function provided by jasmine and it creates a testSuite(group of similar tests)
describe(description,specDefinitions)
to name a testSuite in jasmine we are going to give an name for it in the 1st string. 2nd parameter is to add tests inside testsuite we give an function 

it() is used to create a test. syntax is
  it(description, textFunction(opt), timeout(opt))
  1st parameter is the name of the test as string. 2nd parameter is the code function to run the test
expect() is used to compare a value to another value. syntax is
   expect(actual) -> {matchers}

expect is an object and it has many methods to use like toEqual

jasmine gives a lot of details on where a the test fail
*/