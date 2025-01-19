// dbConnection.ts
import mysql from "mysql";
import dotenv from "dotenv";


dotenv.config();

let connection: mysql.Connection;

export const mysqlClient = (): mysql.Connection => {
  if (!connection) {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(`${process.env.DB_PORT}`),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  return connection;
};

