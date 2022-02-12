import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Client } from '../utils/prismicHelpers'
import {PrismicRichText, SliceZone} from "@prismicio/react";
import TextAndImage from '../slices/TextAndImage'
import {Homepage, SiteConfiguration} from "../utils/types";
import Meetings from "../slices/Meetings";
import Text from "../slices/Text";
import Image from "../slices/Image";
import React from "react";
import Video from "../slices/Video";

type PageData = {
    page: Homepage;
    config: SiteConfiguration;
}

export const getServerSideProps: GetServerSideProps<PageData> = async (context) => {
  const homepage = await Client().getSingle<Homepage>('homepage');
  const siteConfig = await Client().getSingle<SiteConfiguration>('site-configuration');

  return {
    props: {
        page: homepage,
        config: siteConfig
    },
  }
}

export default function Home( pageData: PageData ) {

  return (
    <div className={styles.container}>
      <Head>
        <title>{pageData.config.data.defaultTitle}</title>
        <meta name="description" content={pageData.config.data.defaultDescription ? pageData.config.data.defaultDescription : ''} />
        <link rel="icon" href="/favicon-16x16.png" />
        <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=minster-scouts"></script>
      </Head>

      <main className={styles.main}>
              <div className="title">
                  <PrismicRichText field={pageData.page.data.title} />
              </div>

              <div className="container">
                  <SliceZone
                      slices={pageData.page.data.slices}
                      components={{
                          // @ts-ignore
                          text_and_image: TextAndImage,
                          // @ts-ignore
                          meetings: Meetings,
                          // @ts-ignore
                          text: Text,
                          // @ts-ignore
                          image: Image,
                          // @ts-ignore
                          video: Video,
                      }}
                      context={pageData.config}
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
