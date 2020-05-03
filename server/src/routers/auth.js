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

function authRouters() {
    //authController in params
    // router.post('/login', authController.handleLogin);
    // router.post('/refresh-token', authController.handleRefreshToken);
    // router.delete('/logout', authController.handleLogout);

    router.get('/login', (req, res) => {
        res.send('connected successfully, username is ',req.body.username,' password is ',req.body.password)
    })

    return router;
}

module.exports = authRouters;

