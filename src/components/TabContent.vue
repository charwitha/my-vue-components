<template>
  <div class="container">
        <header>
            <h1 class="main-heading">Images of Various Sports</h1>
        </header>
        <ImageModal v-bind:imageURL="activeImage" v-bind:class="{show : showModal}" @showModal="showModalHandler">
            <Comments slot="comments" v-bind:imageURL="activeImage" v-bind:contentInfo="infoAll"></Comments>
        </ImageModal>
        <main>
            <div class="container tabs-container col-xs-12">
                <div class="tabs-wrapper col-xs-12">
                    <ul class="tab-list row" id="tab-list">
                        <li v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]" class="tab-item col-xs-3">Cricket</li>
                        <li v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]" class="tab-item col-xs-3">Football</li>
                        <li v-on:click="activetab=3" v-bind:class="[ activetab === 3 ? 'active' : '' ]" class="tab-item col-xs-3">All</li>
                    </ul>
                    <div class="tab-content col-xs-12 ">
                        <ImageGrid v-show="activetab === 1" :imageContent="infoCricket" @clickedImage="expandViewOf" />
                        <ImageGrid v-show="activetab === 2" :imageContent="infoFootball" @clickedImage="expandViewOf" />
                        <ImageGrid v-show="activetab === 3" :imageContent="infoAll" @clickedImage="expandViewOf" />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios';
    import ImageGrid from './ImageGrid';
    import ImageModal from './ImageModal';
    import Comments from './Comments';
    import 'firebase/app';
    import firebase from 'firebase/app';
    import 'firebase/database';

    export default {
        name: 'TabContent',
        data () {
                return {
                infoCricket: null,
                infoFootball: null,
                infoAll: [],
                activetab: 1,
                activeImage: null,
                showModal: false
                }
            },
        components: {
            ImageGrid,
            ImageModal,
            Comments
        },
        mounted() {
            var self = this;
            // axios.get('/static/data/content-data.json')
            // .then(function(response) {
            //     var data = response.data;
            //     self.infoCricket = data.cricket;
            //     self.infoFootball = data.football;

            //     for(var imgtype in data) {
            //         for(var imgSrc in data[imgtype]) {
            //             self.infoAll.push(data[imgtype][imgSrc]);
            //         }
            //     }
            // });

            var ref = firebase.database().ref();
            ref.once("value", function(snapshot) {
                var data = snapshot.val();
                self.infoCricket = data.cricket;
                self.infoFootball = data.football;

                for(var imgtype in data) {
                    for(var imgSrc in data[imgtype]) {
                        self.infoAll.push(data[imgtype][imgSrc]);
                    }
                }
            });
        },
        methods: {
            expandViewOf(value) {
                this.activeImage = value;
                this.showModal = true;
            },
            showModalHandler(value) {
                this.showModal = value;
            }
        }
    }
</script>
