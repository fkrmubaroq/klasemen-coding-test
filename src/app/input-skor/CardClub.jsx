"use client";
import cn from "classnames";
import { useEffect, useState } from "react";
import { insertScore } from "../../action/input-score";
import Button from "../../components/button";
import Card from "../../components/card";
import Error from "../../components/error";
import Success from "../../components/success";
import { STATUS_MESSAGE } from "../../enum";
import ClubVsClub from "./ClubVsClub";
const tabs = ["Single", "Multiple"];
const initMatch = [
  {
    clubName1: "",
    clubName2: "",
    clubScore1: 0,
    clubScore2: 0,
  },
];
export default function CardClub({ clubs }) {
  const [activeTab, setActiveTab] = useState("Single");
  const [matchClubSingle, setMatchClubSingle] = useState(initMatch[0]);
  const [matchClubMultiple, setMatchClubMultiple] = useState(initMatch);
  const [indexDoubleMatch, setIndexDoubleMatch] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    if (!matchClubMultiple.length) return;
    const matches = new Set([]);
    const indexTemp = [];
    for (const [key, match] of matchClubMultiple.entries()) {
      if (!match.clubName1 || !match.clubName2) continue;
      if (matches.has(`${match.clubName1}-${match.clubName2}`)) {
        indexTemp.push(key);
        continue;
      }
      matches.add(`${match.clubName1}-${match.clubName2}`);
      matches.add(`${match.clubName2}-${match.clubName1}`);
    }
    setIndexDoubleMatch(indexTemp.length ? indexTemp : []);
  }, [matchClubMultiple]);


  const onChangeSingle = (name, index, value) => {
    setMatchClubSingle((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onChangeMultiple = (name, index, value) => {
    setMatchClubMultiple((prev) => {
      return prev.map((match, i) => (i === index ? { ...match, [name]:value} : match));
    });
  };

  const onSave = async () => {
    const insertData = await insertScore(activeTab === "Single" ? matchClubSingle : matchClubMultiple);
    if (insertData.status !== STATUS_MESSAGE.Ok) {
      setError(insertData.message);
      return;
    }

    activeTab === "Single" && setMatchClubSingle(initMatch[0]);
    activeTab === "Multiple" && setMatchClubMultiple(initMatch);
    setSuccess("Skor berhasil ditambahkan");
  }

  return (
    <>
      
      {!!error && !success && <Error>{Error}</Error>}
      {!!success && !error && <Success>{success}</Success>}

      <Tabs menus={tabs} onClick={setActiveTab} activeTab={activeTab} />

      <Card className="w-[500px]">
        <div className="w-full flex flex-col gap-y-3">
          {activeTab === "Single" && (
            <ClubVsClub
              index={0}
              onChange={onChangeSingle}
              clubs={clubs}
              matchClubs={matchClubSingle}
            />
          )}

          {activeTab === "Multiple" &&
            matchClubMultiple.map((match, key) => (
              <ClubVsClub
                key={key}
                index={key}
                onChange={onChangeMultiple}
                clubs={clubs}
                matchClubs={match}
                allMatch={matchClubMultiple}
                indexDoubleMatch={indexDoubleMatch}
              />
            ))}
        </div>
        {activeTab === "Multiple" && (
          <div
            className="w-full h-[130px] cursor-pointer border-4 flex justify-center items-center border-dashed hover:!bg-gray-50 !text-gray-400"
            onClick={() =>
              setMatchClubMultiple((state) => [...state, { ...initMatch[0] }])
            }
          >
            ADD
          </div>
        )}

        <Button
          disabled={!!indexDoubleMatch.length}
          className="mt-4 w-full"
          onClick={onSave}
        >
          Save
        </Button>
      </Card>
    </>
  );
}

function Tabs({ onClick, menus, activeTab }) {
  return (
    <div className="flex mt-3 bg-white w-auto justify-center items-center">
      {menus.map((tab, key) => (
        <div
          key={key}
          className={cn(
            "flex hover:bg-blue-600 hover:text-white text-sm cursor-pointer  px-3 py-3 justify-center items-center",
            {
              "bg-blue-600 text-white": activeTab === tab,
            }
          )}
          onClick={() => onClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}

function MatchClubSingle({ onChange, clubs, matchClubs }) {
  return (
    <ClubVsClub
      index={0}
      onChange={onChange}
      clubs={clubs}
      matchClubs={matchClubs}
    />
  );
}
