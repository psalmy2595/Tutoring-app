const mongoose = require('mongoose');
const Subject = require('./subject');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subjects: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject"
        }
      ]
})

categorySchema.pre('remove', function(next) {
  Promise.all(this.subjects.forEach(subject => {
    Subject.deleteOne({ _id: subject });
  })).then(next());
  
})

module.exports = mongoose.model('Category', categorySchema);

