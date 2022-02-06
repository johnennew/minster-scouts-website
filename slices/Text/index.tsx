import React from 'react'
import {RichTextField, Slice} from "@prismicio/types";
import {PrismicRichText} from "@prismicio/react";

interface TextType extends Slice {
    primary: {
        text: RichTextField;
    }
    slice_type: "text";
}

type TextProps = {
    slice: TextType;
}

const Text = ({ slice }: TextProps) => (
    <section>
        <div className="container">
            <div className="text">
                {
                    slice.primary.text ?
                        <PrismicRichText field={slice.primary.text}/>
                        : <p>start by editing this slice from inside Prismic builder!</p>
                }
            </div>
        </div>

        <style jsx>{`
        .container {
            display: flex;
            flex-direction: row; 
            flex-wrap: wrap;
        }
        .text {
            margin: auto;
        }
        
    `}</style>
    </section>
)

export default Text
