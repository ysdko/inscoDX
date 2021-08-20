import Head from 'next/head';
import Link from 'next/Link';

export default function TopPage() {
  return (
    <>
      <Head>
        <title>Top Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/posts/capture"><a>score page!</a></Link>
      </main>
    </>
  )
}