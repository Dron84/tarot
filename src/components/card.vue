<template>
    <div class="card" :class="{'short' : !showCard}" @click="modal = !modal" :style="cardShow">
        <span class="number">{{caption}}</span>
        <!--<img :src="imgsrc" :alt="rim_number">-->
        <span class="rim_number">{{rim_number}}</span>
        <transition name="fade">
            <div class="modal" v-if="modal">
                <div class="wrapper">
                    <span class="modal__number">{{caption}}</span>
                    <img :src="imgsrc" :alt="rim_number">
                    <span class="modal__rim_number">{{rim_number}}</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "card",
        data: ()=>({
            modal: false
        }),
        props:{
            showCard: {type: Boolean, default: true},
            caption: {type: String,required: true},
            imgsrc: {type: String,required: true},
            rim_number: {type: String,required: true},
        },
        computed:{
            cardShow(){
                if(this.showCard===true){
                    return `background-image: url('${this.imgsrc}');`
                }else{
                    return ''
                }
            }
        }
    }
</script>

<style lang="sass">
    @import "../sass/vars"
    .card
        display: grid
        justify-content: center
        align-items: center
        justify-self: center
        background-repeat: no-repeat
        background-size: cover
        background-position: center
        border-radius: 10px
        overflow: hidden
        width: 100%
        position: relative
        transition: all .4s ease-in-out
        &::after
            content: ''
            position: absolute
            display: block
            top: 0
            left: 0
            width: 100%
            height: 100%
            background-color: rgba($five,.4)
            transition: all .4s ease-in-out
        &:hover
            cursor: pointer
            outline: $five
            &::after
                background-color: transparent
            span
                background-color: $three
        &.short
            height: 40px
            width: 40px
        span
            position: absolute
            text-align: center
            color: $five
            display: block
            width: 100%
            transition: all .4s ease-in-out
            &.number
                top: 0
            &.rim_number
                bottom: 0
        img
            display: block
            height: 260px
            border-radius: 10px

    .modal
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: $three
        display: grid
        justify-content: center
        align-items: center
        z-index: 10000
        .wrapper
            display: grid
            width: auto
            height: 100vh
            justify-content: center
            position: relative
            span
                display: block
                text-align: center
                color: $five
                &.modal__number
                    top: 0
                &.modal__rim_number
                    bottom: 0
            img
                height: 96%
                border-radius: 10px
    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0
    @media screen and (min-width: 1201px)
        .card
            height: 250px
    @media screen and (max-width: 1200px)
        .card
            height: 200px
    @media screen and (max-width: 800px)
        .card
            height: 100px
    @media screen and (max-width: 500px)
        .card
            height: 60px

</style>