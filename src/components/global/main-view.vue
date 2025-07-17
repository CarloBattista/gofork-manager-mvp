<template>
  <div
    class="relative top-0 min-h-svh"
    :class="{ 'left-60 w-[calc(100%-240px)]': store.sidebar.isOpen, 'left-[74px] w-[calc(100%-74px)]': !store.sidebar.isOpen }"
  >
    <div class="view px-4 pt-6 mx-auto" :class="'size-' + size">
      <slot name="view" />
    </div>
  </div>
</template>

<script>
import { store } from '../../data/store';

export default {
  name: 'main-view',
  props: {
    size: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<style scoped>
.view.size-sm {
  max-width: 800px;
}

.view.size-md {
  max-width: 1200px;
}
</style>
