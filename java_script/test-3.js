console.log("Hello..!")
const arr = ['meet','jay','dharmik','niraj','dev']

console.log("print with forEach --- ")
let b = arr.map((value,index,myarr)=>{
    myarr[index] = value + " " + 1
    console.log(`value:${value} \t index:${index} \t ${arr}`)
    return myarr
})

console.log(b)
console.log(arr)

// console.log("\nprint with Map ---")
// arr.map((value,index,arr)=>{
//     console.log(`value:${value} \t index:${index} \t ${arr}`)
// })



