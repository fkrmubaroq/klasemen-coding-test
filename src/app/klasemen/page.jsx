import query from "../../db/config";
export const dynamic = "force-dynamic";

export default async function Klasemen() {
  const klasemen = await query("SELECT * FROM klasemen ORDER BY point DESC");
  const data = JSON.parse(JSON.stringify(klasemen || []));

  return (
    <div className="max-w-[1200px] mx-auto mt-10">
      <div className="font-semibold tracking-wide text-xl text-center mb-3">
        KLASEMENT SEMENTARA
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" class="px-6 py-3 w-[50px] text-center">
              NO
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              KLUB
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              MA
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              ME
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              S
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              K
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              GM
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              GK
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              POINT
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((club, key) => (
            <tr className="bg-white border-b" key={key}>
              <td class="px-6 py-4 text-center">{key + 1}</td>
              <td class="px-6 py-4">{club.nama_club}</td>
              <td class="px-6 py-4 text-center">{club.main}</td>
              <td class="px-6 py-4 text-center">{club.menang}</td>
              <td class="px-6 py-4 text-center">{club.seri}</td>
              <td class="px-6 py-4 text-center">{club.kalah}</td>
              <td class="px-6 py-4 text-center">{club.gm}</td>
              <td class="px-6 py-4 text-center">{club.gk}</td>
              <td class="px-6 py-4 text-center">{club.point}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}