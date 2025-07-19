<template>
  <sidebar />
  <mainView>
    <template #view>
      <headTitle head="Dashboard" class="mb-12" />
      <headTitle :sub="true" head="Azioni rapide" />
      <div class="w-full mt-4 min-h-36 grid grid-cols-2 lg:grid-cols-4 gap-6">
        <RouterLink to="/add-booking">
          <cardAction icon="CalendarPlus" label="Nuova prenotazione" />
        </RouterLink>
        <cardAction icon="CopyPlus" label="Aggiungi prodotto nel menù" />
        <RouterLink to="/members">
          <cardAction icon="UserPlus" label="Aggiungi nuovo dipendente" />
        </RouterLink>
      </div>
    </template>
  </mainView>
</template>

<script>
import sidebar from '../components/navigation/sidebar.vue';
import mainView from '../components/global/main-view.vue';
import headTitle from '../components/head/head-title.vue';
import cardAction from '../components/card/card-action.vue';

export default {
  name: 'Dashboard',
  components: {
    sidebar,
    mainView,
    headTitle,
    cardAction,
  },
};
</script>

<style scoped></style>
