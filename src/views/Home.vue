<template>
    <div id="app" class="container">
        <div class="wrap">
            <h2>Введите дату рождения</h2>
            <div class="grid">
                <div class="input_group">
                    <span>День*</span>
                    <input type="number" :min="1" :max="31" ref="onedays" @change="inputCheck($event,'onedays')"
                           placeholder="XX">
                </div>
                <div class="input_group">
                    <span>Месяц*</span>
                    <input type="number" :min="1" :max="12" ref="onemounth" @change="inputCheck($event,'onemounth')"
                           placeholder="XX">
                </div>
                <div class="input_group">
                    <span>Год*</span>
                    <input type="number" :min="1900" :max="2030" ref="oneyear" @change="inputCheck($event,'oneyear')"
                           placeholder="XXXX">
                </div>

            </div>
            <button @click="calculate">Рассчитать</button>
            <div class="simple_grid">
                <span class="onHover" @click="short =! short">{{shortText()}}</span>
                <checkbox name="cards" value="1" v-model="cards" checked> Карты</checkbox>
            </div>

            <transition name="fade">
                <tarotMaps :maps="map" v-if="map!==null" :short="short" :showCard="cards"/>
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
            short: false,
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
                    if (n > 22) {
                        while (n > 22) {
                            n = n - 22
                        }
                        return Number(n)
                    } else if (n > 0 && n <= 22) {
                        return Number(n)
                    }
                }
                if (num > 0) {
                    return c(num)
                } else if (num < 0) {
                    return c(num * -1)
                }
            },
            getTarot(num) {
                return this.$store.getters.tarot[num - 1]
            },
            first() {
                return Number(this.check(this.$refs.onedays.value))
            },
            two() {
                return Number(this.$refs.onemounth.value)
            },
            three() {
                const d = this.$refs.oneyear.value
                let sum = Number(d[0]) + Number(d[1]) + Number(d[2]) + Number(d[3])
                return Number(this.check(sum))
            },
            fore() {
                return this.check(this.first() + this.two())
            },
            five() {
                return this.check(this.two() + this.three())
            },
            sixs() {
                return this.check(this.fore() + this.five())
            },
            seven() {
                return this.check(this.first() + this.five())
            },
            ethe() {
                return this.check(this.two() + this.sixs())
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
            nine() {
                return this.MinMax(this.first(), this.two())
            },
            ten() {
                return this.MinMax(this.three(), this.two())
            },
            ileven() {
                return this.MinMax(this.nine(), this.ten())
            },
            tvelf() {
                return this.check(this.seven() + this.ethe())
            },
            therten() {
                return this.check(this.first() + this.fore() + this.sixs())
            },
            foreten() {
                return this.check(this.three() + this.five() + this.sixs())
            },
            fiften() {
                return this.check(this.nine() + this.ten() + this.ileven() - this.seven())
            },
            sixten() {
                return this.check((this.first() + this.fore()) + (this.five() + this.three()))
            },
            seventen() {
                return this.check(this.ileven() + this.sixs())
            },
            eten() {
                return this.check(this.ileven() + this.ethe())
            },
            A() {
                return this.check(this.first() + this.fore())
            },
            B() {
                return this.check(this.two() + this.fore())
            },
            C() {
                return this.check(this.two() + this.five())
            },
            D() {
                return this.check(this.three() + this.five())
            },
            E() {
                return this.check(this.fore() + this.sixs())
            },
            F() {
                return this.check(this.five() + this.sixs())
            },
            calculate() {
                let err = []
                if (!this.$refs.onedays.value) {
                    this.$refs.onedays.classList.add('err')
                    err.push('onedays')
                } else {
                    this.$refs.onedays.classList.remove('err')
                    const ind = err.indexOf('onedays')
                    err.slice(ind, 1)
                }
                if (!this.$refs.onemounth.value) {
                    this.$refs.onemounth.classList.add('err')
                    err.push('onemounth')
                } else {
                    this.$refs.onemounth.classList.remove('err')
                    const ind = err.indexOf('onemounth')
                    err.slice(ind, 1)
                }
                if (!this.$refs.oneyear.value) {
                    this.$refs.oneyear.classList.add('err')
                    err.push('oneyear')
                } else {
                    this.$refs.oneyear.classList.remove('err')
                    const ind = err.indexOf('oneyear')
                    err.slice(ind, 1)
                }
                if (err.length === 0) {
                    this.map = {
                        one: this.getTarot(this.first()),
                        two: this.getTarot(this.two()),
                        three: this.getTarot(this.three()),
                        fore: this.getTarot(this.fore()),
                        five: this.getTarot(this.five()),
                        sixs: this.getTarot(this.sixs()),
                        seven: this.getTarot(this.seven()),
                        ethe: this.getTarot(this.ethe()),
                        nine: this.getTarot(this.nine()),
                        ten: this.getTarot(this.ten()),
                        ileven: this.getTarot(this.ileven()),
                        tvelf: this.getTarot(this.tvelf()),
                        therten: this.getTarot(this.therten()),
                        foreten: this.getTarot(this.foreten()),
                        fiften: this.getTarot(this.fiften()),
                        sixten: this.getTarot(this.sixten()),
                        seventen: this.getTarot(this.seventen()),
                        eten: this.getTarot(this.eten()),
                        A: this.getTarot(this.A()),
                        B: this.getTarot(this.B()),
                        C: this.getTarot(this.C()),
                        D: this.getTarot(this.D()),
                        E: this.getTarot(this.E()),
                        F: this.getTarot(this.F()),
                    }
                }
            },
        },
    }
</script>

