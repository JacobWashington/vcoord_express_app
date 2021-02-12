"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Field must have a value",
          },
          isAlpha: {
            msg: "Must contain only letters",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Field must have a value",
          },
          isAlpha: {
            msg: "Must contain only letters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Field must have a value",
          },
          isEmail: {
            msg: "Must be an email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [8, 99],
        },
        msg: "Password must be between 8 and 99 characters",
      },
      github: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  //before a user is created, we are encrypting the password and using hash in its place
  users.addHook("beforeCreate", (pendingUser) => {
    //pendingUser is object that gets passed to database
    //Bcrypt is going to hash the password
    let hash = bcrypt.hashSync(pendingUser.password, 12);
    pendingUser.password = hash;
  });

  //checking the password on sign-in and comparing it to the hash password in db
  users.prototype.validPassword = function (typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password); //boolean
    return isCorrectPassword;
  };

  //returns user object from db without encrypted password
  users.prototype.toJSON = function () {
    let userData = this.get(); // basicall user.get(), grabbing user object from db
    delete userData.password;
    return userData;
  };

  return users;
};
