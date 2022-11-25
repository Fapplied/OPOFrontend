import React from 'react';

const Avatar = ({problemId}) => {
  return (
    <div className={'div-avatar'} style={{position: "relative"}}>
      <img className={'AvatarImg'} src={`https://avatars.dicebear.com/api/open-peeps/${problemId}.svg`} alt={'Avatar'}
      />
    </div>
  );
};

export default Avatar;
