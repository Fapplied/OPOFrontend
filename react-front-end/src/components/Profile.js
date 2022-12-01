import React, { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { Avatar, IconButton } from "@mui/material";
import "../styles/Profile.css";

const Profile = ({ user }) => {
  const [picURL, setPicURL] = useState();

  const handleImage = (e) => {
    SendToAPI(e.target.files[0]);
  };

  const SendToAPI = (im) => {
    const formData = new FormData();
    formData.append("formFile", im);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `https://opobackend.azurewebsites.net/api/ProfilePictures/${
          user.userId ?? user.data.userId
        }`,
        formData,
        config
      )
      .then((apiResponse) => {
        console.log({ apiResponse });

        setPicURL(apiResponse.data.url);
        return apiResponse;
      })
      .catch((err) => {
        console.log({ axios: err });
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://opobackend.azurewebsites.net/api/users/${
          user.userId ?? user.data.userId
        }`
      )
      .then((res) => setPicURL(res.data.profilePicture.url));
  }, []);

  return (
    <div className="ProfileInfo">
      <Avatar
        style={{
          width: "100px",
          height: "100px",
          border: "solid grey",
          textAlign: "center",
          alignSelf: "center",
        }}
        src={picURL ?? ""}
        alt="Profile Picture"
      />

      <input
        onChange={handleImage}
        accept="image/jpeg, image/png"
        className="hidden"
        type="file"
        id="my_file"
      ></input>
      <IconButton
        className="AddPhotoIcon"
        onClick={() => {
          document.getElementById("my_file").click();
        }}
      >
        <AddAPhotoIcon />
      </IconButton>
      <h2>{user.name ?? user.data.name}</h2>
    </div>
  );
};

export default Profile;
