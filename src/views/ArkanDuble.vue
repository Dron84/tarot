<template>
    <div id="app" class="container">
        <div class="wrap">
            <div class="flex">
                <div style="margin: 0 10px;">
                    <h2>Дата 1</h2>
                    <div class="input_group">
                        <span>имя/название</span>
                        <input type="text" placeholder="имя/название">
                    </div>
                    <div class="grid">
                        <div class="input_group">
                            <span>День*</span>
                            <input type="number" :min="1" :max="31" ref="days" placeholder="XX" @change="inputCheck($event,'days')">
                        </div>
                        <div class="input_group">
                            <span>Месяц*</span>
                            <input type="number" :min="1" :max="12" ref="mounth" placeholder="XX" @change="inputCheck($event,'mounth')">
                        </div>
                        <div class="input_group">
                            <span>Год*</span>
                            <input type="number" :min="1900" :max="2030" ref="year" placeholder="XXXX" @change="inputCheck($event,'year')">
                        </div>
                    </div>
                </div>

                <div style="margin: 0 10px;">
                    <h2>Дата 2</h2>
                    <div class="input_group">
                        <span>имя/название</span>
                        <input type="text" placeholder="имя/название">
                    </div>
                    <div class="grid">
                        <div class="input_group">
                            <span>День*</span>
                            <input type="number" :min="1" :max="31" ref="days2" placeholder="XX" @change="inputCheck($event,'days2')">
                        </div>
                        <div class="input_group">
                            <span>Месяц*</span>
                            <input type="number" :min="1" :max="12" ref="mounth2" placeholder="XX"
                                   @change="inputCheck($event,'mounth2')">
                        </div>
                        <div class="input_group">
                            <span>Год*</span>
                            <input type="number" :min="1900" :max="2030" ref="year2" placeholder="XXXX"
                                   @change="inputCheck($event,'year2')">
                        </div>
                    </div>
                </div>

                <div style="margin: 0 10px;">
                    <h2>Cрок прогноза</h2>
                    <div class="grid">
                        <div class="input_group">
                            <span>Месяц</span>
                            <input type="number" :min="0" :max="12" ref="arkandublemounth" placeholder="XX"
                                   @change="inputCheck($event,'arkandublemounth')" @keyup.enter="calculate">
                        </div>
                        <div class="input_group">
                            <span>Год*</span>
                            <input type="number" :min="1900" :max="2030" ref="arkandubleyear" placeholder="XXXX"
                                   @change="inputCheck($event,'arkandubleyear')" @keyup.enter="calculate">
                        </div>
                    </div>
                </div>
            </div>

            <button @click="calculate">Рассчитать</button>
            <div class="simple_grid">
                <span class="onHover" @click="short =! short">{{shortText()}}</span>
                <checkbox name="cards" value="1" v-model="cards"> Карты</checkbox>
            </div>
        </div>
        <div class="horScroller" style="margin-bottom: 70px; margin-top: 40px;">
            <transition name="fade">
                <div class="simple_grid">
                    <div class="dubleMaps" v-if="map!==null&&map2!==null&&dubleMap!==null">
                        <div class="border firstmap">
                            <h3>прогноз для даты 1</h3>
                            <tarotMaps :maps="map" :short="short" :showCard="cards"/>
                        </div>
                        <div class="border secondmap">
                            <h3>прогноз для даты 2</h3>
                            <tarotMaps :maps="map2" :short="short" :showCard="cards"/>
                        </div>
                        <div class="border dublemap">
                            <h3>Парный прогноз</h3>
                            <tarotMaps :maps="dubleMap" :short="short" :showCard="cards"/>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import tarotMaps from '../components/map'
    import {Checkbox} from 'vue-checkbox-radio';

    export default {
        name: 'App',
        components: {tarotMaps, Checkbox},
        data: () => ({
            map: null,
            map2: null,
            dubleMap: null,
            short: true,
            cards: false,
        }),
        methods: {
            shortText() {
                if (this.short) {
                    return 'Полный портрет'
                } else {
                    return 'Сокращенный портрет'
                }
            },
            inputCheck(e, target) {
                if (Number(e.target.value) < Number(e.target.min)) {
                    this.$refs[target].value = Number(e.target.min)
                } else if (Number(e.target.value) > Number(e.target.max)) {
                    this.$refs[target].value = Number(e.target.max)
                }
            },
            check(num) {
                const c = (n) => {
                    if (Number(n) > 22) {
                        while (Number(n) > 22) {
                            n = Number(n) - 22
                        }
                        return Number(n)
                    } else if (n > 0 && n <= 22) {
                        return Number(n)
                    }
                }
                if (Number(num) > 0) {
                    return c(Number(num))
                } else if (Number(num) < 0) {
                    return c(Number(num) * -1)
                }else if(Number(num)===0){
                    return 22
                }
            },
            getTarot(num) {
                console.log('num',num, num-1)
                if(num===0){
                    return this.$store.getters.tarot[22]
                }else{
                    return this.$store.getters.tarot[num - 1]
                }
            },
            first(days, mounth, year) {
                if(days === ''){
                    return 0
                }else{
                    return this.check(Number(days))
                }
            },
            two(days, mounth, year) {
                if(mounth === ''){
                    return 0
                }else{
                    return Number(mounth)
                }
            },
            three(days, mounth, year) {
                let sum = Number(year[0]) + Number(year[1]) + Number(year[2]) + Number(year[3])
                return Number(this.check(sum))
            },
            fore(days, mounth, year) {
                return this.check(this.first(days, mounth, year) + this.two(days, mounth, year))
            },
            five(days, mounth, year) {
                return this.check(this.two(days, mounth, year) + this.three(days, mounth, year))
            },
            sixs(days, mounth, year) {
                return this.check(this.fore(days, mounth, year) + this.five(days, mounth, year))
            },
            seven(days, mounth, year) {
                return this.check(this.first(days, mounth, year) + this.five(days, mounth, year))
            },
            ethe(days, mounth, year) {
                return this.check(this.two(days, mounth, year) + this.sixs(days, mounth, year))
            },
            MinMax(first, second) {
                if (first > second) {
                    return (Number(first) - Number(second))
                } else if (first < second) {
                    return (Number(second) - Number(first))
                } else if (first === second) {
                    return Number(0)
                }
            },
            nine(days, mounth, year) {
                return this.check(this.MinMax(this.first(days, mounth, year), this.two(days, mounth, year)))
            },
            ten(days, mounth, year) {
                return this.check(this.MinMax(this.three(days, mounth, year), this.two(days, mounth, year)))
            },
            ileven(days, mounth, year) {
                return this.check(this.MinMax(this.nine(days, mounth, year), this.ten(days, mounth, year)))
            },
            tvelf(days, mounth, year) {
                return this.check(this.seven(days, mounth, year) + this.ethe(days, mounth, year))
            },
            therten(days, mounth, year) {
                return this.check(this.first(days, mounth, year) + this.fore(days, mounth, year) + this.sixs(days, mounth, year))
            },
            foreten(days, mounth, year) {
                return this.check(this.three(days, mounth, year) + this.five(days, mounth, year) + this.sixs(days, mounth, year))
            },
            fiften(days, mounth, year) {
                return this.check(this.nine(days, mounth, year) + this.ten(days, mounth, year) + this.ileven(days, mounth, year) - this.seven(days, mounth, year))
            },
            sixten(days, mounth, year) {
                return this.check((this.first(days, mounth, year) + this.fore(days, mounth, year)) + (this.five(days, mounth, year) + this.three(days, mounth, year)))
            },
            seventen(days, mounth, year) {
                return this.check(this.ileven(days, mounth, year) + this.sixs(days, mounth, year))
            },
            eten(days, mounth, year) {
                return this.check(this.ileven(days, mounth, year) + this.ethe(days, mounth, year))
            },
            A(days, mounth, year) {
                return this.check(this.first(days, mounth, year) + this.fore(days, mounth, year))
            },
            B(days, mounth, year) {
                return this.check(this.two(days, mounth, year) + this.fore(days, mounth, year))
            },
            C(days, mounth, year) {
                return this.check(this.two(days, mounth, year) + this.five(days, mounth, year))
            },
            D(days, mounth, year) {
                return this.check(this.three(days, mounth, year) + this.five(days, mounth, year))
            },
            E(days, mounth, year) {
                return this.check(this.fore(days, mounth, year) + this.sixs(days, mounth, year))
            },
            F(days, mounth, year) {
                return this.check(this.five(days, mounth, year) + this.sixs(days, mounth, year))
            },
            calculate() {
                let err = []
                if (!this.$refs.days.value) {
                    this.$refs.days.classList.add('err')
                    err.push('days')
                } else {
                    this.$refs.days.classList.remove('err')
                    const ind = err.indexOf('days')
                    err.slice(ind, 1)
                }
                if (!this.$refs.mounth.value) {
                    this.$refs.mounth.classList.add('err')
                    err.push('mounth')
                } else {
                    this.$refs.mounth.classList.remove('err')
                    const ind = err.indexOf('mounth')
                    err.slice(ind, 1)
                }
                if (!this.$refs.year.value) {
                    this.$refs.year.classList.add('err')
                    err.push('year')
                } else {
                    this.$refs.year.classList.remove('err')
                    const ind = err.indexOf('year')
                    err.slice(ind, 1)
                }
                if (!this.$refs.days2.value) {
                    this.$refs.days2.classList.add('err')
                    err.push('days2')
                } else {
                    this.$refs.days2.classList.remove('err')
                    const ind = err.indexOf('days2')
                    err.slice(ind, 1)
                }
                if (!this.$refs.mounth2.value) {
                    this.$refs.mounth2.classList.add('err')
                    err.push('mounth2')
                } else {
                    this.$refs.mounth2.classList.remove('err')
                    const ind = err.indexOf('mounth2')
                    err.slice(ind, 1)
                }
                if (!this.$refs.year2.value) {
                    this.$refs.year2.classList.add('err')
                    err.push('year2')
                } else {
                    this.$refs.year2.classList.remove('err')
                    const ind = err.indexOf('year2')
                    err.slice(ind, 1)
                }

                if (!this.$refs.arkandubleyear.value) {
                    this.$refs.arkandubleyear.classList.add('err')
                    err.push('arkandubleyear')
                } else {
                    this.$refs.arkandubleyear.classList.remove('err')
                    const ind = err.indexOf('arkandubleyear')
                    err.slice(ind, 1)
                }

                if (err.length === 0) {
                    const days = this.$refs.days.value
                    const mounth = this.$refs.mounth.value
                    const year = this.$refs.year.value

                    const days2 = this.$refs.days2.value
                    const mounth2 = this.$refs.mounth2.value
                    const year2 = this.$refs.year2.value

                    const arkandays = ''
                    const arkanmounth = this.$refs.arkandublemounth.value
                    const arkanyear = this.$refs.arkandubleyear.value

                    this.map = {
                        one: this.getTarot(this.check( this.first(arkandays,arkanmounth,arkanyear) + this.first(days, mounth, year) ) ),
                        two: this.getTarot(this.check( this.two(arkandays,arkanmounth,arkanyear) + this.two(days, mounth, year) ) ),
                        three: this.getTarot(this.check( this.three(arkandays,arkanmounth,arkanyear) + this.three(days, mounth, year) ) ),
                        fore: this.getTarot(this.check( this.fore(arkandays,arkanmounth,arkanyear) + this.fore(days, mounth, year) ) ),
                        five: this.getTarot(this.check( this.five(arkandays,arkanmounth,arkanyear) + this.five(days, mounth, year) ) ),
                        sixs: this.getTarot(this.check( this.sixs(arkandays,arkanmounth,arkanyear) + this.sixs(days, mounth, year) ) ),
                        seven: this.getTarot(this.check( this.seven(arkandays,arkanmounth,arkanyear) + this.seven(days, mounth, year) ) ),
                        ethe: this.getTarot(this.check( this.ethe(arkandays,arkanmounth,arkanyear) + this.ethe(days, mounth, year) ) ),
                        nine: this.getTarot(this.check( this.nine(arkandays,arkanmounth,arkanyear) + this.nine(days, mounth, year) ) ),
                        ten: this.getTarot(this.check( this.ten(arkandays,arkanmounth,arkanyear) + this.ten(days, mounth, year) ) ),
                        ileven: this.getTarot(this.check( this.ileven(arkandays,arkanmounth,arkanyear) + this.ileven(days, mounth, year) ) ),
                        tvelf: this.getTarot(this.check( this.tvelf(arkandays,arkanmounth,arkanyear) + this.tvelf(days, mounth, year) ) ),
                        therten: this.getTarot(this.check( this.therten(arkandays,arkanmounth,arkanyear) + this.therten(days, mounth, year) ) ),
                        foreten: this.getTarot(this.check( this.foreten(arkandays,arkanmounth,arkanyear) + this.foreten(days, mounth, year) ) ),
                        fiften: this.getTarot(this.check( this.fiften(arkandays,arkanmounth,arkanyear) + this.fiften(days, mounth, year) ) ),
                        sixten: this.getTarot(this.check( this.sixten(arkandays,arkanmounth,arkanyear) + this.sixten(days, mounth, year) ) ),
                        seventen: this.getTarot(this.check( this.seventen(arkandays,arkanmounth,arkanyear) + this.seventen(days, mounth, year) ) ),
                        eten: this.getTarot(this.check( this.eten(arkandays,arkanmounth,arkanyear) + this.eten(days, mounth, year) ) ),
                        A: this.getTarot(this.check( this.A(arkandays,arkanmounth,arkanyear) + this.A(days, mounth, year) ) ),
                        B: this.getTarot(this.check( this.B(arkandays,arkanmounth,arkanyear) + this.B(days, mounth, year) ) ),
                        C: this.getTarot(this.check( this.C(arkandays,arkanmounth,arkanyear) + this.C(days, mounth, year) ) ),
                        D: this.getTarot(this.check( this.D(arkandays,arkanmounth,arkanyear) + this.D(days, mounth, year) ) ),
                        E: this.getTarot(this.check( this.E(arkandays,arkanmounth,arkanyear) + this.E(days, mounth, year) ) ),
                        F: this.getTarot(this.check( this.F(arkandays,arkanmounth,arkanyear) + this.F(days, mounth, year) ) ),
                    }
                    this.map2 = {
                        one: this.getTarot(this.check( this.first(arkandays,arkanmounth,arkanyear) + this.first(days2, mounth2, year2) ) ),
                        two: this.getTarot(this.check( this.two(arkandays,arkanmounth,arkanyear) + this.two(days2, mounth2, year2) ) ),
                        three: this.getTarot(this.check( this.three(arkandays,arkanmounth,arkanyear) + this.three(days2, mounth2, year2) ) ),
                        fore: this.getTarot(this.check( this.fore(arkandays,arkanmounth,arkanyear) + this.fore(days2, mounth2, year2) ) ),
                        five: this.getTarot(this.check( this.five(arkandays,arkanmounth,arkanyear) + this.five(days2, mounth2, year2) ) ),
                        sixs: this.getTarot(this.check( this.sixs(arkandays,arkanmounth,arkanyear) + this.sixs(days2, mounth2, year2) ) ),
                        seven: this.getTarot(this.check( this.seven(arkandays,arkanmounth,arkanyear) + this.seven(days2, mounth2, year2) ) ),
                        ethe: this.getTarot(this.check( this.ethe(arkandays,arkanmounth,arkanyear) + this.ethe(days2, mounth2, year2) ) ),
                        nine: this.getTarot(this.check( this.nine(arkandays,arkanmounth,arkanyear) + this.nine(days2, mounth2, year2) ) ),
                        ten: this.getTarot(this.check( this.ten(arkandays,arkanmounth,arkanyear) + this.ten(days2, mounth2, year2) ) ),
                        ileven: this.getTarot(this.check( this.ileven(arkandays,arkanmounth,arkanyear) + this.ileven(days2, mounth2, year2) ) ),
                        tvelf: this.getTarot(this.check( this.tvelf(arkandays,arkanmounth,arkanyear) + this.tvelf(days2, mounth2, year2) ) ),
                        therten: this.getTarot(this.check( this.therten(arkandays,arkanmounth,arkanyear) + this.therten(days2, mounth2, year2) ) ),
                        foreten: this.getTarot(this.check( this.foreten(arkandays,arkanmounth,arkanyear) + this.foreten(days2, mounth2, year2) ) ),
                        fiften: this.getTarot(this.check( this.fiften(arkandays,arkanmounth,arkanyear) + this.fiften(days2, mounth2, year2) ) ),
                        sixten: this.getTarot(this.check( this.sixten(arkandays,arkanmounth,arkanyear) + this.sixten(days2, mounth2, year2) ) ),
                        seventen: this.getTarot(this.check( this.seventen(arkandays,arkanmounth,arkanyear) + this.seventen(days2, mounth2, year2) ) ),
                        eten: this.getTarot(this.check( this.eten(arkandays,arkanmounth,arkanyear) + this.eten(days2, mounth2, year2) ) ),
                        A: this.getTarot(this.check( this.A(arkandays,arkanmounth,arkanyear) + this.A(days2, mounth2, year2) ) ),
                        B: this.getTarot(this.check( this.B(arkandays,arkanmounth,arkanyear) + this.B(days2, mounth2, year2) ) ),
                        C: this.getTarot(this.check( this.C(arkandays,arkanmounth,arkanyear) + this.C(days2, mounth2, year2) ) ),
                        D: this.getTarot(this.check( this.D(arkandays,arkanmounth,arkanyear) + this.D(days2, mounth2, year2) ) ),
                        E: this.getTarot(this.check( this.E(arkandays,arkanmounth,arkanyear) + this.E(days2, mounth2, year2) ) ),
                        F: this.getTarot(this.check( this.F(arkandays,arkanmounth,arkanyear) + this.F(days2, mounth2, year2) ) ),
                    }
                    this.dubleMap = {
                        one: this.getTarot(this.check( (this.first(arkandays,arkanmounth,arkanyear) + this.first(days2, mounth2, year2)) + (this.first(arkandays,arkanmounth,arkanyear) + this.first(days, mounth, year) ) ) ),
                        two: this.getTarot(this.check( (this.two(arkandays,arkanmounth,arkanyear) + this.two(days2, mounth2, year2)) + (this.two(arkandays,arkanmounth,arkanyear) + this.two(days, mounth, year) ) ) ),
                        three: this.getTarot(this.check( (this.three(arkandays,arkanmounth,arkanyear) + this.three(days2, mounth2, year2)) + (this.three(arkandays,arkanmounth,arkanyear) + this.three(days, mounth, year) ) ) ),
                        fore: this.getTarot(this.check( (this.fore(arkandays,arkanmounth,arkanyear) + this.fore(days2, mounth2, year2)) + (this.fore(arkandays,arkanmounth,arkanyear) + this.fore(days, mounth, year) ) ) ),
                        five: this.getTarot(this.check( (this.five(arkandays,arkanmounth,arkanyear) + this.five(days2, mounth2, year2)) + (this.five(arkandays,arkanmounth,arkanyear) + this.five(days, mounth, year) ) ) ),
                        sixs: this.getTarot(this.check( (this.sixs(arkandays,arkanmounth,arkanyear) + this.sixs(days2, mounth2, year2)) + (this.sixs(arkandays,arkanmounth,arkanyear) + this.sixs(days, mounth, year) ) ) ),
                        seven: this.getTarot(this.check( (this.seven(arkandays,arkanmounth,arkanyear) + this.seven(days2, mounth2, year2)) + (this.seven(arkandays,arkanmounth,arkanyear) + this.seven(days, mounth, year) ) ) ),
                        ethe: this.getTarot(this.check( (this.ethe(arkandays,arkanmounth,arkanyear) + this.ethe(days2, mounth2, year2)) + (this.ethe(arkandays,arkanmounth,arkanyear) + this.ethe(days, mounth, year) ) ) ),
                        nine: this.getTarot(this.check( (this.nine(arkandays,arkanmounth,arkanyear) + this.nine(days2, mounth2, year2)) + (this.nine(arkandays,arkanmounth,arkanyear) + this.nine(days, mounth, year) ) ) ),
                        ten: this.getTarot(this.check( (this.ten(arkandays,arkanmounth,arkanyear) + this.ten(days2, mounth2, year2)) + (this.ten(arkandays,arkanmounth,arkanyear) + this.ten(days, mounth, year) ) ) ),
                        ileven: this.getTarot(this.check( (this.ileven(arkandays,arkanmounth,arkanyear) + this.ileven(days2, mounth2, year2)) + (this.ileven(arkandays,arkanmounth,arkanyear) + this.ileven(days, mounth, year) ) ) ),
                        tvelf: this.getTarot(this.check( (this.tvelf(arkandays,arkanmounth,arkanyear) + this.tvelf(days2, mounth2, year2)) + (this.tvelf(arkandays,arkanmounth,arkanyear) + this.tvelf(days, mounth, year) ) ) ),
                        therten: this.getTarot(this.check( (this.therten(arkandays,arkanmounth,arkanyear) + this.therten(days2, mounth2, year2)) + (this.therten(arkandays,arkanmounth,arkanyear) + this.therten(days, mounth, year) ) ) ),
                        foreten: this.getTarot(this.check( (this.foreten(arkandays,arkanmounth,arkanyear) + this.foreten(days2, mounth2, year2)) + (this.foreten(arkandays,arkanmounth,arkanyear) + this.foreten(days, mounth, year) ) ) ),
                        fiften: this.getTarot(this.check( (this.fiften(arkandays,arkanmounth,arkanyear) + this.fiften(days2, mounth2, year2)) + (this.fiften(arkandays,arkanmounth,arkanyear) + this.fiften(days, mounth, year) ) ) ),
                        sixten: this.getTarot(this.check( (this.sixten(arkandays,arkanmounth,arkanyear) + this.sixten(days2, mounth2, year2)) + (this.sixten(arkandays,arkanmounth,arkanyear) + this.sixten(days, mounth, year) ) ) ),
                        seventen: this.getTarot(this.check( (this.seventen(arkandays,arkanmounth,arkanyear) + this.seventen(days2, mounth2, year2)) + (this.seventen(arkandays,arkanmounth,arkanyear) + this.seventen(days, mounth, year) ) ) ),
                        eten: this.getTarot(this.check( (this.eten(arkandays,arkanmounth,arkanyear) + this.eten(days2, mounth2, year2)) + (this.eten(arkandays,arkanmounth,arkanyear) + this.eten(days, mounth, year) ) ) ),
                        A: this.getTarot(this.check( (this.A(arkandays,arkanmounth,arkanyear) + this.A(days2, mounth2, year2)) + (this.A(arkandays,arkanmounth,arkanyear) + this.A(days, mounth, year) ) ) ),
                        B: this.getTarot(this.check( (this.B(arkandays,arkanmounth,arkanyear) + this.B(days2, mounth2, year2)) + (this.B(arkandays,arkanmounth,arkanyear) + this.B(days, mounth, year) ) ) ),
                        C: this.getTarot(this.check( (this.C(arkandays,arkanmounth,arkanyear) + this.C(days2, mounth2, year2)) + (this.C(arkandays,arkanmounth,arkanyear) + this.C(days, mounth, year) ) ) ),
                        D: this.getTarot(this.check( (this.D(arkandays,arkanmounth,arkanyear) + this.D(days2, mounth2, year2)) + (this.D(arkandays,arkanmounth,arkanyear) + this.D(days, mounth, year) ) ) ),
                        E: this.getTarot(this.check( (this.E(arkandays,arkanmounth,arkanyear) + this.E(days2, mounth2, year2)) + (this.E(arkandays,arkanmounth,arkanyear) + this.E(days, mounth, year) ) ) ),
                        F: this.getTarot(this.check( (this.F(arkandays,arkanmounth,arkanyear) + this.F(days2, mounth2, year2)) + (this.F(arkandays,arkanmounth,arkanyear) + this.F(days, mounth, year) ) ) ),
                    }
                }

            },
        },
    }
</script>

