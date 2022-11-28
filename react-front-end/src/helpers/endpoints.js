import axios from "axios";

const base = "https://opobackend.azurewebsites.net/api/";

const registerUser = async (name, id, token) => {
  return await axios.post(base + "Users", {
    Name: name,
    GoogleId: id,
    Token: token,
  });
};

export default {
  registerUser,
};
