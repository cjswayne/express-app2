const { faker } = require('@faker-js/faker');

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'learning2.c3aue4iwcwie.us-east-2.rds.amazonaws.com',
    user: 'cjswayne',
    password: 'password',
    database: 'user_app',
    multipleStatements: true
}).promise();

const users = [];
let amount = 10;

while(amount--){
    const userName = faker.internet.userName()
    users.push({
        username:userName,
        email:`${userName}@gmail.com`,
        password:'password123'
    })
}

const preparedUsers = users.map(user => [user.username, user.email, user.password]);

const tableSchema = `
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);
`

async function seed() {
    try{
        await db.query(`DROP TABLE IF EXISTS users; ${tableSchema}`);

        console.log('Table Made');
    
        await db.query('INSERT INTO users (username, email, password) VALUES ?', [preparedUsers]);
    
        console.log('Users Seeded');
        
        process.exit();
    } catch (err){
        console.log(err);
    }
    

}


console.log(preparedUsers);



// make sure to get all the .env stuff

// Double triple check when injecting sql queries

seed();