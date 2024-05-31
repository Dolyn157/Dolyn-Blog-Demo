<script setup lang="ts">
import {ref} from 'vue'
</script>

<template>
    <div class="banner">
        <img src="./assets/bannerPi.png" class="bannerPic">
    </div>
</template>

<style> 
.banner {
    z-index: 2;
    position: relative;
    flex-direction: row;
    top: 0px;
    right: 0px;
    margin: auto;
    padding: 0px 0px 0px;
    width: 1442px;
    height: -22px;

    .bannerPic {
    position: relative;
    top: 0px;
    
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px 0px #00000040;
    width: auto;
    height: 256px;
    }

  }
</style>
