const express = require('express');
const router = express.Router();
const UserController = require("../controller/user");

// 用户登录
router.post('/', UserController.selectUser);

// 获取最近一周
router.get('/tripTrend', UserController.tripTrend);

module.exports = router;