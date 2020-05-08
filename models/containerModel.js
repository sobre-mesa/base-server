
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const containerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A container must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A container name mustnt be longer than 40 chars'],
    minlength: [1, 'A container name mustnt be shorter than 10 chars']
  },
  description: {
    type: String,
    required: [true, 'A container must have a name'],
    maxlength: [40, 'A container name mustnt be longer than 40 chars'],
    minlength: [10, 'A container name mustnt be shorter than 10 chars'],
  },
  notes: {
    type: String,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    unique: true,
    trim: true,
  },
  usesSatisfactionIndex: {
    type: Boolean,
    required: [true, 'A container must have a group size']
  },
  percentage: [Number],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  parent: {
    type: String,
  },
},
  {
    toJSON: { virtuals: true }, //When converted to JSON, apply virtuals
    toObject: { virtuals: true } //When converted to Object, apply virtuals
  })

containerSchema.virtual('cheap').get(function () {
  return this.price < 1000; //Field that will not be persisted, but shown in responses
})

containerSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next();
})

containerSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds!`);
  next();
})

const Container = mongoose.model('Container', containerSchema);

module.exports = Container;