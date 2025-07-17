<template>
  <div class="w-full">
    <div class="max-w-[570px] mx-auto md:px-7 px-4 pt-28">
      <h1 class="text-3xl font-semibold mb-8">Aggiungi un ristorante</h1>
      <progressIndicator :steps="steps.data" :currentStep="steps.currentStep" :onlyIcon="false" :label="true" />
      <form v-if="steps.currentStep === 0" @submit.prevent class="w-full flex flex-col gap-2 mt-10">
        <inputText v-model="fields.data.name" type="text" label="Nome del ristorante" :error="fields.error.name" :required="true" />
        <div class="w-full h-[1px] my-5 bg-black/20"></div>
        <inputText v-model="fields.data.address" type="text" label="Indirizzo" :error="fields.error.address" :required="true" />
        <inputText v-model="fields.data.city" type="text" label="Città" :error="fields.error.city" :required="true" />
        <inputText v-model="fields.data.cap" type="text" label="Codice postale" :error="fields.error.cap" :required="false" />
        <buttonLg
          @click="saveAndContinue"
          type="submit"
          size="lg"
          variant="primary"
          label="Salva e Continua"
          :loading="fields.loading"
          :disabled="fields.loading"
          class="mt-8"
        />
      </form>
      <form v-else-if="steps.currentStep === 1" @submit.prevent class="w-full flex flex-col gap-2 mt-10">
        <headTitle sub="true" head="Contatti" class="mb-6" />
        <inputText v-model="fields.data.phone" type="text" label="Numero di telefono" :error="fields.error.phone" :required="true" />
        <inputText v-model="fields.data.email" type="text" label="Indirizzo email" :error="fields.error.email" :required="true" />
        <div class="w-full h-[1px] my-5 bg-black/20"></div>
        <div class="mb-6">
          <headTitle sub="true" head="Orari" class="mb-2" />
          <p class="text-black/50 text-base font-normal">Seleziona un giorno per modificare gli orari di apertura</p>
        </div>
        <div class="w-full flex flex-wrap gap-2 items-center">
          <buttonLg
            v-for="day in daysOfWeek"
            :key="day.key"
            @click="selectDay(day.key)"
            type="button"
            size="sm"
            :variant="selectedDay === day.key ? 'primary' : 'secondary-color'"
            :label="day.label"
          />
        </div>
        <div v-if="selectedDay">
          <div class="space-y-3">
            <buttonLg
              @click="addPeriod(selectedDay)"
              v-if="!openingHours[selectedDay].h24 && !openingHours[selectedDay].closed && openingHours[selectedDay].periods.length < 4"
              type="button"
              size="lg"
              variant="text-only"
              label="Aggiungi orario"
              :loading="false"
              :disabled="false"
            />
            <div v-for="(period, periodIndex) in openingHours[selectedDay].periods" :key="periodIndex" class="w-full mt-8 flex flex-col gap-3">
              <div class="w-full mb-2 flex items-center justify-between">
                <div v-if="!openingHours[selectedDay].h24 && !openingHours[selectedDay].closed" class="w-full flex gap-4 items-center justify-start">
                  <inputText v-model="period.open" type="time" :error="null" :required="false" />
                  <span>A</span>
                  <inputText v-model="period.close" type="time" :error="null" :required="false" />
                  <iconButton
                    @click="removePeriod(selectedDay, periodIndex)"
                    v-if="openingHours[selectedDay].periods.length > 1"
                    type="button"
                    size="md"
                    variant="icon-only"
                    icon="X"
                  />
                </div>
              </div>
              <checkbox v-model="openingHours[selectedDay].h24" v-if="!openingHours[selectedDay].closed" size="md" label="Aperto 24 ore su 24" />
              <checkbox v-model="openingHours[selectedDay].closed" size="md" label="Chiuso" />
            </div>
          </div>
        </div>
        <div class="w-full mt-8 flex gap-8 items-center">
          <buttonLg @click="back" type="submit" size="lg" variant="text-only" label="Indietro" :loading="false" :disabled="false" />
          <buttonLg
            @click="addRestaurant"
            type="submit"
            size="lg"
            variant="primary"
            label="Invia"
            :loading="fields.loading"
            :disabled="fields.loading"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { auth } from '../../data/auth';
