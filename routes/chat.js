import express from "express";
import { isAuthenticated } from "../middelwares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { attachments } from "../middelwares/multer.js";
import {
  addMemberValidator,
  leaveGroupValidator,
  newGroupValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  validate,
} from "../utils/validators.js";

const app = express.Router();

//After here user must be logged in to access the routes
app.use(isAuthenticated);
app.post("/newgroupchat", newGroupValidator(), validate, newGroupChat);
app.get("/mychat", getMyChats);
app.get("/mygroups", getMyGroups);
app.put("/addmembers", addMemberValidator(), validate, addMembers);
app.put("/removemembers", removeMemberValidator(), validate, removeMembers);
app.delete("/leave/:id", leaveGroupValidator(), validate, leaveGroup);
app.post("/message", attachments,sendAttachmentsValidator(),validate, sendAttachments);
app.get("/message/:id", getMessages);
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default app;
