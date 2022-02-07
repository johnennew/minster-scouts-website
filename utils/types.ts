/**
 * @see https://prismic.io/blog/updated-javascript-client-and-helpers
 */

import * as prismicT from '@prismicio/types'

export type Homepage = prismicT.PrismicDocument<{
    title: prismicT.RichTextField;
    slices: prismicT.SliceZone;
}>

export type SiteConfiguration = prismicT.PrismicDocument<{
    beaversMeetingsDescription: prismicT.RichTextField;
    cubsMeetingsDescription: prismicT.RichTextField;
    scoutsMeetingsDescription: prismicT.RichTextField;
    defaultTitle: prismicT.KeyTextField;
    defaultDescription: prismicT.KeyTextField;
}>
