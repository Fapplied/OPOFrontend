import React from 'react';
import ProsList from "./ProsList";
import ConsList from "./ConsList";

const Problem = ( {problem}) => {
  
  return (
    <div>
      <h4>{problem.title}</h4>
      <div className='problem-lists' >
      <ProsList className='list-c' problem={problem}/>
      <ConsList className='list-c' problem={problem}/>
      </div>
    </div>
  );
};

export default Problem;
