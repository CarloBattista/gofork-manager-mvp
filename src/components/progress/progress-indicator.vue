<template>
  <div class="progress-indicator">
    <div class="progress-steps">
      <div v-for="(step, index) in steps.slice(0, 6)" :key="index" class="step-container">
        <div
          class="step-circle h-[26px] aspect-square rounded-full flex items-center justify-center"
          :class="{
            active: index <= currentStep,
            completed: index < currentStep,
            current: index === currentStep,
          }"
        >
          <Check v-if="index < currentStep" class="check-icon" size="16" />
          <component v-else-if="onlyIcon" :is="step?.icon" size="16" />
          <span v-else-if="!onlyIcon" class="step-number">{{ index + 1 }}</span>
        </div>
        <div v-if="label" class="step-label ellipsis-text" :class="{ active: index <= currentStep }">{{ step.label }}</div>
        <div
          v-if="index < steps.length - 1"
          class="step-connector h-2"
          :class="{ 'top-[15%]': label, 'top-[35%]': !label, completed: index < currentStep }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
// ICONS
import { House, HandCoins, Check } from 'lucide-vue-next';

export default {
  name: 'progress-indicator',
  components: {
    // ICONS
    House,
    HandCoins,
    Check,
  },
  props: {
    steps: {
      type: Array,
      required: true,
      validator: (steps) => steps.length >= 2 && steps.length <= 6,
    },
    currentStep: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0,
    },
    onlyIcon: Boolean,
    label: Boolean,
  },
  computed: {
    progressPercentage() {
      return (this.currentStep / (this.steps.length - 1)) * 100;
    },
  },
};
</script>

<style scoped>
.progress-steps {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  width: 100%;
}

.step-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.step-circle {
  background-color: var(--grey--100);
  color: var(--grey--500);
  border-color: rgba(103, 110, 118, 0.16);
  border-width: 1px;
  border-style: solid;
  font-weight: 600;
  font-size: 14px;
  z-index: 2;
  position: relative;
  transition: all 0.3s ease;
}

.step-circle.active {
  background-color: var(--primary---black);
  color: var(--primary---white);
  border-color: var(--primary---black);
}

.step-circle.completed {
  background-color: var(--primary---black);
  color: var(--primary---white);
}

.step-circle.current {
  background-color: var(--primary---white);
  border-color: var(--primary---black);
  color: var(--primary---black);
}

.check-icon {
  font-size: 16px;
  font-weight: bold;
}

.step-number {
  font-size: 14px;
  font-weight: 600;
}

.step-label {
  margin-top: 12px;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  font-weight: 500;
  transition: color 0.3s ease;
  max-width: 120px;
  word-wrap: break-word;
}

.step-label.active {
  color: #374151;
  font-weight: 600;
}

.step-connector {
  position: absolute;
  left: 50%;
  width: 100%;
  background-color: var(--grey--100);
  transition: background-color 0.3s ease;
  z-index: 1;
}

.step-connector.completed {
  background-color: var(--primary---black);
}
</style>
