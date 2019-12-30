import React, { Component } from 'react';
import { size } from 'lodash';
import { connect } from 'react-redux';
import {
  setShowPollDetails,
} from '../../Redux/Store/Actions/questionsAction';
import { countVotes } from '../_utils/countVotes';

import { Badge } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { VoterNumber } from './index';

import '../Styl/Polls.scss';

class PollDetails extends Component {
  state = {
    votes: 0,
    percentage: 0,
  };

  componentDidMount () {
    const {
      pollQuestion: { id, option },
    } = this.props;

    const currQuestion = this.props.questions.filter((f) => f.id === id).pop();
    console.log({ currQuestion });


    if (currQuestion) {
      const percentage = countVotes(
        option,
        size(currQuestion.optionOne.votes),
        size(currQuestion.optionTwo.votes),
      );
      this.setState({
        votes: size(currQuestion[ this.props.pollQuestion.option ].votes),
        percentage,
      });
    }

  }

  render () {
    const { pollQuestion, selectedPollOption, useRedirectOption
    } = this.props;

    console.log({ selectedPollOption });
    console.log({ useRedirectOption });

    let Icon;
    if (typeof selectedPollOption === 'undefined') {
      Icon = useRedirectOption === pollQuestion.option ? (
        <FontAwesome name='thumbs-up' size='2x' />
      ) : (
          <FontAwesome name='times-circle' size='2x' />
        );

    }

    return (
      <div className={ pollQuestion.option }>
        <VoterNumber num={ this.state.percentage } />
        <h3>{ pollQuestion.text }</h3>

        <h5>
          <span> votes&nbsp;</span>
          <Badge className='backgrd'>{ this.state.votes }</Badge>
          &nbsp; { Icon }
        </h5>
      </div>
    );
  }
}

export default connect(null, {
  setShowPollDetails,
})(
  PollDetails,
);
