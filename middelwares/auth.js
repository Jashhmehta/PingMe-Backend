import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";

const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies["Pingme-Token"];

  if (!token) {
    return next(new ErrorHandler("Please login to access this route", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData._id;
  next();
});

const socketAuthenticator = async (socket, next) => {
  try {
    if (!socket.request || !socket.request.cookies) {
      console.log("Socket request or cookies not found");
      return next(new ErrorHandler("Please login to access this route", 401));
    }

    const authToken = socket.request.cookies["Pingme-Token"];

    if (!authToken) {
      console.log("No auth token found");
      return next(new ErrorHandler("Please login to access this route", 401));
    }

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await User.findById(decodedData._id);

    if (!user) {
      console.log("No user found");
      return next(new ErrorHandler("Please login to access this route", 401));
    }

    socket.user = user;

    next();
  } catch (error) {
    console.error("Error during socket authentication: ", error);
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};

export { isAuthenticated, socketAuthenticator };
