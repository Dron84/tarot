<template>
    <div class="container">
        <h1>{{$route.meta.title}}</h1>
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
                            <input type="number" :min="1" :max="31" ref="days" @change="inputCheck($event,'days')"
                                   placeholder="XX">
                        </div>
                        <div class="input_group">
                            <span>Месяц*</span>
                            <input type="number" :min="1" :max="12" ref="mounth" @change="inputCheck($event,'mounth')"
                                   placeholder="XX">
                        </div>
                        <div class="input_group">
                            <span>Год*</span>
                            <input type="number" :min="1900" :max="2030" ref="year" @change="inputCheck($event,'year')"
                                   placeholder="XXXX">
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
                            <input type="number" :min="1" :max="31" ref="days2" placeholder="XX"
                                   @change="inputCheck($event,'days2')">
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
                            <h3>Портрет 1<br>{{data1}}</h3>
                            <tarotMaps :maps="map" :short="short" :showCard="cards"/>
                        </div>
                        <div class="border secondmap">
                            <h3>Портрет 2<br>{{data2}}</h3>
                            <tarotMaps :maps="map2" :short="short" :showCard="cards"/>
                        </div>
                        <div class="border dublemap">
                            <h3>Парный портрет</h3>
                            <tarotMaps :maps="dubleMap" :short="short" :showCard="cards"/>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <foot />
    </div>
</template>

