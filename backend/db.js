const moongose = require("mongoose");
const Db = process.env.ATLAS_URI


module.exports = () => {
    const connectionParams ={
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try{
        moongose.connect(Db, connectionParams)
        console.log("Connected to database successfully")
    } catch(error){
        console.log(error);
        console.log("Could not connect database!")
    }
}

