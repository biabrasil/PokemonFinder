import { useEffect, useState } from "react";

type PokemonAPIResult = {
  name: string;
  url: string;
};

type PokemonDetails = {
  name: string;
  types: { type: { name: string; url: string } }[];
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
};

type Pokemon = {
  name: string;
  url: string;
  id: string;
  types: string[];
  weight: number;
  height: number;
  abilities: string[];
};

export default function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittedSearch, setSubmittedSearch] = useState("");

  const [nextUrl, setNextUrl] = useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon"
  );

  function getIdFromUrl(url: string) {
    return url.split("/").filter(Boolean).pop()!;
  }

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = (formData.get("search") as string).trim().toLowerCase();

    setSubmittedSearch(query);

    if (!query) return;

    const exists = pokemon.find((p) => p.name.toLowerCase() === query);
    if (exists) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      if (!response.ok) throw new Error("Pokémon not found.");

      const details: PokemonDetails & { id: number } = await response.json();
      const newPokemon: Pokemon = {
        name: details.name,
        id: details.id.toString(),
        url: `https://pokeapi.co/api/v2/pokemon/${details.name}`,
        types: details.types.map((t) => t.type.name),
        weight: details.weight,
        height: details.height,
        abilities: details.abilities.map((a) => a.ability.name),
      };

      setPokemon((prevPokemon) => [...prevPokemon, newPokemon]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error has occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  const fetchPokemon = async () => {
    if (!nextUrl || loading) return;
    setLoading(true);
    try {
      const response = await fetch(nextUrl);
      const data: { results: PokemonAPIResult[]; next: string | null } =
        await response.json();

      const detailedData: Pokemon[] = await Promise.all(
        data.results.map(async (p) => {
          const details: PokemonDetails = await (await fetch(p.url)).json();

          return {
            name: details.name,
            url: p.url,
            id: getIdFromUrl(p.url),
            types: details.types.map((t) => t.type.name),
            weight: details.weight,
            height: details.height,
            abilities: details.abilities.map((a) => a.ability.name),
          };
        })
      );

      setPokemon((prev) => [...prev, ...detailedData]);
      setNextUrl(data.next);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Failed to fetch Pokémon", error.message);
        setError(error.message);
      } else {
        console.log("Failed to fetch Pokémon:", error);
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  //handle scroll to show more Pokemon
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        fetchPokemon();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextUrl, loading]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-red-500">Loading...</p>}

      <form onSubmit={handleSearch}>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            name="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500"
            placeholder="Search"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 top-1/2 -translate-y-1/2
             bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none 
             focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      <ul
        className={`grid gap-4 ${
          submittedSearch
            ? "grid-cols-1"
            : "grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4"
        } `}
      >
        {pokemon
          .filter((p) =>
            submittedSearch
              ? p.name.toLowerCase() === submittedSearch.toLocaleLowerCase()
              : true
          )

          .map((p) => {
            const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;
            return (
              <li
                key={p.name}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex justify-center">
                  <img src={imgUrl} alt={p.name} className="rounded-t-lg" />
                </div>

                <div className="pt-0 p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {p.name}
                    </h5>
                  </a>
                  <p className="flex flex-col flex-wrap content-center justify-center items-center font-normal text-sm text-neutral-200 dark:text-gray-400 bg-indigo-400 rounded-t-sm  break-words p-2">
                    <b>Type:</b> {p.types.join(", ")}
                  </p>
                  <div className="grid grid-cols-2 flex justify-left mb-3">
                    <p className="flex flex-col flex-wrap content-center justify-center items-center font-normal text-sm text-neutral-200 dark:text-gray-400 break-words px-2 bg-indigo-700 rounded-bl-sm p-2">
                      <b>Weight:</b> {p.weight} lbs
                    </p>
                    <p className="flex flex-col flex-wrap content-center justify-center items-center font-normal text-sm text-neutral-200 dark:text-gray-400 break-words px-2 bg-indigo-800 rounded-br-sm p-2">
                      <b>Height:</b> {p.height} ft
                    </p>
                  </div>
                  <p className="flex flex-col flex-wrap content-center justify-center items-center font-normal text-sm ">
                    <b>Abilities:</b>
                  </p>
                  {p.abilities.map((ability, index) => (
                    <p
                      key={index}
                      className="flex flex-col flex-wrap content-center justify-center items-center font-normal text-sm text-neutral-700 dark:text-gray-400 bg-amber-400 rounded-full mb-1 break-all px-2"
                    >
                      {ability}
                    </p>
                  ))}
                  {/* <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a> */}
                </div>
              </li>
            );
          })}
      </ul>
      {submittedSearch && (
        <button
          type="button"
          onClick={() => setSubmittedSearch("")}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-800 rounded-lg hover:bg-indigo-950 focus:ring-4 focus:outline-none focus:ring-gray-300"
        >
          ← Back to all Pokémon
        </button>
      )}
    </div>
  );
}
