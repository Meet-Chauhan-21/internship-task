console.log("This is an test-2 for ASYNC")
console.log(1)
console.log(2)
console.log(3)

function getData(){
    return new Promise((resolve,reject)=>{
        // setTimeout(()=>{
            console.log("YES PROMISE CALLED")
            resolve("RESOLVE")
            // reject("REJECT")
        // },3000)
    })
}

async function func(){
    try{
        let data = await getData()
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}
func()

console.log(4)
console.log(5)
console.log(6)
console.log(7)