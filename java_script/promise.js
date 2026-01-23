console.log("This is an promise..!")

const getData = (count) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(`Data ${count}`)
            resolve("yes promise resolve")
            // reject("some error are occurse..!")
        },3000)
    })
}

const promise = getData(1)
promise.then((res)=>{
    console.log(`This is an promise return result : ${res}`)
    getData(2).then(()=>{
        getData(3)
    })
}).catch((e)=>{
    console.log(`error : ${e}`)
})
