import express from "express";
import cors from "cors";
import helmet from "helmet";
import ClientError from "./utils/exceptions/ClientError";
import router from "./api/routers";

export const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.set("trust proxy", false);
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

router(app);

app.get("*", (req, res) => {
  res.status(404).json({
    status: false,
    message: "Page not found!",
  });
});

// HANDLE ERRORS
app.use((error, req, res, next) => {
  if (error instanceof ClientError) {
    return res.status(error.statusCode).json({
      status: false,
      message: error.message,
    });
  }
  return res.status(500).json({
    status: false,
    message: error.message,
  });
});

export default app;
