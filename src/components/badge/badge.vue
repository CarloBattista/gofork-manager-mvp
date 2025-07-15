<template>
  <div class="badge w-fit rounded-lg flex gap-2 items-center justify-center" :class="'size-' + size + ' variant-' + variant + ' type-' + type">
    <div v-if="type === 'dot'" class="badge-dot h-1.5 w-1.5 aspect-square rounded-full"></div>
    <div v-if="type === 'icons' && leftIcon" class="badge-icon h-full flex items-center justify-center">
      <component :is="leftIcon" />
    </div>
    <span v-if="label" class="badge-label font-medium">{{ label }}</span>
    <div v-if="type === 'icons' && rightIcon" class="badge-icon h-full flex items-center justify-center">
      <component :is="rightIcon" />
    </div>
  </div>
</template>

<script>
// ICONS
import { Mail, ArrowRight } from 'lucide-vue-next';

export default {
  name: 'badge',
  components: {
    // ICONS
    Mail,
    ArrowRight,
  },
  props: {
    type: {
      type: String,
      default: 'simple',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'md',
    },
    label: String,
    leftIcon: String,
    rightIcon: String,
  },
};
</script>

<style scoped>
/* Variant */
.badge.variant-primary {
  background-color: var(--grey--100);
  color: var(--grey--900);
}

.badge.variant-primary .badge-dot {
  background-color: var(--grey--900);
}

.badge.variant-error {
  background-color: var(--error--200);
  color: var(--error--700);
}

.badge.variant-error .badge-dot {
  background-color: var(--error--700);
}

.badge.variant-warning {
  background-color: var(--warning--200);
  color: var(--warning--700);
}

.badge.variant-warning .badge-dot {
  background-color: var(--warning--700);
}

.badge.variant-success {
  background-color: var(--success--200);
  color: var(--success--700);
}

.badge.variant-success .badge-dot {
  background-color: var(--success--700);
}

/* Sizes */
.badge.size-sm {
  height: 22px;
  padding: 2px 8px;
}

.badge.size-sm .badge-label {
  font-size: 14px;
  line-height: 12px;
}

.badge.size-sm .badge-icon {
  width: 10px;
  height: 10px;
}

.badge.size-md {
  height: 26px;
  padding: 3px 9px;
}

.badge.size-md .badge-icon {
  width: 12px;
  height: 12px;
}

.badge.size-md .badge-label {
  font-size: 1rem;
  line-height: 12px;
}

.badge.size-lg {
  height: 32px;
  padding: 4px 10px;
}

.badge.size-lg .badge-icon {
  width: 14px;
  height: 14px;
}

.badge.size-lg .badge-label {
  font-size: 1.25rem;
  line-height: 15px;
}
</style>
