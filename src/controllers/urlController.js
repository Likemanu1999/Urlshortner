const urlModel = require("../models/urlModel");
const validUrl = require('valid-url');
const shortid = require('shortid');
const  Url = require("../models/urlModel");

const createShortUrl = async function (req, res) {
    try {
        //==defining baseUrl==//
        const baseUrl = 'http://localhost:3000'

        //==validating request body==//
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "Invalid request, please provide details" })

        //==validating long url==//
        let data = req.body
        if (!validUrl.isUri(data.longUrl)) return res.status(400).send({ status: false, msg: "Enter valid url" })

      
        let findUrl = await urlModel.findOne({ longUrl: data.longUrl })
        if (findUrl) return res.status(200).send({ status: true, data: findUrl })

        let urlCode = shortid.generate().toLowerCase()
        let shortUrl = baseUrl + '/' + urlCode
        data.urlCode = urlCode
        data.shortUrl = shortUrl

        const urlCreate = await urlModel.create(data)
        const response = await urlModel.findOne({ urlCreate })
        return res.status(201).send({ status: true, data: response })
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


const getShortUrl = async function (req, res) {
    try { 
            const url = await Url.findOne({ urlCode: req.params.urlCode });
    // console.log(url)
      if (url) {
        url.clicks++;
        url.save();
        return res.redirect(url.origUrl);
      } else res.status(404).json("Not found");
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

module.exports = { createShortUrl , getShortUrl}