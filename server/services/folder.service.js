const { prisma } = require("../config/db");
const AppError = require("../middleware/AppError");

class FolderService {
  constructor() {}
  /**
   * Create a new note
   * @param {number} userId - userId  createign the  noet
   */
  async createFolder(userId, folderData) {
    const data = prisma.folder.create({
      userId: userId,
      ...folderData,
    });
    if (!note)
      throw new AppError("Server Error", "Failed to create folder", 500);
    return data;
  }

  async getAllFolders(userId) {
    const data = await prisma.folder.findMany({
      where: { userId: userId },
      select: {
        id: true,
        name: true,
        notes: {
          select: {
            slug: true,
          },
        },
      },
    });
    return data;
  }
}

module.exports = new FolderService();
