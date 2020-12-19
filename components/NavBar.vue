<template>
    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <nuxt-link class="navbar-item" to="/">
                    <img src="~/assets/juntar-logo.png" alt="Juntar" width="112" height="28">
                </nuxt-link>
                <div class="navbar-burger burger"
                    data-target="navbarExampleTransparentExample"
                    @click="clickMenu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div
                class="navbar-end"
                :style="{ display: displayMenu }"
            >
                <nuxt-link class="navbar-item" to="/">
                    Accueil
                </nuxt-link>
                <nuxt-link class="navbar-item" to="/about">
                    A propos
                </nuxt-link>
                <nuxt-link class="navbar-item" to="/addprofile">
                    Soumettre votre profil
                </nuxt-link>
                <nuxt-link class="navbar-item" to="/contact">
                    Contact
                </nuxt-link>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'nav-bar',
    data() {
        return {
            displayMenu: '',
            isActive: false
        };
    },
    methods: {
        clickMenu() {
            this.displayMenu = this.displayMenu === 'block' ? 'none' : 'block';
            this.isActive = !this.isActive;
        },
        myEventHandler() {
            this.displayMenu = window.matchMedia('(min-width: 1024px)').matches
            ? 'flex'
            : 'none';
        }
    },
    mounted() {
        this.myEventHandler();
        window.addEventListener('resize', this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener('resize', this.myEventHandler);
    }
};
</script>
<style lang="scss" scoped>
.text {
    max-width: 640px;
    margin: 0 auto;
}

.navbar-brand {
    .navbar-item {
        max-width: 100px;
    }
}

.navbar-burger span {
    height: 2px;
    width: 24px;
    left: calc(50% - 12px);

    &:nth-child(1) {
        top: calc(50% - 8px);
    }

    &:nth-child(3) {
        top: calc(50% + 6px);
    }
}

.navbar-start a {
    color: #fff;

    &:focus, &:hover {
        background: #fec101;
        color: #000;
    }
}

.navbar-item img {
    max-height: none;
}

.navbar-end {
    display: none;
    text-align: center;
}

@media screen and (min-width: 1024px) {
    .navbar-end {
        display: flex;
    }
}

@media screen and (min-width: 1408px) {
    .container {
        max-width: 960px;
    }
}

@media screen and (min-width: 1216px) {
    .container {
        max-width: 960px;
    }
}
</style>
