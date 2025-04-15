const { z } = require("zod");

// Create Note Schema
const createNoteSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required and cannot be less than 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  content: z.string().min(1, "Content is required and cannot be empty"),

  folderId: z.number().int().optional(),
  isArchived: z.boolean().optional().default(false),
  systemCategories: z.array(z.string()).nonempty(),
});

const updateNoteSchema = z.object({
  title: z
    .string()
    .min(3, "Title cannot be less than 3 charaacter")
    .max(100, "Title cannot exceed 100 characters")
    .optional(),

  content: z.string().min(1, "Content cannot be empty").optional(),

  folderId: z.number().int().optional(),
  isArchived: z.boolean().optional(),
  systemCategories: z.array(z.string()).nonempty().optional(),
});

module.exports = {
  createNoteSchema,
  updateNoteSchema,
};
