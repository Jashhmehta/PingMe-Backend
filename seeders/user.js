import { TryCatch } from "../middelwares/error.js";
import { User } from "../models/user.js";
import { faker } from "@faker-js/faker";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];
    for (let i = 0; i < 10; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }
    await Promise.all(usersPromise);
    console.log("Users created", numUsers);
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};

const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatsPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }
    await Promise.all(chatsPromise);
    console.log("Chats created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
const createMessagesInChat = async (numMessages) => {
  const users = await User.find().select("_id");
  const chats = await Chat.find().select("_id");
  const messagesPromise = [];
  for (let i = 0; i < numMessages; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomChat = chats[Math.floor(Math.random() * chats.length)];
    messagesPromise.push(
      Message.create({
        chat: randomChat,
        sender: randomUser,
        content: faker.lorem.sentence(),
      })
    );
  }
  await Promise.all(messagesPromise);
  console.log("Messages created successfully");
  process.exit();
};
export { createUser, createSingleChats, createMessagesInChat };
