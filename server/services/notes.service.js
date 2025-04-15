const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");
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

    let slug = slugify(title, { lower: true, strict: true });
    //creatign a  unique slug for handling unique value
    slug = `slug-${uuidv4().slice(0, 8)}`;
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
      select: {
        title: true,
        content: true,
        folderId: true,
        updatedAt: true,
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return note;
  }

  async getAllNotes(userId) {
    const data = await prisma.note.findMany({
      where: { userId: userId },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
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

  async getNotesBySlug(slug, userId) {
    const data = await prisma.note.findFirst({
      where: {
        slug,
        authorId: userId,
      },
      select: {
        slug: true,
        title: true,
        content: true,
        folderId: true,
        updatedAt: true,
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return data;
  }

  async updateNotes(slug, data, userId) {
    const updatedNote = await prisma.note.update({
      where: {
        slug_authorId: {
          slug,
          authorId: userId,
        },
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return updatedNote;
  }

  async deleteNote(slug, userId) {
    await prisma.note.delete({
      where: {
        slug_authorId: {
          slug,
          authorId: userId,
        },
      },
    });

    return null;
  }
}

module.exports = new NoteService();
