<template>
  <div class="relative field-container" :class="{ focus: focus, disabled: disabled }">
    <label v-if="label" :for="forLabel" class="input-label text-base font-medium">{{ label }}</label>
    <div
      @focus="handleFocus"
      @blur="handleBlur"
      tabindex="0"
      class="input-container relative h-12 rounded-lg flex items-center justify-start"
      :class="{
        'px-3.5': type !== 'password' || !isDropdown,
        'pr-12': type === 'password' || isDropdown,
        'cursor-text': !disabled && !isDropdown,
        error: error,
      }"
    >
      <input
        v-if="!isDropdown"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="updateValue"
        :value="modelValue"
        :id="forLabel"
        :type="inputType"
        :readonly="readOnly"
        :disabled="disabled"
        class="w-full h-full outline-0"
      />
      <div v-else-if="isDropdown" class="w-full h-full flex items-center justify-start">
        <p>{{ modelValue }}</p>
      </div>
      <div
        v-if="type === 'password'"
        @click="toggleShowPassword"
        class="absolute top-0 right-0 w-12 h-full flex items-center justify-center cursor-pointer"
      >
        <Eye v-if="!showPassword" size="20" />
        <EyeClosed v-else size="20" />
      </div>
      <div v-if="isDropdown" class="absolute top-0 right-0 w-12 h-full flex items-center justify-center cursor-pointer">
        <ChevronDown size="20" />
      </div>
    </div>
    <div v-if="error || helpText" class="mt-3 flex gap-2 items-center justify-start">
      <span class="flex gap-2 items-center text-sm font-normal" :class="{ 'error-text': error, 'input-help': !error }">
        <BadgeQuestionMark v-if="error" size="16" />
        {{ error ? error : helpText }}
      </span>
    </div>
  </div>
</template>

<script>
// ICONS
import { Eye, EyeClosed, BadgeQuestionMark, ChevronDown } from 'lucide-vue-next';

export default {
  name: 'input-text',
  components: {
    // ICONS
    Eye,
    EyeClosed,
    BadgeQuestionMark,
    ChevronDown,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    forLabel: String,
    label: String,
    helpText: String,
    error: String,
    required: Boolean,
    readOnly: {
      type: Boolean,
      default: false,
    },
    isDropdown: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focus: false,
      showPassword: false,
    };
  },
  computed: {
    inputType() {
      if (this.type === 'password') {
        return this.showPassword ? 'text' : 'password';
      }
      return this.type;
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
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
.input-container {
  outline-style: solid;
  outline-width: 1px;
  outline-offset: 0px;
  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.input-container {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.field-container:not(.disabled) .input-container:hover {
  outline-color: rgba(0, 0, 0, 0.64);
  background-color: var(--grey--100);
  color: var(--primary---black);
}

.field-container:not(.disabled).focus .input-container {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.field-container:not(.disabled) .input-container.error {
  outline-width: 2px;
  outline-color: var(--error--600);
}

.field-container.disabled .input-container {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--primary---white);
  color: var(--grey--300);
}

.input-label,
.input-help {
  color: var(--grey--700);
}

.error-text {
  color: var(--error--600);
}
</style>
