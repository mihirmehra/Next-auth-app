import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('the database is conneted')
        })

        connection.on('error', (err) => {
            console.log('there was an error' + err);
            process.exit();
        })


    } catch(error) {
        console.log('somthing went wrong');
        console.log(error)   
    }
}