# climate-change-live-api
A Demo to show how to build your own API and host in on RapidAPI

## To run this project

You can run this project on your local machine. Just pull it down and do the following:

### `npm i`

1. Run the command above to install all the packages

### Start the Project

2. Now run the server i your localhost

```bash
npm run start
```

3. Open [http://localhost:8000/news](http://localhost:8000/news) with your browser to see the results of the scrape in your terminal. You can also used certain paramters to get news from individual sources.

4. If you want to deploy the api to Netlify: create folders functions with api.js ( a modified version of index.js) and functions with empty index.html file + netlify.toml
5.  Add a new script to package.json for build ("build": "netlify deploy --prod")
6.  When"you npm run build" the app will be deployed to your netlify  site, follow the netlify cli options. Choose "dist" for publish folder whe nprompted.
7.  Happy coding!!!

## MIT Licence




