export class CustomError extends Error {
  constructor(field, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.name = "CustomError";
    this.field = field;
  }
}

export const validationsAPI = {
  required(name, value) {
    if (!value) throw Error(`${name[0].toUpperCase()}${name.slice(1)} is required`);
  },
  email(email) {
    validationsAPI.required("email", email);
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) throw new CustomError("email", "Invalid Email");
  },

  username(username) {
    validationsAPI.required("username", username);
    const reg = /^[a-zA-Z]{5,}\S*$/;
    if (!reg.test(username)) {
      if (username.length < 5) throw Error("username", "Username too short! Minimum 5 chars");
      if (username.length > 20) throw Error("username", "Username too long! Maximum 20 chars");
      throw Error("Invalid username");
    }
  },

  password(password) {
    validationsAPI.required("password", password);
    const reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
    if (password.length < 6) throw new CustomError("password", "Password length must be at least six chars");
    if (!reg.test(password))
      throw new CustomError("password", "Invalid password. Must contain numbers and letters");
  },

  confirmPassword(confirmPassword, password = "") {
    validationsAPI.required("confirmPassword", confirmPassword);

    const reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;

    if (confirmPassword.length < 6)
      throw new CustomError("confirmPassword", "Password length must be at least six chars");
    if (!reg.test(confirmPassword))
      throw new CustomError("confirmPassword", "Invalid password. Must contain numbers and letters");
    if (confirmPassword !== password) throw new CustomError("confirmPassword", "Passwords do not match");
  },

  title(title) {
    if (title.length < 4) throw Error("Title must be at least four chars");
    if (title.length > 45) throw Error("Title is too long! Maximum 45 chars");
  },

  description(desc) {
    validationsAPI.required("description", desc);
  },

  source_url(url) {
    if (url) {
      const reg = /^(https?:\/\/)?(www\.)?\w{1,}\.\w{1,6}\b((.)*)/;
      if (!reg.test(url)) throw Error("Invalid url");
    }
  },

  servings(servings) {
    if (servings && (servings < 1 || servings > 10)) throw Error("Servings must be between 1-10");
  },

  cook(cook) {
    if (cook && cook < 1) throw Error("Invalid cooking time");
  },

  image(image) {
    if (image.type && image?.type?.substr(0, 5) !== "image")
      throw Error(`Error in ${image.name}: Invalid file- images only`);
    if (image.size > 1024 * 1024 * 5) throw Error(`Error in ${image.name}: Maximum size 5 mb`);
  },

  ingredients(ingredients) {
    if (!ingredients.length) throw new CustomError("ingredients", "Ingredients are required");
    ingredients.forEach((ingredient) => {
      if (!ingredient.text) throw new CustomError("ingredients", "Invalid ingredient");
    });
  },

  instructions(instructions) {
    if (!instructions.length) throw new CustomError("instructions", "Instructions are required");
    instructions.forEach((instruction) => {
      if (!instruction) throw new CustomError("instructions", "Invalid instruction");
    });
  },
  
  code(code){
    if(!code) throw Error('Code is required')
  }
};

export const validateFields = (values) => {
  for (const key in values) {
    if (validationsAPI[key]) {
      try {
        if (key === "confirmPassword") {
          validationsAPI[key](values[key], values["password"]);
        } else {
          validationsAPI[key](values[key]);
        }
      } catch (err) {
        return { key, message: err.message };
      }
    }
  }

  return true;
};
