<template>
    <div class="maps" :class="mapsClass">
        <div class="line"></div>
        <card class="ileven" caption="11" :imgsrc="maps.ileven.img" :rim_number="maps.ileven.rim" :showCard="showCard" />
        <card class="fiften" caption="15" :imgsrc="maps.fiften.img" :rim_number="maps.fiften.rim" :showCard="showCard"/>
        <card class="nine" caption="9" :imgsrc="maps.nine.img" :rim_number="maps.nine.rim" :showCard="showCard"/>
        <card class="ten" caption="10" :imgsrc="maps.ten.img" :rim_number="maps.ten.rim" :showCard="showCard"/>
        <card class="tvelf" caption="12" :imgsrc="maps.tvelf.img" :rim_number="maps.tvelf.rim" :showCard="showCard"/>
        <card class="therten" caption="13" :imgsrc="maps.therten.img" :rim_number="maps.therten.rim" :showCard="showCard"/>
        <card class="foreten" caption="14" :imgsrc="maps.foreten.img" :rim_number="maps.foreten.rim" :showCard="showCard"/>
        <card class="eten" caption="18" :imgsrc="maps.eten.img" :rim_number="maps.eten.rim" :showCard="showCard"/>
        <card class="one" caption="1" :imgsrc="maps.one.img" :rim_number="maps.one.rim" :showCard="showCard"/>
        <card class="two" caption="2" :imgsrc="maps.two.img" :rim_number="maps.two.rim" :showCard="showCard"/>
        <card class="three" caption="3" :imgsrc="maps.three.img" :rim_number="maps.three.rim" :showCard="showCard"/>
        <card class="fore" caption="4" :imgsrc="maps.fore.img" :rim_number="maps.fore.rim" :showCard="showCard"/>
        <card class="five" caption="5" :imgsrc="maps.five.img" :rim_number="maps.five.rim" :showCard="showCard"/>
        <card class="sixs" caption="6" :imgsrc="maps.sixs.img" :rim_number="maps.sixs.rim" :showCard="showCard"/>
        <card class="sixten" caption="16" :imgsrc="maps.sixten.img" :rim_number="maps.sixten.rim" :showCard="showCard"/>
        <card class="seventen" caption="17" :imgsrc="maps.seventen.img" :rim_number="maps.seventen.rim" :showCard="showCard"/>
        <card class="ethe" caption="8" :imgsrc="maps.ethe.img" :rim_number="maps.ethe.rim" :showCard="showCard"/>
        <card class="seven" caption="7" :imgsrc="maps.seven.img" :rim_number="maps.seven.rim" :showCard="showCard"/>
        <div class="line2"></div>
        <card class="A" caption="A" :imgsrc="maps.A.img" :rim_number="maps.A.rim" :showCard="showCard"/>
        <card class="B" caption="B" :imgsrc="maps.B.img" :rim_number="maps.B.rim" :showCard="showCard"/>
        <card class="C" caption="C" :imgsrc="maps.C.img" :rim_number="maps.C.rim" :showCard="showCard"/>
        <card class="D" caption="D" :imgsrc="maps.D.img" :rim_number="maps.D.rim" :showCard="showCard"/>
        <card class="E" caption="E" :imgsrc="maps.E.img" :rim_number="maps.E.rim" :showCard="showCard"/>
        <card class="F" caption="F" :imgsrc="maps.F.img" :rim_number="maps.F.rim" :showCard="showCard"/>
    </div>
</template>

<script>
    import card from './card'
    export default {
        name: "map",
        components:{card,},
        props: {
            showCard: {type: Boolean, default: true},
            short: {type: Boolean, default: true},
            maps: { type: Object, required: true }
        },
        computed:{
            mapsClass(){
                let result = ''
                if(this.short){
                    result = result + ' short '
                }
                if(!this.showCard){
                    result = result + ' noimg '
                }
                return result
            }
        }
    }
</script>

