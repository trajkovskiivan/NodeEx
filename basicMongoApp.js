const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require("./models/blog");


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
app.use(express.static(`public`))

app.use(morgan('dev'));


// mongoose and mongo sandbox routes

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
    .then((result) => {
      // console.log(result)
      res.send(result);
    })
    .catch((err) => {
      console.log('Error', err)
    })
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((results) => {
      // console.log(results);
      res.send(results)
    })
    .catch(err => console.log(err))
})

app.get('/single-blog', (req, res) => {
  Blog.findById("5fdfa47729784f2f48bac766")
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(err))
})











app.use((req, res, next) => {
  console.log('New request made: ');
  console.log(`Host: ${req.hostname}`)
  console.log(`Path: ${req.path}`)
  console.log(`Method: ${req.method}`)
  next();
});
app.use((req, res, next) => {
  console.log('In the next middleware...')
  next();
})


app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  // res.send('<p>Home</p>')
  // res.sendFile('./views/index.html', {root: __dirname});
  res.render('index', {title: 'Home', blogs})
});

app.get('/about', (req, res) => {
  // res.send('<p>About</p>')
  // res.sendFile('./views/about.html', {root: __dirname});
  res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a new Blog'});
})

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', {root: __dirname});
  res.status(404).render('404', {title: '404'});
});

