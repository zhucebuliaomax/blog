import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>I/O</h1>
        </header>

        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <Text text={post.properties.Name.title} />
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
              </li>
            );
          })}
        </ol>
        <footer className={styles.footer}>
            <a href="https://twitter.com/ShrimpMr" target="_blank">
              Twitter
            </a>
               · 
            <a href="https://github.com/zhucebuliaomax" target="_blank">
              GitHub
            </a>
               · 
            <a href="https://instagram.com/unoldtree" target="_blank">
              Instagram
            </a>
            <small>
              <abbr title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License." style="cursor: help;">
                CC BY-NC 4.0
              </abbr> 
              <time>2023</time> © Max.
            </small>
        </footer>


      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
