<template>
  <div class="relative field-container" :class="{ focus: focus, disabled: disabled }">
    <label v-if="label" :for="forLabel" class="input-area text-base font-medium">{{ label }}</label>
    <div
      @focus="handleFocus"
      @blur="handleBlur"
      tabindex="0"
      class="textarea-container relative px-3.5 py-2 rounded-lg"
      :class="{ 'cursor-text': !disabled, error: error }"
    >
      <textarea
        @focus="handleFocus"
        @blur="handleBlur"
        @input="updateValue"
        :value="modelValue"
        :minlength="minlength"
        :maxlength="maxlength"
        :name="forLabel"
        :id="forLabel"
        :disabled="disabled"
        class="w-full h-full min-h-24 outline-0 resize-none"
      ></textarea>
      <div class="absolute right-3 bottom-1 pointer-events-none">
        <span class="text-xs font-normal help-text">{{ modelValue.length }}/{{ maxlength }}</span>
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
import { BadgeQuestionMark } from 'lucide-vue-next';

export default {
  name: 'text-area',
  components: {
    // ICONS
    BadgeQuestionMark,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    forLabel: String,
    label: String,
    minlength: {
      type: Number,
      default: 0,
    },
    maxlength: {
      type: Number,
      default: 100,
    },
    helpText: String,
    error: String,
    required: Boolean,
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
.textarea-container {
  outline-style: solid;
  outline-width: 1px;
  outline-offset: 0px;
  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.textarea-container {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.field-container:not(.disabled) .textarea-container:hover {
  outline-color: rgba(0, 0, 0, 0.64);
  background-color: var(--grey--100);
  color: var(--primary---black);
}

.field-container:not(.disabled).focus .textarea-container {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.field-container:not(.disabled) .textarea-container.error {
  outline-width: 2px;
  outline-color: var(--error--600);
}

.field-container.disabled .textarea-container {
  outline-color: rgba(103, 110, 118, 0.08);
  background-color: var(--primary---white);
  color: var(--grey--300);
}

.input-text,
.help-text {
  color: var(--grey--700);
}

.error-text {
  color: var(--error--600);
}
</style>
