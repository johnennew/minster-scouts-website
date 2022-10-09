import { GetServerSideProps } from 'next'
import React from "react"
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Client } from '../utils/prismicHelpers'
import {SliceZone} from "@prismicio/react"
import * as prismic from "@prismicio/client";

// Slices
import TextAndImage from '../slices/TextAndImage'
import Meetings from "../slices/Meetings";
import Text from "../slices/Text";
import Image from "../slices/Image";
import Video from "../slices/Video";
import ContactForm from "../slices/ContactForm";

// Custom components
import Loader from '../components/Loader'
import Custom404 from './404'
import {ParsedUrlQuery} from "querystring";
import useUpdatePreviewRef from "../utils/useUpdatePreviewRef";
import {PageDocument, SiteConfigurationDocument} from "../types.generated";

type PageData = {
    page: PageDocument;
    config: SiteConfigurationDocument;
    previewRef: string | null;
    statusCode: 200;
}

type PageNotFound = {
    statusCode: 404;
}

type PreviewData = {
    ref: string;
}

const getSlug = (params: ParsedUrlQuery | undefined): string => {
    if (params && params.slug && Array.isArray(params.slug)) {
        return '/' + params.slug.join('/')
    }
    return '/';
}

export const getServerSideProps: GetServerSideProps<PageData | PageNotFound, ParsedUrlQuery, PreviewData | undefined> = async ({ params, previewData, res }) => {
    const previewRef = previewData ? previewData.ref : null
    const ref = previewRef ? { ref: previewRef } : {}

    const query = {
        ...ref,
        predicates: [
            prismic.predicate.at('document.type', 'page'),
            prismic.predicate.any('my.page.slug', [getSlug(params)]),
        ]
    }

    try {
        const page = await Client().getFirst<PageDocument>(query);
        const siteConfig = await Client().getSingle<SiteConfigurationDocument>('site-configuration');

        return {
            props: {
                page: page,
                config: siteConfig,
                previewRef: previewRef,
                statusCode: 200
            },
        }
    }
    catch(e) {
        res.statusCode = 404;
        return {
            props: {
                statusCode: 404
            },
        }
    }
}

const Page = ({ page, config, previewRef }: PageData) => {

    useUpdatePreviewRef(previewRef || '', page && page.id ? page.id : '');

    const router = useRouter();

    if (router.isFallback) {
        return <Loader />
    }

    if (!page || !page.id) {
        return <Custom404 />
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>{config.data.defaultTitle}</title>
        <meta name="description" content={config.data.defaultDescription ? config.data.defaultDescription : ''} />
        <link rel="icon" href="/favicon-16x16.png" />
        <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=minster-scouts"></script>
      </Head>

      <main className={styles.main}>
              <div className="title">
                  <h1>{page.data.title}</h1>
              </div>

              <div className="container">
                  <SliceZone
                      slices={page.data.slices}
                      components={{
                          contact_form: ContactForm,
                          text_and_image: TextAndImage,
                          meetings: Meetings,
                          text: Text,
                          image: Image,
                          video: Video,
                      }}
                      context={config}
                  />
              </div>

              <footer>
                  <div className="container">
                      <div className="row">
                          <img src="/scouts-stack-white.svg" alt="Scouts logo" className="mx-auto" width="110" height="80" />
                      </div>
                      <div className="row">
                          <p>&copy; 1st Minster Scout Group {(new Date().getFullYear())}</p>
                      </div>
                      <div className="row">
                          <ul className="footer-links">
                              <li><a href="https://www.thanetscouts.org.uk/">Thanet Scouts</a></li>
                              <li><a href="https://www.scouts.org.uk/">UK Scouts</a></li>
                              <li><a href="https://www.scout.org/">Global Scouts</a></li>
                          </ul>
                      </div>
                  </div>
              </footer>
      </main>

        <style jsx>{`
            .title {
              padding-bottom: 1rem;
              padding-top: 2rem;
              padding-left: 2rem;
              color: #fff !important;
              background-color: rgb(0, 47, 108);
              margin-bottom: 1rem;
            }     
            
            footer {
               background-color: #490499 !important;
               padding-top: 3rem;
               color: #fff !important;
            }
            
            footer > .container {
                display: flex;
                flex-direction: column;
                margin-bottom: 0 !important;
            }
            
            footer > .container > .row {
                margin: auto;
                margin-bottom: 1rem;
            }
            
            .footer-links {
                text-align: center !important;
                padding: 0 !important;
                list-style: none;
                margin-bottom: 1rem;
                margin-top: 0;
            }
            
            .footer-links > li {
                display: inline-block;
                margin-left: 1rem;
                margin-right: 1rem;
                margin-bottom: 1rem;
                margin-top: 0;
            }
    `}</style>

    </div>
  )
}

export default Page;
