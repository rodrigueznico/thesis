import { getAxInstanceWithHeaders as axInstance, getAxInstance as axInstanceSimple} from "./config"

export const getUser = (username, password) => {
  return axInstanceSimple.post("/api/user/login", { username: username, password: password })
};

export const getUsers = (token) => {
  return axInstance(token).get("/api/user")
};

export const register = (user, token) => {
  return axInstance(token).post("/api/user/register", user)
};

export const updateUser = (user, token) => {
  return axInstance(token).post("/api/user/update/".concat(user.id), user)
}

export const deleteUser = (userId, token) => {
  return axInstance(token).delete("/api/user/delete/".concat(userId))
};

export const changePasswordUser = (user, token) => {
  return axInstance(token).post("/api/user/updatepassword/".concat(user.id), user)
};

export const verifyUsername = async (username, token) => {
  try {
    await axInstance(token).post("/api/user/confirmuser", username)
    return false
  }
  catch(err){
    if (err.response.status === 401 || err.response.status === 403){
      return "UNAUTHORIZED"
    }
    else
      return true;
  }
}

export const verifyPassword = async (user, token) => {
  try {
    await axInstance(token).post("/api/user/confirmpassword", user)
    return false
  }
  catch(err){
    return true;
  }
}