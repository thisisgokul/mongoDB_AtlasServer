const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// const mongoUrl='mongodb://localhost:27017/'

async function mongooseConnect(){
   await mongoose.connect(process.env.MONGO_URL, {
  dbName: 'userDb',
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}

module.exports=mongooseConnect