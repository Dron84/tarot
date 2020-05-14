<template>
    <footer>
        <div class="grid">
            <div>на данном сайте представлены калькуляторы
                <br>для облегчения таронумерологических расчетов
                <br>по методу "психологический портрет" А. Хшановской.
            </div>


            <div class="social">
                <p>Ваша Анастасия Воздух</p>
                <div class="social_title">По всем вопросам:</div>
                <a href="https://www.instagram.com/wowsuperlife/" target="_blank">
                    <img src="img/instagram.svg" alt="instagram logo">
                </a>
                <a href="mailto:wowsuperlife@mail.ru">
                    <img src="img/mail.svg" alt="mail to">
                </a>
            </div>
        </div>

        <div class="author">Создатель: <a href="//uniquesite.ru" target="_blank">uniquesite.ru</a></div>
    </footer>
</template>

<script>
    export default {
        name: "footers"
    }
</script>

<style lang="sass">
    @import "../sass/vars"
    footer
        padding: 10px
        width: 100%
        font-family: 'Manrope', sans-serif
        font-size: 20px
        color: $second
        background-color: rgba($fore, .9)
        text-align: center
        a
            color: $second
            text-decoration: none
            margin: 0 5px
            img
                position: relative
                top: 4px
                height: 40px
            &:hover, &:active
                color: $five
    .author
        margin: 10px 0
        font-size: 13px
        text-align: center
</style>