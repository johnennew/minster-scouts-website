import React from 'react'
import { RichText } from 'prismic-reactjs'

const TextAndImage = ({ slice }) => (
  <section>
    {
      slice.primary.text ?
      <RichText render={slice.primary.text}/>
      : <p>start by editing this slice from inside Prismic builder!</p>
    }
   <img src={slice.primary.image.url} alt={slice.primary.image.alt} />

    <style jsx>{`
        section {
          max-width: 600px;
          margin: 4em auto;
          text-align: center;
        }
        .title {
          color: #8592e0;
        }
    `}</style>
  </section>
)

export default TextAndImage
