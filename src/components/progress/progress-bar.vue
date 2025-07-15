<template>
  <div class="relative w-full flex flex-col">
    <div class="relative w-full h-5 flex items-center justify-start">
      <div ref="sliderTrack" class="slider-bg relative w-full h-2 rounded-full">
        <div class="slider-bar absolute top-0 left-0 h-full rounded-full" :style="{ width: percentage + '%' }"></div>
      </div>
    </div>
    <div class="w-full flex items-center justify-between">
      <span class="label text-base font-normal">{{ label }}</span>
      <span class="percent text-base font-semibold"
        >{{ currentValue }}<span v-if="valuePercent">{{ valuePercent }}</span></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
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
    label: {
      type: String,
      default: 'Label',
    },
    valuePercent: {
      type: String,
      default: '%',
    },
  },
  data() {
    return {
      currentValue: this.modelValue,
    };
  },
  computed: {
    percentage() {
      return ((this.currentValue - this.min) / (this.max - this.min)) * 100;
    },
  },
  watch: {
    modelValue(newVal) {
      this.currentValue = Math.max(this.min, Math.min(this.max, newVal));
    },
  },
  mounted() {
    this.currentValue = Math.max(this.min, Math.min(this.max, this.modelValue));
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
  transition: width 300ms ease;
}

.label {
  color: var(--grey--700);
}

.percent {
  color: var(--primary---black);
}
</style>