import { store } from '../../data/store';

import supportedDomains from '../../json/supported_domains.json';

import progressIndicator from '../../components/progress/progress-indicator.vue';
import headTitle from '../../components/head/head-title.vue';
import inputText from '../../components/input/input-text.vue';
import buttonLg from '../../components/button/button-lg.vue';
import iconButton from '../../components/button/icon-button.vue';
import checkbox from '../../components/toggle/checkbox.vue';

export default {
  name: 'Add-restaurant',
  components: {
    progressIndicator,
    headTitle,
    inputText,
    buttonLg,
    iconButton,
    checkbox,
  },
  data() {
    return {
      auth,
      store,
      selectedDay: null,
      daysOfWeek: [
        { key: 'sunday', label: 'Dom' },
        { key: 'monday', label: 'Lun' },
        { key: 'tuesday', label: 'Mar' },
        { key: 'wednesday', label: 'Mer' },
        { key: 'thursday', label: 'Gio' },
        { key: 'friday', label: 'Ven' },
        { key: 'saturday', label: 'Sab' },
      ],
      openingHours: {
        sunday: { closed: false, h24: false, periods: [{ open: '19:30', close: '23:00' }] },
        monday: { closed: false, h24: false, periods: [{ open: '19:30', close: '23:00' }] },
        tuesday: { closed: false, h24: false, periods: [{ open: '19:30', close: '23:00' }] },
        wednesday: { closed: false, h24: false, periods: [{ open: '19:30', close: '23:00' }] },
        thursday: { closed: false, h24: false, periods: [{ open: '19:30', close: '23:00' }] },
        friday: { closed: false, h24: false, periods: [{ open: '19:30', close: '23:00' }] },
        saturday: { closed: false, h24: false, periods: [{ open: '19:30', close: '23:00' }] },
      },
      steps: {
        data: [
          {
            label: 'Dettagli sulla posizione',
            icon: '',
          },
          {
            label: 'Contatti e orari',
            icon: '',
          },
        ],
        currentStep: 0,
      },
      fields: {
        data: {
          name: '',
          address: '',
          city: '',
          cap: '',
          latitude: '',
          longitude: '',
          average_price: '',

          website: '',
          phone: '',
          email: '',
        },
        error: {
          name: null,
          address: null,
          city: null,
          cap: null,
          latitude: null,
          longitude: null,
          average_price: null,

          website: null,
          phone: null,
          email: null,
        },
        loading: false,
      },
    };
  },
  methods: {
    handleBeforeUnload(event) {
      // Controlla se ci sono dati inseriti nei campi
      const hasData =
        this.fields.data.name ||
        this.fields.data.address ||
        this.fields.data.city ||
        this.fields.data.cap ||
        this.fields.data.website ||
        this.fields.data.phone ||
        this.fields.data.email;

      if (hasData) {
        const message = 'Sei sicuro di voler lasciare questa pagina? I dati inseriti potrebbero andare persi.';
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    },
    validateForm(step = null) {
      // Reset degli errori
      this.fields.error.name = null;
      this.fields.error.address = null;
      this.fields.error.city = null;
      //   this.fields.error.cap = null;
      this.fields.error.phone = null;
      this.fields.error.email = null;

      let isValid = true;
      const currentStep = step !== null ? step : this.steps.currentStep;

      if (currentStep === 0) {
        if (!this.fields.data.name) {
          this.fields.error.name = 'Inserisci il nome del ristorante';
          isValid = false;
        }

        if (!this.fields.data.address) {
          this.fields.error.address = 'Inserisci indirizzo del ristorante';
          isValid = false;
        }

        if (!this.fields.data.city) {
          this.fields.error.city = 'Inserisci la città del ristorante';
          isValid = false;
        }

        // if (!this.fields.data.cap) {
        //   this.fields.error.cap = 'Inserisci il cap del ristorante';
        //   isValid = false;
        // }
      } else if (currentStep === 1) {
        if (!this.fields.data.phone) {
          this.fields.error.phone = 'Inserisci il numero di telefono';
          isValid = false;
        }

        if (this.fields.data.phone) {
          // eslint-disable-next-line no-useless-escape
          const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,}$/;
          if (!phoneRegex.test(this.fields.data.phone)) {
            this.fields.error.phone = 'Inserisci un numero di telefono valido';
            isValid = false;
          }
        }
      }

      return isValid;
    },
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
    back() {
      if (this.fields.loading) {
        this.fields.loading = false;
      }

      this.steps.currentStep--;
    },
    saveAndContinue() {
      const isFormValid = this.validateForm(0);
      const haveRestaurant = this.store.restaurants.data;

      if (!isFormValid || haveRestaurant) {
        return;
      }

      this.steps.currentStep++;
    },
    selectDay(day) {
      this.selectedDay = day;
    },
    getDayLabel(dayKey) {
      const day = this.daysOfWeek.find((d) => d.key === dayKey);
      return day ? day.label : '';
    },
    toggleH24(day) {
      if (this.openingHours[day].h24) {
        this.openingHours[day].closed = false;
        // Rimuovi tutti i periods quando è selezionato h24
        this.openingHours[day].periods = [];
      } else {
        // Ripristina un period di default quando h24 viene deselezionato
        if (this.openingHours[day].periods.length === 0) {
          this.openingHours[day].periods = [{ open: '09:00', close: '18:00' }];
        }
      }
    },
    toggleClosed(day) {
      if (this.openingHours[day].closed) {
        this.openingHours[day].h24 = false;
        // Rimuovi tutti i periods quando è selezionato chiuso
        this.openingHours[day].periods = [];
      } else {
        // Ripristina un period di default quando chiuso viene deselezionato
        if (this.openingHours[day].periods.length === 0) {
          this.openingHours[day].periods = [{ open: '09:00', close: '18:00' }];
        }
      }
    },
    toggleDayClosed(day) {
      this.openingHours[day].closed = !this.openingHours[day].closed;
    },
    addPeriod(day) {
      this.openingHours[day].periods.push({
        open: '09:00',
        close: '18:00',
      });
    },
    removePeriod(day, periodIndex) {
      if (this.openingHours[day].periods.length > 1) {
        this.openingHours[day].periods.splice(periodIndex, 1);
      }
    },

    async addRestaurant() {
      this.fields.loading = true;

      const isFormValid = this.validateForm(1);
      const isEmailValid = this.validateEmail();
      const profileId = this.auth.profile.id;
      const haveRestaurant = this.store.restaurants.data;

      if (!profileId || !isFormValid || !isEmailValid || haveRestaurant) {
        this.fields.loading = false;
        return;
      }

      try {
        const { data, error } = await supabase
          .from('restaurants')
          .insert({
            name: this.fields.data.name,
            address: this.fields.data.address,
            city: this.fields.data.city,
            phone: this.fields.data.phone,
            email: this.fields.data.email,
            opening_hours: this.openingHours,
          })
          .select('*');

        if (!error) {
          const restaurantId = data[0].id;

          const { data: profileRestaurantData, error: profileRestaurantError } = await supabase.from('profile_restaurants').insert({
            profile_id: profileId,
            restaurant_id: restaurantId,
            role: 'owner',
          });

          if (!profileRestaurantError) {
            console.log(profileRestaurantData);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.fields.loading = false;
      }
    },
  },
  watch: {
    'store.restaurants.data': {
      handler(value) {
        if (value) {
          this.$router.push({ name: 'dashboard' });
        } else return;
      },
      deep: true,
    },
  },
  mounted() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
};
</script>

<style scoped></style>
