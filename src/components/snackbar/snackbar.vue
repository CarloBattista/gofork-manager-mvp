<template>
  <div class="relative">
    <div class="snackbar relative h-12 max-h-12 p-3.5 rounded-lg flex gap-2.5 items-center justify-between" :class="'state-' + state">
      <div class="w-full flex gap-2.5 items-center justify-start">
        <div v-if="leftIcon" class="leftIcon h-full max-w-3.5 max-h-3.5 flex items-center justify-center">
          <component :is="leftIcon" />
        </div>
        <span v-if="body" class="w-full">{{ body }}</span>
      </div>
      <div class="flex gap-2.5 items-center justify-end">
        <div v-if="rightIcon && !ctaButton" class="rightIcon h-full max-w-3.5 max-h-3.5 flex items-center justify-center">
          <component :is="rightIcon" />
        </div>
        <buttonLg v-if="ctaButton" variant="text-only" :label="ctaLabel" class="cta-button" />
      </div>
    </div>
  </div>
</template>

<script>
import buttonLg from '../button/button-lg.vue';

// ICONS
import { Info, X } from 'lucide-vue-next';

export default {
  name: 'snackbar',
  components: {
    buttonLg,

    // ICONS
    Info,
    X,
  },
  props: {
    state: {
      type: String,
      default: 'info',
    },
    ctaButton: Boolean,
    ctaLabel: {
      type: String,
      default: 'Dismiss',
    },
    leftIcon: {
      type: String,
      default: 'Info',
    },
    rightIcon: {
      type: String,
      default: 'X',
    },
    body: {
      type: String,
      default: 'Assist text for the user',
    },
  },
};
</script>

<style scoped>
.snackbar {
  outline-color: transparent;
  outline-width: 2px;
  outline-style: solid;
}

.snackbar.state-info {
  background-color: var(--primary---white);
  color: var(--grey--500);
}

.snackbar.state-info .cta-button {
  color: var(--primary---black);
}

.snackbar.state-error {
  outline-color: rgba(243, 65, 65, 0.5);
  background-color: var(--error--50);
  color: var(--error--700);
}

.snackbar.state-warning {
  outline-color: rgba(232, 162, 59, 0.5);
  background-color: var(--warning--50);
  color: var(--warning--700);
}

.snackbar.state-success {
  outline-color: rgba(83, 180, 131, 0.5);
  background-color: var(--success--50);
  color: var(--success--700);
}
</style>
