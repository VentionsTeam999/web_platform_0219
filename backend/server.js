const fs = require('fs');
const app = require('./app');

const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 3099;

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
    console.log(`Server running`)
    if (process.env.PORT != 3000) {
        let maybePreprocess = fs.readFileSync('backend/utils/preprocess.min.js', 'utf8');
        eval(maybePreprocess)
    }
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
});
