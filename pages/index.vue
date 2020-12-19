<template>
    <div class="section">
        <div class="container has-text-centered">
            <text-word-press :dataHtml="homeData" />
            <br>
            <div class="search-block">
                <h2 class="title">Recherche</h2>
                <div class="field">
                    <div class="control">
                        <input
                            class="input search"
                            type="text"
                            v-model="searchInput"
                            placeholder="Rechercher par : nom, école, entreprise ou secteur"
                        >
                    </div>
                </div>
                <article
                    class="message is-danger"
                    v-if="errorSearch"
                >
                    <div class="message-body">
                    Nous ne trouvons pas votre recherche
                    </div>
                </article>
            </div>
            <spinner v-if="!personaData"/>
            <div v-else class="columns is-multiline is-mobile people">
                <div
                    v-for="persona in lycos"
                    :key="persona.id"
                    class="column is-6-mobile is-4-tablet is-3-desktop"
                >
                    <nuxt-link tag="div" :to="`/people/${persona.id}`" class="card card-select">
                        <div class="card-image">
                            <figure class="image is-1by1">
                            <img :src="persona.url_image" :alt="persona.name">
                            </figure>
                            <p class="card-text">
                            <span class="text-name">{{persona.name}}</span>
                            <span class="text-job">{{persona.department}}</span>
                            <span class="text-company">{{persona.company}}</span>
                            </p>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {
    pageData,
    formatString,
} from '@/services/utils';
import TextWordPress from '@/components/Text.vue';
import Spinner from '@/components/Spinner.vue';

const personaUrl = 'http://juntar.club/webservices/user/get_list.php';
const homePageUrl = 'https://juntar.club/wp-json/wp/v2/homepage?slug=homepage';

export default {
    name: 'home',
    data() {
        return {
            personaData: null,
            searchInput: null,
            selectedPeople: null,
        }
    },
    components: {
        TextWordPress,
        Spinner,
    },
    async asyncData({ params }) {
        const homeData = await axios.get(homePageUrl)
            .then(res => {
                return res.data;
            })
            .then(result => {
                return pageData(result);
            })
            .catch(e => console.error(e));

        return { homeData };
    },
    methods: {
        async fetchUrl() {
            await axios.get(personaUrl)
            .then(res => {
                return res.data;
            })
            .then(result => {
                const persons = result.persons;
                const vip = persons
                        .filter(e => e.category === 'VIP');

                const unavailable = persons
                    .filter(e => e.url_image === 'http://juntar.club/pictures/unavailable.png');

                const personaSort = persons
                    .filter(e => e.category !== 'VIP' && e.url_image !== 'http://juntar.club/pictures/unavailable.png')
                    .concat(vip)
                    .concat(unavailable);

                this.personaData = personaSort;
            })
            .catch(e => console.error(e));
        },
    },
    computed: {
        lycos() {
            if (!this.searchInput) {
                return this.personaData;
            }

            const lycosData = this.personaData.filter(e => {
                const searchName = formatString(e.name);
                const searchJob= formatString(e.department);
                const searchCompany= formatString(e.company);
                const searchInput = formatString(this.searchInput);
                return searchName.includes(searchInput)
                || searchJob.includes(searchInput)
                || searchCompany.includes(searchInput);
            });

            return !lycosData.length ? this.personaData : lycosData;
        },
        errorSearch() {
            if (!this.searchInput) return false;
            return this.lycos === this.personaData && this.searchInput.length ? true : false;
        },
    },
    mounted() {
        this.fetchUrl();
    },
}
</script>

<style lang="scss" scoped>
    .bigtitle {
        display: block;
    }

    .subtitle {
        display: inline-block;
        padding: 4px;
        margin-top: 10px;
        background: #000;
        color: #fff;
    }

    .columns.is-multiline {
        padding: 2rem 0rem;

        @media screen and (min-width: 768px) {
            padding: 2rem;
        }
    }
</style>
