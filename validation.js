const validator = require("validator");

const validateLoginData = (data) => {
  let errors = {};
  if (data.email) {
    data.email = !isEmpty(data.email) ? data.email : "";
    if (!validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  } else {
    errors.email = "Email field is required";
  }
  if (data.password) {
    data.password = !isEmpty(data.password) ? data.password : "";
    if (validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
  } else {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateSignupData = (data) => {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (!validator.isLength(data.username, { min: 4, max: 8 })) {
    errors.username = "Username must be 4 to 8 characters long";
  }
  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be 8 to 30 characters long";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

module.exports = {
  loginValidator: validateLoginData,
  signupValidator: validateSignupData,
};
