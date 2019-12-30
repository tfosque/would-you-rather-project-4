import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ProgressBar, Badge, Container, Col, Row, Image} from 'react-bootstrap';

import '../Styl/Panel.scss';

export default class LeaderboardPanelGroup extends Component {
  state = {
    counter: 0,
  };

  componentDidMount() {
    this.score = this.props.user.score;
    const speed = this.props.index === 1 ? 500 : 200;
    this.startCount(speed);
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle);
  }

  tick = () => {
    let {counter} = this.state;

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

  render() {
    const {user, index} = this.props;
    const {counter} = this.state;

    return (
      <Container className='panelGroupContainer'>
        <Row style={{color: '#fff'}}>
          <Col lg={3} className='index'>
            #{index} &nbsp; {user.name}
          </Col>
          <Col lg={3}>
            <Badge variant='primary' className='badge'>
              {user.score}
            </Badge>
            {/*  <Avatar src={ user.avatar } index={ index } leaderboard /> */}
            <Image
              src={user.avatar}
              alt='_'
              style={{width: 100, marginTop: -10}}
            />
          </Col>
          <Col lg={3} className='questions'>
            questions asked: <span>{user.questionsAsked}</span>
          </Col>
          <Col lg={3} className='questions'>
            questins answered: <span>{user.questionsAnswered}</span>
          </Col>
          <Col lg={12}>
            <ProgressBar
              variant={index === 1 ? 'success' : 'warning'}
              className='progress'
              animated={
                index === 1 && this.state.counter < this.props.user.score
                  ? true
                  : false
              }
              striped={
                index === 1 && this.state.counter < this.props.user.score
                  ? true
                  : false
              }
              now={counter}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

LeaderboardPanelGroup.propTypes = {
  user: PropTypes.object,
};

LeaderboardPanelGroup.defaultProps = {
  user: {score: 0, avatar: ''},
};
