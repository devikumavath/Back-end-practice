class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      // 1A) Filtering,💥
      const queryObj = { ...this.queryString };
      const execludedFields = ['page', 'sort', 'limit', 'fields'];
      execludedFields.forEach((el) => delete queryObj[el]);
  
      // 1B) Advance filtering 💥
  
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    sort() {
      // 2  Sorting 💥
  
      if (this.queryString.sort) {
        const sortBy = req.query.sort.split(',').join('');
        // console.log(sortBy)
        this.query = this.query.sort(req.query.sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    }
  
    limitFields() {
      // 3) Field limiting 💥
  
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
  
      return this;
    }
  
    paginate() {
      // 4 ) pagination 💥
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }

  module.exports = APIFeatures;