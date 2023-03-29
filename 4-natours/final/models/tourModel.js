const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a name'],
      maxlength : [50 , 'A tour must have less or equal than 40 character'] ,
      minlength : [10 , 'A tour name must have more or equal than 10 character'] , 
      unique: true,
      // validate : [validator.isAlpha , 'Tour name must contain only names' ] 
    },

    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },

    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },

    difficulty: {
      type: String,
      required: [true, 'A tour should have a difficulty'],
      // enum : {
      //    values : ['easy ' , 'meduim' , 'difficulty'] ,
      //    message : 'Difficulty is either easy , medium ,hard '
      // }
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min : [1 , 'Rating must be above 1.0'] ,
      max : [5 , 'Rating must be elow 5.0']
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },

    priceDiscount:
    
    {
      
      type : Number,
       
      validate : {

      validator : function(val)  {

        // this  only points to current doc on the NEW document  creation 9

        return val < this.price
      } ,

      message : 'Discount should be below the price'

    }

    } ,

    summary: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    imageCover: {
      type: String,
      required: [true, 'A tour must have a image'],
    },

    images: [String],

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },

    startDates: [Date],
  },

  {
    slug: String,
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Property
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document middleware

tourSchema.pre('save', function (next) {
  console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});

// query middleware

tourSchema.pre('/^find/', function (next) {
  this.find({
    secretTour: { $ne: true },
  });
  this.start = Date.now();
});

tourSchema.post('/^find/', function (docs, next) {
  console.log(docs);
  console.log(`query took ${Date.now() - this.start} ms!`);
  next();
});

// aggregation middleware
tourSchema.pre('aggregate' , function(next){
  console.log(this.pipeline().unshift({ $match : {secretTour : {$ne : true}}}));
  next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
