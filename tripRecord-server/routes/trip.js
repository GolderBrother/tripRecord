const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const TripController = require("../controller/trip");

let data = {
    code: 200,
    msg: 'success'
}; //最后返回的json对象
// 本地记录数据库中总出行里程
let allDistanceData = {
    allBus: 0,
    allCycle: 0,
    allDrive: 0,
    allRun: 0,
    allTaxi: 0,
    allWalk: 0
}
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'trip'
});
/* GET users listing. */
// 历史列表接口
router.get('/historyList', TripController.getHistoryList);

// 出行总公里数
router.get('/allDistance', TripController.allDistance);

// 插入出行数据

router.get('/addTrip', TripController.addTrip);

// 插入交通数据

router.get('/addTraffic', TripController.addTraffic);

// 更新里程
function allDistanceUpdate(key,value,userId){
    console.log(`${key}出行里程更新`)
    console.log(allDistanceData)
    data.data = allDistanceData;
    pool.query(`UPDATE trip SET ${key}=${value} where userId=${userId}`, function (err, results, fields) {
    })
}
module.exports = router;