import slugify from 'slugify'

export const makeNameSlug = (name: string) => {
  const ct = cleanTextSlug(name)
  return slugify(ct, { trim: true, lower: true })
}

export const cleanText = (string: string) => {
  const patterns = [
    /(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g,
    /(ì|í|ị|ỉ|ĩ|Ì|Í|Ị|Ỉ|Ĩ)/g,
    /(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g,
    /(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g,
    /(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g,
    /(ỳ|ý|ỵ|ỷ|ỹ|Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g,
    /(đ|Đ)/g,
    /æ/g,
    /ç/gi,
    /ñ/gi,
    // Remove the pattern for '%' to keep it
    // Remove the pattern for '.' to keep it
    /[^\x00-\x7F]+/g,
    /[^\w\s\-+%\.]+/g, // Allow '+', '%', '.', and spaces
    /^\-|\-$/g,
    /-+$/g,
    / {2,}/g,
  ]

  const replace = ['a', 'i', 'u', 'e', 'o', 'y', 'd', 'ae', 'c', 'n', ' ', ' ', '', ' ', ' ']

  for (let i = 0; i < patterns.length; i++) {
    string = string.replace(patterns[i], replace[i])
  }

  // Add logic to handle '\' before '%'
  string = string.replace(/%/g, '\\%')

  return string.trim()
}

export const cleanTextSlug = (string: string) => {
  const patterns = [
    /(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g,
    /(ì|í|ị|ỉ|ĩ|Ì|Í|Ị|Ỉ|Ĩ)/g,
    /(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g,
    /(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g,
    /(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g,
    /(ỳ|ý|ỵ|ỷ|ỹ|Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g,
    /(đ|Đ)/g,
    /æ/g,
    /ç/gi,
    /ñ/gi,
    /%/gi,
    /[^\x00-\x7F]+/g, // Match non-ASCII characters
    /[^\w_ \-]+/gi, // Match anything that is not a word character, underscore, space, or dash
    /^\-|\-$/g, // Match dashes at the start or end
    /-+$/g, // Match trailing dashes
    / {2,}/g, // Match two or more spaces
  ]

  const replace = ['a', 'i', 'u', 'e', 'o', 'y', 'd', 'ae', 'c', 'n', ' ', ' ', ' ', ' ', '', ' ']

  patterns.forEach((pattern, index) => {
    string = string.replace(pattern, replace[index])
  })

  return string
}
