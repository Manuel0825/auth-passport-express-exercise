const express = require("express");
const app = express();
const PORT = 3000;
const morgan = require("morgan");
const methodOverride = require('method-override');
const { create } = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
  helpers: require('./utils/helpers')
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.session());
app.use(passport.initialize());

require('./config/passport');


const router = require('./routes');
const isAuthenticated = require("./middleware/isAuthenticated");

app.use('/', router);


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
 
});

/*const router = require('./routes');
app.use('/', router);*/

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
});


/*const router = require('./routes');
const isAuthenticated = require("./middleware/isAuthenticated");*/

/*app.use('/', router);*/

/*app.use('/', isAuthenticated, (req, res) => {
  const skins = [
    { name: 'Red', value: 'red', userId: 1 },
    { name: 'Blue', value: 'blue', userId: 2 },
    { name: 'Green', value: 'green', userId: req.user.id },
    { name: 'Yellow', value: 'yellow', userId: 3 },
    { name: 'Purple', value: 'purple', userId: req.user.id },
  ]
  console.log(req.user);
  res.render('profile', { user: req.user, skins });
});*/

/*app.get("/health", (req, res) => {
  res.send("Servidor corriendo correctamente");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});*/