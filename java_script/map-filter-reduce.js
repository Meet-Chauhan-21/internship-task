const a = [34, 78, 99, 12, 56, 67, 89]

let new_a_map = a.map((value,index,arr)=>{
    return value + index
})
console.log(new_a_map)

let new_b_filter = a.filter((value,index,arr)=>{
    return value > 60
})
console.log(new_b_filter)

let new_c_reduce = a.reduce((acc,value)=>{
    return acc + value
},a[0])
console.log(new_c_reduce)