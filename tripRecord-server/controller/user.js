const UserService = require("../services/user");
class UserController {
    static async selectUser(req, res, next) {
        let {
            userName,
            passWord
        } = req.body;
        let data = null,
        statusCode = 200;
        try {
            data = await UserService.selectUser(userName, passWord)
        } catch (error) {
            data = error.message || error
            statusCode = 500
        }
        res.data = data;
        res.statusCode = statusCode;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }
    static async tripTrend(req, res, next) {
        let userId = req.query.userId;
        let data = null,
        statusCode = 200;
        try {
            data = await UserService.tripTrend(userId);
        } catch (error) {
            data = error.message || error
            statusCode = 500
        }
        res.data = data;
        res.statusCode = statusCode;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }
}
module.exports = UserController;