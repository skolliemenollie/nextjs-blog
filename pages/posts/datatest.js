import useSWR, { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = "https://www.biz2click.com/wp-json/wp/v2/posts/7";

export async function getServerSideProps() {
  const repoInfo = await fetcher(API);
  return {
    props: {
      fallback: {
        [API]: repoInfo
      }
    }
  };
}

function Repo() {
  const { data, error } = useSWR(API);

  // there should be no `undefined` state
  console.log("Is data readys?", !!data);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <div>
      <h1>{data.id}</h1>
      <p>{data.link}</p>
      <strong>👀 {data.status}</strong>{" "}
      <strong>✨ {data.slug}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}

export default function App({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Repo />
    </SWRConfig>
  );
}