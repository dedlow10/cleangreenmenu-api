const db = require('../utils/db.js');

//const query = util.promisify(conn.query).bind(conn);

class RestaurantRepo {
    static async getById(id) {
        const conn = await db.getConnection();
        var sql = "SELECT * FROM Restaurant WHERE Id = ?";
        let [rows] = await conn.execute(sql, [id]);
        return rows;
    }

    static async create(restaurant) {
        var conn = await db.getConnection()
        var sql = "INSERT INTO Restaurant(Name,Code) VALUES (?, ?)";
        var records = [restaurant.Name, restaurant.Code];
        let [rows] = await conn.execute(sql, records);
        console.log(rows);
        return rows.insertId;
    }

    static async list() {
        const conn = await db.getConnection();
        var sql = "SELECT * FROM Restaurant LIMIT 1000";
        let [rows] = await conn.execute(sql);
        return rows;
    }
}

module.exports = RestaurantRepo