<template>
  <div class="w-full flex items-center justify-between">
    <div class="max-w-[70%] flex gap-2 items-center justify-start">
      <div v-if="backTo" @click="historyBack" title="Indietro" class="h-full cursor-pointer">
        <ArrowLeft />
      </div>
      <h2 class="text-black ellipsis-text" :class="{ 'text-2xl font-semibold': !sub, 'text-xl font-medium': sub }">{{ head }}</h2>
    </div>
    <div v-if="actions" class="flex gap-2 items-center justify-end">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
// ICONS
import { ArrowLeft } from 'lucide-vue-next';

export default {
  name: 'head-title',
  components: {
    // ICONS
    ArrowLeft,
  },
  props: {
    sub: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Boolean,
      default: false,
    },
    backTo: String,
    head: {
      type: String,
      default: 'Heading',
    },
  },
  methods: {
    historyBack() {
      if (this.backTo) {
        window.history.back();
      } else {
        this.$router.back();
      }
    },
  },
};
</script>

<style scoped></style>
