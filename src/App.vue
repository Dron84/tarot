<template>
    <div id="app">
        <navbar />
        <router-view/>
    </div>
</template>
<script>
    import navbar from './components/navigation'
    export default {
        components: {navbar},

    }
</script>
<style lang="sass">
    @import "sass/vars"
    @import url('https://fonts.googleapis.com/css?family=Manrope&display=swap')
    *
        margin: 0
        padding: 0
        box-sizing: border-box
        font-family: 'Manrope', sans-serif
        -ms-hyphens: auto
        -webkit-hyphens: auto
        hyphens: auto
        -moz-hyphenate-limit-chars: 6 3 2
        -webkit-hyphenate-limit-chars: 6 3 2
        -ms-hyphenate-limit-chars: 6 3 2
        hyphenate-limit-chars: 6 3 2

    html
        background-color: $first
        font-family: 'Manrope', sans-serif

    .container
        font-family: 'Manrope', sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: $fore
        margin-bottom: 60px
        h1
            margin: 20px 0

    .onHover
        cursor: pointer

    .border
        border-radius: 5px
        border: 1px solid $five
        padding: 0 30px 0 30px

    button
        border: 1px solid transparent
        margin: 10px auto
        border-radius: 5px
        background-color: $fore
        color: $first
        height: 40px
        padding: 0 30px
        max-width: 220px
        outline: $fore
        &:disabled
            background-color: $second
            color: $five
            &:hover
                background-color: $second
                color: $five
                cursor: not-allowed
                border: 1px solid transparent
        &:hover
            background-color: $first
            color: $fore
            border: 1px solid $fore
            cursor: pointer

    .horScroller
        display: block
        width: 100%

    .grid
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr))
        grid-gap: 10px

    .simple_grid
        display: grid
        justify-content: center

    .flex
        display: flex
        flex-wrap: wrap
        justify-content: center

    #app
        padding-top: 80px
        display: grid
        h2
            color: $fore
        .wrap
            display: grid
            justify-content: center
            align-items: center

    .input_group
        span
            display: block
        input
            height: 40px
            width: 100%
            font-size: 20px
            text-align: center
            border-radius: 5px
            border: 1px solid $five
            &[type='number']
                max-width: 60px
            &.err
                border: 2px solid red

    .dubleMaps
        display: grid
        grid-template-columns: repeat(2, minmax(50px, 1fr))
        grid-template-areas: "firstmap secondmap" "dublemap dublemap"
        grid-gap: 20px
        width: max-content
        .firstmap
            grid-area: firstmap
            display: grid
            justify-content: center
        .secondmap
            grid-area: secondmap
            display: grid
            justify-content: center
        .dublemap
            grid-area: dublemap
            display: grid
            justify-content: center

    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0

    .checkbox-component
        margin: 10px !important

    .checkbox-component > input + label > .input-box
        position: relative !important
        border: 1px solid $five !important
        border-radius: 40% !important
        width: 30px !important
        height: 20px !important
        background: #fff !important
        overflow: visible !important
        transition: background 0.2s ease-in !important
        vertical-align: -15% !important
        &:before
            content: '' !important
            position: absolute !important
            top: -2px !important
            left: -1px !important
            border: 1px solid $five !important
            border-radius: 50% !important
            width: 20px !important
            height: 20px !important
            background: #fff !important
            transition: transform 0.3s ease-out !important

    .checkbox-component > input:checked + label > .input-box
        background: $five !important
        &:before
            border-color: $five !important
            transform: translateX(0.6em) !important

    @media screen and (max-width: 1200px)
        .border
            padding: 0 20px
</style>
