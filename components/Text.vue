<template>
    <div class="text" v-html="dataHtml"/>
</template>
<script>
export default {
    name: 'text-word-press',
    props: {
        dataHtml: {
            type: String,
            required: true,
        },
    }
}
</script>
<style lang="scss">
.text {
    margin: 0 auto;

    .has-text-align-center {
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>
