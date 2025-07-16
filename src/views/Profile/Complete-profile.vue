<template>
  <div class="w-full">
    <div class="max-w-[450px] mx-auto md:px-7 px-4 pt-28">
      <div class="w-full mb-16 flex items-center justify-center">
        <logo type="full" class="max-w-[120px]" />
      </div>
      <div class="w-full mb-8 flex flex-col gap-2">
        <h2 class="text-3xl font-semibold">Completa il profilo</h2>
      </div>
      <form @submit.prevent class="w-full flex flex-col gap-2">
        <div class="grid grid-cols-2 gap-4">
          <inputText v-model="fields.data.first_name" type="text" label="Nome" :error="fields.error.first_name" :required="true" />
          <inputText v-model="fields.data.last_name" type="text" label="Cognome" :error="fields.error.last_name" :required="true" />
        </div>
        <div class="grid grid-cols-1 gap-4">
          <inputText v-model="fields.data.phone" type="text" label="Numero di telefono" :error="fields.error.phone" :required="true" />
        </div>
        <buttonLg
          @click="actionCreateProfile"
          type="submit"
          size="lg"
          variant="primary"
          label="Continua"
          :loading="fields.loading"
          :disabled="fields.loading"
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

export default {
  name: 'Complete-profile',
  components: {
    inputText,
    buttonLg,
  },
  data() {
    return {
      auth,

      fields: {
        data: {
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
        },
        error: {
          first_name: null,
          last_name: null,
          email: null,
          phone: null,
        },
        loading: false,
      },
    };
  },
  methods: {
    validateForm() {
      this.fields.error.first_name = null;
      this.fields.error.last_name = null;
      this.fields.error.phone = null;

      let isValid = true;

      if (!this.fields.data.first_name) {
        this.fields.error.first_name = 'Inserisci un nome';
        isValid = false;
      }

      if (!this.fields.data.last_name) {
        this.fields.error.last_name = 'Inserisci un cognome';
        isValid = false;
      }

      if (!this.fields.data.phone) {
        this.fields.error.phone = 'Inserisci un numero di telefono';
        isValid = false;
      }

      return isValid;
    },

    async actionCreateProfile() {
      this.fields.loading = true;

      const isFormValid = this.validateForm();

      const userId = this.auth.user.id;

      if (!isFormValid || !userId) {
        this.fields.loading = false;
        return;
      }

      try {
        const { error } = await supabase.from('profiles').insert({
          user_id: userId,
          first_name: this.fields.data.first_name,
          last_name: this.fields.data.last_name,
          email: this.fields.data.email,
          phone: this.fields.data.phone,
        });

        if (!error) {
          // console.log(data);
          this.$emit('load-profile');
          this.$router.push({ name: 'dashboard' });
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.fields.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
