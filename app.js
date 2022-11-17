const express = require('express')
const path = require('path')
const app = express()
app.use(express.json())
let cors = require('cors')
app.use(cors())
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const publicDirectoryPath = path.join(__dirname, './client')
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3600


//form_data                               

app.post('/formdata', async (req, res) => {
console.log('req.body.scriptname',req.body.scriptname)
const response = await axios.get(`https://finance.yahoo.com/quote/${req.body.scriptname}/`,{
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
  }
  });
const dom = new JSDOM(response.data)
      /////////response.data gives html
      
res.send(dom.window.document.querySelectorAll('[data-field="regularMarketPrice"]')[6].textContent.replace(',',''))
  

   })


app.listen(port)

