import mysql from "mysql2/promise";
import { objectDataToQueryBind, printString } from "../utils";

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 30000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export default async function query(query, values) {
  try {
    const db = await connection.getConnection();
    const [results] = await db.execute(query, values);
    db.release();
    return results;
  } catch (error) {
    return { error };
  }
}

export async function update({ table, data, where }) {
  const dataBind = Object.values(data);
  const whereBind = Object.values(where);
  const dataUpdate = objectDataToQueryBind({
    data,
    allValues: "?",
    separator: ",",
  });
  const dataWhere = objectDataToQueryBind({
    data: where,
    allValues: "?",
    separator: "AND",
  });
  const db = await connection.getConnection();
  const [results] = await db.execute(`UPDATE ${table} SET ${dataUpdate}  WHERE ${dataWhere}`, [
    ...dataBind,
    ...whereBind,
  ]);
  db.release();
  return results;
}

export async function insert({ table, data }) {
  const columns = Object.keys(data)?.join(",");
  const values = Object.values(data);
  const db = await connection.getConnection();
  const [results] = db.execute(
    `INSERT INTO ${table} (${columns}) VALUES (${printString(
      "?",
      values.length,
      ","
    )}) `,
    values
  );
  return results;
}

export async function count(query, values) {
  try {
    const db = await connection.getConnection();
    const [results] = await db.query(query, values);
    db.release();
    return results?.length || 0;
  } catch (error) {
    return { error };
  }
}

export async function deleteRow({ table, where }) {
  try {
    const dataWhere = objectDataToQueryBind({
      data: where,
      allValues: "?",
      separator: "AND",
    });
    const db = await connection.getConnection();
    const whereBind = Object.values(where);
    const results = await db.execute(
      `DELETE FROM ${table} WHERE ${dataWhere}`,
      whereBind
    );
    db.release();
    return results?.length || 0;
  } catch (error) {
    return { error };
  }
}
