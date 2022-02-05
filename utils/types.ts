import {PrismicDocumentWithUID, RichTextField, SliceZone} from "@prismicio/types";

export interface Homepage extends PrismicDocumentWithUID {
    type: "homepage";
    data: {
        title: RichTextField;
        slices: SliceZone;
    }
}

export interface SiteConfiguration extends PrismicDocumentWithUID {
    type: "site-configuration";
    data: {
        beaversMeetingsDescription: RichTextField;
        cubsMeetingsDescription: RichTextField;
        scoutsMeetingsDescription: RichTextField;
    }
}
