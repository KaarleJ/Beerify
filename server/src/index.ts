import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

console.log("env: " + process.env.NODE_ENV);

let count = 0;
app.use(cors());
app.use(express.static("dist"));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"), (error) => {
    if (error) {
      res.status(500).send(error);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  });
});

app.get("/count", (_req: Request, res: Response) => {
  res.send({ count });
  count++;
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
