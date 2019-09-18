// 登录和注册

const express = require('express')
const router = express.Router()
const User = require('../../modules/User')
const bcrypt = require('bcrypt')
// get 请求

router.get('/test', (req,res) => {
  res.json({
    msg:"login words"
  })
})


// post 请求
router.post("/register", (req, res) => {
  console.log(req.body)
  User.findOne({ email: req.body.email }).then(user => {
    console.log(user)
    if (user) {
      return res.status(400).json("邮箱已被注册");
    } else {
      // const avatar = gravatar.url(req.body.email, {
      //   s: "200",
      //   r: "pg",
      //   d: "mm"
      // });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        // avatar,
        password: req.body.password,
        identity: req.body.identity
      });
      console.log(req.body.password);
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          // Store hash in your password DB.
          if (err) throw err;
          console.log(hash);
          newUser.password = hash;
          // res.json(user)
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// 查询数据库中是否有邮箱



module.exports = router