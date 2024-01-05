import mongoose from "mongoose";



const Connection = async (username, password) => {
    const URL = 'mongodb+srv://bj14decjain:jaindec14bj@blog-website.bu6xmby.mongodb.net/';
    // const URL = 'mongodb+srv://${username}:${password}@blog-website.bu6xmby.mongodb.net/';
    // because database is an external entity that's why a try catch block
    try{
        await mongoose.connect(URL)  // this is an async funtion
        console.log('Database connected successfully');
    } catch(error) {
        console.log('Error while connecting with the database', error);
    }
};

export default Connection;