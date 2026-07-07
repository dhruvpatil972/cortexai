first we have created backend and frontend folder 
and in this project we are going to use the architecture is microservices which we have for every services we have different server for it
and then we have created services and gateway folder in backend folder 
draw the diagram of microservices 
![microservices image](image-3.png)
and then we have created a shared folder

then in gateway we install npm init -y,express,dotenv,morgan
from now we are going to work in gateway folder only
we have made a index.js file ,.env in it
in index.js we have import express,.env and then config it 
and then we have a variable port for storing port
and store the port in .env file
and then we have made an instance for express
and at last server ko listen kara denje with a callback 
and then we have made a simple route "/" and get a response
now we have to bring the database in it


now we will shifted to services folder and create a auth folder
then in auth  we install npm init -y,mongoose,express,dotenv
we have made a index.js file ,.env in it
in index.js we have import express,.env and then config it 
and then we have a variable port for storing port 
and store the port in .env file and and add mongodb_url for auth only collection
and then we have made an instance for express
and at last server ko listen kara denje with a callback 
and then we have made a simple route "/" and get a response 

and no we have to connect database for that we will made a folder config and in it made a db.js file 
import mongoose in it and make async function connnectdb using try-catch and then using connect function 
and then export it 
and then called db.js in index.js of services

now we have to connect the gateway to the auth services 

so now in gateway folder and install packages 
now we will add a middleware-use proxy in it ,so when fetch 8000 it will run and so when somebody has /auth in their
URL so we will navigate them to auth services 
so add a auth service url in dotenv file 

NOW WE ARE STARTING THE COPLETE AUTHENTICATION PROCESS
for that we have made a model folder in auth folder and a user.model.js file in it for the user only
so we have to make schema using mongoose which have all info/blueprint of user 
we are using firebase for authemtication
and them after making schema we are making model and then exporting it

so for authentication,after looging in with google firebase will verifies the user
whether to create new user or already exist data for already exist user to give
so for that we will make a file in config firebase.js
and install a package called firebase-admin
and now log in firebase create new project 
and they will give you some secret keya nd code thay you have to copy in our firebase.js and it is configure 
now create a controller and routes folder in auth folder
and now in controller folddr create a auth.controller.js file
and then we make login controller

NOW WE ARE SHIFTING TO FRONTEND FOLDER TO KNOW HOW REALLY OUR LOGIN BUTTON WE GOING TO WORK 
SO AFTER CLICKING BUTTON WE CAN AUTHENTICATE WITH GOOGLE 
THEN WE WILL KNOW HOW GGOGLE WILL PROVIDE US WITH DATA IN FRONTEND AND FROM THAT
WE WILL COLLECT SOME SOME TOKEN FROM THEM AND GIVE IT TO LOGIN CONTROLLER


in frontend install vite@ latest and also tailwind package,plugin and import 
we are going to create button in app.jsx
now by clicking on this biutton we have authenticated using google
so we have to add firebase in your frontend
so we will make a new folder called utils and make a firebase.js in it
then we will install firebase and mport the code of it in firebse.js
and then we create a .env file for stroing the api key of firebase in it
now we will bring a an authentication and googleauthprovider and then export them 

and now in firebase we have to unable 
and now we have do when button is click google se authenticaton ho 

in app.jsx create a synce function googlelogin and give auth and provider to it and give onclick to button
now we will able to click on it and authemticated the google and the respond given by google has a uid(uniqueid) which we have 
store in backend and we will use it to verify whether the user is there or not 
and controller likenge aur phie  api banakar uske andar ise function ke andar fetch kar denje aur token bhej denje

so now will shift to backend=>
auth.controller.js ke andar token leke aana hai frontend se
and to bring req.body we will middleware in index.js 
ab jo token aaya hai usko verify karenge aur data leke aayenge
so we will import getauth and app from firebase and config/firebase.js
aur phir ham use verify kar denje with decoded function
ab hame decoded se sara data jo frontend me hai vo mil jayega aur jo usme uid hai vo extract karrni hai 
aur ckeck karna hai ki database mei jo firebase uid hai jo hame is data se mili hai toh toh hum response return kar denje aur nahi toh
naya user ko create karna padega 
hame user ka model leke aana hai,phir hum user ko import from user.model.js 
now we will find it on the basic of firebaseuid from usermodel.js by the help of uid of the user of their google authentication

even we have see this sometime that when we come to a website we see we are already login because it might be possible that we have login 2-4 days ago so we dont have to login again 
toh hum kya karte hai ki ek session id ko cookies mei store karate hai aur agar 7 din bad vo expired ho gayagi toh phir sse login karna 


phir routes folder mei jaake auth.routes.js file banayenge aur usme route banayenge aur controller ko import karenge aur route ke ander controller ko call kar denge aur index.js mei router ko import karenge aur use kar denge

