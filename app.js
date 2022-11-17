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
const response = await axios.get(`https://finance.yahoo.com/quote/${req.body.scriptname}/`);
const dom = new JSDOM(response.data)
      /////////response.data gives html
      
res.send(dom.window.document.querySelectorAll('[data-field="regularMarketPrice"]')[6].textContent.replace(',',''))
  

   })


app.listen(port)

