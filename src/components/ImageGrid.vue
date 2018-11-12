<template>
        <ul class="image-list-wrapper col-xs-12">
            <li class="grid-image col-xs-12 col-md-3" v-for="(image, index) in this.imageContent" :key="index"> 
				<img v-on:click="expandViewOf(image.url)" :src="image.url" alt="sports-image" class="gridbox-img">
            </li>
        </ul>
</template>

<script>
  export default {
    name: 'TabContent',
    props: ['imageContent', 'clickedImage'],
    methods: {
        expandViewOf: function(url) {
            this.$emit('clickedImage', url);
        }
    }
  }
</script>
