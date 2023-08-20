const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = express.Router();

const serverless = require("serverless-http");

const newspapers = [
    // {
    //     name: 'cityam',
    //     address: 'https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/',
    //     base: ''
    // },
    // {
    //     name: 'thetimes',
    //     address: 'https://www.thetimes.co.uk/environment/climate-change',
    //     base: ''
    // },
    // {
    //     name: 'guardian',
    //     address: 'https://www.theguardian.com/environment/climate-crisis',
    //     base: '',
    // },
    // {
    //     name: 'telegraph',
    //     address: 'https://www.telegraph.co.uk/climate-change',
    //     base: 'https://www.telegraph.co.uk',
    // },
    // {
    //     name: 'nyt',
    //     address: 'https://www.nytimes.com/international/section/climate',
    //     base: '',
    // },
    // {
    //     name: 'latimes',
    //     address: 'https://www.latimes.com/environment',
    //     base: '',
    // },
    // {
    //     name: 'smh',
    //     address: 'https://www.smh.com.au/environment/climate-change',
    //     base: 'https://www.smh.com.au',
    // },
    // {
    //     name: 'un',
    //     address: 'https://www.un.org/climatechange',
    //     base: '',
    // },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news/science_and_environment',
        base: 'https://www.bbc.co.uk',
    },
    // {
    //     name: 'es',
    //     address: 'https://www.standard.co.uk/topic/climate-change',
    //     base: 'https://www.standard.co.uk'
    // },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/topic/climate-change-environment/',
        base: ''
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html',
        base: ''
    },
    {
        name: 'nyp',
        address: 'https://nypost.com/tag/climate-change/',
        base: ''
    }
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })
//console.log("articles :", articles)
        })
})

router.get('/', (req, res) => {
    res.json('Welcome to my Climate Change News API')
})

router.get('/news', (req, res) => {
    res.json(articles)
})

router.get('/news/:newspaperId', (req, res) => {
    
    console.log("REQUEST  PARAMS:", req.params.newspaperId)
    const newspaperId = req.params.newspaperId
    const newspaper = newspapers.filter( newspaper => newspaper.name = newspaperId);
    console.log("NEWSPAPER :", newspaper);

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base

    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})

//app.listen(PORT, () => console.log(`server running on PORT ${PORT}`)) // bu staır localde çalıştırıken gerekli

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);