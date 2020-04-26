var path = require('path');

var configuration = {
    migrationsDir: path.resolve(__dirname, 'migrations'), // This is the directory that should contain your SQL migrations.
    host: 'prodmysql.cphdeyoxcjbz.us-east-1.rds.amazonaws.com', // Database host
    port: 3306, // Database port
    db: 'CleanGreenMenu', // Database name
    user: 'dedlow', // Database username
    password: 'Soccer1985', // Database password
    adapter: 'mysql', // Database adapter: pg, mysql
    // Parameters are optional. If you provide them then any occurrences of the parameter (i.e. FOO) in the SQL scripts will be replaced by the value (i.e. bar).
};

require('sql-migrations').run(configuration);