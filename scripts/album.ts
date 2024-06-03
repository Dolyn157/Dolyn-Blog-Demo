
import fg from 'fast-glob'
import Git from 'simple-git'
import fs from 'fs-extra'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url';

import { Image } from './types/albumMetadata';

const dir = './'
const target = '我的画册/assets/images/'
const altTarget = '我的画册/assets/altImg/'


const baseMarkdownContent = 
`---
tags:
    - 我的画册
layout: page
---
# 我的画册`

const css = `
<style>

  p {
    display: flex;
    justify-content: flex-start;
  }  
  img {
    display: flex;
    flex-wrap: wrap;
    margin: 7px;
    border-radius: 10px;
    height: 320px;
    width: 210px;

  }
</style>
`

export const DIR_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const DIR_VITEPRESS = resolve(dirname(fileURLToPath(import.meta.url)), '../.vitepress')
export const DIR_MYALBUM = resolve(dirname(fileURLToPath(import.meta.url)), '../我的画册/')

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
            images[j].altImageSrc = altImageSrcs[i].replace('我的画册', '.')
          }
        }
      }
}

function makeImgMarkdownLink(images: Image[]){
    var imgMarkdownLink = ``
    for (var i = 0; i < images.length; i++){
        if (images[i].hasAlt){
          imgMarkdownLink += `![${images[i].imageName}](${images[i].altImageSrc})\n`
        }else{
          imgMarkdownLink += `![${images[i].imageName}](${images[i].imageSrc})\n`
        }
      }
    return imgMarkdownLink
}

async function run() {
  var Images: Image[] = []
  const imageSrcs = await listImgs(dir, target)
  for (let imageSrc of imageSrcs) {
    imageSrc = imageSrc.replace('我的画册', '.')
    const imageName = imageSrc.split('/').pop()
    const hasAlt = false
    const altImageSrc = ''
    const articleLink = ''
    Images.push({imageSrc, imageName, hasAlt, altImageSrc, articleLink})
  }
  //console.log(Images)

  const altImageSrcs = await listImgs(dir, altTarget)
    console.log(altImageSrcs)
  await hasAltImg(Images, altImageSrcs)
  console.log(`After\n`, Images)
  fs.writeJSON(join(DIR_VITEPRESS, 'albumMetadata.json'), Images, { spaces: 2 })

  const imgMarkdownLinks = makeImgMarkdownLink(Images)
  console.log(imgMarkdownLinks)
  fs.writeFileSync(join(DIR_MYALBUM, 'index.md'), `${baseMarkdownContent}\n ${imgMarkdownLinks}\n${css}`, 'utf-8')
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
  })
  