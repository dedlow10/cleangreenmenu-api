const db = require('../utils/db.js');

//const query = util.promisify(conn.query).bind(conn);

class RestaurantRepo {
    static async getById(id) {
        const conn = await db.getConnection();
        var sql = "SELECT * FROM Restaurant WHERE Id = ?";
        let [rows] = await conn.execute(sql, [id]);
        if (rows.length > 0) {
            return rows[0];
            
        }
        return null;
    }

    static async create(restaurant) {
        var conn = await db.getConnection()
        var sql = "INSERT INTO Restaurant(Name,Code,EmailAddress,CreatedOn) VALUES (?, ?, ?, ?)";
        var records = [restaurant.Name, restaurant.Code, restaurant.EmailAddress, restaurant.CreatedOn];
        let [rows] = await conn.execute(sql, records);
        console.log(rows);
        return rows.insertId;
    }

    static async delete(id) {
        var conn = await db.getConnection()
        var sql = "DELETE FROM Restaurant WHERE Id = ?";
        var records = [id];
        let [rows] = await conn.execute(sql, records);
        console.log(rows);
        return rows.deletedId;
    }

    static async list() {
        const conn = await db.getConnection();
        var sql = "SELECT * FROM Restaurant LIMIT 1000";
        let [rows] = await conn.execute(sql);
        return rows;
    }
}

module.exports = RestaurantRepo