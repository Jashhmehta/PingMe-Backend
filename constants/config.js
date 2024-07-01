import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
  });
export const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://pingme-frontend-z7gx.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
  
