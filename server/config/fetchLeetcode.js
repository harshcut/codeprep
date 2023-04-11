const Leetcode = require('leetcode-query')
const Question = require('../models/Question')

const fetcLeetcode = async () => {
const lc = new Leetcode.LeetCode()
const problems = await lc.problems({limit:50})
const ques = problems.questions

for(let i=0; i<ques.length; i++){
  const problem =  await lc.problem(ques[i].titleSlug)
  console.log(i+1)

  let {title,titleSlug,content,difficulty,sampleTestCase,codeSnippets,hints} = problem;

  
  const newQuestion = new Question({
    title:title,
    titleSlug:titleSlug,
    content:content,
    difficulty:difficulty,
    sampleTestCase : sampleTestCase,
    codeSnippets: codeSnippets,
    hints:hints,
  })

  const question = await newQuestion.save();
}

}
