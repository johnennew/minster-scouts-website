import Document, { Html, Head, Main, NextScript } from 'next/document'
import meta from '../site'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="follow, index" />
          <meta name="description" content={meta.description} />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@yourname" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.image} />
          <link rel="shortcut icon" href="/favicon.ico" type="image/vnd.microsoft.icon" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Minster Scouts RSS2 feed"
            href={`${meta.link}/feed.xml`}
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            title="Minster Scouts Atom Feed"
            href={`${meta.link}/atom.xml`}
          />
          <link
            rel="alternate"
            type="application/json"
            title="Minster Scouts JSON Feed"
            href={`${meta.link}/feed.json`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
