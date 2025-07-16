<template>
  <div>{{ auth.user?.id }} - {{ auth.user?.email }}</div>
</template>

<script>
import { auth } from '../data/auth';

export default {
  name: 'Dashboard',
  data() {
    return {
      auth,
    };
  },
};
</script>

<style scoped></style>
