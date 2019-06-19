const pool = require("../config/mysql");
class UserService {
    static async selectUser(userName, passWord) {
        let data = {};
        try {
            //增删改查之后查询，并把查询的最终数据返回前端
            data = await new Promise((resolve, reject) => {
                let _data = {
                    code: 200,
                    msg: 'success'
                };
                pool.query(`SELECT * FROM user where userName=${userName}`, async function (err, results, fields) {
                    if (err) {
                        _data.code = 500
                        _data.msg = err
                        reject(_data);
                    };
                    console.log(results);
                    if(results && results[0] && results[0].passWord === passWord) {
                        _data = await selectUser(results[0].userId)
                    }else {
                        _data.code = 400
                        _data.msg = '账号或密码输入有误' 
                    }
                    resolve(_data);
                });
            });
        } catch (error) {
            throw new Error(error);
        }
        return data;
    }
    static async tripTrend(userId) {
        let data = {};
        try {
            data = await new Promise((resolve, reject) => {
                let _data = {
                    code: 200,
                    msg: 'success'
                };
                pool.query(`SELECT * FROM trip where userId=${userId} and DATE_SUB(CURDATE(), INTERVAL 6 DAY) <= date(date)`, function (err, results, fields) {
                    if (err) {
                        _data.code = 500
                        _data.msg = err
                        reject(_data)
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

}

async function selectUser(id) {
    let data = {};
    try {
        data = await new Promise((resolve, reject) => {
            let _data = {
                code: 200,
                msg: 'success'
            };
            pool.query(`SELECT * FROM user_info where userId=${id}`, function (err, results, fields) {
                if (err) {
                    _data.code = 500
                    _data.msg = err
                };
                _data.code = 200
                _data.msg = 'sucess'
                _data.data = results[0]
                resolve(_data);
            });
        });
    } catch (error) {
        throw new Error(error);
    }
    return data;
}
module.exports = UserService;