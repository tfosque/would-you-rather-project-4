import { size } from 'lodash';

export const countVotes = (option, optionOneVotes, optionTwoVotes) => {
  const vote = option === 'optionOne' ? optionOneVotes : optionTwoVotes;

  const totalVotes = optionOneVotes + optionTwoVotes;
  const percentage = Math.round((vote / totalVotes) * 100);
  return percentage;
};

export const setScores = (usersList) => {
  let scores;

  scores = usersList.map((item) => {
    const totalAnswered = size(item.answers);
    const totalCreated = size(item.questions);

    return {
      id: item.id,
      answered: totalAnswered,
      created: totalCreated,
      score: totalAnswered + totalCreated,
    };
  });

  return scores;
};
