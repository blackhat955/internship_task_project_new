const mongoose=require('mongoose');
const express =require('express');
const winston=require('winston');
const register=require('./router/registrationRouter'); 
const login=require('./router/login')
const config=require('config');
const app=express();
app.use(express.json())
mongoose.connect('mongodb+srv://earthh98:Durgesh123@authenticator.45ekbgh.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,
useUnifiedTopology:true,
useFindAndModify:false
})
 .then(()=>console.log('conneted to database'))
 .catch(err=>console.log("can't not connected"));
 if(!config.get('internshiprProjectPrivateKey')){
    console.error('FATAL ERROR:jwtPrivateKey is missing');
    process.exit(1);
}
const githubLink='https://github.com/blackhat955/internship_task_project_new';
app.get('/',async(req,res)=>{
    res.send([{Info:"welcome to API Information page", },
     { "/api/register":"Register User and admin with  different privilege admin need to admin password for register"},
{"/api/login": "admin log using only through token and normal user need to send req.body having userId and password"},
{"/api/register":"Register User and admin with different privilege admin need to admin password for register"},
{"modification": "update and delete the user done by admin only route are protected"},
{"/api/login/admin": "for admin"},
{"/api/login/normal": "normal user"},
{"/api/register/admin": "nee password for register as admin"},
{"/api/register/normal": "Register as normal user"},
{"put request at .api/register/":"request to pass req.body.isAdmin"},
{"delete /api/register/id": "pass id as parameter"},
{"the screenshot of testing of API are attach my GitHub repository":"pls have a look"},
{githubLink}])
});
app.use('/api/register',register);
app.use('/api/login',login);
winston.handleExceptions( 
new winston.transports.Console({colorize:true,prettyPrint:true,level:'info'}),
new winston.transports.File({filename:'uncaughtException'}),
new winston.transports.File({filename:'error.log',level:'info'}));

process.on('unhandledRejection',(ex)=>{
throw ex;
});

 const port=process.env.PORT||3000;
 app.listen(port,()=>console.log(`listen on port no ${port}`));


