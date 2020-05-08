const db = require('../utils/db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class AccountRepo {
    static async create(account) {
        let generatedHash;
        let generatedSalt;

        await new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(account.Password, salt, function(err, hash) {
                    generatedHash = hash;
                    generatedSalt = salt;
                    resolve(hash);
                });
            })
        });

        var conn = await db.getConnection()
        var sql = "INSERT INTO Users(EmailAddress,FirstName,LastName,RoleId,PasswordHash,PasswordSalt) VALUES (?, ?, ?, ?, ?, ?)";
        var records = [account.EmailAddress, account.FirstName, account.LastName, account.RoleId, generatedHash, generatedSalt];
        let [rows] = await conn.execute(sql, records);
        return rows.insertId;
    }

    static async getByEmail(email) {
        const conn = await db.getConnection();
        var sql = "SELECT * FROM Users WHERE EmailAddress = ?";
        let [rows] = await conn.execute(sql, [email]);
        if (rows.length > 0) {
            return rows[0];
            
        }
        return null;
    }

    static async getRoleById(id) {
        const conn = await db.getConnection();
        var sql = "SELECT r.Name FROM Users u JOIN Roles r ON r.Id = u.RoleId WHERE u.Id = ? LIMIT 1";
        let [rows] = await conn.execute(sql, [id]);
        if (rows.length > 0) {
            return rows[0].Name;
            
        }
        return null;
    }

    static async validateUserPassword(email, password) {
        const conn = await db.getConnection();
        var sql = "SELECT PasswordHash, PasswordSalt FROM Users WHERE EmailAddress = ?";
        let [rows] = await conn.execute(sql, [email]);
        if (rows.length > 0) {
            let user = rows[0];
            const hash = await bcrypt.hash(password, user.PasswordSalt);
            return hash === user.PasswordHash;
        }
        return false;
    }
}

module.exports = AccountRepo;