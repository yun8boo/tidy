import cheerio from 'cheerio'

export const getPageInfo = async(url: string) => {
  const metaProps = await getMetaProps(url)  
  const site_name = resolveSiteName(metaProps)
  const title = resolveTitle(metaProps)
  const description = resolveDesc(metaProps)
  const image = resolveImageUrl(metaProps)
  
  return { site_name, title, description, image }
}

const resolveSiteName = (metaProps: any) =>  {
  const ogSiteName = getMetaPropContent(metaProps, 'og:site_name')
  if (ogSiteName) return ogSiteName
  return '(No SiteName)'
}

const resolveTitle = (metaProps: any) =>  {
  const ogTitle = getMetaPropContent(metaProps, 'og:title')
  if (ogTitle) return ogTitle
  return '(No Title)'
}

const resolveDesc = (metaProps: any) => {
  const ogDesc = getMetaPropContent(metaProps, 'og:description')
  if (ogDesc) return ogDesc
  return ''
}

const resolveImageUrl = (metaProps: any) => {
  const ogImage = getMetaPropContent(metaProps, 'og:image')
  if (ogImage) return ogImage
  return ''
}

const getMetaPropContent = (metaProps: any, propKey: any) => {
  const mpObj = metaProps.find((d: any) => {
    return d[propKey]
  })
  if (mpObj) return mpObj[propKey]
  return ''
}

const getMetaProps = async(url: string) => {
  const result = await fetch(url).then(res => {
      if (res.ok) { return res.text() }
    }).then(html => {
      const metaProps = extractMetaProps(html)
      return metaProps
    }).catch(e => {
      throw e
    })
  return result
}

const extractMetaProps = (html: any) => {
  const $ = cheerio.load(html)
  let results: any[] = []
  $('head meta').each((_, el) => {
    const property = $(el).attr('property')
    const content = $(el).attr('content')
    if (property && content) {
      results.push({ [property]: content })
    }
  })
  results.sort((a,b) => {
    if (Object.keys(a)[0] < Object.keys(b)[0]) return -1
    if (Object.keys(a)[0] > Object.keys(b)[0]) return 1
    return 0
  })
  return results
}