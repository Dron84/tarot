<template>
    <nav class="mobile-menu" :class="{'show': show}">
        <label class="mobile-menu__btn" @click="show=!show"><div class="mobile-menu__icon"></div></label>
        <div class="mobile-menu__container">
            <ul class="mobile-menu__list">
                <li class="mobile-menu__item" v-for="link in links" :key="link.path"><div class="mobile-menu__link" @click="goto(link.path)">{{link.title}}</div></li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "navigation",
        data: () => ({
            show: false,
            links: [],
        }),
        created() {
            this.links = this.$router.options.routes
        },
        methods:{
            goto(link){
                const loc = this.$route.path
                if(loc!==link){
                    this.show = false
                    this.$router.push(link)
                }else{
                    this.show = false
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/vars";
    $primary-color: $fore;
    $space-m: 16px;

    .mobile-menu {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 $space-m;
        top: 0;
        background-color: $primary-color;
        left: 0;
        right: 0;
        height: 50px;
        z-index: 9999999;

        &__btn {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 30px;
            cursor: pointer;
            transition: .4s;
        }

        &__icon {
            display: block;
            position: relative;
            background: $second;
            width: 90%;
            height: 4px;
            transition: .4s;

            &::after,
            &::before {
                content: "";
                display: block;
                position: absolute;
                background: $second;
                width: 100%;
                height: 4px;
                transition: .4s;
            }
            &::after {
                top: 8px;
            }
            &::before {
                top: -8px;
            }
        }

        &__container {
            position: fixed;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 50px;
            left: 0;
            right: 0;
            z-index: 999;
            height: 0;
            opacity: 1;
            transition: .5s;
            transition-delay: .2s;
            overflow: hidden;
            background-color: $primary-color;
        }

        &__list {
            transition: .5s;
            transition-delay: .5s;
            list-style: none;
            padding-left: 0;
            margin-top: -50px;
        }

        &__item {
            padding-bottom: 15px;
            cursor: pointer;
        }

        &__link {
            text-decoration: none;
            border-bottom: 2px solid transparent;
            color: $second;
            font-size: 40px;
            &:hover {
                color: $second;
                border-bottom: 2px solid $second;
            }
        }

        &__checkbox {
            display: none;

            &:checked ~ {
                .mobile-menu {

                    &__nav {
                        opacity: 1;
                        transition-delay: 0s;
                    }

                    &__container {
                        height: 100%;
                        transition-delay: 0s;
                    }

                    &__btn {
                        .mobile-menu__icon {
                            background: transparent;

                            &::before,
                            &::after {
                                top: 0;
                            }

                            &::after {
                                transform: rotate(-45deg);
                                -webkit-transform: rotate(-45deg);
                            }

                            &::before {
                                transform: rotate(45deg);
                                -webkit-transform: rotate(45deg);
                            }
                        }
                    }
                }
            }
        }
    }
    .show {
        .mobile-menu__nav {
            opacity: 1;
            transition-delay: 0s;
        }

        .mobile-menu__container {
            height: 100%;
            transition-delay: 0s;
        }

        .mobile-menu__btn {
            .mobile-menu__icon {
                background: transparent;

                &::before,
                &::after {
                    top: 0;
                }

                &::after {
                    transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                }

                &::before {
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                }
            }
        }
    }
</style>