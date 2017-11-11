# node-express-passport_oauth
A simple implementation of Google and Facebook Oauth with node, express4, passportjs and mongodb (mongoose)

### Installation
To try this project on you local machine you must set some environment variables:

Env Variable  | Value
------------- | -------------
facebook.appID              | *your FB client id*
facebook.appSecret          | *your FB client secret*
google.clientID             | *your Google client id*
google.clientSecret         | *your Google secret*
mongodb.dbURI               | *mongodb://{dbuser}:{dbpassword}@{dbaddress}:{dbport}/{dbname}*

### Getting started
```
npm install
node app.js
```
visit **http://localhost:3000** in you browser

### Google and Facebook apps (required)
To create an app on Facebook go to: https://developers.facebook.com/apps/  
To create an app on Google go to: https://console.developers.google.com/project  

### MongoDB URI (required)
I use mongolab for my mongodb instance. It's a great service, easy to use. https://mongolab.com/  
You can use what you want, either a local instance of mongodb.  
