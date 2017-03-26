var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');
var Expense = require('../models/expense');


/* GET home page. */
router.get('/',function(req,res,next){
    res.render('categories/index');
});


router.post('/saveprofile', isLoggedIn, function(req,res,next){
    var incomeType = req.body.selected_value;
    var incomeValue = req.body.monthincome;

    var finalIncome = incomeType == 1? incomeValue : incomeValue/12;

    var profile = new Profile({
        user:req.user,
        expenditure:req.body.expenditure1,
        expenditure2:req.body.expenditure2,
        expenditure3:req.body.expenditure3,
        expenditure4:req.body.expenditure4,
        expenditure5:req.body.expenditure5,
        income:finalIncome,
        feessix:req.body.fess6
    });
    console.log(profile);
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
    
        }
    });
});

     //Expense
router.post('/expenseEntry', isLoggedIn, function(req,res,next){
    console.log(req.body);
    var expenseProfile = new Expense({
        user:req.user,
        ExpenseType:req.body.ExpenseType,
        ExpenseAmount:req.body.ExpenseAmount,
        comments:req.body.comments
    });
    console.log(expenseProfile);
    expenseProfile.save(function(err,result){
            req.flash('success','Successfully bought the product');
            req.session.cart = null;
            res.redirect('/');
            //res.redirect('/');    
        });
});



router.get('/update/',function(req,res,next){
    res.render('user/update');
});

router.get('/expense/',function(req,res,next){
    res.render('user/expense');
});

/*
router.get('/expense/',function(req,res,next){
    res.render('user/expense');
});*/

module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldurl = req.url;
    
    res.redirect('/user/signin');
}