aur ab hame is login wali api ko frontend mei fetch karna hai
ab frontend ki .env file mei gateway ka url store karenge aur axios packages install apis ko fetch karenge frontend mei
ab axios.js file banayenge utils folder mei aur usme axios ka instance banayenge aur export karenge

phir app.jsx mei import karenge aur handlelogin function banayenge aur usme axios ka instance use karenge aur login api ko call karenge aur token bhej denge aur response ko console mei log kar denge

now we import {initialapp,cert} and serviceaccount from "firebase-admin/app and ../serviceaccountkey.json respectively from firebase.js and then we will initialize the app with the help of serviceaccount and cert

phir backend ki .env mei frontend ka url store karenge taki backend se frontend ko access kar sake aur phir auth.controller.js mei login function ke ander response return karenge aur frontend ko bhej denge

phir hum cors and cookiee-parser packages install karenge aur index.js mei import karenge aur use karenge taki frontend se backend ko access kar sake aur cookie ko parse kar sake

aur phir auth.controller.js mei login function ke ander cookie set karenge aur frontend ko bhej denge taki frontend mei cookie store ho sake aur agar user 7 din tak login rahe toh cookie expire na ho

aaje humne backend ke auth.controller.js mei login function ke ander user ko bhi response mei bhej denge taki frontend mei user ka data mile aur uske hisab se frontend ko render kar sake

phir hamne import kiya hai crypto from "crypto" taki hum user ke liye unique session id generate kar sake aur usko cookie mei store kar sake taki user 7 din tak login rahe aur cookie expire na ho

aur phir humne import kiya hai {createconnection} from "mongoose" taki hum database se connection create kar sake aur user ke liye unique session id generate kar sake aur usko cookie mei store kar sake taki user 7 din tak login rahe aur cookie expire na ho    

import {getAuth} from "firebase-admin/auth" taki hum firebase ke auth se user ko verify kar sake aur uske data ko extract kar sake taki user ke liye unique session id generate kar sake aur usko cookie mei store kar sake taki user 7 din tak login rahe aur cookie expire na ho

import {app} from "../config/firebase.js" taki hum firebase ke app ko use kar sake aur uske auth se user ko verify kar sake aur uske data ko extract kar sake taki user ke liye unique session id generate kar sake aur usko cookie mei store kar sake taki user 7 din tak login rahe aur cookie expire na ho

aur phir humne start kiye saare server aur successfully run ho gaya server aur button click karke login bhi ho gaya aur saara data bhi mil gaya aur cookie bhi set ho gayi aur 7 din tak login rahega user aur cookie expire nahi hogi aur moongose mei bhi store ho gata data

ab ham cookie ke saath saath redis ka use karenge

jo auth.controller hai usme jo seesion hai use ham redis ke andar rakhenge aur jis time ham logout karenge session bhi delete kar denje redis mei se aur cookie bhi hata denje toh phir hum redis mei data rakh lenge

ab redis ko install kerenge with the use of docker compose file in our backend and usme sab chiz fulfill karte 
ab ham docker compose up karke install karenge jisse jamre docker dekstop par ek container ban jayega backend karke. and we able to use redis par usse pahle backend me npm init install kar ke npm instal ioredis install karenge jisse ham shared folder mei use kar sake

ab shared folder mei redis folder mei redis.js banaker ioredis ko import karenge and gateway ki .env mei redis_url use karenge
phir ham redis to gatway se coonect kar denje aur export kar denje then services mei auth folder ki .env mei redis url use kar lenge

ab auth.controller.js mei redis ko use karenge aur sessionid me set karenge

toh humne kya kiya hau ki agar user login hoga redis ke andar set kar denje aur jab logout karenge toh sessionid delete hogayegi 
ab frontend ka ui banane wale hai aur button mei react icon se google ka icon import karange aur react-icon install karenge
aur vo button me onclick laga kar on kar denje 

ab refresh ke baad redis se data leke aayenge current user find karna hai userget karna hai uske liye api banate hai 
basically hame ek api chaiye ki jo user currently login hai uska data find out ho gaye aur jab bhi refresh kare utnibaar api data lake de

uske liye seesion find karke uska data lake isko dena hai
go in gateway to make the middlewares for it SO MAKE A middlware folder and auth.middleware.js file
ROUTES => MIDDLEWARE => CONTROLLER

cookies ke andar se sessionid leke aani hai ab use controller mei lagani hai toh gateway ke andar controller folder ,use.contoller.js file
ab imddleware se sab export karake index.js .e routes banakr aur controller me response karna hai
aur uske baad frontend me data fetch karna hai toh ham freatures folder banayenge jisme saare api issi mei hi fetch kar lenge































