<template>
  <sidebar />
  <mainView>
    <template #view>
      <headTitle head="Dashboard" />
    </template>
  </mainView>
</template>

<script>
import sidebar from '../components/navigation/sidebar.vue';
import mainView from '../components/global/main-view.vue';
import headTitle from '../components/head/head-title.vue';

export default {
  name: 'Dashboard',
  components: {
    sidebar,
    mainView,
    headTitle,
  },
};
</script>

<style scoped></style>
