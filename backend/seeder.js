import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import donors from "./data/donors.js";
import Donor from "./models/donorModel.js";
import connectDB from "./config/db.js";


//create and destroy data in mongoDB
dotenv.config();
connectDB();


const importData = async () => {
    try {
       await Donor.deleteMany();
       
       const createdDonors= await Donor.insertMany(donors);
       const adminUser=createdDonors[0]._id;
       console.log('Data Imported!'.green.inverse);
       process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}




const destroyData = async () => {
    try {
       await Donor.deleteMany();
       console.log('Data Destroyed!'.green.inverse);
       process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}


if (process.argv[2] === '-d'){
    destroyData();
}
else{
    importData();
}