import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Soroban Vault</title>
        <meta name="description" content="Soroban Vault Next.js + TypeScript starter" />
      </Head>
      <main style={{padding: '4rem', fontFamily: 'system-ui, sans-serif'}}>
        <h1>Welcome to Soroban Vault</h1>
        <p>Next.js + TypeScript starter initialized.</p>
      </main>
    </>
  )
}