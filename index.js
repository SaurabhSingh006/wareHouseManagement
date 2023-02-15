const { sequelize } = require("./sequelize");
const { modelsRelationshipSetup } = require("./sequelize/modelsRelations");
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3001;
const app = require('./app');


const databaseConnection = async () =>  {
    try {
        await sequelize.authenticate();
        // Database connection successfully
        console.log("DB connection successfully");

        // Require Models
        require("./sequelize/modelsDefiners");
    } catch (error) {
        console.log(error); 

        // Stop the aplication forcefully
        process.exit(1);
    }
}

const startApplication = async () => {
    // Database connection
    await databaseConnection();
 
    // Adding relationship between models
    await modelsRelationshipSetup();
    console.log("Models relationship setup successfully");      
    
    // Syncronizing the database
    await sequelize.sync({ alter: false });

    // Starting the app server
    app.listen(PORT, () => { 
        console.log(`Server is listening at port ${PORT}`);
    });
};

startApplication();