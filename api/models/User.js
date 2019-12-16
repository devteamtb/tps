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

var initLevel = 0;
var User = function(user){
	this.id= user.id;
    this.username= user.email;
    this.password= user.password;
    this.firstName= user.first_name
    this.lastName= this.last_name;
    this.role= this.Role;
    this.token= user.token;
};
User.getUserById = function (userId, result) {
	    sql.query('select u.user_id AS id,CONCAT(u.first_name," ", u.last_name) AS username, u.status,u.activation_patch AS token, r.role_id,CONCAT(UCASE(LEFT(r.name, 1)), SUBSTRING(r.name, 2)) as role_name FROM users u JOIN user_to_role ur ON u.user_id=ur.user_id JOIN role r ON r.role_id=ur.role_id WHERE u.user_id = ? AND r.role_id IN("1")',[userId], function (err, res) {
			if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });   
};

function convert(array){
    var map = {};
    for(var i = 0; i < array.length; i++){
        var obj = array[i];
        obj.children= [];

        map[obj.id] = obj;

        var parentid = obj.parentid || '-';
        if(!map[parentid]){
            map[parentid] = {
                children: []
            };
        }
        map[parentid].children.push(obj);
    }

    return map['-'].children;

}

User.get_menu= function (role_id,result) {
	    sql.query('SELECT `ms`.`menu_id` as `id`, `ms`.`menu_name`, `ms`.`menu_title`, `ms`.`type`, `ms`.`link`, `ms`.`is_active`, `ms`.`parent` as `parentid`, `ms`.`icons`, `rm`.`is_active` FROM `menu_settings` `ms` INNER JOIN `role_menus` `rm` ON `rm`.`menu_id` = `ms`.`menu_id` WHERE `rm`.`role_id` = ? ORDER BY `rm`.`id` ASC',[role_id], function (err, res) {
			   if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
					let tree = convert(res);
					//let recurse( tree )
					//var endMenu =getMenu("0",res);
					//console.log( '<ul>'+endMenu.join('')+ '</ul>');
					result(null, tree);
                }
            });   
};
User.authenticate = function(username, password, result){
  sql.query('select u.user_id AS id,CONCAT(u.first_name," ", u.last_name) AS username, u.status,u.activation_patch AS token, r.role_id,CONCAT(UCASE(LEFT(r.name, 1)), SUBSTRING(r.name, 2)) as role_name FROM users u JOIN user_to_role ur ON u.user_id=ur.user_id JOIN role r ON r.role_id=ur.role_id WHERE (email = ? OR mobile = ?) and password = ? AND u.is_deleted = 0 AND u.status = "Enable" AND r.role_id IN("1", "3")',[username,username,password], function (err, res) {
	            if(err) {
                  result(null, err);
                }else{
                  result(null, res);
                }
		 });   		
};

User.users = function (result) {
    sql.query('Select u.user_id AS id,CONCAT(u.first_name," ",u.last_name) AS username, u.status,u.activation_patch AS token from users', function (err, res) {

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

User.updateById = function(id, product, result){
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
User.remove = function(id, result){
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

module.exports= User;