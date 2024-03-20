"use server";

import { insert } from "../db/config";



export async function AddClub(payload) {
  // const data = JSON.parse(payload);
  return insert({
    table: "club",
    data: payload
  })
}