<template>
  <div class="w-full">
    <div class="max-w-[450px] mx-auto md:px-7 px-4 pt-28">
      <div class="w-full mb-16 flex items-center justify-center">
        <logo type="full" class="max-w-[120px]" />
      </div>
      <div class="w-full mb-8 flex flex-col gap-2">
        <h2 class="text-3xl font-semibold">{{ user.sent ? "L'email per reimpostare la password è stata inviata" : 'Reimposta password' }}</h2>
        <p class="text-sm font-normal text-start">
          {{
            user.sent
              ? 'Le istruzioni per reimpostare la password sono state inviate a ' + user.data.email
              : "Comunicaci l'indirizzo email e ti invieremo delle istruzioni facili da seguire per modificare la tua password."
          }}
          <RouterLink to="/signin" class="font-semibold underline">Torna al login</RouterLink>
        </p>
      </div>
      <snackbar
        v-if="user.error.general"
        state="error"
        :ctaButton="false"
        ctaLabel="Dismiss"
        leftIcon="Info"
        rightIcon=""
        :body="user.error.general"
        class="mb-4"
      />
      <form v-if="!user.sent" @submit.prevent class="w-full flex flex-col gap-2">
        <inputText v-model="user.data.email" type="email" label="Email address" :error="user.error.email" :required="true" />
        <buttonLg
          @click="sendPasswordReset"
          type="submit"
          size="lg"
          variant="primary"
          label="Invia"
          :loading="user.loading"
          :disabled="user.loading"
          class="mt-8"
        />
      </form>
      <buttonLg
        v-else-if="user.sent"
        @click="sendPasswordReset"
        type="submit"
        size="lg"
        variant="secondary-color"
        :label="user.cooldownActive ? `Riprova tra ${user.cooldownTime} secondi` : 'Inviami di nuovo l\'email'"
        :loading="user.loading"
        :disabled="user.loading || user.cooldownActive"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { auth } from '../../data/auth';

import supportedDomains from '../../json/supported_domains.json';

import logo from '../../components/global/logo.vue';
import inputText from '../../components/input/input-text.vue';
import buttonLg from '../../components/button/button-lg.vue';
import snackbar from '../../components/snackbar/snackbar.vue';

export default {
  name: 'Forgot-password',
  components: {
    logo,
    inputText,
    buttonLg,
    snackbar,
  },
  data() {
    return {
      auth,

      user: {
        data: {
          email: '',
        },
        error: {
          email: null,
          general: null,
        },
        sent: false,
        loading: false,
        cooldownActive: false,
        cooldownTime: 60,
      },
      cooldownInterval: null,
    };
  },
  methods: {
    validateEmail() {
      const supportedDomainsPattern = supportedDomains.join('|');
      const emailRegex = new RegExp(`^[^\\s@]+@(${supportedDomainsPattern})\\.(com|it|org|net|edu|gov|io)$`, 'i');

      if (!this.user.data.email) {
        this.user.error.email = 'Inserisci un indirizzo email';
        return false;
      } else if (!emailRegex.test(this.user.data.email)) {
        this.user.error.email = 'Inserisci un indirizzo email valido';
        return false;
      } else {
        this.user.error.email = null;
        return true;
      }
    },
    startCooldown() {
      this.user.cooldownActive = true;
      this.user.cooldownTime = 60;

      this.cooldownInterval = setInterval(() => {
        this.user.cooldownTime--;

        if (this.user.cooldownTime <= 0) {
          this.user.cooldownActive = false;
          clearInterval(this.cooldownInterval);
          this.cooldownInterval = null;
        }
      }, 1000);
    },

    async sendPasswordReset() {
      this.user.loading = true;
      this.user.error.general = null;

      const isEmailValid = this.validateEmail();
      const email = this.user.data.email;

      if (!isEmailValid) {
        this.user.loading = false;
        return;
      }

      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://localhost:5173/password-reset',
        });

        if (!error) {
          // console.log(data);
          this.user.sent = true;
          this.startCooldown();
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.user.loading = false;
      }
    },
  },
  beforeUnmount() {
    if (this.cooldownInterval) {
      clearInterval(this.cooldownInterval);
    }
  },
};
</script>

<style scoped></style>
