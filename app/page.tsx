"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { name_list } from "./khodam";

export default function Home() {
  const [result, setResult] = useState<string>("");
  const handleCek = (event: any) => {
    event.preventDefault();

    if (localStorage.getItem("name_cache") === null) {
      localStorage.setItem("name_cache", JSON.stringify([]));
    }

    const search = event.target.search.value;
    if (search === "") {
      setResult("");
      return;
    }

    const nameCache = JSON.parse(localStorage.getItem("name_cache")!);
    const findNameCache = nameCache.find((i: any) => i.name === search);

    if (findNameCache !== undefined) {
      setResult(findNameCache.result);
      setIsLoading(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * 100);
    setResult(name_list[randomIndex]);
    setIsLoading(true);

    nameCache.push({
      name: search,
      result: name_list[randomIndex],
    });
    localStorage.setItem("name_cache", JSON.stringify(nameCache));
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [result]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-950">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div>
          <h1 className="text-6xl font-black font-sans text-white">
            Cek Khodam Online
          </h1>
          <form className="relative mt-8" onSubmit={handleCek}>
            <input
              type="text"
              name="search"
              placeholder="Tuliskan Nama"
              className="font-sans bg-transparent text-2xl outline-none text-gray-200 border-2 border-green-600 rounded-full py-4 px-10 w-full"
            />
            <button className="absolute top-0 right-0 bg-green-500 h-full py-4 px-10 font-sans rounded-full text-xl">
              Cek
            </button>
          </form>

          <p className="text-xl text-white mt-6 px-10 py-3 bg-zinc-800 rounded-xl">
            Khodam Anda adalah: {isLoading ? "Mencari...." : result}
          </p>
        </div>

        <Image
          className="font-sans relative"
          src="/aing-maung.jpeg"
          alt="Next.js Logo"
          width={400}
          height={400}
          priority
        />
      </div>
    </main>
  );
}
