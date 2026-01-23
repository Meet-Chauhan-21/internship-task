const a = [300,54,676,88,56]
const b = ["hello","world"]
const c = [39,true,"This is the end"]

let tot = 0
console.log(a)

for(let e of a){
    tot = tot + e
}
console.log("average is : ", tot/a.length)

for(let i = 0; i < a.length; i++){
    a[i] =a[i]-a[i]*10/100; 
}
console.log("aftre applying 10% offers : ", a)

// to add at the end
a.push(222,333,"num",true)
console.log(a)

// to delete at the end
let delete_element = a.pop()
console.log(a)

// to convert entire array in string 
console.log(a.toString())

// to concat multiple array
const new_arr = a.concat(b,c)
console.log(new_arr)

// to add start
a.unshift("hello")
console.log(a)
    
// to delete at the start
a.shift()
console.log(a)

// to slice the array 
console.log(a.slice(2,5))

// to add, remove and replace element that time use ( splice method change in orginal array )
// array.splice(starting_index, how_many_elements_remove, to_add_new_elements)
a.splice(2,0,50.48)
console.log(a) 