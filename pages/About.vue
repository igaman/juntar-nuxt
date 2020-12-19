<template>
    <section class="section">
        <div class="container" v-if="aboutData">
            <h2 class="title">A propos</h2>
            <text-word-press :dataHtml="aboutData"/>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import {
    pageData,
    formatString,
} from '@/services/utils';
import TextWordPress from '@/components/Text.vue';

const homePageUrl = 'http://juntar.club/wp-json/wp/v2/homepage?slug=about';


export default {
    name: 'about',
    metaInfo: {
        title: 'Juntar 500 | A propos',
    },
    components: {
        TextWordPress,
    },
    async asyncData({ params }) {
        const aboutData = await axios.get(homePageUrl)
            .then(res => {
                return res.data;
            })
            .then(result => {
                return pageData(result);
            })
            .catch(e => console.error(e));

        return { aboutData };
    },
}
</script>

<style lang="scss" scoped>
    .section {
        max-width: 960px;
        margin: 0 auto;
    }
</style>
