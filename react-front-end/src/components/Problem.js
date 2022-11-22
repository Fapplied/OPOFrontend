import React from 'react';
import ProsList from "./ProsList";
import ConsList from "./ConsList";
import ProForm from "./ProForm";
import ConForm from "./ConForm";

const Problem = ( {problem}) => {
  
  return (
    <div>
      <h3>{problem.title}</h3>
      
      <ProsList/>
      <ConsList/>
    </div>
  );
};

export default Problem;
