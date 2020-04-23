<template>
    <div class="maps" :class="mapsClass">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <card class="ileven" caption="11" :imgsrc="maps.ileven.img" :rim_number="maps.ileven.rim" :showCard="showCard" />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <card class="fiften" caption="15" :imgsrc="maps.fiften.img" :rim_number="maps.fiften.rim" :showCard="showCard"/>
        <div></div>
        <card class="nine" caption="9" :imgsrc="maps.nine.img" :rim_number="maps.nine.rim" :showCard="showCard"/>
        <div></div>
        <card class="ten" caption="10" :imgsrc="maps.ten.img" :rim_number="maps.ten.rim" :showCard="showCard"/>
        <div></div>
        <card class="eten" caption="18" :imgsrc="maps.eten.img" :rim_number="maps.eten.rim" :showCard="showCard"/>
        <div></div>
        <card class="one" caption="1" :imgsrc="maps.one.img" :rim_number="maps.one.rim" :showCard="showCard"/>
        <div></div>
        <card class="two" caption="2" :imgsrc="maps.two.img" :rim_number="maps.two.rim" :showCard="showCard"/>
        <div></div>
        <card class="three" caption="3" :imgsrc="maps.three.img" :rim_number="maps.three.rim" :showCard="showCard"/>
        <div></div>
        <div></div>
        <div></div>
        <card class="fore" caption="4" :imgsrc="maps.fore.img" :rim_number="maps.fore.rim" :showCard="showCard"/>
        <div></div>
        <card class="five" caption="5" :imgsrc="maps.five.img" :rim_number="maps.five.rim" :showCard="showCard"/>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <card class="sixs" caption="6" :imgsrc="maps.sixs.img" :rim_number="maps.sixs.rim" :showCard="showCard"/>
        <div></div>
        <div></div>
        <div></div>
        <card class="sixten" caption="16" :imgsrc="maps.sixten.img" :rim_number="maps.sixten.rim" :showCard="showCard"/>
        <card class="seventen" caption="17" :imgsrc="maps.seventen.img" :rim_number="maps.seventen.rim" :showCard="showCard"/>
        <div></div>
        <card class="ethe" caption="8" :imgsrc="maps.ethe.img" :rim_number="maps.ethe.rim" :showCard="showCard"/>
        <div></div>
        <card class="seven" caption="7" :imgsrc="maps.seven.img" :rim_number="maps.seven.rim" :showCard="showCard"/>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <card class="A" caption="A" :imgsrc="maps.A.img" :rim_number="maps.A.rim" :showCard="showCard"/>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <card class="B" caption="B" :imgsrc="maps.B.img" :rim_number="maps.B.rim" :showCard="showCard"/>
        <div></div>
        <card class="C" caption="C" :imgsrc="maps.C.img" :rim_number="maps.C.rim" :showCard="showCard"/>
        <div></div>
        <div></div>
        <div></div>
        <card class="D" caption="D" :imgsrc="maps.D.img" :rim_number="maps.D.rim" :showCard="showCard"/>
        <div></div>
        <card class="E" caption="E" :imgsrc="maps.E.img" :rim_number="maps.E.rim" :showCard="showCard"/>
        <div></div>
        <card class="F" caption="F" :imgsrc="maps.F.img" :rim_number="maps.F.rim" :showCard="showCard"/>
        <div></div>
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
        &.short
            grid-template-columns: repeat(5, minmax(180px, 1fr))
            grid-template-rows: repeat(4, minmax(250px, 1fr))
            grid-template-areas:  "one . two . three " ". fore . five . " ". . sixs . . " "seventen . ethe . seven "
            .eten,.sixten,.seventen,.ileven,.fiften,.nine,.ten,.sixten,.seventen,.A,.B,.C,.D,.E,.F
                display: none
            &.noimg
                grid-template-columns: repeat(5, minmax(40px, 40px))
                grid-template-rows: repeat(4, minmax(40px, 40px))
                grid-gap: 5px
        &.noimg
            grid-template-columns: repeat(7, minmax(40px, 40px))
            grid-template-rows: repeat(9, minmax(40px, 40px))
            grid-gap: 5px
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
            grid-template-columns: repeat(7, minmax(180px, 1fr))
            grid-template-rows: repeat(9, minmax(250px, 1fr))
            grid-template-areas:  ". . . ileven . . . " "fiften . nine . ten . eten" ". one . two . three . " ". . fore . five . ." ". . . sixs . . ." "sixten seventen . ethe . seven ." ". . . A . . . " ". . B . C . ." ". D . E . F ."
            grid-gap: 10px
            &.short
                grid-template-columns: repeat(5, minmax(180px, 1fr))
                grid-template-rows: repeat(4, minmax(250px, 1fr))
                grid-template-areas:  "one . two . three " ". fore . five . " ". . sixs . . " "seventen . ethe . seven "
                &.noimg
                    grid-template-columns: repeat(5, minmax(40px, 40px))
                    grid-template-rows: repeat(4, minmax(40px, 40px))
                    grid-gap: 5px
            &.noimg
                grid-template-columns: repeat(7, minmax(40px, 40px))
                grid-template-rows: repeat(9, minmax(40px, 40px))
                grid-gap: 5px
    @media screen and (max-width: 1200px)
        .maps
            grid-template-columns: repeat(7, minmax(100px, 1fr))
            grid-template-rows: repeat(9, minmax(200px, 1fr))
            grid-template-areas:  ". . . ileven . . . " "fiften . nine . ten . eten" ". one . two . three . " ". . fore . five . ." ". . . sixs . . ." "sixten seventen . ethe . seven ." ". . . A . . . " ". . B . C . ." ". D . E . F ."
            grid-gap: 10px
            &.short
                grid-template-columns: repeat(5, minmax(100px, 1fr))
                grid-template-rows: repeat(4, minmax(200px, 1fr))
                grid-template-areas:  "one . two . three " ". fore . five . " ". . sixs . . " "seventen . ethe . seven "
                &.noimg
                    grid-template-columns: repeat(5, minmax(40px, 40px))
                    grid-template-rows: repeat(4, minmax(40px, 40px))
                    grid-gap: 5px
            &.noimg
                grid-template-columns: repeat(7, minmax(40px, 40px))
                grid-template-rows: repeat(9, minmax(40px, 40px))
                grid-gap: 5px
    @media screen and (max-width: 800px)
        .maps
            grid-template-columns: repeat(7, minmax(50px, 1fr))
            grid-template-rows: repeat(9, minmax(100px, 1fr))
            grid-template-areas:  ". . . ileven . . . " "fiften . nine . ten . eten" ". one . two . three . " ". . fore . five . ." ". . . sixs . . ." "sixten seventen . ethe . seven ." ". . . A . . . " ". . B . C . ." ". D . E . F ."
            grid-gap: 10px
            &.short
                grid-template-columns: repeat(5, minmax(50px, 1fr))
                grid-template-rows: repeat(4, minmax(100px, 1fr))
                grid-template-areas:  "one . two . three " ". fore . five . " ". . sixs . . " "seventen . ethe . seven "
                &.noimg
                    grid-template-columns: repeat(5, minmax(40px, 40px))
                    grid-template-rows: repeat(4, minmax(40px, 40px))
                    grid-gap: 5px
            &.noimg
                grid-template-columns: repeat(7, minmax(40px, 40px))
                grid-template-rows: repeat(9, minmax(40px, 40px))
                grid-gap: 5px
    @media screen and (max-width: 500px)
        .maps
            grid-template-columns: repeat(7, minmax(35px, 1fr))
            grid-template-rows: repeat(9, minmax(60px, 1fr))
            grid-template-areas:  ". . . ileven . . . " "fiften . nine . ten . eten" ". one . two . three . " ". . fore . five . ." ". . . sixs . . ." "sixten seventen . ethe . seven ." ". . . A . . . " ". . B . C . ." ". D . E . F ."
            grid-gap: 10px
            &.short
                grid-template-columns: repeat(5, minmax(35px, 1fr))
                grid-template-rows: repeat(4, minmax(60px, 1fr))
                grid-template-areas:  "one . two . three " ". fore . five . " ". . sixs . . " "seventen . ethe . seven "
                &.noimg
                    grid-template-columns: repeat(5, minmax(40px, 40px))
                    grid-template-rows: repeat(4, minmax(40px, 40px))
                    grid-gap: 5px
            &.noimg
                grid-template-columns: repeat(7, minmax(40px, 40px))
                grid-template-rows: repeat(9, minmax(40px, 40px))
                grid-gap: 5px

</style>