const mongoose = require('mongoose');
const Initdata=require('./data.js');
const listing=require('../models/listing.js');
const User=require('../models/user.js');

const MONGO_URI = "mongodb://127.0.0.1:27017/wonderlust";

main().then(() => {
    console.log("Connected to MongoDB");
}
).catch(err => {
    console.error("MongoDB connection error:", err);
});

async function main() {
    await mongoose.connect(MONGO_URI);
}

const initDb=async () => {
    await listing.deleteMany({});
    console.log("Deleted all listings");
    Initdata.data=Initdata.data.map((obj)=>({
        ...obj,
        owner: "682856179cd116bc8fd73b42",
    }
    ));
    await listing.insertMany(Initdata.data);
    console.log("Inserted all listings");
}

initDb();