 
import { icons } from '@/components/icons'

interface ServiceType {
  label: string
  value: string
  icon: keyof typeof icons
}
export const VideoServices: ServiceType[] = [
  {
    label: 'Youtube',
    value: 'youtube',
    icon: 'Youtube',
  },
  {
    label: 'TikTok',
    value: 'tiktok',
    icon: 'TikTok',  
  },
  {
    label: 'Vimeo',
    value: 'vimeo',
    icon: 'Vimeo',  
  },
  {
    label: 'Dailymotion',
    value: 'dailymotion',
    icon: 'Dailymotion', 
  },
]

export const MapServices: ServiceType[] = [
  { label: 'Google Map', value: 'google_map', icon: 'GoogleMap' },
  { label: 'Apple Map', value: 'apple_map', icon: 'AppleMap' },
  { label: 'OpenStreetMap', value: 'openstreetmap', icon: 'OpenStreetMap' }, // 需有图标
]


export const OtherServices = []

export const AllEmbedServices = [
  ...VideoServices,
  ...MapServices,
  ...OtherServices,
]

export const getEmbedService = value => {
  for (var item of AllEmbedServices) {
    if (item.value === value) {
      return item
    }
  }

  return {}
}

 
export const EmbedServiceLink = {
  youtube: {
    example: 'https://www.youtube.com/watch?v=I4sMhHbHYXM',
    src: 'https://www.youtube.com/embed/I4sMhHbHYXM',
    srcPrefix: 'https://www.youtube.com/embed',
    linkRule: ['www.youtube.com\\/watch\\?v=\\w+'],
  },
  tiktok: {
    example: 'https://www.tiktok.com/@scout2015/video/6718335390845095173',
    src: 'https://www.tiktok.com/embed/v2/6718335390845095173',
    srcPrefix: 'https://www.tiktok.com/embed/v2',
    linkRule: ['tiktok.com\\/@[\\w.-]+\\/video\\/(\\d+)'],
  },
  vimeo: {
    example: 'https://vimeo.com/76979871',
    src: 'https://player.vimeo.com/video/76979871',
    srcPrefix: 'https://player.vimeo.com/video',
    linkRule: ['vimeo.com\\/(\\d+)'],
  },
  dailymotion: {
    example: 'https://www.dailymotion.com/video/x7tgczb',
    src: 'https://www.dailymotion.com/embed/video/x7tgczb',
    srcPrefix: 'https://www.dailymotion.com/embed/video',
    linkRule: ['dailymotion.com\\/video\\/(\\w+)'],
  },
  google_map: {
    example: 'https://www.google.com/maps/place/Statue+of+Liberty',
    src: 'https://www.google.com/maps/embed?pb=!',
    srcPrefix: 'https://www.google.com/maps/embed?pb=!',
    linkRule: ['www.google.com\\/maps\\/place\\/[^\\s]+'],
  },
  apple_map: {
    example: 'https://maps.apple.com/?ll=37.7749,-122.4194',
    src: 'https://maps.apple.com/?ll=37.7749,-122.4194',
    srcPrefix: 'https://maps.apple.com',
    linkRule: ['maps.apple.com\\/\\?ll=[\\d\\.-]+,[\\d\\.-]+'],
  },
  openstreetmap: {
    example: 'https://www.openstreetmap.org/#map=18/37.7749/-122.4194',
    src: 'https://www.openstreetmap.org/export/embed.html?bbox=-122.42,37.77,-122.41,37.78&layer=mapnik',
    srcPrefix: 'https://www.openstreetmap.org/export/embed.html',
    linkRule: ['openstreetmap.org\\/\\#map=\\d+\\/([\\d\\.-]+)\\/([\\d\\.-]+)'],
  },
  iframe: {
    example: 'https://www.youtube.com/watch?v=I4sMhHbHYXM',
    src: 'https://www.youtube.com/watch?v=I4sMhHbHYXM',
    srcPrefix: '',
    linkRule: ['.+'],
  },
}

// Add stricter type definitions
interface EmbedResult {
  validLink: boolean
  validId: boolean
  matchedUrl: string
  originalLink: string
  src: string
}

interface EmbedServiceConfig {
  example: string
  src: string
  srcPrefix: string
  linkRule: string[]
  idRule?: string
  tips?: string
}

