console.log("This is an fetch API calling")

const fetchData = async ()=>{
    const data = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10`)
    console.log(data)

    const newdata = await data.json()
    console.log(newdata)
}

fetchData()