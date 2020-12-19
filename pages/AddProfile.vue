<template>
<form @submit.prevent="submitForm">
    <section class="section">
        <h2 class="title">Soumettre votre profil</h2>
        <div class="field">
            <label class="label">Prénom</label>
            <div class="control">
                <input class="input" type="text" v-model="name" placeholder="Votre prénom">
            </div>
        </div>

        <div class="field">
            <label class="label">Nom</label>
            <div class="control">
                <input class="input" type="text" v-model="lastName" placeholder="Votre nom">
            </div>
        </div>

        <div class="field">
            <label class="label">Métier</label>
            <div class="control">
                <input class="input" type="text" v-model="job" placeholder="Votre métier">
            </div>
        </div>

        <div class="field">
            <label class="label">Entreprise</label>
            <div class="control">
                <input class="input" type="text" v-model="compagny" placeholder="Votre entreprise">
            </div>
        </div>

        <div class="field">
            <label class="label">Site web (ou Linkedin)</label>
            <div class="control">
                <input class="input" type="text" v-model="website" placeholder="Votre site">
            </div>
        </div>

        <div class="field">
            <label class="label">Votre Histoire</label>
            <div class="control">
                <textarea class="textarea" v-model="story" placeholder="Votre histoire"></textarea>
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
        <spinner v-if="spinnerDisplay"/>

        <article
            class="message is-danger"
            v-if="displayMessage && status === 'validation_failed'"
        >
            <div class="message-body">
                {{sendMessage}}
            </div>
        </article>
        <article
            class="message is-success"
            v-if="displayMessage && status === 'mail_sent'"
        >
            <div class="message-body">
                {{sendMessage}}
            </div>
        </article>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link"
                >Envoyer</button>
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
        title: 'Juntar 500 | Soumettre votre profil',
    },
    components: {
        Spinner,
    },
    data() {
        return {
            name: null,
            lastName: null,
            job: null,
            compagny: null,
            website: null,
            story: null,
            email: null,
            subject: 'Nouveau message',
            message: null,
            displayMessage: false,
            status: null,
            sendMessage: null,
            spinnerDisplay: false,
        }
    },
    methods: {
        submitForm() {
            this.spinnerDisplay = true;
            this.displayMessage = false;

            const formData = new FormData();
            formData.append('your-name', this.name);
            formData.append('your-last-name', this.lastName);
            formData.append('your-job', this.job);
            formData.append('your-compagny', this.compagny);
            formData.append('your-website', this.website);
            formData.append('your-story', this.story);
            formData.append('your-email', this.email);
            formData.append('your-subject', 'Nouveau message');
            formData.append('your-message', this.message);

            axios({
                method: 'post',
                url: 'https://juntar.club/wp-json/contact-form-7/v1/contact-forms/103/feedback',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data' },
            })
            .then(({ data }) => {
                this.displayMessage = true;
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
        max-width: 800px;
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
