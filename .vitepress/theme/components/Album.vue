<script setup lang="ts">
import { ref } from 'vue'

interface Images {
    imageSrc: string
    imageName: string
    isCorped: boolean
    corpedImageSrc: string
    articleLink: string
}

// get all images route from the Local storage
const objects = import.meta.glob('../../../我的画册/myWorks/images/*.jpg', {
    query: '?url',
    import: 'default',
})  //获取图片的本地路径

const imagesSrc = ref<string[]>([]) // What is this "ref"?

for (const key in objects) {
  objects[key]().then((res) => {
    console.log(res)
    imagesSrc.value.push(res)
  })
}   //创建存放图片路径的数组，并将图片路径push到数组中。

function getImgSize(imgSrc, callback) {
    
}
const newImg = new Image()
newImg.src = imagesSrc.value[0]

</script>   

<template>
    <div class = "albumcontainer">
        
    <img class = "image" 
    v-for="(image, index) in imagesSrc"
    :key="index"
    :src="image"
    alt="dynamic image"
    width="210"
    height="210"
    />
        </div>
</template>

<style>
.albumcontainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 20px;
    
}
.image {
        border-radius: 10px;
        width: 15%;
        box-shadow: 0px 4px 4px 0px #00000040;
    }
</style>