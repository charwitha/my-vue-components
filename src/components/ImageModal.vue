<template>
    <div class="modal-container col-xs-12">
        <div class="modal-header-wrapper col-xs-12">
            <span v-on:click="hideModal()" class="close">&times;</span>
        </div>
        <div class="modal-body-wrapper row col-xs-12">
            <div class="img-section col-xs-12 col-md-8">
                <img :src="this.imageURL" alt="selectedImage" />
            </div>
            <slot name="comments"></slot>
        </div>
    </div>
</template>

<script>
    import Comments from './Comments';
    export default {
        name: 'ImageModal',
        props: ['imageURL'],
        methods: {
            hideModal() {
                this.$emit('showModal', false);
            }
        }
    }
</script>
