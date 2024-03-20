"use client";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathName = usePathname();
  return <header className="flex gap-x-2 border p-3 bg-white mb-3">
    {menus.map((item, key) => <Item key={key} data={item} active={pathName.includes(item.page)} />)}
  </header>
}

function Item({ data, active }){
  return (
    <Link
      className={cn(
        "flex gap-x-2 hover:bg-gray-300 w-32 justify-center items-center h-10 cursor-pointer",
        { "bg-gray-200": active }
      )}
      href={data.page}
    >
      {data.name}
    </Link>
  );
}