<template>
  <div class="relative w-full flex flex-col">
    <h2 v-if="label" class="text-base font-medium">{{ label }}</h2>
    <div
      @mousedown="startDrag"
      @touchstart="startDrag"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      class="relative w-full h-12 flex items-center justify-start cursor-pointer"
    >
      <div ref="sliderTrack" class="slider-bg relative w-full h-2 rounded-full">
        <div class="slider-bar absolute top-0 left-0 h-full rounded-full" :style="{ width: percentage + '%' }"></div>
        <div
          @mousedown="startDrag"
          @touchstart="startDrag"
          ref="sliderDot"
          class="slider-dot absolute top-1/2 h-5 aspect-square rounded-full"
          :style="{ left: percentage + '%', transform: 'translateX(-50%) translateY(-50%)' }"
        ></div>
        <div
          v-show="showPreview"
          ref="sliderPreview"
          class="slider-preview absolute top-[-1rem] h-8 px-2 rounded-lg flex items-center justify-center font-semibold pointer-events-none transition-opacity duration-200"
          :style="{ left: previewPosition + '%', transform: 'translateX(-50%) translateY(-100%)' }"
        >
          {{ currentValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slider',
  props: {
    modelValue: {
      type: Number,
      default: 50,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      isDragging: false,
      isHovering: false,
      currentValue: this.modelValue,
    };
  },
  computed: {
    percentage() {
      return ((this.currentValue - this.min) / (this.max - this.min)) * 100;
    },
    previewPosition() {
      // Calcola la posizione del preview con offset per evitare overflow
      const basePosition = this.percentage;

      // Stima la larghezza del preview (circa 4-6 caratteri + padding)
      const estimatedPreviewWidth = Math.max(40, this.currentValue.toString().length * 8 + 16);

      // Calcola l'offset necessario basato sulla larghezza stimata
      const halfPreviewWidth = estimatedPreviewWidth / 2;

      // Se siamo vicini al bordo sinistro
      if (basePosition < 10) {
        return Math.max(halfPreviewWidth / 10, basePosition);
      }

      // Se siamo vicini al bordo destro
      if (basePosition > 90) {
        return Math.min(100 - halfPreviewWidth / 10, basePosition);
      }

      // Posizione normale al centro
      return basePosition;
    },
    showPreview() {
      return this.isHovering || this.isDragging;
    },
  },
  methods: {
    clampValue(value) {
      return Math.max(this.min, Math.min(this.max, value));
    },
    roundToStep(value) {
      return Math.round(value / this.step) * this.step;
    },
    getValueFromPosition(clientX) {
      if (!this.$refs.sliderTrack) return this.currentValue;

      const rect = this.$refs.sliderTrack.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = this.min + percentage * (this.max - this.min);
      return this.roundToStep(rawValue);
    },
    startDrag(event) {
      if (this.disabled) return;

      event.preventDefault();
      this.isDragging = true;

      const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;

      const newValue = this.getValueFromPosition(clientX);
      this.updateValue(newValue);
    },
    onDrag(event) {
      if (!this.isDragging || this.disabled) return;

      event.preventDefault();

      const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;

      const newValue = this.getValueFromPosition(clientX);
      this.updateValue(newValue);
    },
    stopDrag() {
      if (this.isDragging) {
        this.isDragging = false;
        this.$emit('change', this.currentValue);
      }
    },
    updateValue(newValue) {
      const clampedValue = this.clampValue(newValue);
      if (clampedValue !== this.currentValue) {
        this.currentValue = clampedValue;
        this.$emit('update:modelValue', clampedValue);
      }
    },
  },
  watch: {
    modelValue(newVal) {
      this.currentValue = this.clampValue(newVal);
    },
  },
  mounted() {
    this.currentValue = this.clampValue(this.modelValue);
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);
    document.addEventListener('touchmove', this.onDrag, { passive: false });
    document.addEventListener('touchend', this.stopDrag);
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
    document.removeEventListener('touchmove', this.onDrag);
    document.removeEventListener('touchend', this.stopDrag);
  },
};
</script>

<style scoped>
.slider-bg {
  background-color: var(--grey--100);
  user-select: none;
}

.slider-bar {
  background-color: var(--primary---black);
}

.slider-dot {
  background-color: var(--primary---white);
  outline-color: rgba(103, 110, 118, 0.08);
  box-shadow: 0 2px 5px rgba(103, 110, 118, 0.08);
  outline-width: 1px;
  outline-style: solid;
  cursor: grab;
  user-select: none;
}

.slider-preview {
  background-color: var(--primary---black);
  color: var(--primary---white);
  box-shadow: 0 2px 5px rgba(103, 110, 118, 0.08);
}

.slider-dot:active {
  cursor: grabbing;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.disabled .slider-dot {
  cursor: not-allowed;
}
</style>
