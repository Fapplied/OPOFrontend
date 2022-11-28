import React, {useState} from 'react';
import Pro from './Pro'
import axios from "axios";
import ProForm from "./ProForm";

const ProList = ({problem, user}) => {
  const {proList, problemId} = problem;
  const {userId} = user.data;

  const [pros, setPros] = useState(() => {
    return proList ?? []
  })

  const addPro = async (pro) => {
    // adds new pro to beginning of cons array
    const {Advantage} = pro

    const {status} = await axios.post(Pro_ENDPOINT + `?problemId=${problemId}`, {UserId: userId , Advantage: Advantage  } )
    if(status === 201) {
      const { data} = await axios.get(PROBLEMS_ENDPOINT + `/${problemId}`)
      const {proList: theList} = data
      setPros([...theList]);
    }
  }

  //Call back end and ask for list of Pros. Add its own controller.
  return (
    <div>
      <h3>Pros</h3>
      {proList &&
        <ul className='Cons-List'>
          {pros.map(pro => <li><Pro pro={pro}/></li>)}
        </ul>}

      <ProForm addPro={addPro}/>

    </div>
  );
};

export default ProList;


