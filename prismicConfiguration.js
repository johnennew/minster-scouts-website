// -- Prismic Repo Name

export const repoName = 'minster-scouts'


// -- Access Token if the repository is not public

// Generate a token in your dashboard and configure it here if your repository is private

export const accessToken = ''



// -- Link resolution rules

// Manages the url links to internal Prismic documents

export const linkResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }
  return '/'
}

// -- Route Resolver rules

// Manages the url links to internal Prismic documents two levels deep (optionals)

export const Router = {

  routes: [],

  href: (type) => {
    const route = Router.routes.find((r) => r.type === type)
    return route && route.href
  }

};
