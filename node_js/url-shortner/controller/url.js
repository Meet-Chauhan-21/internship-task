const URL = require("../model/url")
const shortid = require("shortid")

const generateShortUrl = async(req,res)=>{
    const body = req.body
    if(!body.url) return res.json({error: "url is required" })
    const shortId = shortid()
    await URL.create({
        ShortId: shortId,
        RedirectURL: body.url,
        History:[]
    })
    return res.json({id:shortId})
}

const getUrl = async(req,res)=>{
    const shortId = req.params.shortId
    const result = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            History:{
                timestamp: Date.now()
            }
        }
    })
    res.redirect(result.RedirectURL)
}

module.exports = {
    generateShortUrl,
    getUrl
}