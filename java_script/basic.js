// var 
console.log("var key word");
var a = 10
function fuct1(){
    var a = 50;
    console.log(a);
}
fuct1()
console.log(a);


// let 
console.log("let key word");
let b = 10
b = 20;
function fuct2(){
    let b = 50
    console.log(b);
}
fuct2()
console.log(b);


// object 
console.log("object datatype");
const student = {
    name:"Meet Chauhan",
    age:20,
    rno:431,
    isStudent:true
}
console.log(student);

student.name = student.name + " krisha" + " " +20
console.log(student);

// Pre and Post increment and decrement
console.log("Pre and Post increment and decrement");
let x = 10
let y = 20
console.log("++x = ",++x); //pre increment
console.log("x = ",x);

console.log("y-- = ", y--); //post decrement
console.log("y = ", y);


// Ternory Operator
console.log("Ternory Operator");
console.log(5 == 5 ? 'Both number are same' : 'Not same')


// For of loop (this work only string, array)
console.log("For-of loop practices")
let str = "Meet Chauhan"
let fruit = ['apple','banana','graps']
for (const i of fruit) {
    console.log(i);
}


// For in loop (this work with object) it default return key in object
console.log("for-in loop practices")
let obj = {
    name:"meet",
    rno:431
}
for(let a in obj){
    console.log(obj[a])
}

// popup box's in JS and prompt provide input and return input value
// alert("this is alert box")
// prompt("this is prompt box")

//Tamplate literal
console.log(`This is an tamplate literal`)