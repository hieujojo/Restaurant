const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const SocialAuthUser = require('../models/socialAuthModel'); 
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
};

const handleGoogleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        console.log('Token nhận được từ client:', token);

        if (!token) {
            return res.status(400).json({ message: 'Token là bắt buộc' });
        }

        // Xác thực token nhận được
        const userInfo = await verifyGoogleToken(token);
        return res.status(200).json({
            message: 'Xác thực Google thành công',
            user: userInfo,
        });
    } catch (error) {
        console.error('Lỗi xác thực Google:', error);
        return res.status(401).json({ message: 'Xác thực Google thất bại', error });
    }
};

// Trao đổi mã `authorization code` để lấy token từ Google
const googleAuthRedirect = async (req, res) => {
    const { code } = req.query; // Nhận mã xác thực từ query parameters

    try {
        // Trao đổi mã code để lấy access token và ID token
        const { tokens } = await client.getToken({
            code,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:8800/api/social/social-login',
        });

        // Xác thực ID token và lấy thông tin người dùng
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        // Lưu thông tin người dùng vào database hoặc xử lý tiếp theo
        const user = {
            googleId: payload.sub,
            email: payload.email,
            name: payload.name,
            profilePicture: payload.picture,
        };

        // Kiểm tra xem người dùng đã tồn tại trong database chưa
        let existingUser = await SocialAuthUser.findOne({ googleId: user.googleId });
        if (!existingUser) {
            existingUser = new SocialAuthUser(user);
            await existingUser.save();
        }

        // Trả về phản hồi
        res.status(200).json({ message: "Đăng nhập thành công", user: existingUser });
    } catch (error) {
        console.error("Lỗi xác thực Google:", error);
        res.status(500).json({ message: "Xác thực Google thất bại", error: error.message });
    }
};

// Hàm xử lý xác thực khi nhận được `authorization code` từ Google và đổi lấy access token
const googleAuth = async (req, res) => {
    const code = req.query.code;

    try {
        // Trao đổi mã code để lấy access token
        const tokenResponse = await axios.post(
            `https://oauth2.googleapis.com/token`,
            {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:8800/api/social/social-login',
                grant_type: 'authorization_code',
            },
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        const { access_token } = tokenResponse.data;

        // Dùng access token để lấy thông tin người dùng
        const userInfoResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
        );

        res.json(userInfoResponse.data);
    } catch (error) {
        console.error('Lỗi xác thực Google:', error.message);
        res.status(500).send('Xác thực thất bại');
    }
};

module.exports = { handleGoogleLogin, googleAuthRedirect, googleAuth };
