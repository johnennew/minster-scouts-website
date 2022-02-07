import React from 'react'
import * as prismicT from "@prismicio/types";

type ImageType = prismicT.Slice<"image", {
    image: prismicT.ImageField;
}>

type ImageProps = {
    slice: ImageType;
}

const Image = ({ slice }: ImageProps) => (
    <section>
        <div className="container">
            <div className="image">
                <img src={slice.primary.image.url ? slice.primary.image.url : ''} alt={slice.primary.image.alt ? slice.primary.image.alt : ''} />
            </div>
        </div>

        <style jsx>{`
        .container {
            display: flex;
            flex-direction: row; 
            flex-wrap: wrap;
        }
        .image {
            min-width: 200px;
            margin: auto;
        }
        img {
            max-width: 100%;
            max-height: 300px;
        }
        
    `}</style>
    </section>
)

export default Image
