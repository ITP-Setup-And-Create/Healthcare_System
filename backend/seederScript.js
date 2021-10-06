require('dotenv').config();

const productsData = require('./data/products');
const connectDB = require('./config/db');
const Product = require('./models/Product');

connectDB();
console.log("MALIKS DEBUG");

const importData = async () => {
    try {
        await Product.deleteMany({});

        await Product.insertMany(productsData);

        console.log("Data import successful!");

        process.exit();
    } catch (error) {
        console.error("Error while importing data.");
        process.exit(1);      
    }
}

importData();   