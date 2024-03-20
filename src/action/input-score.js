"use server";

import Joi from "joi";
import query, { update } from "../db/config";
import { STATUS_MESSAGE } from "../enum";
import ResponseError from "../errors";
import { validate } from "../utils";

export async function insertScore(payload) {
  try {
    const isMultiple = !!payload?.length;
    if (isMultiple) {
      for (const item of payload) {
        await updateKlasmenClub(item);
      }
    } else {
      await updateKlasmenClub(payload);
    }

    return { status: STATUS_MESSAGE.Ok };
  } catch (e) {
    return { status: e.status, message: e.message };
  }
}

function getPoint(score1, score2) {
  // match seri
  if (score1 === score2) {
    return {
      score1: 1,
      score2: 1,
    };
  }

  return {
    score1: score1 > score2 ? 3 : 0,
    score2: score2 > score1 ? 3 : 0,
  };
}

const validationInsertScore = Joi.object({
  clubName1: Joi.string().max(100).required(),
  clubName2: Joi.string().max(100).required(),
  clubScore1: Joi.number().required(),
  clubScore2: Joi.number().required(),
});

async function updateKlasmenClub(item) {
  try {
    const validation = validate(validationInsertScore, item);
    const dataKlasemen = await query(
      "SELECT * FROM klasemen WHERE klasemen.nama_club = ? OR klasemen.nama_club = ?",
      [`${validation.clubName1}`, `${validation.clubName2}`]
    );

    if (dataKlasemen?.length !== 2) {
      throw new ResponseError(STATUS_MESSAGE.error, "Klub tidak diketahui");
    }
    const club1 = dataKlasemen.find(
      (club) => club.nama_club === validation.clubName1
    );
    const club2 = dataKlasemen.find(
      (club) => club.nama_club === validation.clubName2
    );

    const clubOneIsWin = validation.clubScore1 > validation.clubScore2;
    const matchSeri = validation.clubScore1 === validation.clubScore2;
    const clubTwoIsWin = validation.clubScore1 < validation.clubScore2;
    const payloads = [
      {
        nama_club: club1.nama_club,
        main: club1.main + 1,
        menang: +club1.menang + (clubOneIsWin ? 1 : 0),
        seri: club1.seri + (matchSeri ? 1 : 0),
        kalah: club1.kalah + (!clubOneIsWin && !matchSeri ? 1 : 0),
        gm: club1.gm + validation.clubScore1,
        gk: club1.gk + validation.clubScore2,
        point:
          club1.point +
          getPoint(validation.clubScore1, validation.clubScore2).score1,
      },
      {
        nama_club: club2.nama_club,
        main: +club2.main + 1,
        menang: +club2.menang + (clubTwoIsWin ? 1 : 0),
        seri: club2.seri + (matchSeri ? 1 : 0),
        kalah: club2.kalah + (!clubTwoIsWin && !matchSeri ? 1 : 0),
        gm: club2.gm + validation.clubScore2,
        gk: club2.gk + validation.clubScore1,
        point:
          club2.point +
          getPoint(validation.clubScore1, validation.clubScore2).score2,
      },
    ];
    
    for (const payload of payloads) {
     
      await update({
        table: "klasemen",
        data: payload,
        where: { nama_club: payload.nama_club }
      });
    }
    return true;
  } catch (e) {
    throw { status: e?.status || 400, message: e?.message || "error" };
  }
}
