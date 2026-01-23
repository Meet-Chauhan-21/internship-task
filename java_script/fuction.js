// normal function 
function fuction1(){
    console.log("print inside fuction")
    // return 5 + 5 
}
const a = fuction1()
console.log("out side fuction : ",a)



//fuction expression
const b = function(){
    console.log("fuction expession")
    // return 20 + 20;
}
console.log("function expression : ", b())



// arrow function
func = () =>{
    console.log("arrow fuction inside")
    // return 10 + 10
}
const c = func()
console.log("outside of arrow function : ", c)