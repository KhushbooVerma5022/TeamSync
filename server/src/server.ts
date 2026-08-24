import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/db';

dotenv.config();
const PORT = process.env.PORT;

if (!PORT) {
    throw new Error('PORT is not defined')
}

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running successfully on port ${PORT}`)
        })

    } catch (error) {
        console.error('Failed to start server', error); 
        process.exit(1);
    }
};

startServer();


