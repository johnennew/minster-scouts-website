export const runtime = 'edge'
import { linkResolver } from '../../prismicConfiguration' // import from wherever this is set
import { Client } from '../../utils/prismicHelpers'
import {NextApiRequest, NextApiResponse} from "next";  // import from wherever this is set

type Data = {
    message: string
}

const preview = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token: ref } = req.query;

    const redirectUrl = await Client(req)
        .resolvePreviewURL({
            linkResolver: linkResolver,
            defaultURL: '/'
        });

    if (!redirectUrl) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    res.setPreviewData({ ref });

    res.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${redirectUrl}" />
    <script>window.location.href = '${redirectUrl}'</script>
    </head>`
    );
    res.end();
};

export default preview;
