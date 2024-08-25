import express from "express";
import dotenv from "dotenv"
import cors from "cors";
dotenv.config()
import { copyS3Folder } from "./aws";

const app = express();
app.use(express.json());
app.use(cors())

console.log(process.env.AWS_ACCESS_KEY_ID)
console.log(process.env.AWS_SECRET_ACCESS_KEY)
console.log(process.env.S3_ENDPOINT)
console.log(process.env.S3_BUCKET)


app.post("/project", async (req, res) => {
    // Hit a database to ensure this slug isn't taken already
    const { replId, language } = req.body;

    if (!replId) {
        res.status(400).send("Bad request");
        return;
    }

    await copyS3Folder(`base/${language}`, `code/${replId}`);

    res.send("Project created");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`listening on *:${port}`);
});
