import Image from "next/image";
import styles from "./page.module.css";

async function getDateTimeFromAPI(requestInit: RequestInit) {
  const res = await fetch(
    "http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires",
    requestInit
  );
  const data = (await res.json()) as { datetime: string };
  return data.datetime.split(".")[0];
}

export default async function Home() {
  const [forceCache, noCache, swr10, swr60] = await Promise.all([
    getDateTimeFromAPI({ cache: "force-cache" }),
    getDateTimeFromAPI({ cache: "no-cache" }),
    getDateTimeFromAPI({ next: { revalidate: 10 } }),
    getDateTimeFromAPI({ next: { revalidate: 60 } }),
  ]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>

        <pre>
          <code>
            {JSON.stringify(
              {
                forceCache,
                noCache,
                swr10,
                swr60,
              },
              null,
              2
            )}
          </code>
        </pre>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
