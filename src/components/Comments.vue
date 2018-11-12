<template>
    <div class="comments-section col-xs-12 col-md-4" >
            <div class="likes-header col-xs-12">
                <h3 class="section-heading col-xs-6">Add a comment</h3>
                <span v-on:click="likesHandler" class="fa fa-heart-o" aria-hidden="true"></span>
                <span class="text">{{nLikes}} likes</span>
            </div>
            <div class="comments-holder">
                <div class="commments-display">
                    <div class="comment-wrapper" v-for="(comment, index) in this.commentsArray" :key="index">
                        <span class="fa fa-comment-o" aria-hidden="true"></span>
                        <span class="comment-text">{{comment}}</span>    
                    </div>
                </div>
                <div class="comments-input-section">
                    <input v-on:keyup="addComment" type="text" class="input-tab" placeholder="Type a comment" />
                </div>
            </div>
    </div>
</template>

<script>
    import 'firebase/app';
    import firebase from 'firebase/app';
    import 'firebase/database';

    export default {
        name: 'ImageModal',
        props: ['imageURL', 'contentInfo'],
        data() {
            return {
                image: this.imageURL,
                commentsArray: null,
                nLikes: null
            }
        },
        watch: {
            imageURL: function(newVal, oldVal) {
                this.displayComments(newVal);
            }
        },
        methods: {
            displayComments(image) {
                var self = this;
                this.commentsArray = this.contentInfo.filter(item => item.url == image).map(item => item.comments);
                this.commentsArray = this.commentsArray[0] || [];
                this.nLikes =  this.contentInfo.filter(item => item.url == image).map(item => item.likes)[0];
            },
            addComment(e) {
                var textValue = e.target.value;
                if (e.keyCode === 13 && textValue != "") {
                    this.commentsArray.push(textValue);
                    e.target.value = "";
                }
            },
            likesHandler(e) {
                e.target.className = 'fa fa-heart';
                setTimeout(function() {
                    e.target.className = 'fa fa-heart-o';
                }, 500);
                this.nLikes++;
            }
        },
        updated() {
            var ref = firebase.database().ref();
            var self = this;
            ref.on('value', function(snapshot) {
                snapshot.forEach(function(sport) {
                    sport.ref.orderByChild('url').equalTo(self.imageURL).on('value', function(imageData) {
                        imageData.forEach(function(data) {
                            if(data != null) {
                                data.ref.update({ comments: self.commentsArray, likes: self.nLikes })
                            }
                        });
                    });
                });
            });
        }
    }
</script>
