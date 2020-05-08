module.exports = {
    unauthorized: function() {
        return {
            statusCode: 403,
            body: JSON.stringify({
                statusCode: 401,
                error: "Not Authorized",
                message: "Not Authorized" 
            } ),
          };
    },
    notfound: function() {
        return {
            statusCode: 401,
            body: JSON.stringify({
                statusCode: 401,
                error: "Not Found",
                message: "Not Found" 
            } ),
          };
    }
}