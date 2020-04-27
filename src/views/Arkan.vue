<template>
    <div class="container">
        <h1>{{$route.meta.title}}</h1>
        <div class="wrap">
            <div class="flex">
                <div style="margin: 0 10px;">
                    <h2>Введите дату рождения</h2>
                    <div class="grid">
                        <div class="input_group">
                            <span>День*</span>
                            <input type="number" :min="1" :max="31" ref="bday" placeholder="XX"
                                   @change="inputCheck($event,'bday')"
                                   @keyup.enter="calculate"
                            >
                        </div>
                        <div class="input_group">
                            <span>Месяц*</span>
                            <input type="number" :min="1" :max="12" ref="bmounth" placeholder="XX"
                                   @change="inputCheck($event,'bmounth')"
                                   @keyup.enter="calculate"
                            >
                        </div>
                        <div class="input_group">
                            <span>Год*</span>
                            <input type="number" :min="1900" :max="2030" ref="byear" placeholder="XXXX"
                                   @change="inputCheck($event,'byear')" @keyup.enter="calculate"
                            >
                        </div>
                    </div>
                </div>

                <div style="margin: 0 10px;">
                    <h2>Cрок прогноза</h2>
                    <div class="grid">
                        <div class="input_group">
                            <span>Месяц</span>
                            <input type="number" :min="0" :max="12" ref="arkanmounth" placeholder="XX"
                                   @change="inputCheck($event,'arkanmounth')" @keyup.enter="calculate"
                            >
                        </div>
                        <div class="input_group">
                            <span>Год*</span>
                            <input type="number" :min="1900" :max="2030" ref="arkanyear" placeholder="XXXX"
                                   @change="inputCheck($event,'arkanyear')" @keyup.enter="calculate"
                                   >
                        </div>
                    </div>
                </div>
            </div>

            <button @click="calculate">Рассчитать</button>
            <div class="simple_grid">
                <span class="onHover" @click="short =! short">{{shortText()}}</span>
                <checkbox name="cards" value="1" v-model="cards" checked> Карты</checkbox>
            </div>

            <transition name="fade">
                <div class="simple_grid">
                    <tarotMaps :maps="map" v-if="map!==null" :short="short" :showCard="cards" style="margin-top: 30px; margin-bottom: 70px;"/>
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
                if (!this.$refs.bday.value) {
                    this.$refs.bday.classList.add('err')
                    err.push('bday')
                } else {
                    this.$refs.bday.classList.remove('err')
                    const ind = err.indexOf('bday')
                    err.slice(ind, 1)
                }
                if (!this.$refs.bmounth.value) {
                    this.$refs.bmounth.classList.add('err')
                    err.push('bmounth')
                } else {
                    this.$refs.bmounth.classList.remove('err')
                    const ind = err.indexOf('bmounth')
                    err.slice(ind, 1)
                }
                if (!this.$refs.byear.value) {
                    this.$refs.byear.classList.add('err')
                    err.push('byear')
                } else {
                    this.$refs.byear.classList.remove('err')
                    const ind = err.indexOf('byear')
                    err.slice(ind, 1)
                }


                if (!this.$refs.arkanyear.value) {
                    this.$refs.arkanyear.classList.add('err')
                    err.push('arkanyear')
                } else {
                    this.$refs.arkanyear.classList.remove('err')
                    const ind = err.indexOf('arkanyear')
                    err.slice(ind, 1)
                }


                if (err.length === 0) {
                    const days = this.$refs.bday.value
                    const mounth = this.$refs.bmounth.value
                    const year = this.$refs.byear.value

                    const arkandays = ''
                    const arkanmounth = this.$refs.arkanmounth.value
                    const arkanyear = this.$refs.arkanyear.value

                    const one = this.getTarot(this.check( this.first(arkandays,arkanmounth,arkanyear) + this.first(days, mounth, year) ) )
                    const two = this.getTarot(this.check( this.two(arkandays,arkanmounth,arkanyear) + this.two(days, mounth, year) ) )
                    const three = this.getTarot(this.check( this.three(arkandays,arkanmounth,arkanyear) + this.three(days, mounth, year) ) )
                    const fore = this.getTarot(this.check( this.fore(arkandays,arkanmounth,arkanyear) + this.fore(days, mounth, year) ) )
                    const five = this.getTarot(this.check( this.five(arkandays,arkanmounth,arkanyear) + this.five(days, mounth, year) ) )
                    const sixs = this.getTarot(this.check( this.sixs(arkandays,arkanmounth,arkanyear) + this.sixs(days, mounth, year) ) )
                    const seven = this.getTarot(this.check( this.seven(arkandays,arkanmounth,arkanyear) + this.seven(days, mounth, year) ) )
                    const ethe = this.getTarot(this.check( this.ethe(arkandays,arkanmounth,arkanyear) + this.ethe(days, mounth, year) ) )
                    const nine = this.getTarot(this.check( this.nineDuble(arkandays, arkanmounth, arkanyear, days, mounth, year) ) )
                    const ten = this.getTarot(this.check( this.tenDuble(arkandays, arkanmounth, arkanyear, days, mounth, year) ) )
                    const ileven = this.getTarot(this.check( this.ilevenDuble(arkandays, arkanmounth, arkanyear, days, mounth, year) ) )
                    const tvelf = this.getTarot(this.check( this.tvelf(arkandays,arkanmounth,arkanyear) + this.tvelf(days, mounth, year) ) )
                    const therten = this.getTarot(this.check( this.therten(arkandays,arkanmounth,arkanyear) + this.therten(days, mounth, year) ) )
                    const foreten = this.getTarot(this.check( this.foreten(arkandays,arkanmounth,arkanyear) + this.foreten(days, mounth, year) ) )
                    const fiften = this.getTarot(this.check( this.fiftenDuble(arkandays,arkanmounth,arkanyear, days, mounth, year) ) )
                    const sixten = this.getTarot(this.check( this.sixten(arkandays,arkanmounth,arkanyear) + this.sixten(days, mounth, year) ) )
                    const seventen = this.getTarot(this.check( this.seventenDuble(arkandays,arkanmounth,arkanyear,days, mounth, year)) )
                    const eten = this.getTarot(this.check( this.etenDuble(arkandays,arkanmounth,arkanyear, days, mounth, year) ) )
                    const A = this.getTarot(this.check( this.A(arkandays,arkanmounth,arkanyear) + this.A(days, mounth, year) ) )
                    const B = this.getTarot(this.check( this.B(arkandays,arkanmounth,arkanyear) + this.B(days, mounth, year) ) )
                    const C = this.getTarot(this.check( this.C(arkandays,arkanmounth,arkanyear) + this.C(days, mounth, year) ) )
                    const D = this.getTarot(this.check( this.D(arkandays,arkanmounth,arkanyear) + this.D(days, mounth, year) ) )
                    const E = this.getTarot(this.check( this.E(arkandays,arkanmounth,arkanyear) + this.E(days, mounth, year) ) )
                    const F = this.getTarot(this.check( this.F(arkandays,arkanmounth,arkanyear) + this.F(days, mounth, year) ) )


                    this.map = {
                        one,
                        two,
                        three,
                        fore,
                        five,
                        sixs,
                        seven,
                        ethe,
                        nine,
                        ten,
                        ileven,
                        tvelf,
                        therten,
                        foreten,
                        fiften,
                        sixten,
                        seventen,
                        eten,
                        A,
                        B,
                        C,
                        D,
                        E,
                        F,
                    }
                }
            },
        },
    }
</script>
