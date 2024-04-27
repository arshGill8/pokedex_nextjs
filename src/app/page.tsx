import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";
import Image from "next/image";
import { url } from "inspector";

async function getPokeData() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=13"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function HomePage() {
  const { results } = await getPokeData();
  return (
    <main className="w-full h-full">
      {" "}
      <ul className="grid grid-cols-1 lg:grid-cols-3">
        {results.map(
          (
            pokemon: {
              types: string;
              name: string;
            },
            i: number
          ) => {
            return (
              <li
                key={i}
                className="text-gray-700 flex flex-col gap-2 items-center mb-8"
              >
                <div className="bg-white shadow-md rounded-xl w-78 h-100 p-4">
                  <h4 className="capitalize text-center font-semibold text-3xl  ">
                    {pokemon.name}
                  </h4>

                  <div className="mx-4 mt-4 text-gray-700 shadow-lg rounded-xl py-3 bg-white mb-8">
                    <Image
                      className="mx-auto object-contain h-64 w-60 p-3"
                      width={200}
                      height={100}
                      alt={pokemon.name}
                      src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
                    />
                  </div>

                  <div className="flex flex-col gap-6 items-center">
                    {" "}
                    <Image
                      style={{ imageRendering: "pixelated" }}
                      className="h-48 w-48 object-contain bg-yellow border-4 border-blue rounded-full p-3"
                      width={100}
                      height={100}
                      alt={pokemon.name}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        i + 1
                      }.png`}
                    />
                    <p className=" text-xl font-semibold">#00{i + 1} </p>
                  </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </main>
  );
}
