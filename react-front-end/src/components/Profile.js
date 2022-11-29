import React, { useEffect, useState } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const Profile = ({user}) => {

  return (
    <div>
     <img src="" alt="Profile Picture"/>
      <AddAPhotoIcon/>
      <h3>{user.name}</h3>
    </div>
);
};

export default Profile;
