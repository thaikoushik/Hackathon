var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');


/* GET home page. */


router.post('/saveprofile', isLoggedIn, function(req,res,next){
    var profile = new Profile({
        user:req.user,
        expenditure:req.body.expenditure,
        income:req.body.monthincome,
        savingsMin:req.body.savmin,
        feessix:req.body.fess6
    });
    profile.save(function(err,result){
            req.flash('success','Successfully bought the product');
            req.session.cart = null;
            res.redirect('/');    
        });
});

module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldurl = req.url;
    
    res.redirect('/user/signin');
}

