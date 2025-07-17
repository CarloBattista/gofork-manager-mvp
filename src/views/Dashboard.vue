<template>
  <sidebar />
  <mainView>
    <template #view>Dashboard</template>
  </mainView>
</template>

<script>
import sidebar from '../components/navigation/sidebar.vue';
import mainView from '../components/global/main-view.vue';

export default {
  name: 'Dashboard',
  components: {
    sidebar,
    mainView,
  },
};
</script>

<style scoped></style>