// Use Map to store service handlers to avoid multiple switch-case
const serviceHandlers = new Map<string, (originalLink: string, result: EmbedResult) => EmbedResult>([
  ['youtube', getYoutubeSrc],
  ['tiktok', getTikTokSrc],
  ['vimeo', getVimeoSrc],
  ['dailymotion', getDailymotionSrc],
  ['apple_map', getAppleMapSrc],
  ['google_map', getGoogleMapSrc],
  ['openstreetmap', getOpenStreetMapSrc],
  ['iframe', getCommonSrc],
])

// Cache regex patterns for better performance
const regexCache = new Map<string, RegExp>()

function getMatchedUrl(service: string, originalLink: string, result: EmbedResult): EmbedResult {
  const link = EmbedServiceLink[service]
  const linkRule = link.linkRule

  for (const rule of linkRule) {
    let regex = regexCache.get(rule)
    if (!regex) {
      regex = new RegExp(rule)
      regexCache.set(rule, regex)
    }

    const match = originalLink.match(regex)
    if (match?.[0]) {
      result.validLink = true
      result.matchedUrl = match[0]
      return result
    }
  }

  return result
}

function getYoutubeSrc(originalLink, result) {
  let link = EmbedServiceLink.youtube
  let url = result.matchedUrl
  result.validLink = true

  let splits = url.split('=')
  let len = splits.length
  if (len > 0) {
    let id = splits[len - 1]
    result.src = `${link.srcPrefix}/${id}`
    result.validId = true
  }

  return result
}

function getTikTokSrc(originalLink, result) {
  // 匹配视频ID
  const match = originalLink.match(/video\/(\d+)/)
  if (match && match[1]) {
    result.src = `https://www.tiktok.com/embed/v2/${match[1]}`
    result.validId = true
  } else {
    result.src = originalLink
    result.validId = false
  }
  result.originalLink = originalLink
  return result
}

function getVimeoSrc(originalLink, result) {
  const match = originalLink.match(/vimeo.com\/(\d+)/)
  if (match && match[1]) {
    result.src = `https://player.vimeo.com/video/${match[1]}`
    result.validId = true
  } else {
    result.src = originalLink
    result.validId = false
  }
  result.originalLink = originalLink
  return result
}

function getDailymotionSrc(originalLink, result) {
  const match = originalLink.match(/dailymotion.com\/video\/(\w+)/)
  if (match && match[1]) {
    result.src = `https://www.dailymotion.com/embed/video/${match[1]}`
    result.validId = true
  } else {
    result.src = originalLink
    result.validId = false
  }
  result.originalLink = originalLink
  return result
}

function getOpenStreetMapSrc(originalLink, result) {
  // 简单处理，实际可根据 #map=zoom/lat/lon 生成 bbox
  result.src = originalLink.replace('/#map=', '/export/embed.html?bbox=')
  result.validId = true
  result.originalLink = originalLink
  return result
}

function getGoogleMapSrc(originalLink, result) {
  // 直接用原始链接或可做更复杂处理
  result.src = originalLink
  result.validId = true
  result.originalLink = originalLink
  return result
}

function getAppleMapSrc(originalLink, result) {
  // 直接用原始链接
  result.src = originalLink
  result.validId = true
  result.originalLink = originalLink
  return result
}


function getCommonSrc(originalLink, result) {
  result.src = `${result.matchedUrl}`
  result.validId = true
  result.originalLink = originalLink

  return result
}

export function getExampleUrl(service: string) {
  let exampleUrl = ''
  let link = EmbedServiceLink[service]
  if (link) {
    exampleUrl = link.example
  }
  return exampleUrl
}

// Update getServiceSrc type declaration
export const getServiceSrc = (service: string, originalLink: string): EmbedResult => {
  if (!service || !originalLink) {
    return {
      validLink: false,
      validId: false,
      matchedUrl: '',
      originalLink: originalLink || '',
      src: '',
    }
  }

  if (!EmbedServiceLink[service]) {
    console.warn(`Unknown embed service: ${service}`)
    return {
      validLink: false,
      validId: false,
      matchedUrl: '',
      originalLink,
      src: '',
    }
  }

  let result: EmbedResult = {
    validLink: false,
    validId: false,
    matchedUrl: '',
    originalLink,
    src: '',
  }

  // Match URL pattern
  result = getMatchedUrl(service, originalLink, result)
  if (!result.validLink) {
    return result
  }

  // Get corresponding handler function
  const handler = serviceHandlers.get(service) || getCommonSrc
  return handler(originalLink, result)
}
