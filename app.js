const express = require('express')
const path = require('path')
const app = express()
app.use(express.json())
let cors = require('cors')
app.use(cors())
const axios = require('axios');

const publicDirectoryPath = path.join(__dirname, './client')
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3600


//form_data

app.get('/', async (req, res) => {

      const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
     
            /////////response.data gives html
            console.log(response.data)
      res.send(response.data)
        
      
         })


app.listen(port)

