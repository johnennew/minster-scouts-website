import React from 'react'
import {PrismicRichText} from "@prismicio/react";
import {TextSlice} from "../../types.generated";

type TextProps = {
    slice: TextSlice;
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
