var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require('chalk'); 



//Create connection with "bamazon.db"
var con = mysql.createConnection ({
  
  host: "localhost",
  port: 3306,

  user: "root",
  password: "xavija08",
  database: "bamazon_db"

});


function displayAllProducts(err) {

	console.log(chalk.magenta('\n' + '\n' +"*********************************************************************"));
	console.log(chalk.magenta("*********************************************************************"));
	
	inquirer.prompt({

	name: "inventory",

	message: "Welcome to Bamazon, would you like to view our inventory?",

	type: 'confirm'
	
	}).then(answers => {

		if(answers.inventory === true) {

			con.connect(function(err) {
		
				if (err) throw err;
		
				con.query("SELECT * FROM products", function (err, result, fields) {
		
					if (err) throw err;
	
				
					for (var i = 0; i < result.length; i++) {

						//console.log("===============================================");
						
						console.log(chalk.green('\n' + "Product id: " + result[i].item_id) + '\n' + chalk.cyan("Product name: " + result[i].product_name) + '\n'

								+ chalk.yellow("Price: $ " + result[i].price_customer + '\n'));

					}

					buy();
			
			
				});
			
			});

		}else{


			console.log(chalk.magenta('\n' + '\n' +"========================================================="));

			console.log(chalk.magenta("No worries. Please come back when you're ready to shop."));

			console.log(chalk.magenta("========================================================="));
		};


	});

}


//display all items for sale upon user presence 
displayAllProducts(); 


function buy() {

inquirer.prompt([

	{
		name: "purchase",

		type: "list",
	 
		message: "What is the Product ID of the item you would like to purchase?" + '\n',

		choices: ["1-Remote Helicopter", "2-Lego City", "3-Bluetooth Speaker", "4-Toolkit with Powerdrill", "5-Chromebook", "6-Nike Running Shoes", "7-Mattress (King Size)", "8-Face Wash", "9-Car GPS", "10-Turntables with Speakers"]
	},

	{
		name:"quantity",

		message: "How many would like to purchase?",

		 validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }

    }
]).then(answers => {
    // Use user feedback for... whatever!!

    console.log("The shopper chose: " + answers.purchase);

    console.log("The wants " + answers.quantity + " " + answers.purchase); 

    /*if(answers.input == ) {

    }*/


});
	

}



