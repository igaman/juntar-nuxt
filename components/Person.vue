<template>
    <section class="section">
        <spinner v-if="!personData"/>
        <div class="container has-text-centered" v-if="personData">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-1by1">
                        <img :src="personData.url_image" :alt="personData.name">
                    </figure>
                </div>
                <p class="description">
                    <span class="name title is-5">{{personData.name}}  {{personData.surname}}</span>
                    <span class="job">{{personData.department}} - {{personData.company}}</span>
                    <span class="school" v-if="personData.education && personData.education !== 'Non Renseigné'">
                        <span class="subject">Ecole:</span>   {{personData.education}}
                    </span>
                    <span class="linkedin" v-if="personData.url_linkedin">
                        <span class="subject">Linkedin:</span>  <a :href="personData.url_linkedin" target="_blank">{{personData.url_linkedin}}</a>
                    </span>
                </p>
                <div class="description-resume" v-if="personData.description">
                    <hr>
                    <p>{{personData.description}}</p>
                </div>
            </div>
            <button class="button linkedin">
                <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=http://dev.igaman.studio/`" target="_blank">
                    Partager sur Linkedin
                </a>
            </button>
        </div>
    </section>
</template>

<script>
import Spinner from './Spinner.vue';

const personaUrl = 'http://juntar.club/webservices/user/get_list.php';

export default {
    name: 'about',
    components: {
        Spinner,
    },
    data() {
        return {
            personData: null,
            url: window.location.href,
        };
    },
    metaInfo() {
        return {
            title: `Juntar 500 | ${this.meta.name} ${this.meta.surname}`,
            meta: [
                { vmid: 'og-title', property: 'og:title', content: `Juntar 500 | ${this.meta.name} ${this.meta.surname}` },
                { vmid: 'og-url', property: 'og:url', content: window.location.href },
                { vmid: 'og-image', property: 'og:image', content: this.meta.url_image },
                { vmid: 'og-description', property: 'og:description', content: `${this.meta.name} ${this.meta.surname} figure dans la deuxieme édition de Juntar 500, la photographie des parcours lusophones les plus inspirants en France` },
            ],
        };
    },
    methods: {
        fetchUrl() {
            fetch(personaUrl)
                .then(res => res.json())
                .then(results => {
                    const idPerson =  parseFloat(this.$route.params.id);
                    this.personData = results.persons.filter(e => e.id === idPerson)[0];
                });
        },
    },
    computed: {
        meta() {
            return this.personData || '';
        }
    },
    watch: {
        '$route': {
            handler: 'fetchUrl',
            immediate: true,
        }
    },
    mounted() {
        this.fetchUrl();
    },
}
</script>

<style lang="scss" scoped>
    .card {
        max-width: 400px;
        margin: 0 auto;
    }

    .description {
        padding: 10px;

        .name {
            font-weight: bold;
            margin-bottom: 0;
        }

        .job {
            font-weight: bold;
        }

        &>span {
            text-align: left;
            display: block;
        }
    }

    .description-resume {
        padding: 10px;
    }

    .subject {
        text-decoration: underline;
        font-weight: bold;
    }

    .linkedin {
        margin-top: 20px;
    }
</style>