<style scoped lang="sass">
    @import "../sass/vars"
    .maps
        display: grid
        max-width: 100vw
        grid-template-areas:  "fiften . . . ileven . . . eten " ". . . nine . ten . . . " ". therten line line line line line foreten . " ". . one . two . three . seven " ". . . fore . five . . . " ". . . . sixs . tvelf . ethe " "seventen . sixten. . . . . . " "line2 line2 line2 line2 line2 line2 line2 line2 line2 " ". . . . A . . . . " ". . . B . C . . . " ". . D . E . F . . "
        margin-bottom: 40px
        &.short
            grid-template-areas:  " one . two . three . seven " " . fore . five . . . " " . . sixs . tvelf . ethe "
            .eten,.ileven,.fiften,.nine,.ten,.A,.B,.C,.D,.E,.F,.tvelf,.therten,.foreten,.line,.line2,.sixten,.seventen
                display: none
        .line,.line2
            grid-area: line
            background-color: black
            width: 100%
            height: 3px
            display: flex
            align-self: center
        .line2
            grid-area: line2
        .tvelf
            grid-area: tvelf
        .therten
            grid-area: therten
        .foreten
            grid-area: foreten
        .ileven
            grid-area: ileven
        .fiften
            grid-area: fiften
        .nine
            grid-area: nine
        .ten
            grid-area: ten
        .eten
            grid-area: eten
        .one
            grid-area: one
        .two
            grid-area: two
        .three
            grid-area: three
        .fore
            grid-area: fore
        .five
            grid-area: five
        .sixs
            grid-area: sixs
        .sixten
            grid-area: sixten
        .seventen
            grid-area: seventen
        .ethe
            grid-area: ethe
        .seven
            grid-area: seven
        .A
            grid-area: A
        .B
            grid-area: B
        .C
            grid-area: C
        .D
            grid-area: D
        .E
            grid-area: E
        .F
            grid-area: F
    @media screen and (min-width: 1201px)
        .maps
            grid-template-columns: repeat(9, minmax(180px, 1fr))
            grid-template-rows: repeat(11, minmax(250px, 1fr))
            grid-gap: 20px
            margin: 40px 0 70px 0
            &.short
                grid-template-columns: repeat(7, minmax(180px, 1fr))
                grid-template-rows: repeat(3, minmax(250px, 1fr))
                &.noimg
                    grid-template-columns: repeat(7, minmax($short_map_width, .5fr))

                    grid-template-rows: repeat(3, minmax($short_map_height, .5fr))
                    grid-gap: 5px
            &.noimg
                grid-template-columns: repeat(9, minmax($short_map_width, .5fr))
                grid-template-rows: repeat(11, minmax($short_map_height, .5fr))
                grid-gap: 5px
    @media screen and (max-width: 1200px)
        .maps
            grid-template-columns: repeat(9, minmax(90px, 1fr))
            grid-template-rows: repeat(11, minmax(200px, 1fr))
            grid-gap: 10px
            margin: 40px 0 70px 0
            &.short
                grid-template-columns: repeat(7, minmax(100px, 1fr))
                grid-template-rows: repeat(3, minmax(200px, 1fr))
                &.noimg
                    grid-template-columns: repeat(7, minmax($short_map_width, .5fr))
                    grid-template-rows: repeat(3, minmax($short_map_height, .5fr))
                    grid-gap: 5px
            &.noimg
                grid-template-columns: repeat(9, minmax($short_map_width, .5fr))
                grid-template-rows: repeat(11, minmax($short_map_height, .5fr))
                grid-gap: 5px

    @media screen and (max-width: 800px)
        .maps
            grid-template-columns: repeat(9, minmax(50px, 1fr))
            grid-template-rows: repeat(11, minmax(100px, 1fr))
            grid-gap: 10px
            &.short
                grid-template-columns: repeat(7, minmax(50px, 1fr))
                grid-template-rows: repeat(3, minmax(100px, 1fr))
    @media screen and (max-width: 500px)
        .maps
            grid-template-columns: repeat(9, minmax(35px, 1fr))
            grid-template-rows: repeat(11, minmax(60px, 1fr))
            grid-gap: 10px
            &.short
                grid-template-columns: repeat(7, minmax(35px, 1fr))
                grid-template-rows: repeat(3, minmax(60px, 1fr))

</style>