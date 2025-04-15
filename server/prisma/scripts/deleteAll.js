
const { prisma } = require("../../config/db");

async function deleteAllUsers() {
  try {
    const deleted = await prisma.user.deleteMany();
    console.log(`✅ Deleted ${deleted.count} user(s).`);
  } catch (error) {
    console.error("❌ Failed to delete users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllUsers();
