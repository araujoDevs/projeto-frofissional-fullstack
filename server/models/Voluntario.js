const mongoose = require('mongoose');

const voluntarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  funcao: {
    type: String,
    required: true,
    trim: true
  },
  data: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Voluntario', voluntarioSchema);
