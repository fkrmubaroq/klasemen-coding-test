
import query from "../../db/config";
import CardClub from "./CardClub";
export default async function InputSkor() {
  const clubs = await query("SELECT * FROM club");
  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <CardClub clubs={clubs} />
    </div>
  );
}
