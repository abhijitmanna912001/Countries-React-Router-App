import { Link } from "react-router";
import type { Route } from "./+types/countries";
import { useState } from "react";

export async function clientLoader() {
  const res = await fetch(
    "https://restcountries.com/v3.1/independent?status=true"
  );
  const data = await res.json();
  return data;
}

export default function Countries({
  loaderData,
}: Readonly<Route.ComponentProps>) {
  const [search, setSearch] = useState<string>("");

  const filteredCountries = loaderData.filter((country: any) => {
    const matchesSearch =
      !search ||
      country.name.common.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Countries</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={search}
          placeholder="Search by name..."
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <ul>
        {filteredCountries.map((country: any, key: number) => (
          <li key={key}>
            <Link to={`/countries/${country.name.common}`}>
              {country.name.common}
            </Link>
            <div>
              Region: {country.region} | Population {country.population}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
