<template>
    <div class="card" @click="modal = !modal">
        <span class="number">{{caption}}</span>
        <img :src="imgsrc" :alt="rim_number">
        <span class="rim_number">{{rim_number}}</span>
        <transition name="fade">
            <div class="modal" v-if="modal">
                <div class="wrapper">
                    <span class="number">{{caption}}</span>
                    <img :src="imgsrc" :alt="rim_number">
                    <span class="rim_number">{{rim_number}}</span>
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
            caption: {type: String,required: true},
            imgsrc: {type: String,required: true},
            rim_number: {type: String,required: true},
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
        background-color: $five
        border-radius: 10px
        overflow: hidden
        max-width: 180px
        max-height: 300px
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
            text-align: center
            color: $first
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
            width: auto
            height: 100vh
            span
                display: block
                text-align: center
                color: $five
            img
                height: 93%
    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0
    @media (max-width: 1200px)
        .card img
            height: 160px
    @media (max-width: 800px)
        .card img
            height: 100px
    @media (max-width: 500px)
        .card
            width: 80%
            img
                height: 60px

</style>