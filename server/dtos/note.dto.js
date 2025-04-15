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
  systemCategories: z.array(z.string()),
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
  systemCategories: z.array(z.string()),
});

const validateNote = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);
    req.validatedData = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  validateCreateNote: validateNote(createNoteSchema),
  validateUpdateNote: validateNote(updateNoteSchema),
};
