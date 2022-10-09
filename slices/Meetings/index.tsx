import React from 'react'
import {PrismicRichText} from "@prismicio/react";
import {MeetingsSlice, SiteConfigurationDocument} from "../../types.generated";

type MeetingsProps = {
    slice: MeetingsSlice;
    context: SiteConfigurationDocument;
}

const Meetings = ({ slice, context }: MeetingsProps) => (
    <section>
        <div className="container">
            <div className="title">
                {
                    slice.primary.title ?
                        <h2>{slice.primary.title}</h2>
                        : <p>Sections we run</p>
                }
            </div>

            <div className="meetings">
                <div className="row">
                    <div className="col-4">
                        <h5>Beavers</h5> <p>6–8 yrs</p>
                    </div>
                    <div className="col-8">
                        <PrismicRichText field={context.data.beaversMeetingsDescription}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <h5>Cubs </h5><p>8–10½ yrs</p>
                    </div>
                    <div className="col-8">
                        <PrismicRichText field={context.data.cubsMeetingsDescription}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <h5>Scouts</h5> <p>10½–14 yrs</p>
                    </div>
                    <div className="col-8">
                        <PrismicRichText field={context.data.scoutsMeetingsDescription}/>
                    </div>
                </div>
            </div>
        </div>

        <style jsx>{`
                section {
                    display: flex;
                    max-width: 900px;
                    margin: auto;
                }
                .title {
                    border-bottom: 1px solid #ccc !important;
                }
                .row {
                    display: flex;
                    flex-wrap: wrap;
                    border-bottom: 1px solid #ccc !important;
                    padding-bottom: 2rem !important;
                    padding-top: 2rem !important;
                }
                .col-4 {
                    flex: 0 0 25%;
                    max-width: 25%;
                }
                .col-8 {
                    flex: 0 0 75%;
                    max-width: 75%;
                }
                h5 {
                    font-size: 1rem;
                    margin-bottom: .5rem;
                    font-weight: 900;
                    line-height: 1.2;
                }
        `}</style>
    </section>
)

export default Meetings
