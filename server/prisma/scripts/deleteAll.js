
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
async function deleteAllFoldersAndNotes() {
  try {
    const deletedNotes = await prisma.note.deleteMany();
    console.log(`✅ Deleted ${deletedNotes.count} note(s).`);

    const deletedFolders = await prisma.folder.deleteMany();
    console.log(`✅ Deleted ${deletedFolders.count} folder(s).`);
  } catch (error) {
    console.error("❌ Failed to delete folders and notes:", error);
  }
}

deleteAllFoldersAndNotes();
