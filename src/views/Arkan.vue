<template>
  <div id="app" class="container" >
    <div class="wrap">
      <div class="flex">
        <div style="margin: 0 10px;">
          <h2>Введите дату рождения</h2>
          <div class="grid">
            <div class="input_group">
              <span>День</span>
              <input type="number" :min="1" :max="31" ref="bday" @change="inputCheck($event,'bday')" @keyup.enter="calculate">
            </div>
            <div class="input_group">
              <span>Месяц</span>
              <input type="number" :min="1" :max="12" ref="bmounth" @change="inputCheck($event,'bmounth')" @keyup.enter="calculate">
            </div>
            <div class="input_group">
              <span>Год</span>
              <input type="number" :min="1900" :max="2030" ref="byear" @change="inputCheck($event,'byear')" @keyup.enter="calculate">
            </div>
          </div>
        </div>

        <div style="margin: 0 10px;">
          <h2>Дату прогноза</h2>
          <div class="grid">
            <div class="input_group">
              <span>Месяц</span>
              <input type="number" :min="0" :max="12" ref="arkanmounth" @change="inputCheck($event,'arkanmounth')" @keyup.enter="calculate">
            </div>
            <div class="input_group">
              <span>Год</span>
              <input type="number" :min="1900" :max="2030" ref="arkanyear" @change="inputCheck($event,'arkanyear')" @keyup.enter="calculate">
            </div>
          </div>
        </div>
      </div>

      <button @click="calculate">Рассчитать</button>
      <span class="onHover" @click="short =! short">{{shortText()}}</span>
    </div>
    <transition name="fade">
      <tarotMaps :maps="map" v-if="map!==null" :short="short"/>
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
            short: true,
        }),
        methods: {
            shortText(){
                if(this.short){
                    return 'Полный портрет'
                }else{
                    return 'Сокращенный портрет'
                }
            },
            inputCheck(e,target){
                if (Number(e.target.value) < Number(e.target.min)) {
                    this.$refs[target].value = Number(e.target.min)
                } else if (Number(e.target.value) > Number(e.target.max) ) {
                    this.$refs[target].value = Number(e.target.max)
                }
            },
            check(num){
                const c = (n)=>{
                    if(n>22){
                        while (n > 22){
                            n = n - 22
                        }
                        return Number(n)
                    }else if(n>0&&n<=22){
                        return Number(n)
                    }
                }
                if(num>0){
                    return c(num)
                }else if(num<0){
                    return c(num*-1)
                }
            },
            getTarot(num){
                return this.$store.getters.tarot[num-1]
            },
            arkanMounth(){
                return Number(this.$refs.arkanmounth.value)
            },
            arkanYear(){
                const d = this.$refs.arkanyear.value
                let sum = Number(d[0])+Number(d[1])+Number(d[2])+Number(d[3])
                return Number(this.check(sum))
            },
            first(){
                return Number(this.check(this.$refs.bday.value))
            },
            two(){
                return Number(this.$refs.bmounth.value)
            },
            three(){
                const d = this.$refs.byear.value
                let sum = Number(d[0])+Number(d[1])+Number(d[2])+Number(d[3])
                return Number(this.check(sum))
            },
            fore(){
                return this.check(this.first() + this.two())
            },
            five(){
                return this.check(this.two() + this.three())
            },
            sixs(){
                return this.check(this.fore() + this.five())
            },
            seven(){
                return this.check(this.first() + this.five())
            },
            ethe(){
                return this.check(this.two() + this.sixs())
            },
            MinMax(first, second){
                if(first > second){
                    return this.check(first - second)
                }else if(first < second){
                    return this.check(second - first)
                }else if(first === second){
                    return this.check(22)
                }
            },
            nine(){
                return this.MinMax(this.first(),this.two())
            },
            ten(){
                return this.MinMax(this.three(),this.two())
            },
            ileven(){
                return this.MinMax(this.nine(),this.ten())
            },
            tvelf(){
                return this.check(this.seven() + this.ethe())
            },
            therten(){
                return this.check(this.first() + this.fore() + this.sixs())
            },
            foreten(){
                return this.check(this.three() + this.five() + this.sixs())
            },
            fiften(){
                return this.check(this.nine() + this.ten() + this.ileven() - this.seven())
            },
            sixten(){
                return this.check( (this.first() + this.fore()) + (this.five() + this.three()) )
            },
            seventen(){
                return this.check(this.ileven() + this.sixs())
            },
            eten(){
                return this.check(this.ileven() + this.ethe())
            },
            A(){
                return this.check(this.first()+ this.fore())
            },
            B(){
                return this.check(this.two()+ this.fore())
            },
            C(){
                return this.check(this.two()+ this.five())
            },
            D(){
                return this.check(this.three()+ this.five())
            },
            E(){
                return this.check(this.fore()+ this.sixs())
            },
            F(){
                return this.check(this.five()+ this.sixs())
            },
            calculate(){
                let err = []
                if(!this.$refs.bday.value) {
                    this.$refs.bday.classList.add('err')
                    err.push('bday')
                }else{
                    this.$refs.bday.classList.remove('err')
                    const ind = err.indexOf('bday')
                    err.slice(ind,1)
                }
                if(!this.$refs.bmounth.value) {
                    this.$refs.bmounth.classList.add('err')
                    err.push('bmounth')
                }else{
                    this.$refs.bmounth.classList.remove('err')
                    const ind = err.indexOf('bmounth')
                    err.slice(ind,1)
                }
                if(!this.$refs.byear.value) {
                    this.$refs.byear.classList.add('err')
                    err.push('byear')
                }else{
                    this.$refs.byear.classList.remove('err')
                    const ind = err.indexOf('byear')
                    err.slice(ind,1)
                }
                if(!this.$refs.arkanyear.value) {
                    this.$refs.arkanyear.classList.add('err')
                    err.push('arkanyear')
                }else{
                    this.$refs.arkanyear.classList.remove('err')
                    const ind = err.indexOf('arkanyear')
                    err.slice(ind,1)
                }
                if(err.length===0){
                    this.map = {
                        one: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.first()) ),
                        two: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.two()) ),
                        three: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.three()) ),
                        fore: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.fore()) ),
                        five: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.five()) ),
                        sixs: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.sixs()) ),
                        seven: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.seven()) ),
                        ethe: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.ethe()) ),
                        nine: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.nine()) ),
                        ten: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.ten()) ),
                        ileven: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.ileven()) ),
                        tvelf: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.tvelf()) ),
                        therten: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.therten()) ),
                        foreten: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.foreten()) ),
                        fiften:  this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.fiften()) ),
                        sixten: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.sixten()) ),
                        seventen: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.seventen()) ),
                        eten: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.eten()) ),
                        A: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.A()) ),
                        B: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.B()) ),
                        C: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.C()) ),
                        D: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.D()) ),
                        E: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.E()) ),
                        F: this.getTarot(this.check((this.arkanMounth()+this.arkanYear()) +this.F()) ),
                    }
                }

            },
        },
    }
</script>
