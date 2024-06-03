<script setup lang="ts">
import { ref } from 'vue'
import albumMetadata from '../../albumMetadata.json'

// get all images route from the Local storage
const objects = JSON.parse(JSON.stringify(albumMetadata)) //获取图片的本地路径

console.log(objects)

for (let i = 0; i < objects.length; i++) {
    if (objects[i].hasAlt === true) {
    objects[i].imageSrc = objects[i].altImageSrc
    } 
}

</script>   

<template>
    <div class = "albumcontainer">
    
    <img class = "image" id = "image" 
    v-for="(image, index) in objects"
    :key="index"
    :src="image.imageSrc"
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