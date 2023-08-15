export const config = { runtime: 'edge' };
import {NextApiRequest, NextApiResponse} from "next";

const url = require('url')

type Data = {
    message: string
}

export default async function exit(req: NextApiRequest, res: NextApiResponse<Data>) {
    // Exit the current user from "Preview Mode". This function accepts no args.
    res.clearPreviewData();

    const queryObject = url.parse(req.url, true).query;
    const redirectUrl = queryObject && queryObject.currentUrl ? queryObject.currentUrl : '/';

    res.writeHead(307, { Location: redirectUrl });
    res.end();
}
