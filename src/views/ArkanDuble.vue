<template>
    <div id="app" class="container">
        <div class="wrap">
            <div class="flex">
                <div style="margin: 0 10px;">
                    <h2>Дата 1</h2>
                    <div class="input_group">
                        <span>имя/название</span>
                        <input type="text" placeholder="имя/название" v-model="data1">
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
                        <input type="text" placeholder="имя/название" v-model="data2">
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
                            <h3>прогноз для даты 1 <br>{{data1}}</h3>
                            <tarotMaps :maps="map" :short="short" :showCard="cards"/>
                        </div>
                        <div class="border secondmap">
                            <h3>прогноз для даты 2 <br>{{data2}}</h3>
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
            data1: '',
            data2: '',
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
                return this.$store.getters.tarot[num - 1]
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
            sevenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) {
                const one = this.first(days, mounth, year) + this.five(days, mounth, year)
                const two = this.first(arkanDays, arkanMounth, arkanYear) + this.five(arkanDays, arkanMounth, arkanYear)
                return this.check(one+two)
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
                console.log('#9',this.first(days, mounth, year), this.two(days, mounth, year),'=', this.MinMax(this.first(days, mounth, year), this.two(days, mounth, year)))
                return this.check(this.MinMax(this.first(days, mounth, year), this.two(days, mounth, year)))
            },
            nineDuble(arkanDays, arkanMounth, arkanYear, days, mounth, year) {
                const first = this.check(this.first(days, mounth, year) + this.first(arkanDays, arkanMounth, arkanYear))
                const two = this.check(this.two(days, mounth, year) + this.two(arkanDays, arkanMounth, arkanYear))
                return this.check(this.MinMax(first,two))
            },
            ten(days, mounth, year) {
                console.log('#10',this.three(days, mounth, year), this.two(days, mounth, year),'=', this.MinMax(this.three(days, mounth, year), this.two(days, mounth, year)))
                return this.check(this.MinMax(this.three(days, mounth, year), this.two(days, mounth, year)))
            },
            tenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) {
                const three = this.check(this.three(days, mounth, year) + this.three(arkanDays, arkanMounth, arkanYear))
                const two = this.check(this.two(days, mounth, year) + this.two(arkanDays, arkanMounth, arkanYear))
                return this.check(this.MinMax(three, two))
            },
            ileven(days, mounth, year) {
                return this.check(this.MinMax(this.nine(days, mounth, year), this.ten(days, mounth, year)))
            },
            ilevenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) {
                return this.check(this.MinMax(this.nineDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year), this.tenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year)))
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
            fiftenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) {
                return this.check(this.nineDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) + this.tenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) + this.ilevenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) - (this.sevenDuble(arkanDays, arkanMounth, arkanYear, days, mounth, year) ))
            },
            sixten(days, mounth, year) {
                return this.check((this.first(days, mounth, year) + this.fore(days, mounth, year)) + (this.five(days, mounth, year) + this.three(days, mounth, year)))
            },
            seventen(days, mounth, year) {
                return this.check(this.ileven(days, mounth, year) + this.sixs(days, mounth, year))
            },
            seventenDuble(arkanDays, arkanMounth, arkanYear, days, mounth, year) {
                return this.check(this.ilevenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) + ( this.sixs(arkanDays, arkanMounth, arkanYear) + this.sixs(days, mounth, year)))
            },
            eten(days, mounth, year) {
                return this.check(this.ileven(days, mounth, year) + this.ethe(days, mounth, year))
            },
            etenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) {
                return this.check(this.ilevenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) + (this.ethe(arkanDays, arkanMounth, arkanYear) + this.ethe(days, mounth, year)) )
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

                    const one = this.check(this.first(arkandays, arkanmounth, arkanyear) + this.first(days, mounth, year))
                    const two = this.check(this.two(arkandays, arkanmounth, arkanyear) + this.two(days, mounth, year))
                    const three = this.check(this.three(arkandays, arkanmounth, arkanyear) + this.three(days, mounth, year))
                    const fore = this.check(this.fore(arkandays, arkanmounth, arkanyear) + this.fore(days, mounth, year))
                    const five = this.check(this.five(arkandays, arkanmounth, arkanyear) + this.five(days, mounth, year))
                    const sixs = this.check(this.sixs(arkandays, arkanmounth, arkanyear) + this.sixs(days, mounth, year))
                    const seven = this.check(this.seven(arkandays, arkanmounth, arkanyear) + this.seven(days, mounth, year))
                    const ethe = this.check(this.ethe(arkandays, arkanmounth, arkanyear) + this.ethe(days, mounth, year))
                    const nine = this.check(this.nineDuble(arkandays, arkanmounth, arkanyear, days, mounth, year))
                    const ten = this.check(this.tenDuble(arkandays, arkanmounth, arkanyear, days, mounth, year))
                    const ileven = this.check(this.ilevenDuble(arkandays, arkanmounth, arkanyear, days, mounth, year))
                    const tvelf = this.check(this.tvelf(arkandays, arkanmounth, arkanyear) + this.tvelf(days, mounth, year))
                    const therten = this.check(this.therten(arkandays, arkanmounth, arkanyear) + this.therten(days, mounth, year))
                    const foreten = this.check(this.foreten(arkandays, arkanmounth, arkanyear) + this.foreten(days, mounth, year))
                    const fiften = this.check(this.fiftenDuble(arkandays, arkanmounth, arkanyear, days, mounth, year))
                    const sixten = this.check(this.sixten(arkandays, arkanmounth, arkanyear) + this.sixten(days, mounth, year))
                    const seventen = this.check(this.seventenDuble(arkandays, arkanmounth, arkanyear, days, mounth, year))
                    const eten = this.check(this.etenDuble(arkandays, arkanmounth, arkanyear, days, mounth, year))
                    const A = this.check(this.A(arkandays, arkanmounth, arkanyear) + this.A(days, mounth, year))
                    const B = this.check(this.B(arkandays, arkanmounth, arkanyear) + this.B(days, mounth, year))
                    const C = this.check(this.C(arkandays, arkanmounth, arkanyear) + this.C(days, mounth, year))
                    const D = this.check(this.D(arkandays, arkanmounth, arkanyear) + this.D(days, mounth, year))
                    const E = this.check(this.E(arkandays, arkanmounth, arkanyear) + this.E(days, mounth, year))
                    const F = this.check(this.F(arkandays, arkanmounth, arkanyear) + this.F(days, mounth, year))
                    const one2=  this.check(this.first(arkandays, arkanmounth, arkanyear) + this.first(days2, mounth2, year2))
                    const two2=  this.check(this.two(arkandays, arkanmounth, arkanyear) + this.two(days2, mounth2, year2))
                    const three2=  this.check(this.three(arkandays, arkanmounth, arkanyear) + this.three(days2, mounth2, year2))
                    const fore2=  this.check(this.fore(arkandays, arkanmounth, arkanyear) + this.fore(days2, mounth2, year2))
                    const five2=  this.check(this.five(arkandays, arkanmounth, arkanyear) + this.five(days2, mounth2, year2))
                    const sixs2=  this.check(this.sixs(arkandays, arkanmounth, arkanyear) + this.sixs(days2, mounth2, year2))
                    const seven2=  this.check(this.seven(arkandays, arkanmounth, arkanyear) + this.seven(days2, mounth2, year2))
                    const ethe2=  this.check(this.ethe(arkandays, arkanmounth, arkanyear) + this.ethe(days2, mounth2, year2))
                    const nine2=  this.check(this.nineDuble(arkandays, arkanmounth, arkanyear, days2, mounth2, year2))
                    const ten2=  this.check(this.tenDuble(arkandays, arkanmounth, arkanyear, days2, mounth2, year2))
                    const ileven2=  this.check(this.ilevenDuble(arkandays, arkanmounth, arkanyear, days2, mounth2, year2))
                    const tvelf2=  this.check(this.tvelf(arkandays, arkanmounth, arkanyear) + this.tvelf(days2, mounth2, year2))
                    const therten2=  this.check(this.therten(arkandays, arkanmounth, arkanyear) + this.therten(days2, mounth2, year2))
                    const foreten2=  this.check(this.foreten(arkandays, arkanmounth, arkanyear) + this.foreten(days2, mounth2, year2))
                    const fiften2=  this.check(this.fiftenDuble(arkandays, arkanmounth, arkanyear, days2, mounth2, year2))
                    const sixten2=  this.check(this.sixten(arkandays, arkanmounth, arkanyear) + this.sixten(days2, mounth2, year2))
                    const seventen2=  this.check(this.seventenDuble(arkandays, arkanmounth, arkanyear, days2, mounth2, year2))
                    const eten2=  this.check(this.etenDuble(arkandays, arkanmounth, arkanyear, days2, mounth2, year2))
                    const A2=  this.check(this.A(arkandays, arkanmounth, arkanyear) + this.A(days2, mounth2, year2))
                    const B2=  this.check(this.B(arkandays, arkanmounth, arkanyear) + this.B(days2, mounth2, year2))
                    const C2=  this.check(this.C(arkandays, arkanmounth, arkanyear) + this.C(days2, mounth2, year2))
                    const D2=  this.check(this.D(arkandays, arkanmounth, arkanyear) + this.D(days2, mounth2, year2))
                    const E2=  this.check(this.E(arkandays, arkanmounth, arkanyear) + this.E(days2, mounth2, year2))
                    const F2=  this.check(this.F(arkandays, arkanmounth, arkanyear) + this.F(days2, mounth2, year2))

                    const dubleFirst = () => { return this.check(one + one2)}
                    const dubleTwo = ()=> { return this.check(two + two2)}
                    const dubleThree = ()=> { return this.check(three + three2)}
                    const dubleFore = ()=>{ return this.check( dubleFirst() + dubleTwo() ) }
                    const dubleFive = ()=>{ return this.check( dubleTwo() + dubleThree()) }
                    const dubleSixs = ()=> { return this.check( dubleFore() + dubleFive() ) }
                    const dubleSeven = ()=> { return this.check( dubleFirst() + dubleFive() ) }
                    const dubleEthe = ()=> { return this.check(dubleTwo() + dubleSixs() ) }
                    const dubleNine = ()=>{ return this.check(this.MinMax(dubleFirst(), dubleTwo())) }
                    const dubleTen = ()=>{return this.check(this.MinMax(dubleThree(), dubleTwo()))}
                    const dubleIleven = ()=>{return this.check(this.MinMax(dubleNine(), dubleTen())) }
                    const dubleTvelf = ()=>{return this.check(dubleSeven() + dubleEthe()) }
                    const dubleTherten = ()=>{return this.check(dubleFirst() + dubleFore() + dubleSixs())}
                    const dubleForeten = ()=>{return this.check(dubleThree() + dubleFive() + dubleSixs())}
                    const dubleFiften = ()=>{return this.check(dubleNine() + dubleTen() + dubleIleven() - dubleSeven())}
                    const dubleSixten = ()=>{return this.check((dubleFirst() + dubleFore()) + (dubleFive() + dubleThree()))}
                    const dubleSeventen = ()=>{return this.check(dubleIleven() + dubleSixs())}
                    const dubleEten = ()=> {return this.check(dubleIleven() + dubleEthe())}
                    const dubleA = ()=>{return this.check(dubleFirst() + dubleFore() )}
                    const dubleB = ()=>{return this.check(dubleTwo() + dubleFore() )}
                    const dubleC = ()=>{return this.check(dubleTwo() + dubleFive() )}
                    const dubleD = ()=>{return this.check(dubleThree() + dubleFive() )}
                    const dubleE = ()=>{return this.check(dubleFore() + dubleSixs() )}
                    const dubleF = ()=>{return this.check(dubleFive() + dubleSixs() )}

                    console.log(dubleFirst(),
                    dubleTwo(),
                    dubleThree(),
                    dubleFore(),
                    dubleFive(),
                    dubleSixs(),
                    dubleSeven(),
                    dubleEthe(),
                    dubleNine(),
                    dubleTen(),
                    dubleIleven(),
                    dubleTvelf(),
                    dubleTherten(),
                    dubleForeten(),
                    dubleFiften(),
                    dubleSixten(),
                    dubleSeventen(),
                    dubleEten(),
                    dubleA(),
                    dubleB(),
                    dubleC(),
                    dubleD(),
                    dubleE(),
                    dubleF())
                    this.map = {
                        one: this.getTarot(one),
                        two: this.getTarot(two),
                        three: this.getTarot(three),
                        fore: this.getTarot(fore),
                        five: this.getTarot(five),
                        sixs: this.getTarot(sixs),
                        seven: this.getTarot(seven),
                        ethe: this.getTarot(ethe),
                        nine: this.getTarot(nine),
                        ten: this.getTarot(ten),
                        ileven: this.getTarot(ileven),
                        tvelf: this.getTarot(tvelf),
                        therten: this.getTarot(therten),
                        foreten: this.getTarot(foreten),
                        fiften: this.getTarot(fiften),
                        sixten: this.getTarot(sixten),
                        seventen: this.getTarot(seventen),
                        eten: this.getTarot(eten),
                        A: this.getTarot(A),
                        B: this.getTarot(B),
                        C: this.getTarot(C),
                        D: this.getTarot(D),
                        E: this.getTarot(E),
                        F: this.getTarot(F),
                    }
                    this.map2 = {
                        one: this.getTarot(one2),
                        two: this.getTarot(two2),
                        three: this.getTarot(three2),
                        fore: this.getTarot(fore2),
                        five: this.getTarot(five2),
                        sixs: this.getTarot(sixs2),
                        seven: this.getTarot(seven2),
                        ethe: this.getTarot(ethe2),
                        nine: this.getTarot(nine2),
                        ten: this.getTarot(ten2),
                        ileven: this.getTarot(ileven2),
                        tvelf: this.getTarot(tvelf2),
                        therten: this.getTarot(therten2),
                        foreten: this.getTarot(foreten2),
                        fiften: this.getTarot(fiften2),
                        sixten: this.getTarot(sixten2),
                        seventen: this.getTarot(seventen2),
                        eten: this.getTarot(eten2),
                        A: this.getTarot(A2),
                        B: this.getTarot(B2),
                        C: this.getTarot(C2),
                        D: this.getTarot(D2),
                        E: this.getTarot(E2),
                        F: this.getTarot(F2),
                    }
                    this.dubleMap = {
                        one: this.getTarot( this.check( dubleFirst() ) ),
                        two: this.getTarot( this.check( dubleTwo() ) ),
                        three: this.getTarot( this.check( dubleThree() ) ),
                        fore: this.getTarot( this.check( dubleFore() ) ),
                        five: this.getTarot( this.check( dubleFive() ) ),
                        sixs: this.getTarot( this.check( dubleSixs() ) ),
                        seven: this.getTarot( this.check( dubleSeven() ) ),
                        ethe: this.getTarot( this.check( dubleEthe() ) ),
                        nine: this.getTarot( this.check( dubleNine() ) ),
                        ten: this.getTarot( this.check( dubleTen() ) ),
                        ileven: this.getTarot( this.check( dubleIleven() ) ),
                        tvelf: this.getTarot( this.check( dubleTvelf() ) ),
                        therten: this.getTarot( this.check( dubleTherten() ) ),
                        foreten: this.getTarot( this.check( dubleForeten() ) ),
                        fiften: this.getTarot( this.check( dubleFiften() ) ),
                        sixten: this.getTarot( this.check( dubleSixten() ) ),
                        seventen: this.getTarot( this.check( dubleSeventen() ) ),
                        eten: this.getTarot( this.check( dubleEten() ) ),
                        A: this.getTarot( this.check( dubleA() ) ),
                        B: this.getTarot( this.check( dubleB() ) ),
                        C: this.getTarot( this.check( dubleC() ) ),
                        D: this.getTarot( this.check( dubleD() ) ),
                        E: this.getTarot( this.check( dubleE() ) ),
                        F: this.getTarot( this.check( dubleF() ) ),
                    }
                }

            },
        },
    }
</script>

