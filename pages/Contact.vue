<template>
<form @submit.prevent="submitForm">
    <section class="section">
        <h2 class="title">Contact</h2>
        <div class="field">
            <label class="label">Nom</label>
            <div class="control">
                <input class="input" type="text" v-model="name" placeholder="Votre nom">
            </div>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="email" v-model="email" placeholder="Votre email" value="">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Message</label>
            <div class="control">
                <textarea class="textarea" v-model="message" placeholder="Votre message"></textarea>
            </div>
        </div>
        <spinner v-if="spinnerDisplay"/>
        <article
            class="message is-danger"
            v-if="status === 'validation_failed'"
        >
            <div class="message-body">
                {{sendMessage}}
            </div>
        </article>
        <article
            class="message is-success"
            v-if="status === 'mail_sent'"
        >
            <div class="message-body">
                {{sendMessage}}
            </div>
        </article>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" type="submit">Envoyer</button>
            </div>
        </div>
    </section>
</form>
</template>

<script>
import axios from 'axios';
import Spinner from '@/components/Spinner.vue';

export default {
    name: 'contact',
    metaInfo: {
        title: 'Juntar 500 | Contact',
    },
    components: {
        Spinner,
    },
    data() {
        return {
            name: null,
            email: null,
            subject: 'Nouveau message',
            message: null,
            errorDisplay: false,
            spinnerDisplay: false,
            status: null,
            sendMessage: null,
        }
    },
    methods: {
        submitForm() {
            this.spinnerDisplay = true;

            const formData = new FormData();
            formData.append('your-name', this.name);
            formData.append('your-email', this.email);
            formData.append('your-subject', 'Nouveau message');
            formData.append('your-message', this.message);

            axios({
                method: 'post',
                url: 'https://juntar.club/wp-json/contact-form-7/v1/contact-forms/88/feedback',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data' },
            })
            .then(({ data }) => {
                this.spinnerDisplay = false;
                this.status = data.status;
                this.sendMessage = data.message;
            });
        },
    },
}
</script>

<style lang="scss" scoped>
    .section {
        text-align: left;
        max-width: 960px;
        margin: 0 auto;
    }

    .message {
        margin: 20px 0;
    }

    .is-danger {
        max-width: 100%;
    }

    ::v-deep .lds-spinner {
        margin: 0;
    }
</style>
