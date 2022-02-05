import React from 'react'
import {ImageField, RichTextField, Slice} from "@prismicio/types";
import {PrismicRichText} from "@prismicio/react";

interface TextAndImageType extends Slice {
    primary: {
        text: RichTextField;
        image: ImageField;
    }
    slice_type: "text_and_image";
}

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
