import React from 'react';
import CountUp from 'react-countup';

import '../Styl/VoterNumber.scss';

export default function VoterNumber(props) {
  const Tally = () => {
    return <CountUp delay={0} end={props.num} />;
  };

  return (
    <div className='voterNumber'>
      <div>
        <strong>
          <Tally />%
        </strong>
      </div>
    </div>
  );
}
