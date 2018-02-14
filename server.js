const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('getCapital', (text) => {
  return text.toUpperCase();
})

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('timeStamp.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append file');
    }
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintainance.hbs');
// });
app.use(express.static(__dirname +'/public'));

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!!<h1>');
  // res.send({
  //   name: 'Aakash',
  //   likes: ['Football', 'Tennis']
  // })
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our Website',
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Oops!! Problem occurred'
  });
});
app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
