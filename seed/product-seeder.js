var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/tailor');

var products = [
    new Product({
       imagePath: 'http://images.tedbakerimages.com/us%2FMens%2FClothing%2FSuits%2FMETALLJ-Debonair-wool-suit-jacket-Dark-Blue%2FTS6M_METALLJ_12-DARK-BLUE_1.jpg.jpg?o=To6o6gSDiGco72yU6VAsQ1DwABEj&V=Wq5e&',
       title: 'Suite',
       description: 'Nice Suit!!',
       price: 100
    }),
    
    new Product({
       imagePath: 'https://cdn1.tailorstore.com/pages/mens-shirt/made-to-measure-shirt-ternberg.jpg',
       title: 'Shirt',
       description: 'Really Nice Shirt!!',
       price: 40
    }),
    
    new Product({
       imagePath: 'http://static3.businessinsider.com/image/51225e27eab8ea4506000001-480/hall-and-madden-mens-dress-shirt-and-tie.png',
       title: 'Custom Shirt',
       description: 'Fits Perfectly for you!!',
       price: 50
    }),
    
    new Product({
       imagePath: 'https://ae01.alicdn.com/kf/HTB1HwVCLVXXXXXcXXXXq6xXFXXXi/Long-Sleeve-Clothes-New-Trend-Mens-font-b-Tailored-b-font-font-b-Dress-b-font.jpg',
       title: 'White Shirt',
       description: 'Whitey White!!',
       price: 10
    }),
    
    new Product({
        imagePath: 'https://suitstailored.files.wordpress.com/2013/03/6.jpg',
        title: 'Designer Suit',
        description: 'New designer Suit!!',
        price: 210
    }),
    
    new Product({
       imagePath: 'http://suitored.com/wp-content/uploads/2011/02/Joseph-Abboud-Super-120s-Wool-Tuxedo.jpg',
       title: 'Tuxedo',
       description: 'New designer Tuxedo!!',
       price: 800
    }),
];

var done = 0;
for(var i=0;i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
