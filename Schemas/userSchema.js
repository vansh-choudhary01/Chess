const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chess');
}

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
})

const User = new mongoose.model("User", userSchema);

module.exports = User;