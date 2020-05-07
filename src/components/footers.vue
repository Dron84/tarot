<template>
    <footer>
        <div>
            <p>на данном сайте представлены калькуляторы для облегчения таронумерологических расчетов<br>по методу
                "психологический портрет" А. Хшановской.</p>
            <p>По всем вопросам:
                <a href="https://www.instagram.com/wowsuperlife/" target="_blank">
                    <img src="img/instagram.svg" alt="instagram logo">
                </a>
                <a href="mailto:wowsuperlife@mail.ru">
                    <img src="img/mail.svg" alt="mail to">
                </a>
            </p>
            <p>С любовью и уважением, ваша Анастасия Воздух</p>
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
        position: fixed
        width: 100%
        display: block
        bottom: 0
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
                height: 20px
            svg
                position: relative
                top: 4px
                height: 20px
                path
                    fill: $second

            &:hover, &:active
                color: $five
                svg
                    path
                        fill: $five

    .author
        position: absolute
        right: 30px
        top: 38%
        font-size: 13px
</style>