// app.get('/api/user/login', (req, res) => {
//     res.send('Hello World!')
// })
//
// app.post('/api/user/login', (req, res) => {
//     mongoose.connect(url, function(err){
//         if(err) throw err;
//         console.log('connected successfully, username is ',req.body.username,' password is ',req.body.password);
//     });
// })


const express = require('express');
const router = new express.Router();
router.get('/login', (req, res) => {
    res.send('connected successfully, username is ')
})

module.exports = router;

