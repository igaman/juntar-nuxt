<template>
    <div class="container">
        <div class="section">
            <div class="card">
                <div class="card-image">
                <figure class="image is-1by1">
                    <img :src="person.url_image" :alt="person.name">
                </figure>
                </div>
                <p class="description">
                    <span class="name title is-5">{{person.name}}  {{person.surname}}</span>
                    <span class="job">{{person.department}} - {{person.company}}</span>
                    <span class="school" v-if="person.education && person.education !== 'Non Renseigné'">
                        <span class="subject">Ecole:</span>   {{person.education}}
                    </span>
                    <span class="linkedin" v-if="person.url_linkedin">
                        <span class="subject">Linkedin:</span>  <a :href="person.url_linkedin" target="_blank">{{person.url_linkedin}}</a>
                    </span>
                </p>
                <div class="description-resume" v-if="person.description">
                    <hr>
                    <p>{{person.description}}</p>
                </div>
            </div>
            <button v-if="navigatorShare" class="button linkedin" @click="webShare">
                Partager
            </button>
            <button v-else class="button linkedin">
                <a
                    :href="`https://www.linkedin.com/sharing/share-offsite/?url=http://dev.igaman.studio${$nuxt.$route.fullPath}`" target="_blank"
                >
                    Partager sur Linkedin
                </a>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

const personaUrl = 'http://juntar.club/webservices/user/get_list.php';

export default {
    head() {
        return {
            title: `Juntar 500 | ${this.person.name} ${this.person.surname}`,
            meta: [
                { vmid: 'og-title', property: 'og:title', content: `Juntar 500 | ${this.person.name} ${this.person.surname}` },
                { vmid: 'og-url', property: 'og:url', content: `http://dev.igaman.studio${this.$nuxt.$route.fullPath}` },
                { vmid: 'og-image', property: 'og:image', content: this.person.url_image },
                { vmid: 'og-description', property: 'og:description', content: `${this.person.name} ${this.person.surname} figure dans la deuxieme édition de Juntar 500, la photographie des parcours lusophones les plus inspirants en France` },
            ],
        };
    },
    data() {
        return {
            navigatorShare: false,
        }
    },
    method: {
        webShare() {
            navigator.share({
                url: `http://dev.igaman.studio${this.$nuxt.$route.fullPath}`,
                title: `Juntar 500 | ${this.person.name} ${this.person.surname}`,
                text: `${this.person.name} ${this.person.surname} figure dans la deuxieme édition de Juntar 500, la photographie des parcours lusophones les plus inspirants en France`,
            });
        }
    },
    async asyncData({params}) {
        const person = await axios.get(personaUrl)
            .then(res => {
                return res.data;
            })
            .then(result => {
                const idPerson = parseFloat(params.id);
                return result.persons.filter(e => e.id === idPerson)[0];
            })
            .catch(e => console.error(e));

        return { person };
    },
    mounted() {
        if (navigator.share) {
            this.navigatorShare = true;
        }
    }
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
        display: flex;
        margin: 20px auto 0;
        color: #3273dc;
    }
</style>
