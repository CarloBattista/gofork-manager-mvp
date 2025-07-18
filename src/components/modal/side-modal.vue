<template>
  <transition name="overlay-modal">
    <div
      v-if="currentModal.isOpen"
      @click="currentModal.isOpen = false"
      class="modal-overlay fixed z-[9999] top-0 left-0 w-full h-svh bg-black/70"
    ></div>
  </transition>
  <transition name="modal-side">
    <div v-if="currentModal.isOpen" class="modal fixed z-[99999] top-0 sm:w-[400px] sm:max-w-[400px] w-full h-svh bg-white" :class="position">
      <div class="sticky z-50 top-0 w-full h-14 flex items-center">
        <h2 v-if="head" class="ml-14 flex-auto text-xl font-semibold text-center ellipsis-text">{{ head }}</h2>
        <iconButton @click="currentModal.isOpen = !currentModal.isOpen" variant="icon-only" icon="X" style="height: 100%" />
      </div>
      <div class="relative z-10 w-full sm:px-6 px-4 pt-4">
        <slot name="content" />
      </div>
    </div>
  </transition>
</template>

<script>
import { store } from '../../data/store';

import iconButton from '../button/icon-button.vue';

export default {
  name: 'side-modal',
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
    position: {
      type: String,
      default: 'right',
      validator: (value) => ['left', 'right'].includes(value),
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
/* Position */
.modal.left {
  left: 0;
}

.modal.right {
  right: 0;
}

/* Transition */
.overlay-modal-enter-from,
.overlay-modal-leave-to {
  opacity: 0;
}

.overlay-modal-enter-active,
.overlay-modal-leave-active {
  transition: all 300ms ease;
}

.modal-side-enter-from,
.modal-side-leave-to {
  transform: translateX(100%);
}

.modal-side-enter-active,
.modal-side-leave-active {
  transition: all 300ms ease;
}
</style>
