"use client";
import Link from "next/link";
import "./globals.css";
interface IPost {
  name: {
    common: string;
    nativeName: string;
    slug: string;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  currencies: string[];
  region: string;
  capital: string[];
  population: number;
  languages: string[];
  borders: Array<{ common: string; slug: string; _id: string }>;
  cca3: string;
}

const getData: () => Promise<IPost[]> = async () => {
  try {
    const res = await fetch(
      "https://frontend-mentor-apis-6efy.onrender.com/countries"
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default async function Home({ posts }: { posts: IPost[] }) {
  try {
    const response = await getData();
    const posts = response.data; 

    return (
      <div className="w-full flex flex-wrap gap-6 m-auto p-20 main">
        {Array.isArray(posts) ? (
          posts.map((country) => (
            <Link href={`/post/${country.cca3}`} key={country.cca3}>
              <div
                className="max-w-xs overflow-hidden bg-white shadow-[0px_0px_7px_2px_rgba(0,_0,_0,_0.03)] rounded pb-8"
                key={country.cca3}
              >
                <img
                  className="rounded-tl-lg image rounded-tr-lg border-b h-44"
                  src={country.flags.png}
                  alt={country.flags.alt}
                />
                <div className="flex flex-col w-full px-5 gap-3">
                  <h1 className="text-xl mb-2 font-semibold mt-3">
                    {country.name.common}
                  </h1>
                  <h4 className="">
                    <strong>Population:</strong> {country.population}
                  </h4>
                  <p>
                    <strong>Region:</strong> {country.region}
                  </p>
                  <h3>
                    <strong>Capital:</strong> {country.capital.join(", ")}
                  </h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No data available</div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
