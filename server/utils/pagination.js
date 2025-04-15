const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

const validatePagination = (page, pageSize) => {
  page = Number(page) || 1;
  pageSize = Number(pageSize) || DEFAULT_PAGE_SIZE;
  
  pageSize = Math.min(pageSize, MAX_PAGE_SIZE);
  page = Math.max(page, 1);
  
  return { page, pageSize };
};

const buildPaginationResponse = (items, total, page, pageSize) => {
  const totalPages = Math.ceil(total / pageSize);
  
  return {
    data: items,
    pagination: {
      totalItems: total,
      totalPages,
      currentPage: page,
      pageSize,
      hasNext: page < totalPages,
      hasPrevious: page > 1
    }
  };
};

module.exports = {
  validatePagination,
  buildPaginationResponse,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE
};