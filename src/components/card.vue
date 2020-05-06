<template>
    <div >
    <div class="card" :class="getClasses" @click="show" :style="cardShow">
        <span class="number">№ {{caption}}</span>
        <!--<img :src="imgsrc" :alt="rim_number">-->
        <span class="rim_number">{{rim_number}}</span>
    </div>
    <!--<transition name="fade">-->
        <!--<div class="modal" v-if="modal" @click="modal = !modal">-->
            <!--<div class="wrapper">-->
                <!--<span class="modal__number">{{caption}}</span>-->
                <!--<img class="modal__img" :src="imgsrc" :alt="rim_number">-->
                <!--<span class="modal__rim_number">{{rim_number}}</span>-->
            <!--</div>-->
        <!--</div>-->
    <!--</transition>-->
    </div>
</template>

<script>
    export default {
        name: "card",
        data: ()=>({
            modal: false,
            hoverCard: false,
        }),
        props:{
            showCard: {type: Boolean, default: true},
            caption: {type: String,required: true},
            imgsrc: {type: String,required: true},
            rim_number: {type: String,required: true},
        },
        methods:{
            show(){
                this.hoverCard = !this.hoverCard
            }
        },
        computed:{
            getClasses(){
                let result = ''
                if(!this.showCard){
                    result = result +' short '
                }
                if(this.hoverCard && !this.elseCard){
                    result = result +' hover '
                }
                return result
            },
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
        border: 1px solid $five
        width: 100%
        position: relative
        transition: all .4s ease-in-out
        font-size: 20px
        &.hover
            transform: scale(5)
            z-index: 99999
            transition: all 1s ease-in-out
            span
                opacity: 0
        &:hover
            cursor: pointer
            outline: $five
            &::after
                content: ''
                display: block
                width: 100%
                height: 100%
                top: 0
                left: 0
                bottom: 0
                right: 0
                background-color: $five
        &.short
            height: $short_height
            width: $short_width
            span
                &.number
                    top: 0
                &.rim_number
                    bottom: 0
        span
            position: absolute
            text-align: center
            color: $five
            display: block
            width: 100%
            transition: all 1s ease-in-out
            white-space: nowrap
            opacity: 1
            &.number
                top: -30px
            &.rim_number
                bottom: -30px

    .modal
        position: fixed
        top: 0
        left: 0
        bottom: 0
        right: 0
        width: 100vw
        height: 100vh
        background-color: rgba($three,.9)
        display: grid
        justify-content: center
        align-items: center
        z-index: 10000
        .wrapper
            display: grid
            width: auto
            height: 100%
            justify-content: center
            align-items: center
            position: relative
            span
                background-color: transparent !important
                display: block
                text-align: center
                color: $five
                font-size: 30px
                &.modal__number
                    top: 0
                &.modal__rim_number
                    bottom: 0
            .modal__img
                border-radius: 10px
                height: auto
                width: auto
    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0


    @media screen and (min-width: 1201px)
        .card
            height: 55px
    @media screen and (max-width: 1200px)
        .card
            height: 55px

</style>