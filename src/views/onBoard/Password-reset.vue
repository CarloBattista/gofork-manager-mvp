<template>
  <div class="w-full">
    <div class="max-w-[450px] mx-auto md:px-7 px-4 pt-28">
      <div class="w-full mb-16 flex items-center justify-center">
        <logo type="full" logo="manager" class="max-w-[140px]" />
      </div>
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
        <div class="w-full flex flex-col gap-2">
          <bulletPoint :state="passwordRequirements.minLength ? 'success' : 'error'" label="La password deve contenere almeno 8 caratteri" />
          <bulletPoint
            :state="passwordRequirements.hasLowercase ? 'success' : 'error'"
            label="La password deve contenere almeno una lettera minuscola"
          />
          <bulletPoint
            :state="passwordRequirements.hasUppercase ? 'success' : 'error'"
            label="La password deve contenere almeno una lettera maiuscola"
          />
          <bulletPoint :state="passwordRequirements.hasNumber ? 'success' : 'error'" label="La password deve contenere almeno un numero" />
          <bulletPoint :state="passwordRequirements.hasSymbol ? 'success' : 'error'" label="La password deve contenere almeno un simbolo" />
        </div>
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
import { PASSWORD_PATTERNS, validatePasswordRequirements } from '../../lib/password_validation';

import logo from '../../components/global/logo.vue';
import inputText from '../../components/input/input-text.vue';
import buttonLg from '../../components/button/button-lg.vue';
import snackbar from '../../components/snackbar/snackbar.vue';
import bulletPoint from '../../components/bullet/bullet-point.vue';

export default {
  name: 'Password-reset',
  components: {
    logo,
    inputText,
    buttonLg,
    snackbar,
    bulletPoint,
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
  computed: {
    passwordRequirements() {
      return validatePasswordRequirements(this.user.data.password);
    },
  },
  methods: {
    validatePassword() {
      this.user.error.password = null;
      this.user.error.confirm_password = null;

      if (!this.user.data.password) {
        this.user.error.password = 'Inserisci una password';
        return false;
      }

      // Check minimum length
      if (!PASSWORD_PATTERNS.minLength().test(this.user.data.password)) {
        this.user.error.password = 'La password deve contenere almeno 8 caratteri';
        return false;
      }

      // Check for lowercase letters
      if (!PASSWORD_PATTERNS.hasLowercase.test(this.user.data.password)) {
        this.user.error.password = 'La password deve contenere almeno una lettera minuscola';
        return false;
      }

      // Check for uppercase letters
      if (!PASSWORD_PATTERNS.hasUppercase.test(this.user.data.password)) {
        this.user.error.password = 'La password deve contenere almeno una lettera maiuscola';
        return false;
      }

      // Check for digits
      if (!PASSWORD_PATTERNS.hasNumber.test(this.user.data.password)) {
        this.user.error.password = 'La password deve contenere almeno un numero';
        return false;
      }

      // Check for symbols
      if (!PASSWORD_PATTERNS.hasSymbol.test(this.user.data.password)) {
        this.user.error.password = 'La password deve contenere almeno un simbolo (!@#$%^&*()_+-=[]{};\':"|,.<>/?)';
        return false;
      }

      // Check password confirmation
      if (this.user.data.password !== this.user.data.confirm_password) {
        this.user.error.password = 'Le password non coincidono';
        this.user.error.confirm_password = 'Le password non coincidono';
        return false;
      }

      return true;
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
