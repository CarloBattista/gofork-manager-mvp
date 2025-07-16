<template>
  <div class="bullet-point relative flex gap-2 items-start" :class="'state-' + state">
    <div class="dot relative h-5 aspect-square rounded-full flex items-center justify-center">
      <X v-if="state === 'error' && !customIcon" size="14" />
      <TriangleAlert v-else-if="state === 'warning' && !customIcon" size="14" />
      <Check v-if="state === 'success' && !customIcon" size="14" />
      <component v-if="customIcon" :is="customIcon" />
    </div>
    <span v-if="label" class="text-sm font-normal">{{ label }}</span>
  </div>
</template>

<script>
// ICONS
import { Check, X, TriangleAlert } from 'lucide-vue-next';

export default {
  name: 'bullet-point',
  components: {
    // ICONS
    Check,
    X,
    TriangleAlert,
  },
  props: {
    state: {
      type: String,
      default: 'success',
    },
    customIcon: String,
    label: String,
  },
};
</script>

<style scoped>
.bullet-point .dot {
  outline-style: solid;
  outline-width: 1px;
  outline-color: transparent;
}

.bullet-point.state-error .dot {
  background-color: var(--error--50);
  color: var(--error--700);
  outline-color: rgba(243, 65, 65, 0.5);
}

.bullet-point.state-warning .dot {
  background-color: var(--warning--50);
  color: var(--warning--700);
  outline-color: rgba(232, 162, 59, 0.5);
}

.bullet-point.state-success .dot {
  background-color: var(--success--50);
  color: var(--success--700);
  outline-color: rgba(83, 180, 131, 0.5);
}
</style>
