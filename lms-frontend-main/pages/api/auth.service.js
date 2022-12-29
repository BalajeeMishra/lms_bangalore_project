import api from "./api";
import TokenService from "./token.service";

const register = (userData) => {
  return api.post("/register", {
    userData
  })
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
};

const login = (username, password) => {
  return api
    .post("/login", {
      username,
      password
    })
    .then((response) => {
      if (response.data.access) {
        TokenService.setUser(response.data);
      }
      return response;
    })
    .catch(error => {
        return error;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const resetPassWordEmail = (userData) => {
  return api.post("/reset-password-email",  
    userData
 )
  .then(response => {
    // console.log('resposn of forgtpassword', response)
    return response;
  })
  .catch(error => {
    return error;
  });
};

const resetPassWord = (userData) => {
  return api.post("/reset-password", userData)
  .then(response => {
    // console.log('response of forgtpassword', response)
    return response;
  })
  .catch(error => {
    return error;
  });
};

const getUserProfile = (userData) => {
  return api.get("/user_profile")
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  resetPassWordEmail,
  resetPassWord,
  getUserProfile
};

export default AuthService;