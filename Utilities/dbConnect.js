   const mongoose = require('mongoose');
   const colors = require('colors');
    const dbConnect = async () => {
      
        try {
            await mongoose.connect(process.env.MONGODB_URL);
            console.log(`Successfully Connected to DB of address ${mongoose.connection.host}`.bgGreen.black )
        } catch (error) {
            console.log("Failed to connect to DB".bgRed.white);
            console.error(error);
        }
    }

module.exports = dbConnect;









