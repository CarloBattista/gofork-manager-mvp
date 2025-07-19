<template>
  <div class="field-container relative" :class="{ focus: focus, disabled: disabled }">
    <div class="search-container relative h-12 pl-3.5 rounded-lg flex items-center justify-start" :class="{ 'cursor-text': !disabled, error: error }">
      <div class="search-icon pointer-events-none">
        <SearchIcon />
      </div>
      <input
        @focus="handleFocus"
        @blur="handleBlur"
        @input="updateValue"
        :value="modelValue"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full h-full px-3.5 outline-0"
      />
    </div>
  </div>
</template>

<script>
// ICONS
import { Search as SearchIcon } from 'lucide-vue-next';

export default {
  name: 'search-input',
  components: {
    // ICONS
    SearchIcon,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Placeholder',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focus: false,
    };
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    handleFocus() {
      this.focus = true;
    },
    handleBlur() {
      this.focus = false;
    },
  },
};
</script>

<style scoped>
.search-container {
  outline-style: solid;
  outline-width: 1px;
  outline-offset: 0px;
  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.search-container {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.field-container:not(.disabled) .search-container:hover {
  outline-color: rgba(0, 0, 0, 0.64);
  background-color: var(--grey--100);
  color: var(--primary---black);
}

.field-container:not(.disabled).focus .search-container {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.field-container:not(.disabled) .search-container.error {
  outline-width: 2px;
  outline-color: var(--error--600);
}

.search-container .search-icon,
.search-container input::placeholder {
  color: var(--grey--600);
}

.field-container.disabled .search-container {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--primary---white);
  color: var(--grey--300);
}

input {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
