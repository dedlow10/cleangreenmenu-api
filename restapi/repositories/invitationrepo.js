const db = require('../utils/db.js');

class InvitationRepo {
    static async getById(id) {
        const conn = await db.getConnection();
        var sql = "SELECT * FROM Invitations WHERE InvitationGuid = ?";
        let [rows] = await conn.execute(sql, [id]);
        if (rows.length > 0) {
            return rows[0];
            
        }
        return null;
    }
    static async setInvitationNotPending(id) {
        const conn = await db.getConnection();
        var sql = "UPDATE Invitations SET IsPending = 0 WHERE InvitationGuid = ?";
        let [rows] = await conn.execute(sql, [id]);
        return rows;
    }
}

module.exports = InvitationRepo;