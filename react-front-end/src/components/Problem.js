import React from 'react';
import ProsList from "./ProsList";
import ConsList from "./ConsList";
import ProForm from "./ProForm";
import ConForm from "./ConForm";

const Problem = () => {
  
  return (
    <div>
      <ProsList/>
      <ProForm/>
      <ConsList/>
      <ConForm/>
    </div>
  );
};

export default Problem;
