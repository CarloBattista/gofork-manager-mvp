<template>
  <div class="relative w-full flex flex-col">
    <h2 v-if="label" class="text-base font-medium">{{ label }}</h2>
    <div
      @mousedown="handleTrackClick"
      @touchstart="handleTrackClick"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      class="relative w-full h-12 flex items-center justify-start cursor-pointer"
    >
      <div ref="sliderTrack" class="slider-bg relative w-full h-2 rounded-full">
        <div class="slider-bar absolute top-0 h-full rounded-full" :style="{ left: minPosition + '%', width: maxPosition - minPosition + '%' }"></div>
        <div
          ref="minHandle"
          class="slider-dot absolute top-1/2 h-5 aspect-square rounded-full transform -translate-y-1/2 -translate-x-1/2"
          :style="{ left: minPosition + '%' }"
          @mousedown="startDrag($event, 'min')"
        ></div>
        <div
          ref="maxHandle"
          class="slider-dot absolute top-1/2 h-5 aspect-square rounded-full transform -translate-y-1/2 -translate-x-1/2"
          :style="{ left: maxPosition + '%' }"
          @mousedown="startDrag($event, 'max')"
        ></div>
        <div
          v-show="showMinPreview && showPreview"
          class="slider-preview absolute top-[-1rem] h-8 px-2 rounded-lg flex items-center justify-center font-semibold pointer-events-none transition-opacity duration-200"
          :style="{ left: minPreviewPosition + '%', transform: 'translateX(-50%) translateY(-100%)' }"
        >
          {{ formatValue(currentMinValue) }}
        </div>
        <div
          v-show="showMaxPreview && showPreview"
          class="slider-preview absolute top-[-1rem] h-8 px-2 rounded-lg flex items-center justify-center font-semibold pointer-events-none transition-opacity duration-200"
          :style="{ left: maxPreviewPosition + '%', transform: 'translateX(-50%) translateY(-100%)' }"
        >
          {{ formatValue(currentMaxValue) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slider-double',
  props: {
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
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 100,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:minValue', 'update:maxValue'],
  data() {
    return {
      isDragging: false,
      dragType: null, // 'min' o 'max'
      isHovering: false,
      showMinPreview: false,
      showMaxPreview: false,
      currentMinValue: this.minValue,
      currentMaxValue: this.maxValue,
    };
  },
  computed: {
    minPosition() {
      return ((this.currentMinValue - this.min) / (this.max - this.min)) * 100;
    },
    maxPosition() {
      return ((this.currentMaxValue - this.min) / (this.max - this.min)) * 100;
    },
    minPreviewPosition() {
      // Calcola l'offset per evitare che la preview esca dal contenitore
      const position = this.minPosition;
      const previewWidth = 8; // Stima della larghezza della preview in percentuale
      const minOffset = 5 - previewWidth / 2;
      const maxOffset = 100 - previewWidth / 2;
      return Math.max(minOffset, Math.min(maxOffset, position));
    },
    maxPreviewPosition() {
      // Calcola l'offset per evitare che la preview esca dal contenitore
      const position = this.maxPosition;
      const previewWidth = 8; // Stima della larghezza della preview in percentuale
      const minOffset = previewWidth / 2;
      const maxOffset = 100 - previewWidth / 2;
      return Math.max(minOffset, Math.min(maxOffset, position));
    },
    showPreview() {
      return this.isHovering || this.isDragging;
    },
  },
  methods: {
    startDrag(event, type) {
      if (this.disabled) return;

      event.preventDefault();
      this.isDragging = true;
      this.dragType = type;

      if (type === 'min') {
        this.showMinPreview = true;
      } else {
        this.showMaxPreview = true;
      }
    },
    handleMouseMove(event) {
      if (!this.isDragging || this.disabled) return;

      const rect = this.$refs.sliderTrack.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const value = this.min + (percentage / 100) * (this.max - this.min);
      const steppedValue = Math.round(value / this.step) * this.step;

      if (this.dragType === 'min') {
        // Se l'handle min supera l'handle max, scambia i ruoli
        if (steppedValue > this.currentMaxValue) {
          this.currentMinValue = this.currentMaxValue;
          this.currentMaxValue = Math.min(this.max, steppedValue);
          this.dragType = 'max'; // Cambia il tipo di drag
          // Scambia le preview
          this.showMinPreview = false;
          this.showMaxPreview = true;
          this.$emit('update:minValue', this.currentMinValue);
          this.$emit('update:maxValue', this.currentMaxValue);
        } else {
          this.currentMinValue = Math.max(this.min, steppedValue);
          this.$emit('update:minValue', this.currentMinValue);
        }
      } else if (this.dragType === 'max') {
        // Se l'handle max va sotto l'handle min, scambia i ruoli
        if (steppedValue < this.currentMinValue) {
          this.currentMaxValue = this.currentMinValue;
          this.currentMinValue = Math.max(this.min, steppedValue);
          this.dragType = 'min'; // Cambia il tipo di drag
          // Scambia le preview
          this.showMaxPreview = false;
          this.showMinPreview = true;
          this.$emit('update:minValue', this.currentMinValue);
          this.$emit('update:maxValue', this.currentMaxValue);
        } else {
          this.currentMaxValue = Math.min(this.max, steppedValue);
          this.$emit('update:maxValue', this.currentMaxValue);
        }
      }
    },
    handleMouseUp() {
      if (this.isDragging) {
        this.isDragging = false;
        this.dragType = null;
        this.showMinPreview = false;
        this.showMaxPreview = false;
      }
    },
    handleTrackClick(event) {
      if (this.disabled || this.isDragging) return;

      const rect = this.$refs.sliderTrack.getBoundingClientRect();
      const percentage = ((event.clientX - rect.left) / rect.width) * 100;
      const value = this.min + (percentage / 100) * (this.max - this.min);
      const steppedValue = Math.round(value / this.step) * this.step;

      // Determina quale handle è più vicino
      const distanceToMin = Math.abs(steppedValue - this.currentMinValue);
      const distanceToMax = Math.abs(steppedValue - this.currentMaxValue);

      let targetType;
      if (distanceToMin < distanceToMax) {
        // Muovi il handle minimo
        this.currentMinValue = Math.max(this.min, Math.min(this.max, steppedValue));
        this.$emit('update:minValue', this.currentMinValue);
        targetType = 'min';
      } else {
        // Muovi il handle massimo
        this.currentMaxValue = Math.max(this.min, Math.min(this.max, steppedValue));
        this.$emit('update:maxValue', this.currentMaxValue);
        targetType = 'max';
      }

      // Assicurati che min <= max dopo il click
      if (this.currentMinValue > this.currentMaxValue) {
        const temp = this.currentMinValue;
        this.currentMinValue = this.currentMaxValue;
        this.currentMaxValue = temp;
        this.$emit('update:minValue', this.currentMinValue);
        this.$emit('update:maxValue', this.currentMaxValue);
        // Aggiorna il tipo di target se i valori sono stati scambiati
        targetType = targetType === 'min' ? 'max' : 'min';
      }

      // Inizia immediatamente il drag dell'handle che è stato mosso
      this.isDragging = true;
      this.dragType = targetType;

      if (targetType === 'min') {
        this.showMinPreview = true;
      } else {
        this.showMaxPreview = true;
      }
    },
    formatValue(value) {
      return Math.round(value);
    },
  },
  watch: {
    minValue(newVal) {
      this.currentMinValue = newVal;
    },
    maxValue(newVal) {
      this.currentMaxValue = newVal;
    },
  },
  mounted() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
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
  z-index: 10;
}

.slider-preview {
  background-color: var(--primary---black);
  color: var(--primary---white);
  box-shadow: 0 2px 5px rgba(103, 110, 118, 0.08);
  z-index: 20;
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
