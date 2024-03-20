"use client";
import cn from "classnames";
import Input from "../../components/input";

export default function ClubVsClub({
  clubs,
  onChange,
  allMatch = [],
  matchClubs,
  index,
  indexDoubleMatch = [],
}) {

  return (
    <div
      className={cn(
        "flex items-center gap-x-2 bg-white last:border-none border-b-2",
        {
          "!bg-red-400": indexDoubleMatch.includes(index),
        }
      )}
    >
      <div className="px-5 pt-5 pb-6 flex flex-col gap-y-2 justify-center items-center w-full">
        <OptionsClub
          required
          clubs={clubs}
          onChange={(e) => {
            onChange("clubName1", index, e.target.value);
          }}
          defaultValue={matchClubs?.clubName1 || ""}
          disabledOption={matchClubs.clubName2}
          allMatch={allMatch || []}
        />
        <Input
          required
          type="number"
          className="w-16 text-center rounded-none"
          placeholder="Skor"
          value={matchClubs?.clubScore1}
          onChange={(e) => onChange("clubScore1", index, e.target.value)}
        />
      </div>
      <div className="font-semibold text-2xl">VS</div>
      <div className="p-5 flex flex-col gap-y-2 justify-center items-center w-full">
        <OptionsClub
          clubs={clubs}
          onChange={(e) => {
            onChange("clubName2", index, e.target.value);
          }}
          defaultValue={matchClubs?.clubName2 || ""}
          disabledOption={matchClubs.clubName1}
          allMatch={allMatch || []}
        />
        <Input
          required
          type="number"
          className="w-16 text-center rounded-none"
          placeholder="Skor"
          value={matchClubs?.clubScore2}
          onChange={(e) => onChange("clubScore2", index, e.target.value)}
        />
      </div>
    </div>
  );
}

function OptionsClub({ required,defaultValue, clubs, onChange, disabledOption }) {
  return (
    <select
      required={required}
      name="clubName1"
      onChange={onChange}
      className="w-full border p-2"
      value={defaultValue}
    >
      <option disabled={true} value="">
        Pilih Club
      </option>
      {clubs.map((club, key) => (
        <option
          key={key}
          value={club.nama_club}
          disabled={disabledOption === club.nama_club}
        >
          {club.nama_club}
        </option>
      ))}
    </select>
  );
}
