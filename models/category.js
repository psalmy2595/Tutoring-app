const mongoose = require('mongoose');

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

module.exports = mongoose.model('Category', categorySchema);
