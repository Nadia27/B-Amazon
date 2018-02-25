//Required Packages
//========================================================================
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require('chalk'); 



//Create connection for "bamazon.db"
//=====================================================================
var connection = mysql.createConnection ({
  
  host: "localhost",
  port: 3306,

  user: "root",
  password: "xavija08",
  database: "bamazon_db"

});

// connect to the mysql server and sql database
//=========================================================================
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user


  displayAllProducts();
});



function displayAllProducts() {

	console.log(chalk.magenta('\n' + '\n' +"*********************************************************************"));
	console.log(chalk.magenta("*********************************************************************"));
	
	inquirer.prompt({

	name: "inventory",
	message: "Welcome to Bamazon, would you like to view our inventory?",
	type: 'confirm'
	
	}).then(answers => {

		if(answers.inventory === true) {

			buy();
		
		}else{

			console.log(chalk.magenta('\n' + '\n' +"========================================================="));
			console.log(chalk.magenta("No worries. Please come back when you're ready to shop."));
			console.log(chalk.magenta("========================================================="));
		};
	});

}


function buy() {
/*
	connection.connect(function(err) {
				if (err) throw err;*/
				
	connection.query("SELECT * FROM products", function (err, result) {
					
		if (err) throw err;
	
				
		for (var i = 0; i < result.length; i++) {
			console.log(chalk.green('\n' + "Product id: " + result[i].item_id) + '\n' + chalk.cyan("Product name: " + result[i].product_name) + '\n'
				+ chalk.yellow("Price: $ " + result[i].price_customer + '\n'));
		}

		inquirer
      .prompt([
        {
          name: "inventory",
          type: "list",
          choices: function() {
            var shopArray = [];
            for (var i = 0; i < result.length; i++) {
              shopArray.push(result[i].item_id);
            }
            console.log(shopArray);
            //return choiceArray;
          },
          message: "What auction would you like to place a bid in?"
        }
         ]);


					
	});
	//});

}




/*function buy() {
  // query the database for all items available for purchase
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    //console.log(results);
     
}
*/




