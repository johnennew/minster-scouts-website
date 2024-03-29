// Code generated by prismic-ts-codegen. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for Page documents */
interface PageDocumentData {
    /**
     * Title of the page field in *Page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: page.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
    /**
     * The URL of the page (e.g. /about) field in *Page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: /about
     * - **API ID Path**: page.slug
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    slug: prismicT.KeyTextField;
    /**
     * Slice Zone field in *Page*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: page.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<PageDocumentDataSlicesSlice>;
}
/**
 * Slice for *Page → Slice Zone*
 *
 */
type PageDocumentDataSlicesSlice = ImageSlice | MeetingsSlice | TextSlice | TextAndImageSlice | VideoSlice;
/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<PageDocumentData>, "page", Lang>;
/** Content for Site configuration documents */
interface SiteConfigurationDocumentData {
    /**
     * When do the Beavers reguarly meet field in *Site configuration*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: Get in touch for meeting schedule.
     * - **API ID Path**: site-configuration.beaversMeetingsDescription
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    beaversMeetingsDescription: prismicT.RichTextField;
    /**
     * When do the Cubs reguarly meet field in *Site configuration*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: Get in touch for meeting schedule.
     * - **API ID Path**: site-configuration.cubsMeetingsDescription
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    cubsMeetingsDescription: prismicT.RichTextField;
    /**
     * When do the Scouts reguarly meet field in *Site configuration*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: Get in touch for meeting schedule.
     * - **API ID Path**: site-configuration.scoutsMeetingsDescription
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    scoutsMeetingsDescription: prismicT.RichTextField;
    /**
     * The default title tag to use field in *Site configuration*
     *
     * - **Field Type**: Text
     * - **Placeholder**: 1st Minster Scouts
     * - **API ID Path**: site-configuration.defaultTitle
     * - **Tab**: Metadata
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    defaultTitle: prismicT.KeyTextField;
    /**
     * The default description to use field in *Site configuration*
     *
     * - **Field Type**: Text
     * - **Placeholder**: About the 1st Minster Scout Group
     * - **API ID Path**: site-configuration.defaultDescription
     * - **Tab**: Metadata
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    defaultDescription: prismicT.KeyTextField;
}
/**
 * Site configuration document from Prismic
 *
 * - **API ID**: `site-configuration`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SiteConfigurationDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<SiteConfigurationDocumentData>, "site-configuration", Lang>;
export type AllDocumentTypes = PageDocument | SiteConfigurationDocument;
/**
 * Default variation for ContactForm Slice
 *
 * - **API ID**: `default`
 * - **Description**: `ContactForm`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ContactFormSliceDefault = prismicT.SharedSliceVariation<"default", Record<string, never>, never>;
/**
 * Slice variation for *ContactForm*
 *
 */
type ContactFormSliceVariation = ContactFormSliceDefault;
/**
 * ContactForm Shared Slice
 *
 * - **API ID**: `contact_form`
 * - **Description**: `ContactForm`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ContactFormSlice = prismicT.SharedSlice<"contact_form", ContactFormSliceVariation>;
/**
 * Primary content in Image → Primary
 *
 */
interface ImageSliceDefaultSlicePrimary {
    /**
     * image field in *Image → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: image.primary.image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
}
/**
 * Default slice variation for Image Slice
 *
 * - **API ID**: `default-slice`
 * - **Description**: `Image`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ImageSliceDefaultSlice = prismicT.SharedSliceVariation<"default-slice", Simplify<ImageSliceDefaultSlicePrimary>, never>;
/**
 * Slice variation for *Image*
 *
 */
type ImageSliceVariation = ImageSliceDefaultSlice;
/**
 * Image Shared Slice
 *
 * - **API ID**: `image`
 * - **Description**: `Image`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ImageSlice = prismicT.SharedSlice<"image", ImageSliceVariation>;
/**
 * Primary content in Meetings → Primary
 *
 */
interface MeetingsSliceDefaultSlicePrimary {
    /**
     * Enter the title text field in *Meetings → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: Sections we run
     * - **API ID Path**: meetings.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
}
/**
 * Default slice variation for Meetings Slice
 *
 * - **API ID**: `default-slice`
 * - **Description**: `Meetings`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type MeetingsSliceDefaultSlice = prismicT.SharedSliceVariation<"default-slice", Simplify<MeetingsSliceDefaultSlicePrimary>, never>;
/**
 * Slice variation for *Meetings*
 *
 */
type MeetingsSliceVariation = MeetingsSliceDefaultSlice;
/**
 * Meetings Shared Slice
 *
 * - **API ID**: `meetings`
 * - **Description**: `Meetings`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type MeetingsSlice = prismicT.SharedSlice<"meetings", MeetingsSliceVariation>;
/**
 * Primary content in Text → Primary
 *
 */
interface TextSliceDefaultSlicePrimary {
    /**
     * Text field in *Text → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text.primary.text
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    text: prismicT.RichTextField;
}
/**
 * Default slice variation for Text Slice
 *
 * - **API ID**: `default-slice`
 * - **Description**: `Text`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextSliceDefaultSlice = prismicT.SharedSliceVariation<"default-slice", Simplify<TextSliceDefaultSlicePrimary>, never>;
/**
 * Slice variation for *Text*
 *
 */
type TextSliceVariation = TextSliceDefaultSlice;
/**
 * Text Shared Slice
 *
 * - **API ID**: `text`
 * - **Description**: `Text`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextSlice = prismicT.SharedSlice<"text", TextSliceVariation>;
/**
 * Primary content in TextAndImage → Primary
 *
 */
interface TextAndImageSliceDefaultSlicePrimary {
    /**
     * Text field in *TextAndImage → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: The text to show on the page
     * - **API ID Path**: text_and_image.primary.text
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    text: prismicT.RichTextField;
    /**
     * image field in *TextAndImage → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: text_and_image.primary.image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
}
/**
 * Default slice variation for TextAndImage Slice
 *
 * - **API ID**: `default-slice`
 * - **Description**: `TextAndImage`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextAndImageSliceDefaultSlice = prismicT.SharedSliceVariation<"default-slice", Simplify<TextAndImageSliceDefaultSlicePrimary>, never>;
/**
 * Slice variation for *TextAndImage*
 *
 */
type TextAndImageSliceVariation = TextAndImageSliceDefaultSlice;
/**
 * TextAndImage Shared Slice
 *
 * - **API ID**: `text_and_image`
 * - **Description**: `TextAndImage`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextAndImageSlice = prismicT.SharedSlice<"text_and_image", TextAndImageSliceVariation>;
/**
 * Primary content in Video → Primary
 *
 */
interface VideoSliceDefaultSlicePrimary {
    /**
     * Enter YouTube URL field in *Video → Primary*
     *
     * - **Field Type**: Embed
     * - **Placeholder**: https://youtu.be/Jlrimx5fjTQ
     * - **API ID Path**: video.primary.video
     * - **Documentation**: https://prismic.io/docs/core-concepts/embed
     *
     */
    video: prismicT.EmbedField;
}
/**
 * Default slice variation for Video Slice
 *
 * - **API ID**: `default-slice`
 * - **Description**: `Video`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type VideoSliceDefaultSlice = prismicT.SharedSliceVariation<"default-slice", Simplify<VideoSliceDefaultSlicePrimary>, never>;
/**
 * Slice variation for *Video*
 *
 */
type VideoSliceVariation = VideoSliceDefaultSlice;
/**
 * Video Shared Slice
 *
 * - **API ID**: `video`
 * - **Description**: `Video`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type VideoSlice = prismicT.SharedSlice<"video", VideoSliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { PageDocumentData, PageDocumentDataSlicesSlice, PageDocument, SiteConfigurationDocumentData, SiteConfigurationDocument, AllDocumentTypes, ContactFormSliceDefault, ContactFormSliceVariation, ContactFormSlice, ImageSliceDefaultSlicePrimary, ImageSliceDefaultSlice, ImageSliceVariation, ImageSlice, MeetingsSliceDefaultSlicePrimary, MeetingsSliceDefaultSlice, MeetingsSliceVariation, MeetingsSlice, TextSliceDefaultSlicePrimary, TextSliceDefaultSlice, TextSliceVariation, TextSlice, TextAndImageSliceDefaultSlicePrimary, TextAndImageSliceDefaultSlice, TextAndImageSliceVariation, TextAndImageSlice, VideoSliceDefaultSlicePrimary, VideoSliceDefaultSlice, VideoSliceVariation, VideoSlice };
    }
}
