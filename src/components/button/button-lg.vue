<template>
  <button
    tabindex="0"
    :type="type"
    :disabled="disabled"
    class="btn-lg min-h-10 max-h-16 flex gap-2 items-center justify-center"
    :class="'size-' + size + ' variant-' + variant"
  >
    <div v-if="loading" class="loader"></div>
    <div v-if="!loading && leftIcon" class="btn-icon h-full flex items-center justify-center">
      <component :is="leftIcon" />
    </div>
    <span v-if="!loading && label" class="btn-label font-semibold">{{ label }}</span>
    <div v-if="!loading && rightIcon" class="btn-icon h-full flex items-center justify-center">
      <component :is="rightIcon" />
    </div>
  </button>
</template>

<script>
// ICONS
import { Mail, ArrowRight } from 'lucide-vue-next';

export default {
  name: 'button-lg',
  components: {
    // ICONS
    Mail,
    ArrowRight,
  },
  props: {
    type: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      default: 'md',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    label: String,
    leftIcon: String,
    rightIcon: String,
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.btn-lg {
  outline-style: solid;
  outline-width: 1px;
  outline-offset: 0px;
  border-radius: 8px;
  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.btn-lg:not(:disabled) {
  cursor: pointer;
}

/* Sizes */
.btn-lg.size-sm {
  height: 40px;
  padding: 10px 18px;
}

.btn-lg.size-sm .btn-icon,
.btn-lg.size-md .btn-icon {
  width: 18px;
  height: 18px;
}

.btn-lg.size-sm .btn-label,
.btn-lg.size-md .btn-label {
  font-size: 14px;
}

.btn-lg.size-md {
  height: 44px;
  padding: 12px 20px;
}

.btn-lg.size-lg {
  height: 52px;
  padding: 14px 22px;
}

.btn-lg.size-lg .btn-label {
  font-size: 1rem;
}

.btn-lg.size-lg .btn-icon,
.btn-lg.size-xl .btn-icon {
  width: 20px;
  height: 20px;
}

.btn-lg.size-xl {
  height: 56px;
  padding: 16px 24px;
}

.btn-lg.size-xl .btn-label {
  font-size: 1.125rem;
}

.btn-lg.size-2xl {
  height: 64px;
  padding: 18px 26px;
}

.btn-lg.size-2xl .btn-icon {
  width: 24px;
  height: 24px;
}

.btn-lg.size-2xl .btn-label {
  font-size: 1.25rem;
}

/* Primary */
.btn-lg.variant-primary {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---black);
  color: var(--primary---white);
}

.btn-lg.variant-primary:hover {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--grey--1000);
  color: var(--primary---white);
}

.btn-lg.variant-primary:focus {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---black);
  color: var(--primary---white);
}

.btn-lg.variant-primary:disabled {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--grey--100);
  color: var(--grey--300);
}

.icon-btn.variant-primary .loader {
  border-color: var(--primary---white);
  border-bottom-color: transparent;
}

/* Secondary Color */
.btn-lg.variant-secondary-color {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.btn-lg.variant-secondary-color:hover {
  outline-color: rgba(0, 0, 0, 0.64);
  background-color: var(--grey--100);
  color: var(--primary---black);
}

.btn-lg.variant-secondary-color:focus {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.btn-lg.variant-secondary-color:disabled {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--primary---white);
  color: var(--grey--300);
}

/* Secondary Grey */
.btn-lg.variant-secondary-grey {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--grey--50);
  color: var(--primary---black);
}

.btn-lg.variant-secondary-grey:hover {
  outline-color: rgba(0, 0, 0, 0.64);
  background-color: var(--grey--200);
  color: var(--primary---black);
}

.btn-lg.variant-secondary-grey:focus {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--grey--50);
  color: var(--primary---black);
}

.btn-lg.variant-secondary-grey:disabled {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--grey--50);
  color: var(--grey--300);
}

/* Text only */
.btn-lg.variant-text-only {
  height: fit-content;
  min-height: fit-content;
  padding: unset;
  outline-color: transparent;
}

.btn-lg.variant-text-only:hover {
  color: var(--grey--900);
}

.btn-lg.variant-text-only:focus {
  color: var(--primary---black);
}

.btn-lg.variant-text-only:disabled {
  color: var(--grey--300);
}

.loader {
  width: 26px;
  aspect-ratio: 1;
  border: 3px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
