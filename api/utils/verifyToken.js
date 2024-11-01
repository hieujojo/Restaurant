// Không cần xác thực, chỉ cần chạy middleware đơn giản để xử lý request
const verifyToken = (req, res, next) => {
    next(); // Bỏ qua xác thực token
};

// Không cần xác thực người dùng
const verifyUser = (req, res, next) => {
    next(); // Bỏ qua xác thực người dùng
};

// Không cần xác thực admin
const verifyAdmin = (req, res, next) => {
    next(); // Bỏ qua xác thực admin
};

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,
};
