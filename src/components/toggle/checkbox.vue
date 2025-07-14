<template>
  <div @click="toggleValue" class="flex gap-2 items-center" :class="{ 'pointer-events-none': disabled }">
    <div
      tabindex="0"
      class="checkbox relative min-w-9 max-w-[52px] min-h-5 max-h-8 rounded-full"
      :class="['size-' + size, { selected: modelValue, disabled: disabled }]"
    >
      <input :checked="modelValue" :disabled="disabled" hidden type="checkbox" />
      <div class="checkbox-dot absolute aspect-square rounded-full"></div>
    </div>
    <span v-if="label" class="checkbox-label font-semibold">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'checkbox',
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
  width: 36px;
  height: 20px;
  padding: 2px;
}

.checkbox.size-sm .checkbox-dot {
  height: 16px;
}

.checkbox.size-md {
  width: 44px;
  height: 24px;
  padding: 2px 3px;
}

.checkbox.size-md .checkbox-dot {
  height: 20px;
}

.checkbox.size-lg {
  width: 52px;
  height: 32px;
  padding: 2px 4px;
}

.checkbox.size-lg .checkbox-dot {
  height: 24px;
}
</style>
