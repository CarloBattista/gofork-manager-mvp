<template>
  <sidebar />
  <mainView>
    <template #view>
      <headTitle head="Prenotazioni" class="mb-12" />
    </template>
  </mainView>
</template>

<script>
import sidebar from '../../components/navigation/sidebar.vue';
import mainView from '../../components/global/main-view.vue';
import headTitle from '../../components/head/head-title.vue';

export default {
  name: 'Bookings',
  components: {
    sidebar,
    mainView,
    headTitle,
  },
};
</script>

<style scoped></style>
