<template>
  <div class="m-10">
    <buttonLg type="button" size="md" variant="secondary-grey" leftIcon="Mail" rightIcon="Mail" label="button" :loading="true" :disabled="false" />
    <iconButton type="button" size="md" variant="secondary-grey" icon="Mail" :loading="true" :disabled="false" />
  </div>
</template>

<script>
import buttonLg from '../components/button/button-lg.vue';
import iconButton from '../components/button/icon-button.vue';

export default {
  name: 'Home',
  components: {
    buttonLg,
    iconButton,
  },
};
</script>

<style scoped></style>
