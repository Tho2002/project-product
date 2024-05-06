module.exports = (objPagination, query, countBikeList) => {
  if (query.page) {
    objPagination.currentPage = parseInt(query.page);
  }
  objPagination.skip =
    (objPagination.currentPage - 1) * objPagination.limitItem;

  const totalPage = Math.ceil(countBikeList / objPagination.limitItem);
  objPagination.totalPage = totalPage;
  return objPagination;
};
