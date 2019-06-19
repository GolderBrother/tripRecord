/*
 * @Description: mysql连接池配置 
 * @Author: james.zhang 
 * @Date: 2019-06-17 21:12:18 
 * @Last Modified by: james.zhang 
 * @Last Modified time: 2019-06-17 21:12:18 
 */

const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'trip'
}
const pool = mysql.createPool(config);
module.exports = pool;