const { promises: fs } = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { Feed } = require('feed')

const meta = {
  title: 'Minster Scouts',
  description: 'Updates from Minster Scouts',
  link: 'https://www.minsterscouts.org/',
}

async function generate() {
  const feed = new Feed({
    title: meta.title,
    description: meta.description,
    link: meta.link,
    id: meta.link,
    feedLinks: {
      json: `${meta.link}feed.json`,
      rss2: `${meta.link}feed.xml`,
      atom: `${meta.link}atom.xml`
    }
  })

  const news = await fs.readdir(path.join(__dirname, '..', 'pages', 'news'))

  await Promise.all(
    news.map(async (name) => {
      if (name.startsWith('index.')) return

      const content = await fs.readFile(
        path.join(__dirname, '..', 'pages', 'news', name)
      )
      const frontmatter = matter(content)

      feed.addItem({
        title: frontmatter.data.title,
        link: meta.link + 'news/' + name.replace(/\.mdx?/, ''),
        date: new Date(frontmatter.data.date),
        description: frontmatter.data.description,
        categories: frontmatter.data.tag.split(', '),
        author: frontmatter.data.author
      })
    })
  )

  await fs.writeFile('./public/feed.xml', feed.rss2())
  await fs.writeFile('./public/feed.json', feed.json1())
  await fs.writeFile('./public/atom.xml', feed.atom1())
}

generate()
