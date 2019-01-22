
const getUser = () => {
  try {
    let userData = JSON.parse(localStorage.getItem("userData")) || null;
    return userData;
  } catch (e) {
    return null;
  }
}
const setUser = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
}

const clearUser = () => {
  localStorage.removeItem("userData");
} 

const isLogin = () => {
  let userData = getUser()
  if (userData !== null) {
    return true;
  } else {
    return false;
  }
}

export {
  getUser,
  setUser,
  clearUser,
  isLogin
}

