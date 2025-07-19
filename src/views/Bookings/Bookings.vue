<template>
  <sidebar />
  <mainView>
    <template #view>
      <headTitle :actions="true" head="Prenotazioni">
        <template #actions>
          <RouterLink to="/add-booking">
            <buttonLg type="button" size="md" variant="primary" leftIcon="Plus" label="Aggiungi prenotazione" />
          </RouterLink>
        </template>
      </headTitle>
      <div class="w-full my-4">
        <searchInput placeholder="Cerca per nome, email o numero di telefono" class="ml-auto max-w-[250px]" />
      </div>
      <tableContainer v-if="store.bookings.data.length >= 1" :loading="store.bookings.loading">
        <template #head>
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[190px] max-w-[190px]" :isFirst="true" head="Cliente" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[220px] max-w-[220px]" :sort="true" head="Data/Ora" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[210px] max-w-[210px]" head="Contatto" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[125px] max-w-[125px]" :sort="true" head="Persone" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[150px] max-w-[150px]" head="Stato" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[130px] max-w-[130px]" head="Sala/Tavolo" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-end w-[190px] max-w-[190px]" head="Azioni" />
        </template>
        <template #body>
          <tr v-for="(booking, bookingIndex) in store.bookings.data" :key="bookingIndex" class="not-last:border-b border-solid border-black/10">
            <tableCell
              class="h-[73px] pl-6 pr-4 py-3 text-start w-[190px] max-w-[190px]"
              :isFirst="true"
              :label="booking?.contact_name ? booking?.contact_name : '-'"
            />
            <tableCell class="h-[73px] pl-6 pr-4 py-3 text-start w-[220px] max-w-[220px]" :label="formatDateItalian(booking?.reservation_time)" />
            <tableCell
              class="h-[73px] pl-6 pr-4 py-3 text-start w-[210px] max-w-[210px]"
              :inner="true"
              :label="!booking?.contact_phone || !booking?.contact_email ? '-' : ''"
            >
              <template #inner>
                <div class="flex flex-col">
                  <a v-if="booking?.contact_phone" href="tel:{{ booking?.contact_phone }}" class="text-black text-sm font-normal underline">{{
                    booking?.contact_phone
                  }}</a>
                  <a v-if="booking?.contact_email" href="mailto:{{ booking?.contact_email }}" class="text-black text-xs font-normal underline">{{
                    booking?.contact_email
                  }}</a>
                </div>
              </template>
            </tableCell>
            <tableCell class="h-[73px] pl-6 pr-4 py-3 text-start w-[125px] max-w-[125px]" :label="booking?.people ? booking?.people : '-'" />
            <tableCell class="h-[73px] pl-6 pr-4 py-3 text-start w-[150px] max-w-[150px]" :inner="true">
              <template #inner>
                <badge :variant="getStatusBadgeProps(booking?.status).variant" size="sm" :label="getStatusBadgeProps(booking?.status).label" />
              </template>
            </tableCell>
            <tableCell class="h-[73px] pl-6 pr-4 py-3 text-start w-[130px] max-w-[130px]" label="0/0" />
            <tableCell class="h-[73px] pl-6 pr-4 py-3 text-end w-[190px] max-w-[190px] flex gap-2 items-center justify-end" :inner="true">
              <template #inner>
                <tooltip v-if="booking.status !== 'cancelled'" position="top" content="Rifiuta">
                  <template #trigger>
                    <iconButton
                      @click="deleteBooking(booking)"
                      v-if="booking.status !== 'confirmed' && booking.status !== 'completed'"
                      type="button"
                      size="sm"
                      variant="destructive"
                      icon="Trash2"
                    />
                  </template>
                </tooltip>
                <buttonLg
                  @click="assignBooking(booking)"
                  v-if="booking.status === 'pending'"
                  type="button"
                  size="sm"
                  variant="primary"
                  label="Assegna"
                />
                <buttonLg
                  @click="recoverBooking(booking)"
                  v-else-if="booking.status === 'cancelled'"
                  type="button"
                  size="sm"
                  variant="primary"
                  label="Recupera"
                />
                <buttonLg
                  @click="completeBooking(booking)"
                  v-else-if="booking.status === 'confirmed'"
                  type="button"
                  size="sm"
                  variant="primary"
                  label="Completa"
                />
                <buttonLg
                  v-else-if="booking.status === 'completed'"
                  type="button"
                  size="sm"
                  variant="secondary-color"
                  leftIcon="Landmark"
                  label="Visualizza conto"
                />
              </template>
            </tableCell>
          </tr>
        </template>
      </tableContainer>
      <div v-else-if="store.bookings.data.length === 0" class="w-full flex flex-col items-center justify-center">
        <svg width="205" height="200" viewBox="0 0 205 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M95.57 21.156a.811.811 0 0 1 .9-.713c16 1.873 28.546 5.78 37.118 10.828 8.548 5.033 13.306 11.309 13.306 17.947 0 3.376-1.592 6.572-4.245 9.374-2.653 2.801-6.407 5.253-10.853 7.173-5.612 2.422-12.381 4.02-19.559 4.385 1.704 3.29 2.14 6.144 1.598 8.52-.598 2.616-2.348 4.505-4.562 5.672-2.204 1.162-4.894 1.628-7.494 1.424a.812.812 0 0 1 .127-1.62c2.34.184 4.717-.243 6.611-1.242 1.885-.994 3.265-2.533 3.737-4.597.464-2.034.078-4.718-1.827-8.091a60.273 60.273 0 0 1-11.059-.773c-10.764-1.77-19.91-5.233-26.159-8.997-3.12-1.88-5.555-3.858-7.103-5.772-1.525-1.885-2.321-3.883-1.74-5.704l.004-.01c.582-1.736 2.286-2.875 4.468-3.464 2.208-.596 5.08-.686 8.345-.189 6.54.996 14.81 4.366 22.835 11.056 5.496 4.58 9.128 8.648 11.317 12.2 7.291-.27 14.174-1.853 19.819-4.29 4.304-1.859 7.855-4.2 10.318-6.8 2.463-2.6 3.8-5.416 3.8-8.255 0-5.792-4.165-11.635-12.505-16.546-8.316-4.897-20.624-8.758-36.485-10.615a.812.812 0 0 1-.712-.901Zm13.864 47.448c-2.113-3.17-5.468-6.837-10.453-10.992-7.819-6.517-15.818-9.75-22.042-10.698-3.116-.474-5.75-.37-7.68.151-1.952.527-3.018 1.425-3.35 2.406-.325 1.028.05 2.441 1.457 4.18 1.387 1.714 3.65 3.577 6.68 5.402 6.047 3.644 14.993 7.045 25.585 8.787 3.285.54 6.576.782 9.803.764Z"
            fill="#000"
          ></path>
          <path
            d="M92.671 110.019H47.334L37.012 99.221a1.514 1.514 0 0 1-.294-1.642 1.533 1.533 0 0 1 1.402-.917h39.945a4.38 4.38 0 0 1 3.153 1.354l11.453 12.003ZM108.596 132.648h60.694c.445 0 .881-.12 1.262-.349.381-.229.691-.558.897-.95a2.4 2.4 0 0 0-.165-2.502l-13.253-18.829h-65.36l15.925 22.63Z"
            fill="#000"
          ></path>
          <path
            d="M112.619 110.473h44.664V175.6c0 .464-.186.909-.517 1.238-.331.329-.78.514-1.25.514h-42.897v-66.879Z"
            fill="#fff"
            stroke="#000"
            stroke-width="0.91"
          ></path>
          <path
            d="M130.529 118.035h8.846c1.843 0 3.336 1.477 3.336 3.3v.005c0 1.822-1.493 3.299-3.336 3.299h-8.846c-1.842 0-3.336-1.477-3.336-3.299v-.005c0-1.823 1.494-3.3 3.336-3.3ZM47.028 110.018h65.36v67.789H49.813c-.74 0-1.45-.292-1.973-.812a2.76 2.76 0 0 1-.817-1.96v-65.003l.005-.014Z"
            fill="#000"
          ></path>
          <path
            d="M167.097 96.661h-39.836a4.982 4.982 0 0 0-3.598 1.54l-11.276 11.818h45.351l10.417-10.911a1.44 1.44 0 0 0 .283-1.57 1.463 1.463 0 0 0-1.341-.877Z"
            fill="#000"
          ></path>
          <path
            d="M94.105 132.041H35.6a1.745 1.745 0 0 1-1.54-.928 1.707 1.707 0 0 1 .114-1.778l13.167-18.701h63.875L97.311 130.38v.001a3.91 3.91 0 0 1-3.206 1.66Z"
            fill="#fff"
            stroke="#000"
            stroke-width="1.213"
          ></path>
        </svg>
        <h2 class="mb-4 text-2xl font-semibold text-center">Non ci sono prenotazioni al momento</h2>
      </div>
    </template>
  </mainView>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { store } from '../../data/store';

