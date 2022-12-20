const express = require('express');
const passport = require('passport');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const dotenv = require('dotenv')
const cors = require('cors');
const app = express();
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();
passportConfig();

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use(cors({
  origin: '*',
  credentials: false,
}));
app.use(express.json()); // json
app.use(express.urlencoded({ extended: true })); // form
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello api');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});