import express from "express";
import {
  acceptFriendRequest,
  getMyFriends,
  getMyProfile,
  getNotifications,
  login,
  logout,
  register,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.js";
import { singleAvatar } from "../middelwares/multer.js";
import { isAuthenticated } from "../middelwares/auth.js";
import {
  loginValidator,
  registerValidator,
  validate,
} from "../utils/validators.js";

const app = express.Router();

app.post("/login", loginValidator(), validate, login);
app.post("/register", singleAvatar, registerValidator(), validate, register);

//After here user must be logged in to access the routes
app.use(isAuthenticated);
app.get("/profile", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUser);
app.put("/sendrequest", sendFriendRequest);
app.put("/accept-request", acceptFriendRequest);
app.get("/notifications", getNotifications);
app.get("/friends", getMyFriends);

export default app;
