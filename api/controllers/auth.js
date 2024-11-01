const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');

const createJwtToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  };
  
  const socialLogin = async (req, res) => {
    const { email, name, googleId, avatar } = req.body;
  
    try {
      let user = await User.findOne({ googleId });
  
      if (!user) {
        user = new User({
          email,
          name,
          googleId,
          avatar,
        });
  
        await user.save();
      }
  
      const token = createJwtToken(user);
  
      res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
      console.error('Lỗi khi lưu người dùng vào DB:', error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

const register = async (req, res, next) => {
    console.log("body", req.body);
    try {
        upload.single('img')(req, res, async function (err) {
            if (err) {
                return next(err);
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({
                ...req.body,
                password: hash,
                img: req.file ? `uploads/${req.file.filename}` : null, 
            });

            await newUser.save();
            res.status(200).json({ newUser });
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or email!"));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        })
        .status(200)
        .json({ token , details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};


const loginWithGoogle = async (req, res, next) => {
    try {
      const { email, name, googleId, avatar } = req.body;
  
      let user = await User.findOne({ googleId });
  
      if (!user) {
        user = await User.findOne({ email });
  
        if (user) {
          user.googleId = googleId;
          user.avatar = avatar; 
          await user.save();
        } else {
          user = new User({
            email,
            name,
            googleId,
            avatar,
            password: undefined, 
          });
  
          await user.save();
        }
      }
  
      res.status(200).json({ message: "Đăng nhập thành công", user });
    } catch (err) {
      console.error("Lỗi khi lưu vào cơ sở dữ liệu:", err);
      next(err);
    }
  };
  


const checkEmailExists = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email }); 
    if (user) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  };
  
module.exports = {
    register,
    login,
    checkEmailExists,
    loginWithGoogle,
    socialLogin,
};
