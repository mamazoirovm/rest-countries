import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/navigation"; // Import useRouter hook from next/navigation
import Link from "next/link";

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
  subregion: string[];
  borders: Array<{ common: string; slug: string; _id: string }>;
  cca3: string;
}

const getPost = async (cca3: string) => {
  const res = await fetch(
    `https://frontend-mentor-apis-6efy.onrender.com/countries/${cca3}`
  );
  const post: IPost = await res.json();
  return post;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch("https://frontend-mentor-apis-6efy.onrender.com/countries");
    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Data is not an array");
    }

    const paths = data.map((country: IPost) => ({
      params: { cca3: country.cca3 },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { paths: [], fallback: false };
  }
};


export const getAppProps: GetAppProps = async ({ params }) => { 
 
  const post = await getPost(params?.cca3 as string);

  return {
    props: {
      post,
    },
  };
};

const page = ({ post }: { post: IPost }) => {
  const router = useRouter(); // Use useRouter hook

 
  return (
    <div>
      <Link href="/">Back</Link>
      <div>
        <img src={post.flags.png} />
        <div className="flex flex-col">
          <h1>{post.name.common}</h1>
          <div className="flex justify-between">
            <span>
              <h1>
                <strong>Native Name:</strong> {post.name.nativeName}
              </h1>
              <h1>
                <strong>Population:</strong> {post.population}
              </h1>
              <h1>
                <strong>Region:</strong> {post.region}
              </h1>
              <h1>
                <strong>Sub Region:</strong> {post.subregion}
              </h1>
              <h1>
                <strong>Capital:</strong> {post.capital}
              </h1>
            </span>
            <span>
              <h1>
                <strong>Currencies:</strong> {post.currencies}
              </h1>
              <h1>
                <strong>Languages:</strong> {post.languages}
              </h1>
            </span>
          </div>
          <div>
            <h1>
              Border Countries:{" "}
              {post.borders.map((bor) => (
                <span key={bor.slug}>{bor.common}</span>
              ))}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
