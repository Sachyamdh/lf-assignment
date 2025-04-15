const { z } = require("zod");

const createFolderDto = z.object({
  name: z
    .string({
      required_error: "Folder name is required",
    })
    .min(1, "Folder name cannot be empty"),

  userId: z
    .number({
      required_error: "User ID is required",
    })
    .int("User ID must be an integer")
});

module.exports = createFolderDto;
