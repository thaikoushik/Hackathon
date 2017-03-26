var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');


/* GET home page. */
router.get('/',function(req,res,next){
    res.render('categories/index');
});


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
            res.render('user/update');
            //res.redirect('/');    
        });
});


router.post('/updateprofile', isLoggedIn, function(req,res,next){
    var Updateprofile = new Profile({
        expenditure:req.body.expenditure,
        income:req.body.monthincome,
        savingsMin:req.body.savmin,
        feessix:req.body.fess6
    });

    var userID = req.user.id;


        Profile.find({'user':userID}, function (err, todo) { 
        if (err) {
        res.status(500).send(err);
    } else {
        Profile.update({'user':userID},{
        expenditure:req.body.expenditure,
        income:req.body.monthincome,
        savingsMin:req.body.savmin,
        feessix:req.body.fess6
        }, function(req,res,next){
            console.log(res);
            res.redirect('http://google.com');
        });
/*
Updateprofile.update(function (err, todo) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(Updateprofile);
        });*/
    
}
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

