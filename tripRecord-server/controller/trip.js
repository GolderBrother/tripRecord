const tripService = require("../services/trip");
class TripController {
    static async getHistoryList(req, res, next) {
        let userId = req.query.userId;
        let data = null,
        statusCode = 200;
        try{
            data = await tripService.getHistoryList(userId);
        }catch(error){
            data = error.message || error
            statusCode = 500
        }
        res.data = data;
        res.statusCode = statusCode;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }
    static async allDistance(req, res, next) {
        let userId = req.query.userId;
        let data = null,
        statusCode = 200;
        try{
            data = await tripService.allDistance(userId);
        }catch(error){
            data = error.message || error
            statusCode = 500
        }
        res.data = data;
        res.statusCode = statusCode;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }
    static async addTrip(req, res, next) {
        let query = req.query;
        let data = null,
        statusCode = 200;
        try{
            data = await tripService.addTrip(query);
        }catch(error){
            data = error.message || error
            statusCode = 500
        }
        res.data = data;
        res.statusCode = statusCode;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }
    static async addTraffic(req, res, next) {
        let query = req.query;
        let data = null,
        statusCode = 200;
        try{
            data = await tripService.addTraffic(query);
        }catch(error){
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

module.exports = TripController;