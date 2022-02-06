import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Client } from '../utils/prismicHelpers'
import {PrismicRichText, SliceZone, SliceZoneComponents} from "@prismicio/react";
import TextAndImage from '../slices/TextAndImage'
import {Homepage, SiteConfiguration} from "../utils/types";
import Meetings from "../slices/Meetings";
import Text from "../slices/Text";
import Image from "../slices/Image";
import React from "react";

interface PageData {
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
        <title>1st Minster Scouts</title>
        <meta name="description" content="Information about the 1st Minster Scout Group in Thanet, Kent" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>

      <main className={styles.main}>
          <div id="content" className="pb-5">
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
                              <li><a href="https://www.scout.org/worldwide">Global Scouts</a></li>
                          </ul>
                      </div>
                  </div>
              </footer>
          </div>
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
                margin-right: 2rem;
                margin-bottom: 1rem;
                margin-top: 0;
            }
    `}</style>

    </div>
  )
}
