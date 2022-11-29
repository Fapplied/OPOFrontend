import React, { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { getLS, setLS } from "../helpers/storage";
import { Avatar, IconButton } from "@mui/material";
import { border, textAlign } from "@mui/system";
import "../styles/Profile.css"

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
    const trial = getLS("profpic");
    console.log({ trial });
    if (trial === false) {
      axios
        .get(
          `https://opobackend.azurewebsites.net/api/ProfilePictures/${
            user.userId ?? user.data.userId
          }`
        )
        .then((res) => {
          setLS("profpic", res.data);
          setPicURL(res.data.url);
        });
    } else {
      setPicURL(trial);
    }
  }, []);

  return (
    <div className="ProfileInfo">
      <Avatar
        style={{
          width: "100px",
          height: "100px",
          border: "solid grey",
          textAlign: "center",
          alignSelf:"center",
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
        onClick={() => {
          document.getElementById("my_file").click();
        }}
      >
        <AddAPhotoIcon />
      </IconButton>

      <h3>{user.name ?? user.config.data.name}</h3>
    </div>
  );
};

export default Profile;
