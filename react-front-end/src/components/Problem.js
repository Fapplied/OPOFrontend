import React from 'react';
import ProsList from "./ProsList";
import ConsList from "./ConsList";
import ProForm from "./ProForm";
import ConForm from "./ConForm";

const Problem = ( {problem}) => {
  
  return (
    <div>
      <h4>{problem.title}</h4>
      
      <ProsList problem={problem}/>
      <ConsList problem={problem}/>
    </div>
  );
};

export default Problem;
