const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3308',
    user: 'root',
    password: 'Dlawodnjs123!',
    database: 'onemarket',
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        console.log('DB 연결 실패');
    } else {
        console.log('DB 연결 성공');
    }
});

module.exports = connection;
