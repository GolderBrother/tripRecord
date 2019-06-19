const pool = require("../config/mysql");
// 本地记录数据库中总出行里程
let allDistanceData = {
    allBus: 0,
    allCycle: 0,
    allDrive: 0,
    allRun: 0,
    allTaxi: 0,
    allWalk: 0
}
class TripService {
    static async getHistoryList(userId) {
        //增删改查之后查询，并把查询的最终数据返回前端
        let data = {};
        try {
            data = await new Promise((resolve, reject) => {

                let _data = {
                    code: 200,
                    msg: 'success'
                };
                pool.query(`SELECT * FROM trip where userId=${userId}`, function (err, results, fields) {
                    if (err) {
                        _data.code = 500
                        _data.msg = err
                        reject(_data);
                    };
                    // 更改经纬度坐标数据类型
                    results.forEach((item) => {
                        if (item.trajectory) {
                            item.trajectory = JSON.parse(item.trajectory)
                        }
                        if (item.startCode) {
                            item.startCode = item.startCode.split(',')
                            item.endCode = item.endCode.split(',')
                        }
                    })
                    _data.data = results.reverse();
                    resolve(_data);
                });
            });
        } catch (error) {
            throw new Error(error);
        }
        return data;
    }
    static async allDistance(userId) {
        let data = {};
        //增删改查之后查询，并把查询的最终数据返回前端
        try {
            data = await new Promise((resolve, reject) => {
                let _data = {
                    code: 200,
                    msg: 'success'
                };;
                pool.query(`SELECT * FROM trip where userId=${userId}`, function (err, results, fields) {
                    if (err) {
                        _data.code = 500
                        _data.msg = err
                        reject(_data)
                    };
                    if(results && results[0]){
                        // 更改经纬度坐标数据类型
                        _data.data = results[0]
                        allDistanceData = results[0]
                        resolve(_data);
                    }else {
                        reject("error")
                    }
                });
            });
        } catch (error) {
            throw new Error(error);
        }
        return data;
    }
    static async addTrip(query) {
        switch (query.tripType) {
            case "徒步出行":
                allDistanceData.allWalk = (Number(allDistanceData.allWalk) + Number(query.distance)).toFixed(2)
                allDistanceUpdate('allWalk', allDistanceData.allWalk, query.userId)
                break
            case "跑步出行":
                allDistanceData.allRun = (Number(allDistanceData.allRun) + Number(query.distance)).toFixed(2)
                allDistanceUpdate('allRun', allDistanceData.allRun, query.userId)
                break
            case "骑车出行":
                allDistanceData.allCycle = (Number(allDistanceData.allCycle) + Number(query.distance)).toFixed(2)
                allDistanceUpdate('allCycle', allDistanceData.allCycle, query.userId)
                break
            case "自驾出行":
                allDistanceData.allDrive = (Number(allDistanceData.allDrive) + Number(query.distance)).toFixed(2)
                allDistanceUpdate('allDrive', allDistanceData.allDrive, query.userId)
                break
        }
        console.log(query.tripType, allDistanceData);
        let data = {};
        try {
            data = await new Promise((resolve, reject) => {
                let _data = {
                    code: 200,
                    msg: 'success'
                };
                //增删改查之后查询，并把查询的最终数据返回前端
                pool.query(`INSERT INTO trip ( userId, type,tripType,distance,date,time,trajectory,Calorie,speed,mark) VALUES ('${query.userId}','${query.type}','${query.tripType}','${query.distance}','${query.date}','${query.time}','${query.trajectory}','${query.Calorie}','${query.speed}','${query.mark}')`, function (err, results, fields) {
                    if (err) {
                        _data.code = 500
                        _data.msg = err
                        reject(_data)
                    } else {
                        _data.msg = '成功'
                        _data.code = 200
                    }
                    resolve(_data);
                });
            });
        } catch (error) {
            throw new Error(error)
        }
        return data;
    }
    static async addTraffic(query) {
        let data = {};
        switch (query.tripType) {
            case "步行":
                allDistanceData.allWalk = (Number(allDistanceData.allWalk) + Number(query.distance)).toFixed(2)
                allDistanceUpdate('allWalk', allDistanceData.allWalk, query.userId)
                break
            case "出租车":
                allDistanceData.allTaxi = (Number(allDistanceData.allTaxi) + Number(query.distance)).toFixed(2)
                allDistanceUpdate('allTaxi', allDistanceData.allTaxi, query.userId)
                break
            case "单车/电车":
                allDistanceData.allCycle = (Number(allDistanceData.allCycle) + Number(query.distance)).toFixed(2)
                allDistanceUpdate('allCycle', allDistanceData.allCycle, query.userId)
                break
            case "公交/地铁":
                allDistanceData.allBus = (Number(allDistanceData.allBus) + Number(query.distance)).toFixed(2)
                allDistanceUpdate('allBus', allDistanceData.allBus, query.userId)
                break
        }
        try {
            data = await new Promise((resolve, reject) => {
                let _data = {
                    code: 200,
                    msg: 'success'
                };
                //增删改查之后查询，并把查询的最终数据返回前端
                pool.query(`INSERT INTO trip ( userId, type, tripType, distance, date, time, price, startPlace, endPlace, startCode, endCode, mark) VALUES ('${query.userId}','${query.type}','${query.tripType}','${query.distance}','${query.date}','${query.time}','${query.price}','${query.startPlace}','${query.endPlace}','${query.startCode}','${query.endCode}','${query.mark}')`, function (err, results, fields) {
                    if (err) {
                        _data.code = 500
                        _data.msg = err
                        reject(_data)
                    } else {
                        _data.msg = '成功'
                        _data.code = 200
                    };
                    resolve(_data);
                });
            });
        } catch (error) {
            throw new Error(error);
        }
        return data;
    }
}

// 更新里程
function allDistanceUpdate(key, value, userId) {
    console.log(`${key}出行里程更新`)
    console.log(allDistanceData)
    data.data = allDistanceData;
    pool.query(`UPDATE trip SET ${key}=${value} where userId=${userId}`, function (err, results, fields) {})
}

module.exports = TripService;