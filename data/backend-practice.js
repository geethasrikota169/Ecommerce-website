//sending an http message
const xhr = new XMLHttpRequest();   //creating new http message

//we need to setup the eventListner 1st then send the request
//to wait for respone to come and then access the response
xhr.addEventListener('load',() => {
  console.log(xhr.response); //now this will not be undefined as the respone is accessed after it is arrived and loaded
});//after the event load(response has loaded) we are going to run the function

xhr.open('GET','https://supersimplebackend.dev'); //to setup the above request the syntax
xhr.send(); //sends message across internet to backendcomputer of the url
//xhr.response //this is equal to undefined as it takes time to send request accross the internet so response will not be ready instantly.


//another http request
const xhr2 = new XMLHttpRequest(); 
xhr2.addEventListener('load',() => {
  console.log(xhr2.response); 
});
xhr2.open('GET','https://supersimplebackend.dev/products/first'); 
xhr2.send();






/* load means the response has loaded
to send an http message we are going to use a class called XMLHttpRequest its an builtin class
new XMLHttpRequest();  //creates a new HTTp message to send to th backend. message=request. to setup this request do the below
xhr.open(); now to setup this request we are gng to give open 2 paramters. 1st is the type of http message 2nd parameter is where to send this http message.
type of HTTP message:
a string 'GET'. GET = get some information from the backend
other types of requests are GET, POST, PUT, DELETE

2nd parameter: where to send:
to locate another computer on the internet we need to use a URL.URL=uniform resource locator.
for 2nd parameter we will give a string in that url.(here for practice we are giving https://supersimplebackend.dev)
xhr.response=undefined. it is known as asynchrnous code means it will not wait for the above line of code to finish it will send the request and run the next line. so we need to wait for the response to come, to do that
we will add an eventListner then access the respone. the respone will be a string so we can store it or use it

URL paths:
the part that is next to the URL is the urlpath
example:
https://supersimplebackend.dev/hello --> here /hello is the urlpath
htpps://supersimplebackend.dev/products/first  --> here /products/first is the urlpath
https://supersimplebackend.dev --> if there is nothing after url. then url path is /
we can send request to each urlpaths and each URL path will give different response.

a backend only supports a certain set of URL paths. if we send a request to a url path that is not supported,the backend will respond with an error

in console when a red error message is appeared and has a status Code 
if the status Code starts with 4 or 5 (400,404,500) =failed if starts with 2 it is successfull
if starts with 4 it is our problem(like incorrect urlpath)
if starts with 5 it is backend's problems

some backends provide a documentation page. it contains list of urlpaths that are supported and what kind of response will each path give.
 this list or all URL paths that are supported is called the Backend API. API means application programming interface. interface means how we interact with something
documentation page for supersimpledev : supersimplebackend.dev/documentation

backend gives response in different types of data like text/plain,application/json,text/html,image. we can viee the type of the response in inspect->network->header->content-type
an image response will not be shown as an image in console it will be shown as a raw code of the image

using browser = using get request

when we type a url in the browser, it actually sends a GET request to that url. so typing in browser gets the same thing as in our code.difference is in browser when we get the response it will displays the response on the page.
in the browser if the response is a image it will display the image


*/