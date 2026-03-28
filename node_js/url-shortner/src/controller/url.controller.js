const URL = require("../model/url.model");
const shortid = require("shortid");

const generateShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.json({ error: "url is required" });
  const shortId = shortid();
  await URL.create({
    ShortId: shortId,
    RedirectURL: body.url,
    History: [],
  });
  return res.render("home",{
    id: shortId
  })
};

const getUrl = async (req, res) => {
  const sid = req.params.shortId;
  const result = await URL.findOneAndUpdate(
    {
      ShortId: sid,
    },
    {
      $push: {
        History: {
          timestamp: Date.now(),
        },
      },
    },
  );
  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }
  res.redirect(result.RedirectURL);
};

const getAnalsis = async (req, res) => {
  const sid = req.params.shortId;

  const result = await URL.findOne({ ShortId: sid });

  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.status(200).json({
    TotalClicks: result.History.length,
    Analysis: result.History,
  });
};

module.exports = {
  generateShortUrl,
  getUrl,
  getAnalsis,
};
