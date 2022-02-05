import {PrismicDocumentWithUID, RichTextField, SliceZone, Slice} from "@prismicio/types";

export interface Homepage extends PrismicDocumentWithUID {
    type: "homepage";
    data: {
        title: RichTextField;
        slices: SliceZone;
    }
}
