export const formatUsersQuestions = (userid, questions, users) => {
  let unansweredQuestions = {}
  let answeredFilter = {}

  if (userid) {
    const answeredQuestions = users.filter(f => f.id === userid).pop().answers
    unansweredQuestions = questions.filter(f => !answeredQuestions[ f.id ])
    answeredFilter = questions.filter(f => {
      return typeof answeredQuestions[ f.id ] !== 'undefined'
    })
  }

  return {
    answered: answeredFilter,
    unanswered: unansweredQuestions
  }
}

