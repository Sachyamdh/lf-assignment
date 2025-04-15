const { prisma } = require("../../config/db");
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");
async function main() {
  // Create user
  const user = { id: 45 };

  // Create folders
  const folder1 = await prisma.folder.create({
    data: {
      name: "Work Notes",
      userId: user.id,
    },
  });

  const folder2 = await prisma.folder.create({
    data: {
      name: "Personal Thoughts",
      userId: user.id,
    },
  });

  // Create notes
  const notes = await prisma.note.createMany({
    data: [
      {
        title: "Meeting with client",
        content: "Discussed project roadmap...",
        slug: `${slugify("Meeting with client", {
          lower: true,
          strict: true,
        })}-${uuidv4().slice(0, 8)}`,
        authorId: user.id,
        folderId: folder1.id,
        isArchieved: false,
        systemCategories: ["Work"],
      },
      {
        title: "Grocery list",
        content: "Eggs, Milk, Bread",
        slug: `${slugify("Grocery list", {
          lower: true,
          strict: true,
        })}-${uuidv4().slice(0, 8)}`,
        authorId: user.id,
        folderId: folder2.id,
        isArchieved: false,
        systemCategories: ["Personal"],
      },
    ],
  });

  console.log("🌱 Seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
