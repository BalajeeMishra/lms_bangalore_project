import api from "./api";
import TokenService from "./token.service";

const userProfile = () => {
    return api.get("/user_profile")
    .then(response => {
      return response;
    })
    .catch(error => {
      // console.log(error)
      return error.response;
    });
  };


const ProfileService = {
    userProfile
};

export default ProfileService;