import Link from "next/link";

const menus = [
  {
    name: "Input Club",
    page: "/input-club"
  },
  {
    name: "Input Skor",
    page: "/input-skor"
  },
  {
    name: "Klasemen",
    page: "/klasemen"
  },
];
export default function Header() {
  return <header className="flex gap-x-2 border p-3 ">
    {menus.map((item, key) => <Item key={key} data={item} />)}
  </header>
}

function Item({ data }){
  return  <Link className="flex gap-x-2 hover:bg-gray-300 w-32 justify-center items-center h-10 cursor-pointer" href={data.page}>{data.name}</Link>
}