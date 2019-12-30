import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProgressBar, Badge, Container } from 'react-bootstrap';

import '../Styl/Panel.scss';

export default class PanelProfile extends Component {
  state = {
    counter: 0,
  };

  componentDidMount () {
    this.score = this.props.scoreCard.score
    const speed = this.props.index === 1 ? 500 : 200;
    this.startCount(speed);
  }

  componentWillUnmount () {
    clearInterval(this.intervalHandle);
  }

  tick = () => {
    let { counter } = this.state;

    if (counter < this.score) {
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
      }));
    }

    if (counter >= this.score) {
      clearInterval(this.intervalHandle);
    }
  };

  startCount = (speed) => {
    this.intervalHandle = setInterval(this.tick, speed);
  };

  render () {
    const {
      index,
      scoreCard: { answered, created, score },
    } = this.props;
    const { counter } = this.state;

    return (
      <Container fluid>
        <ul className='panelProfileWrapper'>
          <li>
            <b>
              <Badge
                style={ {
                  color: '#fff',
                  fontSize: '1.675em',
                  marginRight: 0,
                  height: '6.75%',
                  width: 'auto',
                } }
                variant='primary'
              >
                { score }
              </Badge>
            </b>
          </li>
          <li>
            <Link to='/unanswered'>
              Questions Asked: <span>{ created }</span>
            </Link>
          </li>
          <li>
            <Link to='/answered'>
              Questions Answered: <span>{ answered }</span>
            </Link>
          </li>
        </ul>
        <ProgressBar
          variant={ index === 1 ? 'success' : 'warning' }
          className='progress'
          now={ counter }
        />
      </Container>
    );
  }
}

PanelProfile.propTypes = {
  scoreCard: PropTypes.object.isRequired,
};

PanelProfile.defaultProps = {
  scoreCard: { score: 0, avatar: '' },
};
