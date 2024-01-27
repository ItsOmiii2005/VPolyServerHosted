const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const {connectToMongo, closeMongoDBConnection} = require('./mongoConnection');



const classRoutes = require('./routes/classRoutes'); // Import the router module for classes
const facultyRoutes = require('./routes/facultyRoutes');
const studentRoutes = require('./routes/studentRoutes'); // Import the router module for students
const timeSlotRoutes = require('./routes/timeSlotRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const authRoutes = require('./routes/authRoutes'); // Adjust the path based on your project structure


const app = express();
///////////////////////////////////////////////////////////////////
// connectToMongo();
///////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 5000;
///////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
  
/////////////////////////////////////
// Middleware to parse JSON, URL-encoded data and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////
app.use('/class', classRoutes);
app.use('/student', studentRoutes);
app.use('/faculty', facultyRoutes);
app.use('/timeSlot', timeSlotRoutes);
app.use('/attendance', attendanceRoutes);

app.use('/auth', authRoutes);


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


connectToMongo()
  .then(() => {
    // Start your Express server or perform other setup tasks
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the application:', error);
    process.exit(1); // Exit the application if MongoDB connection fails
  });


// Handle SIGINT signal for graceful shutdown
process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing MongoDB connection and exiting gracefully...');
    
    try {
      // Perform any other cleanup tasks here
  
      // Close the MongoDB connection
      await closeMongoDBConnection();
      console.log('MongoDB connection closed');
      // Exit the application
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1); // Exit with an error code
    }
  });




