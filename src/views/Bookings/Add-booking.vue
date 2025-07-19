<template>
  <sidebar />
  <mainView>
    <template #view>
      <headTitle :backTo="true" :actions="true" to="bookings" head="Nuova prenotazione">
        <template #actions>
          <buttonLg @click="saveBooking" type="button" size="md" variant="primary" label="Salva" :loading="fields.loading" :disabled="false" />
        </template>
      </headTitle>
      <form @submit.prevent class="w-full my-8 flex flex-col gap-4">
        <div class="card-form w-full p-6 rounded-lg flex flex-col gap-4 border border-solid border-black/10 bg-white">
          <div class="grid md:grid-cols-3 grid-cols-1 gap-4">
            <inputText v-model="fields.data.contact_name" type="text" label="Nome" :error="fields.error.contact_name" :required="true" />
            <inputText v-model="fields.data.contact_email" type="email" label="Email" :error="fields.error.contact_email" :required="false" />
            <inputText
              v-model="fields.data.contact_phone"
              type="text"
              label="Numero di telefono"
              :error="fields.error.contact_phone"
              :required="true"
            />
          </div>
          <div class="grid md:grid-cols-3 grid-cols-1 gap-4">
            <inputText v-model="fields.data.people" type="number" label="Persone" :error="fields.error.people" :required="true" />
            <inputText
              v-model="fields.data.reservation_time"
              type="datetime-local"
              label="Data e ora"
              :error="fields.error.reservation_time"
              :required="false"
            />
          </div>
          <textArea v-model="fields.data.note" label="Note" :minlength="0" :maxlength="255" :error="fields.error.note" :required="false" />
        </div>
      </form>
    </template>
  </mainView>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { auth } from '../../data/auth';
import { store } from '../../data/store';

import sidebar from '../../components/navigation/sidebar.vue';
import mainView from '../../components/global/main-view.vue';
import headTitle from '../../components/head/head-title.vue';
import buttonLg from '../../components/button/button-lg.vue';
import inputText from '../../components/input/input-text.vue';
import textArea from '../../components/input/text-area.vue';

export default {
  name: 'Add-booking',
  components: {
    sidebar,
    mainView,
    headTitle,
    buttonLg,
    inputText,
    textArea,
  },
  data() {
    return {
      auth,
      store,

      fields: {
        data: {
          contact_name: '',
          contact_email: '',
          contact_phone: '',
          people: '',
          reservation_time: '',
          note: '',
        },
        error: {
          contact_name: null,
          contact_email: null,
          contact_phone: null,
          people: null,
          reservation_time: null,
          note: null,
        },
        loading: false,
      },
    };
  },
  methods: {
    async saveBooking() {
      this.fields.loading = true;

      const PROFILE_USER_ID = this.auth.profile?.id;
      const RESTAURANT_ID = this.store.restaurants.data.restaurant_id;

      if (!RESTAURANT_ID) {
        this.fields.loading = false;
        return;
      }

      try {
        const { error } = await supabase.from('reservations').insert({
          profile_id: PROFILE_USER_ID,
          restaurant_id: RESTAURANT_ID,
          room_id: null,
          table_id: null,
          contact_name: this.fields.data.contact_name,
          contact_email: this.fields.data.contact_email,
          contact_phone: this.fields.data.contact_phone,
          people: this.fields.data.people,
          reservation_time: this.fields.data.reservation_time,
          note: this.fields.data.note,
        });

        if (!error) {
          this.$emit('load-bookings');
          this.$router.push({ name: 'bookings' });
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
