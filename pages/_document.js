import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="GPT-3 Writer" key="title"/>
        <meta property="og:description" content="write your blog in few seconds" key="description"/>
        <meta
          property="og:image"
          content="https://ibb.co/sQWLvQC"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
