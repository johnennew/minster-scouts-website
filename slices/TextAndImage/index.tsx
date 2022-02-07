import React from 'react'
import {PrismicRichText} from "@prismicio/react";
import * as prismicT from "@prismicio/types";

type TextAndImageType = prismicT.Slice<"text_and_image", {
    image: prismicT.ImageField;
    text: prismicT.RichTextField;
}>

type TextAndImageProps = {
    slice: TextAndImageType;
}

const TextAndImage = ({ slice }: TextAndImageProps) => (
  <section>
      <div className="container">
          <div className="text">
              {
                  slice.primary.text ?
                  <PrismicRichText field={slice.primary.text}/>
                  : <p>start by editing this slice from inside Prismic builder!</p>
              }
          </div>

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
        .text {
            margin: auto;
        }
        
    `}</style>
  </section>
)

export default TextAndImage
