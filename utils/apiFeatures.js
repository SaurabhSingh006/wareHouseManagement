const { sequelize } = require("./../sequelize");

class APIFeatures {
  constructor(model, data, include = [], raw = false, groupBy = null) {
    this.model = model;
    this.queryObj = data.query;
    this.fields = null;
    this.limit = 100;
    this.page = 1;
    this.offset = 0;
    this.orderBy = null;
    this.data = [];
    this.include = include;
    this.raw = raw;
    this.groupBy = groupBy
  }

  async addFeatures() {
    //////////////////////////////////////////////////////////////
    // FILTER
    const copyQueryObj = JSON.parse(JSON.stringify(this.queryObj));
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'userfilter', 'searchterm', 'groupBy'];
    excludedFields.forEach(el => delete copyQueryObj[el]);

    // Advance filtering 
    const copyQueryObjString = JSON.stringify(copyQueryObj);
    const advFilterObj = JSON.parse(copyQueryObjString.replace(/\b(gte|gt|lte|lt|in|ne)\b/g, match => `$${match}`));
    console.log(advFilterObj);

    ///////////////////////////////////////////////////////////////
    // SORTING
    if(this.queryObj.sort) this.orderBy = [this.queryObj.sort.split(",")];

    ///////////////////////////////////////////////////////////////
    // LIMITING FIELD
    if(this.queryObj.fields && (typeof this.queryObj.fields) == "string") this.fields = this.queryObj.fields.split(",");
    else this.fields = this.queryObj.fields;

    ///////////////////////////////////////////////////////////////
    // PAGINATION
    if(this.queryObj.limit && this.queryObj.limit != '0') this.limit = this.queryObj.limit;
    if(this.queryObj.page && this.queryObj.page != '0') {
      this.page = this.queryObj.page;
      this.offset = ( this.page - 1 ) * this.limit;
    }

    /////////////////////////////////////////////////////////////////
    // GROUPBY
    if(this.groupBy) {
      this.groupBy = this.groupBy.split(',');
    }

    //////////////////////////////////////////////////////////////
    // QUERYING INTO DATABASE
    console.log(this.fields)
    this.data = await this.model.findAndCountAll({
      attributes: this.fields,
      where: advFilterObj,
      include: this.include,
      limit: this.limit,
      offset: this.offset,
      order: this.orderBy,
      raw: this.raw,
      group: this.groupBy
    });
    console.log(this.data);

    return {
      currentPage: this.page,
      pageLimit: this.limit,
      noOfRecords: this.data.count,
      data: this.data.rows
    };
  }
}
module.exports = APIFeatures;