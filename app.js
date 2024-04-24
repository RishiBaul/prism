import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import formDataController from './controllers/formDataController.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 4564;
let MONGO_URI = '';
if (process.env.MONGO_PORT && process.env.MONGO_URL && process.env.MONGO_DB) {
    MONGO_URI = `mongodb://${process.env.MONGO_USERNAME}${process.env.MONGO_PASSWORD}${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
}
else {
    MONGO_URI = "mongodb+srv://rishibaul:nirvana@nirvana.jsyr3iw.mongodb.net/prism";
}

console.log(MONGO_URI);
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use('/form', formDataController);

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    res.send({ "message": `Endpoint Not Found on ${req.originalUrl}` })
    next(error);
});

app.listen(PORT, () => {
    console.log(`\n\n\nServer is running on port ${PORT}\n\n\n`);
});
