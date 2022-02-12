import React from 'react'
import * as prismicT from "@prismicio/types";
import {PrismicRichText} from "@prismicio/react";

type VideoType = prismicT.Slice<"video", {
    video: prismicT.EmbedField;
}>

type VideoProps = {
    slice: VideoType;
}

const createVideoMarkup = (html: string) => {
    const modifiedHtml = html
        .replace(/width="([^"]*)"/, "width=\"100%\"")
        .replace(/height="([^"]*)"/, "height=\"325px\"")
        .replace(/allow="[^"]*"/, "");
    return {__html: modifiedHtml};
}

const Image = ({ slice }: VideoProps) => {

    return <section>
        <div className="container">
            {slice.primary.video.html ?
                <div className="video" dangerouslySetInnerHTML={createVideoMarkup(slice.primary.video.html)}></div>
                : <></>}
        </div>
        <style jsx>{`
        .container {
            display: flex;
            flex-direction: row; 
            flex-wrap: wrap;
        }
        .video {
            margin: auto;
            width: 520px;
        }
        
    `}</style>
    </section>
}

export default Image