import { formatDateItalian } from '../../utils/date_utils';
import { getStatusBadgeProps } from '../../utils/badge_status_utils';

import sidebar from '../../components/navigation/sidebar.vue';
import mainView from '../../components/global/main-view.vue';
import headTitle from '../../components/head/head-title.vue';
import buttonLg from '../../components/button/button-lg.vue';
import iconButton from '../../components/button/icon-button.vue';
import searchInput from '../../components/input/search-input.vue';
import tableContainer from '../../components/table/table-container.vue';
import tableHead from '../../components/table/table-head.vue';
import tableCell from '../../components/table/table-cell.vue';
import badge from '../../components/badge/badge.vue';
import tooltip from '../../components/tooltip/tooltip.vue';

export default {
  name: 'Bookings',
  components: {
    sidebar,
    mainView,
    headTitle,
    buttonLg,
    iconButton,
    searchInput,
    tableContainer,
    tableHead,
    tableCell,
    badge,
    tooltip,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    formatDateItalian,
    getStatusBadgeProps,

    deleteBookingModal(booking) {
      const BOOKING_ID = booking?.id;

      if (!booking || !BOOKING_ID) {
        return;
      }

      this.store.modals.deleteBooking.data = booking;
      this.store.modals.deleteBooking.isOpen = true;
    },

    async deleteBooking(booking) {
      const BOOKING_ID = booking.id;

      if (!booking || !BOOKING_ID) {
        return;
      }

      if (confirm('Sei sicuro di voler rifiutare questa prenotazione?')) {
        try {
          const { error } = await supabase.from('reservations').update({ status: 'cancelled' }).eq('id', BOOKING_ID);

          if (!error) {
            // console.log('Cancellazione effettuata con successo');
            this.$emit('load-bookings');
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
    async assignBooking(booking) {
      return;
      const BOOKING_ID = booking?.id;

      if (!booking || !BOOKING_ID) {
        return;
      }

      try {
      } catch (e) {
        console.error(e);
      }
    },
    async recoverBooking(booking) {
      const BOOKING_ID = booking?.id;

      if (!booking || !BOOKING_ID) {
        return;
      }

      if (confirm('Sei sicuro di voler recuperare questa prenotazione?')) {
        try {
          const { error } = await supabase.from('reservations').update({ status: 'pending' }).eq('id', BOOKING_ID);

          if (!error) {
            // console.log('Prenotazione recuperata con successo');
            this.$emit('load-bookings');
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
    async completeBooking(booking) {
      const BOOKING_ID = booking?.id;

      if (!booking || !BOOKING_ID) {
        return;
      }

      if (confirm('Sei sicuro di voler completare questa prenotazione?')) {
        try {
          const { error } = await supabase.from('reservations').update({ status: 'completed' }).eq('id', BOOKING_ID);

          if (!error) {
            // console.log('Prenotazione completata con successo');
            this.$emit('load-bookings');
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
};
</script>

<style scoped></style>
