<template>
  <div class="w-full">
    <div class="max-w-[450px] mx-auto md:px-7 px-4 pt-28">
      <div class="w-full mb-16 flex items-center justify-center">
        <logo type="full" logo="manager" class="max-w-[140px]" />
      </div>
      <div class="w-full mb-8 flex flex-col gap-2">
        <h2 class="text-3xl font-semibold">Accedi</h2>
        <p class="text-sm font-normal text-start">
          Sei appena arrivato su GoFork? <RouterLink to="/signup" class="font-semibold underline">Registrati</RouterLink>
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
      <form @submit.prevent class="w-full flex flex-col gap-2">
        <inputText v-model="user.data.email" type="email" label="Email address" :error="user.error.email" :required="true" />
        <inputText v-model="user.data.password" type="password" label="Password" :error="user.error.password" :required="true" />
        <div class="w-full flex items-center justify-end">
          <RouterLink to="/forgot-password" class="font-semibold underline">Password dimenticata?</RouterLink>
        </div>
        <buttonLg
          @click="actionSignin"
          type="submit"
          size="lg"
          variant="primary"
          label="Continua"
          :loading="user.loading"
          :disabled="user.loading"
          class="mt-8"
        />
      </form>
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
  name: 'Signin',
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
          password: '',
        },
        error: {
          email: null,
          password: null,
          general: null,
        },
        loading: false,
      },
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
    validatePassword() {
      if (!this.user.data.password) {
        this.user.error.password = 'Inserisci una password';
        return false;
      } else {
        this.user.error.password = null;
        return true;
      }
    },
    retrieveError(error) {
      if (error.code === 'invalid_credentials') {
        this.user.error.general = 'Correggi indirizzo email e/o la password.';
      } else {
        this.user.error.general = 'Si è verificato un errore, riprova più tardi';
      }
    },
    retrieveData() {
      const savedEmail = this.auth.user.email;

      if (savedEmail) {
        this.user.data.email = savedEmail;
      } else {
        this.user.data.email = '';
      }
    },

    async actionSignin() {
      this.user.loading = true;
      this.user.error.general = null;

      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();

      if (!isEmailValid || !isPasswordValid) {
        this.user.loading = false;
        return;
      }

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: this.user.data.email,
          password: this.user.data.password,
        });

        if (!error) {
          // console.log(data);

          this.auth.user = data.user;
          this.auth.session = data.session;
          this.auth.isAuthenticated = true;

          localStorage.setItem('isAuthenticated', true);

          this.$router.push({ name: 'dashboard' });
        } else {
          this.retrieveError(error);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.user.loading = false;
      }
    },
  },
  watch: {
    'auth.user': {
      handler(value) {
        if (value) {
          this.retrieveData();
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
