import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'uao_restaurants',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function checkParams(params) {
  if (!params) return;
  if (Array.isArray(params)) {
    if (params.some((v) => v === undefined)) {
      throw new Error('Parámetros undefined en la consulta SQL');
    }
  }
}

export async function query(sql, params = []) {
  checkParams(params);
  const [rows] = await pool.execute(sql, params);
  return rows;
}
