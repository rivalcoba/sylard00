export default function (str) {
  let langArray = str.split('\r\n')
  let spokenlang = []
  langArray.forEach((element) => {
    spokenlang.push({
      'name': element.split(' | ')[0],
      'gid': element.split(' | ')[1]
    })
  })
  return spokenlang
}