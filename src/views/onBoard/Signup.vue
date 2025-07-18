<template>
  <div class="w-full">
    <div class="max-w-[450px] mx-auto md:px-7 px-4 pt-28">
      <div class="w-full mb-16 flex items-center justify-center">
        <logo type="full" logo="manager" class="max-w-[140px]" />
      </div>
      <div class="w-full mb-8 flex flex-col gap-2">
        <h2 class="text-3xl font-semibold">Registrati</h2>
        <p class="text-sm font-normal text-start">
          Hai già un account GoFork? <RouterLink to="/signin" class="font-semibold underline">Accedi</RouterLink>
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
        <inputText
          v-model="user.data.email"
          type="email"
          label="Email address"
          :readOnly="!user.editable.email"
          :error="user.error.email"
          :required="true"
          :disabled="!user.editable.email"
        />
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
          @click="actionSignup"
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
import { PASSWORD_PATTERNS, validatePasswordRequirements } from '../../lib/password_validation';

import supportedDomains from '../../json/supported_domains.json';

import logo from '../../components/global/logo.vue';
import inputText from '../../components/input/input-text.vue';
import buttonLg from '../../components/button/button-lg.vue';
import snackbar from '../../components/snackbar/snackbar.vue';
import bulletPoint from '../../components/bullet/bullet-point.vue';

export default {
  name: 'Signup',
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
          restaurantId: null,
          email: '',
          password: '',
          confirm_password: '',
        },
        error: {
          email: null,
          password: null,
          confirm_password: null,
          general: null,
        },
        editable: {
          email: false,
          password: true,
        },
        isInvited: false,
        inviteToken: null,
        inviteData: null,
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

    async validateInviteToken(token) {
      try {
        console.log('Validating token:', token);
        console.log('Current time:', new Date().toISOString());
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('invite_token', token)
          .eq('status', 'invited')
          .gt('invite_expires_at', new Date().toISOString())
          .single();

        if (error || !data) {
          this.user.error.general = 'Invito non valido o scaduto';
          return false;
        }

        this.user.inviteData = data;
        this.user.data.email = data.email;
        this.user.editable.email = false;
        this.user.isInvited = true;

        return true;
      } catch (e) {
        console.error(e);
        // eslint-disable-next-line quotes
        this.user.error.general = "Errore nella validazione dell'invito";
        return false;
      }
    },
    async actionSignup() {
      this.user.loading = true;
      this.user.error.general = null;

      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();

      if (!isEmailValid || !isPasswordValid) {
        this.user.loading = false;
        return;
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email: this.user.data.email,
          password: this.user.data.password,
        });

        if (!error) {
          // console.log(data);
          const userId = data.user.id;

          if (this.user.isInvited) {
            await this.createProfile(userId);
          } else {
            this.$router.push({ name: 'signin' });
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.user.loading = false;
      }
    },
    async createProfile(userId) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            user_id: userId,
            status: 'active',
            invite_token: null, // Rimuovi il token dopo l'uso
            invite_expires_at: null,
          })
          .eq('invite_token', this.user.inviteToken)
          .eq('status', 'invited');

        if (!error) {
          this.$router.push({ name: 'signin' });
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  watch: {
    '$route.query': {
      async handler(value) {
        this.user.error.general = null;

        if (value.token) {
          this.user.inviteToken = value.token;
          const isValidToken = await this.validateInviteToken(value.token);

          if (!isValidToken) {
            this.$router.push({ name: 'invalid-invite' });
          }
        } else {
          this.user.isInvited = false;
          this.user.editable.email = true;
          this.user.data.email = '';
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped></style>
