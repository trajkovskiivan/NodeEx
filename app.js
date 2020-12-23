const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const mongoose = require("mongoose");


const {render} = require("ejs");

const blogRoutes = require("./routes/blogRoutes")


// express app
const app = express();
const port = 3000;

// connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@cluster0.qsqhp.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
    console.log('Connected to db');
    app.listen(port);
  })
  .catch((err) => console.log(err))

// const dbTestaroo = 'mongodb://localhost/testaroo';
// mongoose.connect(dbTestaroo, {useNewUrlParser: true, useUnifiedTopology: true})
//   .then((res) => {
//     console.log('Conected to testaroo')
//   })
//   .catch((err) => {
//     console.log('Error   ', err)
//   })



// register view engine
app.set('view engine', 'ejs');


// listen for requests
// we transfer this to the db connection because we want to load after we get the data
// app.listen(port);

// middleware & static files
app.use(express.static(`public`));
// THIS IS THE BODY-PARSER
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


// mongoose and mongo sandbox routes



app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  // res.send('<p>About</p>')
  // res.sendFile('./views/about.html', {root: __dirname});
  res.render('about', {title: 'About'});
});

// blog routes
app.use("/blogs", blogRoutes);


// redirects
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

// 404 page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', {root: __dirname});
  res.status(404).render('404', {title: '404'});
});

