var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');
var Expense = require('../models/expense');
var d3 = require('d3');
var jsdom = require('jsdom');

/* GET home page. */
router.get('/',isLoggedIn,function(req,res,next){

    var userID = req.user.id;
    var map = {};
    var totalExpense = null;
    expendituresVal(req, function (result1,result2,result3) {

        //add the next query here
        Expense.find({ 'user': userID }, function (err, docs) {
            if (err) {
                res.sttus(500).send(err);
            } else {
                for (var i = 0; i < docs.length; i++) {
                    if (docs[i].ExpenseType in map) {
                        map[docs[i].ExpenseType] += docs[i].ExpenseAmount;
                    } else {
                        map[docs[i].ExpenseType] = docs[i].ExpenseAmount;
                    }
                }
            }
            Object.keys(map).forEach(function (key) {
                totalExpense += map[key];

            });
            var completeExpenses = totalExpense+result1;
            var message ="null";
            var saveByMonth = result2/6;
            var remaining = result3-saveByMonth;
            console.log(remaining);

            if(completeExpenses > remaining){
                message = "You can spend upto "+remaining+" Based on the analysis you have to save "+saveByMonth+ "But you've spent"+ completeExpenses +" already, start saving more  :-(";
            }else{
                message = "Good Job! You saved the amount :-) "+"You can spend upto "+(remaining - completeExpenses);
            }
            
            res.render('categories/index', {
                totalExpense: totalExpense,
                result: result1,
                food: map['Food'],
                travel: map['Travel'],
                shopping: map['Shopping'],
                others: map['Others'],
                message:message
            });
        });
    });

    //    res.render('categories/loggedoutuser');
    
});



function expendituresVal(req, callback) {
    var userID = req.user.id;
    console.log(userID);
    var expenditures = null;
    var feeForSix = null;
    var income = null;
    Profile.find({ 'user': userID }, function (err, todo) {
        if (err) {
            res.status(500).send(err);
        } else {
            expenditures = todo[0].expenditure + todo[0].expenditure2 +
                todo[0].expenditure3 + todo[0].expenditure4 + todo[0].expenditure5;
            feeForSix = todo[0].feessix;
            income = todo[0].income;

        }
        callback(expenditures,feeForSix,income);
    });


}



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
            res.redirect('user/expense');
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
            res.redirect('/');
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

