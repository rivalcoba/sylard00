export default function (str) {
  let spokenlang = []
  if(!str) return spokenlang
  
  let langArray = str.split('\r\n')
  langArray.forEach((element) => {
    spokenlang.push({
      'name': element.split(' | ')[0],
      'gid': element.split(' | ')[1]
    })
  })
  return spokenlang
}