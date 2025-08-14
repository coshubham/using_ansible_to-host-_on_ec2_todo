const app = require('./server'); // Import the Express app

const PORT = process.env.PORT || 3001; // Changed default port to 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
