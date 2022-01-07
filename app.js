const express = require('express');
const mongoose = require('mongoose')
const User = require('./model/User')

//set up the express function
const app = express()

// middleware
app.use(express.static('public'));
app.use(express.json());


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost/Rent'
mongoose.connect(dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
  .then((result) => app.listen(3000, () => {'Server is running on port 3000'}))
  .catch((err) => console.log(err));

//routes
app.get('/', (req, res)=>{
  res.render('index' ) 
})

app.get('/dashboard', (req, res)=>{
  res.render('dashboard' ) 
})

app.get('/details', (req, res)=>{
  res.render('details' ) 
})

app.get('/message', (req, res)=>{
  res.render('messages' ) 
})

app.get('/product', (req, res)=>{
  res.render('index' ) 
})


//Auth routes
app.post('/signup',  async(req, res) => {

  const {email, password} = req.body

  // console.log(email_content, password_content)
  try {
    const user = await User.create({ email, password });
    //const token = createToken(user._id);
    //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user});
  }
  catch(err) {
    console.log(err)
  }
})

app.post('/login', (req, res) => {
  const {email, password} = req.body

  console.log(email, password)
  res.send(' new Login')
})