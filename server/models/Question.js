const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  index:{
    type: 'Number',
    required: true
  },
  title:{
    type: 'String',
    required: true
  },
  titleSlug:{
    type: 'String',
    required: true
  },
  content:{
    type: 'String',
    required: true
  },
  difficulty:{
    type:'String',
    required: true
  },
  sampleTestCase:{
    type:'String',
    required: true
  },
  codeSnippets:[
    {
      lang:{type:'String'},
      langSlug:{type:'String'},
      code:{type:'String'}
    }
  ],
  hints:[
    {type:'String'}
  ]

});
module.exports = Question = mongoose.model('question', QuestionSchema);