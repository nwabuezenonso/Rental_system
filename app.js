const express = require('express');
const mongoose = require('mongoose')
const User = require('./model/User')
const Activity = require('./model/activity')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
var socket = require('socket.io')

//set up the express function
const app = express()

// middleware
app.use(express.static('public'));
app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser())


// view engine
app.set('view engine', 'ejs');

const server = app.listen(3000, () => {'Server is running on port 3000'})
// database connection
const dbURI = 'mongodb://localhost/Rent'
mongoose.connect(dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
  .then((result) => server)
  .catch((err) => console.log(err));

//routes
app.get('/', (req, res)=>{
  res.render('index' ) 
})

app.get('/dashboard', requireAuth,checkUser, (req, res)=>{
  res.render('dashboard' ) 
})

app.get('/details', requireAuth, (req, res)=>{
  res.render('details' ) 
})

app.get('/messages', requireAuth,checkUser, (req, res)=>{
  res.render('messages' ) 
})

app.get('/product', requireAuth,checkUser, (req, res)=>{
  res.render('product' ) 
})


//Auth routes
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

app.post('/signup',  async(req, res) => {

  const {email, password} = req.body

  // console.log(email_content, password_content)
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    console.log(err)
  }
})

app.post('/login', async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    // const errors = handleErrors(err);
    res.status(400).send( err);
  }
})


app.get('/logout',(req, res) =>{
  res.cookie('jwt', ' ', { maxAge: 1});
  res.redirect('/');
})

//Socket setup

var io = socket(server)

io.on('connection', function(socket){
    console.log('made socket connection', socket.id )

    // socket.on('chat', function(data){
    //     io.sockets.emit('chat', data)
    // })

    // socket.on('typing', function(data){
    //     socket.broadcast.emit('typing', data)
    // })
});
