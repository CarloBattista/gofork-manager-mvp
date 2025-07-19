<template>
  <transition name="overlay-modal">
    <div
      v-if="currentModal.isOpen"
      @click="currentModal.isOpen = false"
      class="modal-overlay fixed z-[9999] top-0 left-0 w-full h-svh bg-black/70"
    ></div>
  </transition>
  <transition name="modal-center">
    <div v-if="currentModal.isOpen" class="modal fixed z-[99999] top-0 w-full h-svh px-6 flex items-center justify-center pointer-events-none">
      <div class="sm:w-fit w-full rounded-lg bg-white pointer-events-auto">
        <div class="sticky z-50 top-0 w-full h-14 flex items-center">
          <h2 v-if="head" class="ml-14 flex-auto text-xl font-semibold text-center ellipsis-text">{{ head }}</h2>
          <iconButton @click="currentModal.isOpen = !currentModal.isOpen" variant="icon-only" icon="X" style="height: 100%" />
        </div>
        <div class="relative z-10 w-full sm:px-6 px-4 py-4">
          <slot name="content" />
        </div>
        <div v-if="actions" class="relative z-20 w-full mt-8 mb-6 sm:px-6 px-4 flex items-center gap-4 justify-center">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { store } from '../../data/store';

import iconButton from '../button/icon-button.vue';

export default {
  name: 'center-modal',
  components: {
    iconButton,
  },
  props: {
    modalKey: {
      type: String,
      required: true,
      validator: (value) => {
        return store.modals && store.modals[value];
      },
    },
    actions: {
      type: Boolean,
      default: false,
    },
    head: String,
  },
  data() {
    return {
      store,
    };
  },
  computed: {
    currentModal() {
      return this.store.modals[this.modalKey];
    },
  },
};
</script>

<style scoped>
/* Transition */
.overlay-modal-enter-from,
.overlay-modal-leave-to {
  opacity: 0;
}

.overlay-modal-enter-active,
.overlay-modal-leave-active {
  transition: all 300ms ease;
}

.modal-center-enter-from,
.modal-center-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

.modal-center-enter-active,
.modal-center-leave-active {
  transition-property: transform, opacity;
  transition-duration: 300ms;
  transition-timing-function: ease;
}
</style>
