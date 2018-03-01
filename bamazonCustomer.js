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
      displayAllProducts();
    };
  });

}


function buy() {

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
              shopArray.push(result[i].product_name);
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

        var chosenItem;
        var new_quantity;
        

         // get the information of the chosen item
        for (var i = 0; i < result.length; i++) {
          if (result[i].product_name === answer.choice) {

            chosenItem = result[i];
            
           }
        }
            //console.log(chosenItem);
                  
          var chosenItemQuant = chosenItem.stock_quantity; 
          var userQuant = answer.quantity;
          var updatedStock = (chosenItemQuant - userQuant); 

          console.log(updatedStock); 

          if (userQuant <= chosenItemQuant) {

            //multiply product price by quantity requested 
            var total = (userQuant * chosenItem.price_customer);
            
            console.log(chalk.bgGreen('\n' + "Your total is: $" + total));

            updateDB(chosenItem,updatedStock); 
          } else {
            console.log("Sorry for the inconvenience. We only have " + chosenItemQuant + " currently in stock.");
            displayAllProducts(); 
          }

         

       });
    });
  

}