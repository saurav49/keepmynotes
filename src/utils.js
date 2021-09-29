const checkInputField = (inputValue) => {
  return inputValue === "" ? "EMPTY" : "NOT_EMPTY";
};

const validateEmail = (email) => {
  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return validEmailRegex.test(email);
};

const validatePassword = (password) => {
  const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  return validPasswordRegex.test(password);
};

const validateUsername = (username) => {
  const validUsernameRegex = /^[a-zA-Z]/;

  return validUsernameRegex.test(username);
};

const isMatch = (password, confirmPassword) => {
  return password === confirmPassword ? true : false;
};

export {
  isMatch,
  checkInputField,
  validateEmail,
  validatePassword,
  validateUsername,
};
