<template>
  <div
    class="relative top-0 min-h-svh"
    :class="{ 'left-60 w-[calc(100%-240px)]': store.sidebar.isOpen, 'left-[74px] w-[calc(100%-74px)]': !store.sidebar.isOpen }"
  >
    <div class="max-w-[1200px] px-4 pt-6 mx-auto">
      <slot name="view" />
    </div>
  </div>
</template>

<script>
import { store } from '../../data/store';

export default {
  name: 'main-view',
  data() {
    return {
      store,
    };
  },
};
</script>

<style scoped></style>
