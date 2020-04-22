<template>
  <div id="app" class="container">
    <div class="wrap">
      <div class="flex">
        <div style="margin: 0 10px;">
          <h2>Введите дату рождения 1го человека</h2>
          <div class="grid">
            <div class="input_group">
              <span>День</span>
              <input type="number" :min="1" :max="31" ref="days" @change="inputCheck($event,'days')">
            </div>
            <div class="input_group">
              <span>Месяц</span>
              <input type="number" :min="1" :max="12" ref="mounth" @change="inputCheck($event,'mounth')">
            </div>
            <div class="input_group">
              <span>Год</span>
              <input type="number" :min="1900" :max="2030" ref="year" @change="inputCheck($event,'year')">
            </div>
          </div>
        </div>

        <div style="margin: 0 10px;">
          <h2>Введите дату рождения 2го человека</h2>
          <div class="grid">
            <div class="input_group">
              <span>День</span>
              <input type="number" :min="1" :max="31" ref="days2" @change="inputCheck($event,'days2')">
            </div>
            <div class="input_group">
              <span>Месяц</span>
              <input type="number" :min="1" :max="12" ref="mounth2"
                     @change="inputCheck($event,'mounth2')">
            </div>
            <div class="input_group">
              <span>Год</span>
              <input type="number" :min="1900" :max="2030" ref="year2"
                     @change="inputCheck($event,'year2')">
            </div>
          </div>
        </div>
      </div>

      <button @click="calculate">Подсчитать</button>
      <span class="onHover" @click="short =! short">Полный портрет</span>
    </div>
    <transition name="fade">
      <tarotMaps :maps="map" v-if="map!==null" :short="short"/>
      <tarotMaps :maps="map2" v-if="map2!==null" :short="short"/>
    </transition>

  </div>
</template>

<script>
    import tarotMaps from '../components/map'

    export default {
        name: 'App',
        components: {tarotMaps},
        data: () => ({
            map: null,
            map2: null,
            short: true
        }),
        methods: {
            inputCheck(e, target) {
                if (e.target.value < e.target.min) {
                    this.$refs[target].value = e.target.min
                } else if (e.target.value > e.target.max) {
                    this.$refs[target].value = e.target.max
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
                return Number(this.check(this.$refs.days.value))
            },
            two() {
                return Number(this.$refs.mounth.value)
            },
            three() {
                const d = this.$refs.year.value
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
                // console.log('date', this.dd, this.mm, this.yyyy)
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
            },
        },
    }
</script>

<style scoped lang="sass">
  @import '../sass/vars'
  *
    margin: 0
    padding: 0
    box-sizing: border-box

  html
    background-color: $first
  .onHover
    cursor: pointer
  button
    border: 1px solid transparent
    margin: 10px 0
    border-radius: 5px
    background-color: $fore
    color: $first
    height: 40px
    min-width: 220px
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

  .grid
    display: grid
    grid-template-columns: repeat(3, minmax(60px, 1fr))
    grid-gap: 10px
  .flex
    display: flex

  #app
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
      max-width: 100px
      font-size: 20px
      text-align: center
      border-radius: 5px
      border: 1px solid $five

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s

  .fade-enter, .fade-leave-to
    opacity: 0

</style>
