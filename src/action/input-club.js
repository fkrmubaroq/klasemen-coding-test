"use server";

import query, { insert } from "../db/config";
import { STATUS_MESSAGE } from "../enum";

import Joi from "joi";
import ResponseError from "../errors";
import { validate } from "../utils";

const validationInsertClub = Joi.object({
  nama_club: Joi.string().max(100).required(),
  kota: Joi.string().max(100).required(),
});

export async function insertClub(payload) {
  try {
    const validation = validate(validationInsertClub, payload);
    const checkDuplicateData = await query(
      "SELECT club.nama_club FROM club WHERE club.nama_club = ?",
      [validation.nama_club]
    );
    if (checkDuplicateData.length) {
      throw new ResponseError(
        STATUS_MESSAGE.error,
        "Nama Klub telah digunakan"
      );
    }
    await insert({
      table: "club",
      data: payload,
    });

    const payloadKlasemen = {
      nama_club: validation.nama_club,
      main: 0,
      menang: 0,
      seri: 0,
      kalah: 0,
      point: 0,
      gm: 0,
      gk: 0,
    };
    await insert({
      table: "klasemen",
      data: payloadKlasemen,
    });

    return { status: STATUS_MESSAGE.Ok };
  } catch (e) {
    return { status: e.status, message: e.message };
  }
}
