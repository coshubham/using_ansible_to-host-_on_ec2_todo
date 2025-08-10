const app = require('./server'); // Import the Express app

const PORT = process.env.PORT || 5000; // Use PORT from environment variables or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});