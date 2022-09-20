class APIFeatures {
  constructor(query, queryString, toursLength) {
    this.query = query;
    this.queryString = queryString;
    this.toursLength = toursLength;
  }
  filter() {
    // BUILD QUERY
    // 1) Filtering

    const queryObj = { ...this.queryString };
    const incluctField = ["sort", "fields", "page", "limit"];
    incluctField.forEach((field) => delete queryObj[field]);
    // 2) Advance Filtering
    let Filter = JSON.stringify(queryObj);
    Filter = Filter.replace(/\b(lt|lte|gt|gte|eq)\b/g, (match) => `$${match}`);
    Filter = JSON.parse(Filter);
    this.query.find(Filter);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
      return this;
    } else {
      this.query = this.query.sort("-createdAt");
      return this;
    }
  }
  select() {
    // //3)Fields select
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
      return this;
    } else {
      this.query = this.query.select("-__v");
      return this;
    }
  }
  paginate() {
    // 4)limit & page
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1;
    const skip = (page - 1) * limit;
    console.log("page not found", skip, limit, page);
    if (skip >= this.toursLength) {
      return this;
    }
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
