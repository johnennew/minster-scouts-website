import React from 'react'
import {ImageSlice} from "../../types.generated";

type ImageProps = {
    slice: ImageSlice;
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
