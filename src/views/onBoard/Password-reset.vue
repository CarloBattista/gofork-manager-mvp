<template>
  <div class="w-full">
    <div class="max-w-[450px] mx-auto md:px-7 px-4 pt-28">
      <div class="w-full mb-8 flex flex-col gap-2">
        <h2 class="text-3xl font-semibold">Scegli una nuova password</h2>
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
        <inputText v-model="user.data.password" type="password" label="Password" :error="user.error.password" :required="true" />
        <inputText
          v-model="user.data.confirm_password"
          type="password"
          label="Conferma password"
          :error="user.error.confirm_password"
          :required="true"
        />
        <buttonLg
          @click="actionResetPassword"
          type="submit"
          size="lg"
          variant="primary"
          label="Salva la nuova password"
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

import inputText from '../../components/input/input-text.vue';
import buttonLg from '../../components/button/button-lg.vue';
import snackbar from '../../components/snackbar/snackbar.vue';

export default {
  name: 'Password-reset',
  components: {
    inputText,
    buttonLg,
    snackbar,
  },
  data() {
    return {
      auth,

      user: {
        data: {
          password: '',
          confirm_password: '',
        },
        error: {
          password: null,
          confirm_password: null,
          general: null,
        },
        session: null,
        loading: false,
      },
    };
  },
  methods: {
    validatePassword() {
      if (!this.user.data.password) {
        this.user.error.password = 'Inserisci una password';
        return false;
      } else if (this.user.data.password !== this.user.data.confirm_password) {
        this.user.error.password = 'Le password non coincidono';
        this.user.error.confirm_password = 'Le password non coincidono';
        return false;
      } else {
        this.user.error.password = null;
        this.user.error.confirm_password = null;
        return true;
      }
    },

    async retrieveSession() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!error && !data.session) {
          this.user.session = data.session || 'session_has_expired';
          this.user.error.general = 'La sessione è scaduta';
        }
      } catch (e) {
        console.error(e);
      }
    },
    async actionResetPassword() {
      this.user.loading = true;
      this.user.error.general = null;

      const isPasswordValid = this.validatePassword();

      if (!isPasswordValid || this.user.session === 'session_has_expired') {
        this.user.loading = false;
        return;
      }

      try {
        const { error } = await supabase.auth.updateUser({
          password: this.user.data.password,
        });

        if (!error) {
          // console.log(data);
          this.$router.push({ name: 'dashboard' });
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.user.loading = false;
      }
    },
  },
  mounted() {
    this.retrieveSession();
  },
};
</script>

<style scoped></style>
