<template>
  <sidebar />
  <mainView size="sm">
    <template #view>
      <headTitle :backTo="true" head="Aggiungi un membro al team" />
      <div class="w-full">
        <form @submit.prevent class="max-w-[570px] mx-auto md:px-7 px-4 pt-28">
          <headTitle :sub="true" head="Dati di contatto" class="mb-2" />
          <div class="w-full h-[1px] my-5 bg-black/20"></div>
          <div class="grid grid-cols-2 gap-4 mb-2">
            <inputText v-model="fields.data.first_name" type="text" label="Nome" :error="fields.error.first_name" :required="true" />
            <inputText v-model="fields.data.last_name" type="text" label="Cognome" :error="fields.error.last_name" :required="true" />
          </div>
          <inputText v-model="fields.data.email" type="email" label="Email" :error="fields.error.email" :required="true" />

          <headTitle :sub="true" head="Ruoli e autorizzazioni" class="mb-2 mt-8" />
          <div class="w-full h-[1px] my-5 bg-black/20"></div>
          <listContainer>
            <template #item>
              <listItem
                @click="fields.data.role = role.value"
                v-for="(role, roleIndex) in store.roles"
                :selected="fields.data.role === role.value"
                :key="roleIndex"
                :icon="role.icon"
                :head="role.head"
                :description="role.description"
              />
            </template>
          </listContainer>
          <div class="w-full mt-8 flex gap-8 items-center">
            <RouterLink to="/members">
              <buttonLg type="button" size="lg" variant="text-only" label="Indietro" :loading="false" :disabled="false" />
            </RouterLink>
            <buttonLg
              @click="sendInvite"
              type="submit"
              size="lg"
              variant="primary"
              label="Invia invito"
              :loading="fields.loading"
              :disabled="fields.loading"
            />
          </div>
        </form>
      </div>
    </template>
  </mainView>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { auth } from '../../data/auth';
import { store } from '../../data/store';

import supportedDomains from '../../json/supported_domains.json';

import sidebar from '../../components/navigation/sidebar.vue';
import mainView from '../../components/global/main-view.vue';
import headTitle from '../../components/head/head-title.vue';
import inputText from '../../components/input/input-text.vue';
import listContainer from '../../components/list/list-container.vue';
import listItem from '../../components/list/list-item.vue';
import buttonLg from '../../components/button/button-lg.vue';

export default {
  name: 'Invite-members',
  components: {
    sidebar,
    mainView,
    headTitle,
    inputText,
    listContainer,
    listItem,
    buttonLg,
  },
  data() {
    return {
      auth,
      store,

      fields: {
        data: {
          first_name: '',
          last_name: '',
          email: '',
          role: 'staff',
        },
        error: {
          first_name: null,
          last_name: null,
          email: null,
          role: null,
        },
        loading: false,
      },
    };
  },
  methods: {
    validateEmail() {
      const supportedDomainsPattern = supportedDomains.join('|');
      const emailRegex = new RegExp(`^[^\\s@]+@(${supportedDomainsPattern})\\.(com|it|org|net|edu|gov|io)$`, 'i');

      if (!this.fields.data.email) {
        this.fields.error.email = 'Inserisci un indirizzo email';
        return false;
      } else if (!emailRegex.test(this.fields.data.email)) {
        this.fields.error.email = 'Inserisci un indirizzo email valido';
        return false;
      } else {
        this.fields.error.email = null;
        return true;
      }
    },
    validateForm() {
      this.fields.error.first_name = null;
      this.fields.error.last_name = null;

      let isValid = true;

      if (!this.fields.data.first_name) {
        this.fields.error.first_name = 'Inserisci un nome';
        isValid = false;
      }

      if (!this.fields.data.last_name) {
        this.fields.error.last_name = 'Inserisci un cognome';
        isValid = false;
      }

      return isValid;
    },
    generateInviteToken() {
      // Genera un token sicuro usando crypto API
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    },

    async sendInviteEmail(memberData) {
      try {
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-invite-email', {
          body: {
            email: memberData.email,
            firstName: memberData.firstName,
            lastName: memberData.lastName,
            role: memberData.role,
            restaurantName: this.store.restaurants.data.restaurants.name || 'il nostro ristorante',
            restaurantId: this.store.restaurants.data.restaurant_id,
            frontendUrl: import.meta.env.VITE_FRONTEND_URL || window.location.origin,
            inviteToken: memberData.inviteToken,
          },
        });

        if (emailError) {
          console.error('Errore invio email:', emailError);
          return { success: false, error: emailError };
        }

        console.log('Email inviata con successo:', emailData);
        return { success: true, data: emailData };
      } catch (error) {
        // eslint-disable-next-line quotes
        console.error("Errore durante l'invio dell'email:", error);
        return { success: false, error: error.message };
      }
    },
    async sendInvite() {
      this.fields.loading = true;

      const isFormValid = this.validateForm();
      const isEmailValid = this.validateEmail();
      const restaurantId = this.store.restaurants.data.restaurant_id;

      if (!isFormValid || !isEmailValid || !restaurantId) {
        this.fields.loading = false;
        return;
      }

      try {
        const inviteToken = this.generateInviteToken();
        const expiresAt = new Date();
        // expiresAt.setMinutes(expiresAt.getMinutes() + 5); // Scade dopo 5 minuti
        expiresAt.setDate(expiresAt.getDate() + 7); // Scade dopo 7 giorni

        const { data, error } = await supabase
          .from('profiles')
          .insert({
            first_name: this.fields.data.first_name,
            last_name: this.fields.data.last_name,
            role: 'user',
            status: 'invited',
            email: this.fields.data.email,
            invite_token: inviteToken,
            invite_expires_at: expiresAt.toISOString(),
          })
          .select('*');

        if (!error) {
          const profileId = data[0].id;

          const { error: profileRestaurantError } = await supabase.from('profile_restaurants').insert({
            profile_id: profileId,
            restaurant_id: restaurantId,
            role: this.fields.data.role,
          });

          if (!profileRestaurantError) {
            const emailResult = await this.sendInviteEmail({
              email: this.fields.data.email,
              firstName: this.fields.data.first_name,
              lastName: this.fields.data.last_name,
              role: this.fields.data.role,
              inviteToken: inviteToken, // Passa il token
            });

            if (emailResult.success) {
              this.$router.push({ name: 'members' });
            } else return;
          }
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
