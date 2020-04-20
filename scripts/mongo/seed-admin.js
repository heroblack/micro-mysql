const bcrypt = require("bcrypt");
const chalk = require("chalk");
const MongoDb = require("../../store/mongoDB");
const config = require("../../config");

function buildAdminUser(password) {
  return {
    password,
    username: config.jwt.username,
    email: config.jwt.email,
  };
}

async function hasAdminUser() {
  const adminUsers = await MongoDb.list("users", { username: "hackchan" });
  return adminUsers && adminUsers.length;
}

async function createAdminUser() {
  const hashedPassword = await bcrypt.hash("F62856far1981*", 10);
  const userId = await MongoDb.insert("users", buildAdminUser(hashedPassword));
  return userId.insertedId;
}

async function seedAdmin() {
  try {
    const userExist = await hasAdminUser();
    if (userExist) {
      console.log(chalk.yellow("Admin User already exist."));
      return process.exit(1);
    } else {
      const userId = await createAdminUser();
      console.log(chalk.yellow(userId));
      return process.exit(0);
    }
  } catch (err) {
    console.log(chalk.red(err));
    process.exit(1);
  }
}

seedAdmin();
