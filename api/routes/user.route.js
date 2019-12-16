// user.route.js
var Promise = require('promise');
const express = require('express');
const app = express();
const UserRoutes = express.Router();

// Require Product model in our routes module
let User = require('../models/User');


UserRoutes.route('/authenticate').post(function (req, res) {
  let user = new User(req.body);
  User.authenticate(req.body.username,req.body.password, function (err,result){
	  if (result.length > 0) {
		res.json({status:true,message: 'wait redirecting...',res:result[0]});
		//res.json(result[0]);
	  }else{
		res.json({status:false,message: 'Mobile/Email or password is incorrect',res:null});
	  }	  
	});
});

UserRoutes.route('/add').post(function (req, res) {
  let product = new User(req.body);
  var saveResult=User.save(product);
  res.status(200).json({'msg': 'Product has been added successfully'});
});

UserRoutes.route('/').get(function (req, res) {
  User.getAllProducts(function (err, products){
    if(err){
      console.log(err);
    }
    else {
      res.json(products);
    }
  });
});

UserRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.getUserById(id, function (err, user){
	  res.json(user[0]);
   });
});

UserRoutes.route('/get_menu/:id').get(function (req, res) {
  let role_id = req.params.id;
  User.get_menu(role_id, function (err, menus){
	  res.json(menus);
   });
});

UserRoutes.route('/update/:id').post(function (req, res) {
  User.getProductById(req.params.id, function(err, product) {
    if (!product)
      res.status(404).send("Record not found");
    else {
      /*product.ProductName = req.body.ProductName;
      product.ProductDescription = req.body.ProductDescription;
      product.ProductPrice = req.body.ProductPrice;*/
	  
	  let product = new Product(req.body);
	  let result=Product.updateById(req.params.id,product);
	  res.json('Update complete');
      /*Product.updateById(req.params.id,product).then(product => {
          res.json('Update complete');
      }).catch(err => {
            res.status(400).send("unable to update the database");
      });*/
    }
  });
});
// Defined delete | remove | destroy route
UserRoutes.route('/delete/:id').get(function (req, res) {
    User.getProductById({productId: req.params.id}, function(err, product){
		Product.remove(req.params.id);
		res.json('Successfully removed');
        /*if(err){ 
		  res.json(err);
	    }else{ 
		   Product.remove(req.params.id);
		   res.json('Successfully removed')
		};*/
    });
});
module.exports = UserRoutes;