const db = require('../utils/db.js');

//const query = util.promisify(conn.query).bind(conn);

class MenuRepo {
    static async getByRestaurant(restaurantid) {
        const conn = await db.getConnection();
        var sql = "SELECT * FROM Menu WHERE RestaurantId = ? LIMIT 1";
        let [rows] = await conn.execute(sql, [restaurantid]);
        if (rows.length > 0) {
            return rows[0];
            
        }
        return null;
    }

    static async getById(id) {
        const conn = await db.getConnection();
        var sql = "SELECT * FROM Menu WHERE Id = ? LIMIT 1";
        let [rows] = await conn.execute(sql, [id]);
        if (rows.length > 0) {
            return rows[0];
            
        }
        return null;
    }

    static async create(menu) {
        console.log(menu);
        var conn = await db.getConnection()
        var sql = "INSERT INTO Menu(Name,RestaurantId,MenuData,CreatedOn) VALUES (?, ?, ?, ?)";
        var records = [menu.Name, menu.RestaurantId, menu.MenuData, menu.CreatedOn];
        let [rows] = await conn.execute(sql, records);
        console.log(rows);
        return rows.insertId;
    }

    static async delete(id) {
        var conn = await db.getConnection()
        var sql = "DELETE FROM Menu WHERE Id = ?";
        var records = [id];
        let [rows] = await conn.execute(sql, records);
        console.log(rows);
        return rows.deletedId;
    }
}

module.exports = MenuRepo