<script>
    import tarotMaps from '../components/map'
    import {Checkbox} from 'vue-checkbox-radio';
    import foot from '../components/footers'

    export default {
        name: 'App',
        components: {tarotMaps, Checkbox,foot},
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
                if(num===0){
                    return this.$store.getters.tarot[22]
                }else{
                    return this.$store.getters.tarot[num - 1]
                }
            },
            first(days, mounth, year) {
                return this.check(Number(days))
            },
            two(days, mounth, year) {
                return Number(mounth)
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
                    return this.check(first - second)
                } else if (first < second) {
                    return this.check(second - first)
                } else if (first === second) {
                    return this.check(22)
                }
            },
            nine(days, mounth, year) {
                return this.MinMax(this.first(days, mounth, year), this.two(days, mounth, year))
            },
            ten(days, mounth, year) {
                return this.MinMax(this.three(days, mounth, year), this.two(days, mounth, year))
            },
            ileven(days, mounth, year) {
                return this.MinMax(this.nine(days, mounth, year), this.ten(days, mounth, year))
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
            sevenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) {
                const one = this.first(days, mounth, year) + this.five(days, mounth, year)
                const two = this.first(arkanDays, arkanMounth, arkanYear) + this.five(arkanDays, arkanMounth, arkanYear)
                return this.check(one+two)
            },
            nineDuble(arkanDays, arkanMounth, arkanYear, days, mounth, year) {
                const first = this.check(this.first(days, mounth, year) + this.first(arkanDays, arkanMounth, arkanYear))
                const two = this.check(this.two(days, mounth, year) + this.two(arkanDays, arkanMounth, arkanYear))
                return this.check(this.MinMax(first,two))
            },
            tenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) {
                const three = this.check(this.three(days, mounth, year) + this.three(arkanDays, arkanMounth, arkanYear))
                const two = this.check(this.two(days, mounth, year) + this.two(arkanDays, arkanMounth, arkanYear))
                return this.check(this.MinMax(three, two))
            },
            ilevenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) {
                return this.check(this.MinMax(this.nineDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year), this.tenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year)))
            },
            fiftenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) {
                return this.check(this.nineDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) + this.tenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) + this.ilevenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) - (this.sevenDuble(arkanDays, arkanMounth, arkanYear, days, mounth, year) ))
            },
            seventenDuble(arkanDays, arkanMounth, arkanYear, days, mounth, year) {
                return this.check(this.ilevenDuble(arkanDays, arkanMounth, arkanYear,days, mounth, year) + ( this.sixs(arkanDays, arkanMounth, arkanYear) + this.sixs(days, mounth, year)))
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

                if (err.length === 0) {
                    const days = this.$refs.days.value
                    const mounth = this.$refs.mounth.value
                    const year = this.$refs.year.value

                    this.map = {
                        one: this.getTarot(this.first(days, mounth, year)),
                        two: this.getTarot(this.two(days, mounth, year)),
                        three: this.getTarot(this.three(days, mounth, year)),
                        fore: this.getTarot(this.fore(days, mounth, year)),
                        five: this.getTarot(this.five(days, mounth, year)),
                        sixs: this.getTarot(this.sixs(days, mounth, year)),
                        seven: this.getTarot(this.seven(days, mounth, year)),
                        ethe: this.getTarot(this.ethe(days, mounth, year)),
                        nine: this.getTarot(this.nine(days, mounth, year)),
                        ten: this.getTarot(this.ten(days, mounth, year)),
                        ileven: this.getTarot(this.ileven(days, mounth, year)),
                        tvelf: this.getTarot(this.tvelf(days, mounth, year)),
                        therten: this.getTarot(this.therten(days, mounth, year)),
                        foreten: this.getTarot(this.foreten(days, mounth, year)),
                        fiften: this.getTarot(this.fiften(days, mounth, year)),
                        sixten: this.getTarot(this.sixten(days, mounth, year)),
                        seventen: this.getTarot(this.seventen(days, mounth, year)),
                        eten: this.getTarot(this.eten(days, mounth, year)),
                        A: this.getTarot(this.A(days, mounth, year)),
                        B: this.getTarot(this.B(days, mounth, year)),
                        C: this.getTarot(this.C(days, mounth, year)),
                        D: this.getTarot(this.D(days, mounth, year)),
                        E: this.getTarot(this.E(days, mounth, year)),
                        F: this.getTarot(this.F(days, mounth, year)),
                    }

                    const days2 = this.$refs.days2.value
                    const mounth2 = this.$refs.mounth2.value
                    const year2 = this.$refs.year2.value

                    this.map2 = {
                        one: this.getTarot(this.first(days2, mounth2, year2)),
                        two: this.getTarot(this.two(days2, mounth2, year2)),
                        three: this.getTarot(this.three(days2, mounth2, year2)),
                        fore: this.getTarot(this.fore(days2, mounth2, year2)),
                        five: this.getTarot(this.five(days2, mounth2, year2)),
                        sixs: this.getTarot(this.sixs(days2, mounth2, year2)),
                        seven: this.getTarot(this.seven(days2, mounth2, year2)),
                        ethe: this.getTarot(this.ethe(days2, mounth2, year2)),
                        nine: this.getTarot(this.nine(days2, mounth2, year2)),
                        ten: this.getTarot(this.ten(days2, mounth2, year2)),
                        ileven: this.getTarot(this.ileven(days2, mounth2, year2)),
                        tvelf: this.getTarot(this.tvelf(days2, mounth2, year2)),
                        therten: this.getTarot(this.therten(days2, mounth2, year2)),
                        foreten: this.getTarot(this.foreten(days2, mounth2, year2)),
                        fiften: this.getTarot(this.fiften(days2, mounth2, year2)),
                        sixten: this.getTarot(this.sixten(days2, mounth2, year2)),
                        seventen: this.getTarot(this.seventen(days2, mounth2, year2)),
                        eten: this.getTarot(this.eten(days2, mounth2, year2)),
                        A: this.getTarot(this.A(days2, mounth2, year2)),
                        B: this.getTarot(this.B(days2, mounth2, year2)),
                        C: this.getTarot(this.C(days2, mounth2, year2)),
                        D: this.getTarot(this.D(days2, mounth2, year2)),
                        E: this.getTarot(this.E(days2, mounth2, year2)),
                        F: this.getTarot(this.F(days2, mounth2, year2)),
                    }

                    this.dubleMap = {
                        one: this.getTarot(this.check(this.first(days, mounth, year) + this.first(days2, mounth2, year2))),
                        two: this.getTarot(this.check(this.two(days, mounth, year) + this.two(days2, mounth2, year2))),
                        three: this.getTarot(this.check(this.three(days, mounth, year) + this.three(days2, mounth2, year2))),
                        fore: this.getTarot(this.check(this.fore(days, mounth, year) + this.fore(days2, mounth2, year2))),
                        five: this.getTarot(this.check(this.five(days, mounth, year) + this.five(days2, mounth2, year2))),
                        sixs: this.getTarot(this.check(this.sixs(days, mounth, year) + this.sixs(days2, mounth2, year2))),
                        seven: this.getTarot(this.check(this.sevenDuble(days, mounth, year,days2, mounth2, year2))),
                        ethe: this.getTarot(this.check(this.ethe(days, mounth, year) + this.ethe(days2, mounth2, year2))),
                        nine: this.getTarot(this.check(this.nineDuble(days, mounth, year, days2, mounth2, year2))),
                        ten: this.getTarot(this.check(this.tenDuble(days, mounth, year,days2, mounth2, year2))),
                        ileven: this.getTarot(this.check(this.ilevenDuble(days, mounth, year,days2, mounth2, year2))),
                        tvelf: this.getTarot(this.check(this.tvelf(days, mounth, year) + this.tvelf(days2, mounth2, year2))),
                        therten: this.getTarot(this.check(this.therten(days, mounth, year) + this.therten(days2, mounth2, year2))),
                        foreten: this.getTarot(this.check(this.foreten(days, mounth, year) + this.foreten(days2, mounth2, year2))),
                        fiften: this.getTarot(this.check(this.fiftenDuble(days, mounth, year, days2, mounth2, year2))),
                        sixten: this.getTarot(this.check(this.sixten(days, mounth, year) + this.sixten(days2, mounth2, year2))),
                        seventen: this.getTarot(this.check(this.seventenDuble(days, mounth, year, days2, mounth2, year2))),
                        eten: this.getTarot(this.check(this.etenDuble(days, mounth, year,days2, mounth2, year2))),
                        A: this.getTarot(this.check(this.A(days, mounth, year) + this.A(days2, mounth2, year2))),
                        B: this.getTarot(this.check(this.B(days, mounth, year) + this.B(days2, mounth2, year2))),
                        C: this.getTarot(this.check(this.C(days, mounth, year) + this.C(days2, mounth2, year2))),
                        D: this.getTarot(this.check(this.D(days, mounth, year) + this.D(days2, mounth2, year2))),
                        E: this.getTarot(this.check(this.E(days, mounth, year) + this.E(days2, mounth2, year2))),
                        F: this.getTarot(this.check(this.F(days, mounth, year) + this.F(days2, mounth2, year2))),
                    }
                }

            },
        },
    }
</script>
