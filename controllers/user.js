const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user");
const saltRounds = 12;

const userRegister = async (req, role,  res) => {
 
  try {
    let emailNotRegistered = await validateEmail(req.body.email);
    if (!emailNotRegistered) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    let password = await bcrypt.hash(req.body.password, saltRounds);

    let userId = await (await User.find()).length;
    

    let newUser = new User({
      ...req.body,
      password,
      role,
      userId    
    });

    let saveNewUser = await newUser.save();

    let serializedUser = {
      _id: saveNewUser._id,
      name: saveNewUser.name,
      email: saveNewUser.email,
      userId : saveNewUser.userId,
    };

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      result: serializedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create an account",
      success: false,
    });
  }
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    

    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }

    //check password
    let isMatch = await bcrypt.compare(password, user.password);
    

    if (isMatch) {
      let payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      let token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7days" });

      return res.status(200).json({
        message: "You are loggedin successfully",
        success: true,
        _id: user._id,
        role:user.role,
        token: token,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect credentials",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Unable to login",
      success: false,
    });
  }
};

const serializeUser = async (req, res) => {
  try {
    let user = await req.user;
    if (user) {
      return res.status(200).json({
        message: "Successfully fetched your profile data",
        success: true,
        _id: user._id,
        userId : user.userId,
        name: user.name,
        email: user.email,
        role:user.role,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      });
    } else {
      return res.status(404).json({
        message: "Unable to fetch your profile data",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "server err",
      success: false,
      error: err,
    });
  }
};








module.exports = {
  userRegister,
  userLogin,
  serializeUser,

};