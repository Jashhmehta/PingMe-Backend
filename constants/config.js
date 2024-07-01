import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const corsOptions = {
  origin: [process.env.CLIENT_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
