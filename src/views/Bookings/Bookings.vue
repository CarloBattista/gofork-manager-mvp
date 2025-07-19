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
        <searchInput placeholder="Cerca per nome" class="ml-auto max-w-[250px]" />
      </div>
      <tableContainer :loading="store.bookings.loading">
        <template #head>
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[190px] max-w-[190px]" :isFirst="true" head="Cliente" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[220px] max-w-[220px]" :sort="true" head="Data/Ora" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[210px] max-w-[210px]" head="Contatto" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[125px] max-w-[125px]" :sort="true" head="Persone" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[150px] max-w-[150px]" head="Stato" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-start w-[130px] max-w-[130px]" head="Sala/Tavolo" />
          <tableHead class="h-16 pl-6 pr-4 py-3 text-end w-[160px] max-w-[160px]" head="Azioni" />
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
            <tableCell class="h-[73px] pl-6 pr-4 py-3 text-end w-[160px] max-w-[160px] flex items-center justify-end" :inner="true">
              <template #inner>
                <buttonLg type="button" size="sm" variant="primary" label="Assegna" />
              </template>
            </tableCell>
          </tr>
        </template>
      </tableContainer>
    </template>
  </mainView>
</template>

<script>
import { store } from '../../data/store';

import { formatDateItalian } from '../../utils/date_utils';
import { getStatusBadgeProps } from '../../utils/badge_status_utils';

import sidebar from '../../components/navigation/sidebar.vue';
import mainView from '../../components/global/main-view.vue';
import headTitle from '../../components/head/head-title.vue';
import buttonLg from '../../components/button/button-lg.vue';
import searchInput from '../../components/input/search-input.vue';
import tableContainer from '../../components/table/table-container.vue';
import tableHead from '../../components/table/table-head.vue';
import tableCell from '../../components/table/table-cell.vue';
import badge from '../../components/badge/badge.vue';

export default {
  name: 'Bookings',
  components: {
    sidebar,
    mainView,
    headTitle,
    buttonLg,
    searchInput,
    tableContainer,
    tableHead,
    tableCell,
    badge,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    formatDateItalian,
    getStatusBadgeProps,
  },
};
</script>

<style scoped></style>
