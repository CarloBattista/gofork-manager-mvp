<template>
  <div @click="toggleValue" class="flex gap-2 items-center" :class="{ 'pointer-events-none': disabled }">
    <div
      tabindex="0"
      class="checkbox relative aspect-square flex items-center justify-center"
      :class="['size-' + size, { selected: modelValue, disabled: disabled, 'rounded-sm': !rounded, 'rounded-full': rounded }]"
    >
      <input :checked="modelValue" :disabled="disabled" hidden type="checkbox" />
      <div class="check-icon w-full h-full flex items-center justify-center">
        <Check v-if="modelValue" color="white" />
      </div>
    </div>
    <span v-if="label" class="checkbox-label font-semibold">{{ label }}</span>
  </div>
</template>

<script>
// ICONS
import { Check } from 'lucide-vue-next';

export default {
  name: 'checkbox',
  components: {
    // ICONS
    Check,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
    label: String,
    rounded: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    toggleValue() {
      this.$emit('update:modelValue', !this.modelValue);
    },
  },
};
</script>

<style scoped>
.checkbox {
  outline-style: solid;
  outline-width: 1px;
  outline-offset: 0px;
  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.checkbox:not(:disabled) {
  cursor: pointer;
}

.checkbox-dot {
  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.checkbox .checkbox-dot {
  top: 50%;
  transform: translate(0%, -50%);
}

.checkbox.selected .checkbox-dot {
  transform: translate(100%, -50%);
}

/* States */
.checkbox {
  background-color: var(--grey--200);
  outline-color: transparent;
}

.checkbox:hover {
  background-color: var(--grey--300);
  outline-color: rgba(103, 110, 118, 0.08);
}

.checkbox:focus {
  background-color: var(--grey--100);
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
}

.checkbox.disabled {
  background-color: var(--grey--300);
  outline-color: transparent;
  pointer-events: none;
}

.checkbox.selected.disabled {
  background-color: var(--grey--400);
}

.checkbox.selected.disabled .checkbox-dot {
  background-color: var(--grey--300);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
}

.checkbox.selected {
  background-color: var(--primary---black);
  outline-color: transparent;
}

.checkbox.selected:hover {
  background-color: var(--grey--1000);
  outline-color: rgba(103, 110, 118, 0.08);
}

.checkbox.selected:focus {
  background-color: var(--grey--1000);
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
}

.checkbox .checkbox-dot {
  background-color: var(--primary---white);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
}

.checkbox.selected .checkbox-dot {
  background-color: var(--primary---white);
}

/* Sizes */
.checkbox.size-sm {
  height: 16px;
}

.checkbox.size-sm .check-icon {
  width: 12px;
  height: 12px;
}

.checkbox.size-md {
  height: 20px;
}

.checkbox.size-md .check-icon {
  width: 16px;
  height: 16px;
}

.checkbox.size-lg {
  height: 24px;
}

.checkbox.size-lg .check-icon {
  width: 20px;
  height: 20px;
}
</style>
