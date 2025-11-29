import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;
const client_url = process.env.CLIENT_URL;

app.use(cors({
    origin: [client_url!,],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json(200).json({
        success: true,
        message: `server running on port - ${port}`
    })
});

app.listen(port, () => {
    console.log(`server running on port - ${port}`)
})