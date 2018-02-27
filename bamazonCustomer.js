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

		inquirer.prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var shopArray = [];
            for (var i = 0; i < result.length; i++) {
              shopArray.push(result[i].item_id.toString());
            }
            return shopArray;
            
          },
          message: "What product would you like to purchase?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
         ]).then(function(answer) {

         	console.log(answer.choice);

         	console.log(answer.quantity);
         	// get the information of the chosen item
        var chosenItem;
        var new_quantity ;

        
        for (var i = 0; i < result.length; i++) {
          if (result[i].item_id.toString() === answer.choice) {

            chosenItem = result[i];
          	new_quantity = chosenItem.stock_quantity - answer.quantity; 


          }
        }

        console.log(chosenItem);
                	console.log("New numbers is: " + new_quantity);



        // determine if product is in stock & quantity requested is available
        //if the chosen item's stock quan is less or equal to users answer quant update table
        if (chosenItem.stock_quantity <= parseInt(answer.quantity)) {
          // product in stock, so update db to subtract qua, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: new_quantity
              }
              /*{
                id: chosenItem.id
              }*/
            ],
            function(error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              //start();
            }
          );
        }

         });


					
	});
	

}




/*function buy() {
  // query the database for all items available for purchase
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    //console.log(results);
     
}
*/




