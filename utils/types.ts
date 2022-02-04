import {PrismicDocumentWithUID, RichTextField, SliceZone} from "@prismicio/types";

export interface Homepage extends PrismicDocumentWithUID {
    type: "homepage";
    data: {
        title: RichTextField;
        slices: SliceZone;
    }
}
