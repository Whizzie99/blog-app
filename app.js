const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongo db
const dbURI = 'mongodb+srv://whizzie:test12345@blog-site.m9can.mongodb.net/blogs-db?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) =>{
    // listen for requests
    app.listen(3000);
    console.log('connected to db')
})
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');



// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) =>{
    Blog.find()
    .then((result) => {
        res.render('index', { title: 'All blogs', blogs: result })
    })
    .catch(err =>{
        console.log(err);
    })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'create a new blog' });
})

// redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});