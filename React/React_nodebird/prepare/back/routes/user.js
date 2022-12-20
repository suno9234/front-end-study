const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const passport = require('passport');

const router = express.Router();

router.post('/', async (req, res, next) => { // post/user
  try {
    const exUser = await User.findOne({
      where: { // 조건
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다');
      // 403 = 금지
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ // User.create = 비동기함수
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    })
    res.status(201).send('ok');
    // 200 성공
    // 300 리다이렉트
    // 400 클라이언트 에러
    // 500 서버 에러
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      next(err); // status 500
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user,async (loginErr)=>{
      if(loginErr){
        console.errror(loginErr);
        return next(loginErr);
      }
      return res.json(user);
    })
  })(req, res, next);
});

router.post('/logout',(req,res,next)=>{
  req.logout((err)=>{
    if(err){return next(err);}
  });
  req.session.destroy();
  res.send('ok');
})

module.exports = router;