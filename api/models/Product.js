var Promise = require('promise');
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mysql = require('mysql'),
    config = require('../DB');
   mysql.Promise = global.Promise;
	
let sql = mysql.createConnection({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.portno
});

var Product = function(product){
	this.ProductName = product.ProductName,
	this.ProductDescription = product.ProductDescription,
	this.ProductPrice = product.ProductPrice;
};
Product.save = function (newProduct, result) { 
    //console.log(newTask);   
	var result = [];
    var sqli = "INSERT INTO product (ProductName,ProductDescription,ProductPrice) VALUES ('"+newProduct.ProductName+"','"+newProduct.ProductDescription+"','"+newProduct.ProductPrice+"')";
	sql.query(sqli,function (err, res) {             
                if(err) {
                    //console.log("error: ", err);
                    //result(err, null);
					
                }
                else{
					//console.log(result);
					//res.status(200).json(result);
					 //console.log(res.insertId);
					 //var data=array('saveid'=>res.insertId);
					 //result.push(res);
                     //result['saveid']=res.insertId;
                }
            });	
	
};
Product.getProductById = function (productId, result) {
        sql.query("Select productId As _id,ProductName,ProductDescription,ProductPrice from product where productId = ? ", productId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });   
};
Product.getAllProducts = function (result) {
        sql.query("Select productId As _id,ProductName,ProductDescription,ProductPrice from product", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  //console.log('product : ', res);  
                  result(null, res);
                }
            });   
};
Product.updateById = function(id, product, result){
  sql.query("UPDATE product SET ProductName = ?,ProductDescription = ?,ProductPrice = ? WHERE productId = ?", [product.ProductName,product.ProductDescription,product.ProductPrice,id], function (err, res) {
          if(err) {
                console.log("error: ", err);
                //result(null, err);
             }
           else{   
                  //result(null, res);
               }
            }); 
};
Product.remove = function(id, result){
     sql.query("DELETE FROM product WHERE productId = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    //result(null, err);
                }
                else{
               
                 //result(null, res);
                }
            }); 
};

module.exports= Product;