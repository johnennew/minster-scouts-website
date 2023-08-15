This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

You'll need to be running node version 16

```bash
nvm use 16
```

Install project dependencies with

```bash
yarn install
```

Now run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To manage content types and slices in Prismic CMS run

```bash
yarn slicemachine
```

Open [http://localhost:9999](http://localhost:9999) with your browser to see the result.

## Hosting and tools

Version control is via [GitHub](https://github.com/johnennew/minster-scouts-website).

The website is deployed to [Vercel hosting](https://vercel.com/johnennew/minster-scouts-website) from the `main` branch

There is an integration with [SendGrid](https://app.sendgrid.com/) for sending of emails.

The site sits behind [CloudFlare](https://dash.cloudflare.com) which manages the domain registration and DNS.

Content management is done via [Prismic.io](https://minster-scouts.prismic.io/)

Production website at [https://www.minsterscouts.org](https://www.minsterscouts.org)

## Adding new slices

Add a new slice as follows.

1. Login to the primsic cli using `prismic login` from the terminal. This opens a browser and asks you to login to Prismic.
2. Run the slicemachine using:

```bash
yarn slicemachine
```

2. Open the slice machine interface on [http://localhost:9999](http://localhost:9999)
3. Add new custom slices or custom types in the interface and use the interface to push your new slice to Prismic. If you add a new slice then you will also need to add that slice to each Custom type that you want it be be used on.
4. Run the following to regenerate the typescript file which defines the new things you have made. This updates the file `types.generated.ts` in the project root
```bash
npx prismic-ts-codegen
```
5. Add the slice to the page rendering file at `pages/[[...slug]].tsx`

deployment
