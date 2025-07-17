<template>
  <button
    tabindex="0"
    :type="type"
    :disabled="disabled"
    class="icon-btn aspect-square flex items-center justify-center"
    :class="'size-' + size + ' variant-' + variant"
  >
    <div v-if="!loading && icon" class="btn-icon h-full aspect-square flex items-center justify-center">
      <component :is="icon" />
    </div>
    <div v-else-if="loading" class="loader"></div>
  </button>
</template>

<script>
// ICONS
import { Mail, X } from 'lucide-vue-next';

export default {
  name: 'icon-button',
  components: {
    // ICONS
    Mail,
    X,
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
    icon: String,
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
.icon-btn {
  outline-style: solid;
  outline-width: 1px;
  outline-offset: 0px;
  border-radius: 8px;
  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.icon-btn:not(:disabled) {
  cursor: pointer;
}

/* Sizes */
.icon-btn.size-sm {
  height: 40px;
}

.icon-btn.size-sm .btn-icon,
.icon-btn.size-md .btn-icon {
  width: 18px;
  height: 18px;
}

.icon-btn.size-md {
  height: 44px;
}

.icon-btn.size-lg {
  height: 52px;
}

.icon-btn.size-lg .btn-icon,
.icon-btn.size-xl .btn-icon {
  width: 20px;
  height: 20px;
}

.icon-btn.size-xl {
  height: 56px;
}

.icon-btn.size-2xl {
  height: 64px;
}

.icon-btn.size-2xl .btn-icon {
  width: 24px;
  height: 24px;
}

/* Primary */
.icon-btn.variant-primary {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---black);
  color: var(--primary---white);
}

.icon-btn.variant-primary:hover {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--grey--1000);
  color: var(--primary---white);
}

.icon-btn.variant-primary:focus {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---black);
  color: var(--primary---white);
}

.icon-btn.variant-primary:disabled {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--grey--100);
  color: var(--grey--300);
}

.icon-btn.variant-primary .loader {
  border-color: var(--primary---white);
  border-bottom-color: transparent;
}

/* Secondary Color */
.icon-btn.variant-secondary-color {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.icon-btn.variant-secondary-color:hover {
  outline-color: rgba(0, 0, 0, 0.64);
  background-color: var(--grey--100);
  color: var(--primary---black);
}

.icon-btn.variant-secondary-color:focus {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.icon-btn.variant-secondary-color:disabled {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--primary---white);
  color: var(--grey--300);
}

/* Secondary Grey */
.icon-btn.variant-secondary-grey {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--grey--50);
  color: var(--primary---black);
}

.icon-btn.variant-secondary-grey:hover {
  outline-color: rgba(0, 0, 0, 0.64);
  background-color: var(--grey--200);
  color: var(--primary---black);
}

.icon-btn.variant-secondary-grey:focus {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--grey--50);
  color: var(--primary---black);
}

.icon-btn.variant-secondary-grey:disabled {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--grey--50);
  color: var(--grey--300);
}

.icon-btn.variant-icon-only {
  height: fit-content;
  min-height: fit-content;
  padding: unset;
  outline-color: transparent;
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
