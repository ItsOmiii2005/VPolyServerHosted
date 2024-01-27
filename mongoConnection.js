const mongoose = require('mongoose');
const uri = 'mongodb+srv://om:omiii@atlascluster.zo09joq.mongodb.net/CoDepartment?retryWrites=true&w=majority';
// Connect to MongoDB

const connectToMongo = async () => {
    mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

}

const closeMongoDBConnection = async () => {
  console.log('Closing MongoDB connection');
  mongoose
  .connection.close()
    .then(() => console.log('MongoDB disconnected'))
    .catch((err) => console.error(err));
}
module.exports = {connectToMongo, closeMongoDBConnection};