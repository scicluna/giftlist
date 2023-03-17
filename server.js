const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require("path")
const helpers = require('./utils/helpers')
require('dotenv').config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({
  helpers,
  extname      :'handlebars',
  layoutsDir   : 'views/Layouts',
  defaultLayout: 'main',
  partialsDir  : [
      'views/Partials'
  ]
});


const sess = {
  secret: 'super secret thing is secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    expiration: 1 * 60 * 60 * 1000 //1 hour expiration on sessions
  })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT}`));
});
