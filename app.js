const express=require('express');
const { Mongoose } = require('mongoose');
const morgan=require('morgan');
const bodyParser=require("body-parser")
const dbConfig=require('./dbConfig');
const app=express();
const post=require('./models/post');




app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
dbConfig();
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

// app.use((req,res, next)=>{
//     console.log('new request made:');
//     console.log('host: ',req.hostname);
//     console.log('path: ',req.path);
//     console.log('method: ',req.method);
//     next();
// });


app.get('/add-post', async (req,res)=>{
   await new post({
        title:'new post2',
        email: 'your email id',
        body:'content'
    }).save();
       
res.send({
    code:"400"
})
})

app.get('/community-1', async (req,res)=>{
    post.find();
    res.send({
        code:"300"
    })

})

app.get('/', (req,res)=>{
    res.render('index',{title:"home"});
})

app.get('/health', (req,res)=>{
    res.render('health',{title:"health"});
})


app.get('/about-us', (req,res)=>{
    res.render('about-us',{title:"about-us"});
})


app.get('/services', (req,res)=>{
    res.render('services',{title:"services"});
})
app.get('/services-api/',async (req,res)=>{
    try{
        console.log(req.query)
    // res.send({
    //     data:req.query
    // })
    }
    catch(err)
    {
        console.log(err);
    }
    res.redirect('/services');
})

app.get('/community',async (req,res)=>{
    // const us=[
    //     {title:"Yash",snippet:"content1"},
    //     {title:"Jatin",snippet:"content2"},
    //     {title:"Happy",snippet:"content3"}
    // ];
   const p= await post.find();
   
        res.render('community',{title:"community" , posts: p});

})


app.post('/community',async (req,res)=>{
    await new post(req.body).save();
    res.redirect('/community');
})

app.use((req,res)=>{
    res.status(404).send('<p>404</p>');
})
app.listen(4000,()=>{
    console.log("Server at 4000")
    });