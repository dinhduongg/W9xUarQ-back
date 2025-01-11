export const convertToRegex = (search: string) => {
  const diacriticMap = {
    a: '[aàáạảãâầấậẩẫăằắặẳẵ]',
    e: '[eèéẹẻẽêềếệểễ]',
    i: '[iìíịỉĩ]',
    o: '[oòóọỏõôồốộổỗơờớợởỡ]',
    u: '[uùúụủũưừứựửữ]',
    y: '[yỳýỵỷỹ]',
    d: '[dđ]',
    A: '[AÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]',
    E: '[EÈÉẸẺẼÊỀẾỆỂỄ]',
    I: '[IÌÍỊỈĨ]',
    O: '[OÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]',
    U: '[UÙÚỤỦŨƯỪỨỰỬỮ]',
    Y: '[YỲÝỴỶỸ]',
    D: '[DĐ]',
  }

  // Replace each character in the search string with its regex equivalent
  const regexString = search
    .split('')
    .map((char) => diacriticMap[char] || char)
    .join('')

  return new RegExp(regexString, 'i') // Case-insensitive search
}
