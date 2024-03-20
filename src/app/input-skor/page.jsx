
import query from "../../db/config";
import CardClub from "./CardClub";
export const dynamic = "force-dynamic";
export default async function InputSkor() {
  const clubs = await query("SELECT * FROM club");
  const data = JSON.parse(JSON.stringify(clubs || []));
  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <CardClub clubs={data} />
    </div>
  );
}
