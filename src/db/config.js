import { objectDataToQueryBind, printString } from "../utils";
import pool from "./pool";


export default async function query(query, values) {
  try {
    const db = await pool.getConnection();
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
  const db = await pool.getConnection();
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
  const db = await pool.getConnection();
  const [results] = await db.execute(
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
    const db = await pool.getConnection();
    const [results] = await db.execute(query, values);
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
    const db = await pool.getConnection();
    const whereBind = Object.values(where);
    const [results] = await db.execute(
      `DELETE FROM ${table} WHERE ${dataWhere}`,
      whereBind
    );
    db.release();
    return results?.length || 0;
  } catch (error) {
    return { error };
  }
}
