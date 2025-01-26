const bcrypt = require("bcryptjs");
const { User } = require("../model/User");
const jwt = require("jsonwebtoken");
const { Post } = require("../model/Post");
const axios = require("axios");

// Register User
// /api/user/register
async function register(req, res, next) {
  const { fullName, email, password, confirmPassword} = req.body;
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(422).json({
      error: "Kindly fill all the details!",
    });
  }

  if (!email.includes("@")) {
    return res.status(422).json({
      error: "Invalid Email Id",
    });
  }
  if (!(password.length > 8)) {
    return res.status(422).json({
      error: "Passwords must have 8 characters",
    });
  }
  if (password != confirmPassword) {
    return res.status(422).json({
      error: "Passwords do not match!",
    });
  }
  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(422).json({
        error: "User with this email Already Exists!",
      });
    }

    const randomPhotoUrl = await axios.get(`${process.env.RANDOM_IMAGE_URL}`);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      Avatar: randomPhotoUrl.data.message,
    });
    await newUser.save();

    const payload = {
      id: emailExists._id,
      email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: "Registration Successfull",
      user: newUser,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Internal Error Occured",
    });
  }
}

// Login user
// /api/user/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        error: "Fill all the fields!",
      });
    }
    if (!email.includes("@")) {
      return res.status(422).json({
        error: "Invalid Email ID",
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (!userExists) {
      return res.status(422).json({
        error: "No such user exists!",
      });
    }

    const hashedPassword = await bcrypt.compare(password, userExists.password);
    if (hashedPassword) {
      const payload = {
        id: userExists._id,
        email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).json({
        success: "Login Successful!",
        user: userExists,
        token,
      });
    }

    return res.status(422).json({
      error: "Invalid Credentials",
    });
  } catch (err) {
    return res.status(400).json({
      error: "Error Login, please try again",
    });
  }
}

async function continueWithGoogle(req, res, next) {
  const { providerId, email, fullName,photoURL } = req.body;
  if (!providerId || !email || !fullName) {
    return res.status(422).json({
      error: "No proper info",
    });
  }
  try {
    const emailExists = await User.findOne({ email });

    if (!emailExists) {
      const randomPhotoUrl = await axios.get(`${process.env.RANDOM_IMAGE_URL}`);
      const newUser = new User({
        email,
        fullName,
        providerId,
        Avatar: randomPhotoUrl.data.message,
        photoURL
      });

      newUser.save();

      const payload = {
        id: newUser._id,
        email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        success: "Success",
        user: newUser,
        token,
      });
    } else {
      const payload = {
        id: emailExists._id,
        email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        success: "Success",
        user: emailExists,
        token,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Try Again , Some Error Occured",
      err,
    });
  }
}

// Update profile
// /api/user/update

async function update(req, res, next) {
  try {
    const {
      email,
      fullName,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = req.body;
    console.log(
      email,
      fullName,
      currentPassword,
      newPassword,
      confirmNewPassword
    );
    if (
      !email ||
      !fullName ||
      !currentPassword ||
      !newPassword ||
      !confirmNewPassword
    ) {
      return res.status(422).json({
        error: "Fill all the details",
      });
    }
    if (!email.includes("@")) {
      return res.status(422).json({
        error: "Invalid Email Id",
      });
    }
    if (!(newPassword.length > 8)) {
      return res.status(422).json({
        error: "Passwords must have 8 characters",
      });
    }
    if (newPassword != confirmNewPassword) {
      return res.status(422).json({
        error: "Passwords do not match!",
      });
    }

    const user = req.user;
    console.log(user);

    if (email == user.email) {
      const passwordCompare = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!passwordCompare) {
        return res.status(422).json({
          error: "Incorrect Current Password!",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const update = await User.findByIdAndUpdate(user._id, {
        fullName,
        password: hashedPassword,
      });

      if (update) {
        updatedUser = await User.findById(user._id);
        return res.status(200).json({
          success: "Information updated successfully",
          updatedUser,
        });
      }
      return res.status(200).json({
        error: "Error updating the profile",
      });
    } else {
      return res.status(404).json({
        error: "Invalid Email, You can't change the emailId",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error updating the profile, please try again",
      err,
    });
  }
}

// Get Authors
// /api/user/getAuthors

async function getAuthors(req, res, next) {
  try {
    const Authors = await User.find().sort({ NoOfPosts: -1 });
    console.log(Authors);
    if (Authors) {
      return res.status(200).json({
        success: "Authors Fetched Successfully",
        Authors,
      });
    }
    return res.status(404).json({
      error: "No Authors",
    });
  } catch (err) {
    console.log(error);
    return res.status(400).json({
      error: "Error Fetching the Authors!",
    });
  }
}

// Profile details
// /api/user/profile

async function profile(req, res, next) {
  try {
    const user = req.user;
    const userInfo = {
      fullName: user.fullName,
      email: user.email,
      avatar: user.Avatar,
    };
    res.status(200).json({
      success: "information fetched successfully",
      user: userInfo,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Can't fetch your details",
      err,
    });
  }
}

//profile by id
// /api/user/author/:id
async function authorById(req, res, next) {
  try {
    const id = req.params;

    const user = await User.findById(id.id);
    res.status(200).json({
      success: "information fetched successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Can't fetch the details",
      err,
    });
  }
}
module.exports = {
  register,
  login,
  update,
  getAuthors,
  profile,
  authorById,
  continueWithGoogle,
};
