<template>
  <div class="w-full">
    <div class="max-w-[450px] mx-auto md:px-7 px-4 pt-28">
      <div class="w-full mb-8">
        <h2 class="text-3xl font-semibold">Accedi</h2>
      </div>
      <form @submit.prevent class="w-full flex flex-col gap-2">
        <inputText v-model="user.data.email" type="email" label="Email address" :error="user.error.email" :required="true" />
        <inputText v-model="user.data.password" type="password" label="Password" :error="user.error.password" :required="true" />
        <div class="w-full flex items-center justify-end">
          <p class="text-sm font-normal">
            Sei appena arrivato su GoFork? <RouterLink to="/signup" class="font-semibold underline">Registrati</RouterLink>
          </p>
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

import inputText from '../../components/input/input-text.vue';
import buttonLg from '../../components/button/button-lg.vue';

export default {
  name: 'Signin',
  components: {
    inputText,
    buttonLg,
  },
  data() {
    return {
      auth,

      user: {
        data: {
          email: 'cicciogamer89@gmail.com',
          password: 'ciccio',
        },
        error: {
          email: null,
          password: null,
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
        return true;
      } else if (!emailRegex.test(this.user.data.email)) {
        this.user.error.email = 'Inserisci un indirizzo email valido';
        return true;
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

    async actionSignin() {
      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();

      this.user.loading = true;

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
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.user.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
