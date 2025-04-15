const { PrismaClient } = require("../prisma/generated/prisma/client");

const prisma = new PrismaClient();

async function dbConnect() {
  // Your Prisma Client queries go here
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

dbConnect();

module.exports = { prisma, dbConnect };
