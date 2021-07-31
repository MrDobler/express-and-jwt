const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blog-routes');
const { db_user, db_password, db_name } = require('./config.json');

const dbURI = `mongodb+srv://${db_user}:${db_password}@cluster0.fbogn.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const app = express();

app.set('view engine', 'ejs');

// Middleware & static files

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbURI, dbOptions)
  .then(() => {
    console.log('Connected to DB');
    app.listen(3000, 'localhost');
  })
  .catch((err) => console.log('Connection Error: ', err));


app.use(blogRoutes);

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.use((req, res) => {
  res.status(404)
    .render('404', { title: '404' });
});
