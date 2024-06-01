
import fg from 'fast-glob'
import Git from 'simple-git'
import fs from 'fs-extra'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url';

import { Image } from './types/albumMetadata';

const dir = './'
const target = '我的画册/myWorks/images/'
const altTarget = '我的画册/myWorks/altImg/'


export const DIR_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const DIR_VITEPRESS = resolve(dirname(fileURLToPath(import.meta.url)), '../.vitepress')
 
const git = Git(DIR_ROOT)


async function listImgs (dir: string, target: string ){
    const images = await fg(`${target}/*(*.jpg|*.png)`, {
        onlyFiles: true,
        cwd: dir
    })
   //获取图片的本地路径
   images.sort()
   return images
}

async function hasAltImg(images: Image[], altImageSrcs: string[]){
    for (var i = 0; i < altImageSrcs.length; i++){
        for (var j = 0; j < images.length; j++){
          if (altImageSrcs[i].includes(images[j].imageName)){
            images[j].hasAlt = true
            images[j].altImageSrc = `./${altImageSrcs[i]}`
          }
        }
      }
}

async function run() {
  var Images: Image[] = []
  const imageSrcs = await listImgs(dir, target)
  for (let imageSrc of imageSrcs) {
    imageSrc = `./${imageSrc}`
    const imageName = imageSrc.split('/').pop()
    const hasAlt = false
    const altImageSrc = ''
    const articleLink = ''
    Images.push({imageSrc, imageName, hasAlt, altImageSrc, articleLink})
  }
  console.log(Images)

  const altImageSrcs = await listImgs(dir, altTarget )
  await hasAltImg(Images, altImageSrcs)
  console.log(`After\n`, Images)
  fs.writeJSON(join(DIR_VITEPRESS, 'albumMetadata.json'), Images, { spaces: 2 })
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
  })
  