import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./modules/user/user.route";
const app: Application = express();

//using parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api", userRoute);

app.get("/", (_req: Request, res: Response) => {
  res.send(`User CRUD server is working perfectly`);
});

// unknown route handling
app.all("*", (req, res) => {
  res.status(400).json({
    success: false,
    message: `Route ${req.originalUrl} cannot found`,
    error: {
      code: 404,
      description: "Please provide an valid Route",
    },
  });
});

export default app;
