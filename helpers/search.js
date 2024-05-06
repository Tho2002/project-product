module.exports = (query) => {
  let ojbSearch = {
    keyword: "",
  };
  if (query.keyword) {
    ojbSearch.keyword = query.keyword;
    ojbSearch.regex = new RegExp(ojbSearch.keyword, "i");
  }
  return ojbSearch;
};
