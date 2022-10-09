export type ContactReason = "beavers" | "cubs" | "scouts";

export type ContactFormInputs = {
    contact_reason: ContactReason;
    contact_message: string;
    contact_phone: string;
    contact_email: string;
    contact_name: string;
    token: string;
}
