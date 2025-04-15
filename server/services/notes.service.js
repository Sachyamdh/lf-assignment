const slugify = require("slugify");
const { prisma } = require("../config/db");
const AppError = require("../middleware/AppError");

const SORT_FIELDS = {
  CREATED_AT: "createdAt",
  UPDATED_AT: "updatedAt",
  TITLE: "title",
};

const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
};

class NoteService {
  constructor() {}
  /**
   * Create a new note
   * @param {number} authorId - userId  createign the  noet
   */

  async createNote(authorId, noteData) {
    const { title, content, systemCategories = [], folderId = null } = noteData;

    if (!title || !content) {
      throw new AppError(
        "Validation Error",
        "Title and content are required",
        400
      );
    }

    const slug = slugify(title, { lower: true, strict: true });
    const note = await prisma.note.create({
      data: {
        title,
        content,
        slug,
        authorId,
        systemCategories,
        folderId,
        isArchieved: false,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        folder: true,
      },
    });
    return note;
  }

  async getAllNotes(userId) {
    const data = await prisma.note.findMany({
      where: { userId: userId },
      select,
    });
    return data;
  }

  async getPaginatedNotes(
    authorId,
    {
      page = 1,
      pageSize = 10,
      sortBy = SORT_FIELDS.UPDATED_AT,
      sortDirection = SORT_DIRECTIONS.DESC,
    },
    filters = {}
  ) {
    // Validate and sanitize inputs
    const { page: validatedPage, pageSize: validatedPageSize } =
      validatePagination(page, pageSize);

    if (!Object.values(SORT_FIELDS).includes(sortBy)) {
      throw new AppError(
        "Validation Error",
        `Invalid sort field. Allowed: ${Object.values(SORT_FIELDS).join(", ")}`,
        400
      );
    }

    if (!Object.values(SORT_DIRECTIONS).includes(sortDirection)) {
      throw new AppError(
        "Validation Error",
        `Invalid sort direction. Allowed: ${Object.values(SORT_DIRECTIONS).join(
          ", "
        )}`,
        400
      );
    }

    const { folderId, isArchieved, systemCategory, searchQuery } = filters;

    // Base where clause
    const where = {
      authorId,
      ...(folderId !== undefined && { folderId }), // undefined means all folders
      ...(isArchieved !== undefined && { isArchieved }),
      ...(systemCategory && { systemCategories: { has: systemCategory } }),
      ...(searchQuery && {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { content: { contains: searchQuery, mode: "insensitive" } },
        ],
      }),
    };

    // Get total count for pagination metadata
    const total = await prisma.note.count({ where });

    // Get paginated results
    const notes = await prisma.note.findMany({
      where,
      skip: (validatedPage - 1) * validatedPageSize,
      take: validatedPageSize,
      orderBy: {
        [sortBy]: sortDirection,
      },
      include: {
        folder: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return buildPaginationResponse(
      notes,
      total,
      validatedPage,
      validatedPageSize
    );
  }

  async getNotesBySlug(userId, slug) {
    const data = await prisma.note.findFirst({
      where: { authorId: userId, slug: slug },
      select: {
        slug,
        content,
        folder,
        folderId,
        updatedAt,
      },
    });

    return data;
  }
}
