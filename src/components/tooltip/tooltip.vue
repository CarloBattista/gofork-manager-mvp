<template>
  <div class="tooltip-container" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot name="trigger"></slot>

    <div v-if="visible" :class="['tooltip', `tooltip-${position}`, { 'tooltip-visible': visible }]" :style="tooltipStyle">
      <div class="tooltip-content px-3 py-2 flex flex-col gap-2 items-center justify-center" :class="'size-' + size">
        <h2 v-if="content" class="font-medium">{{ content }}</h2>
        <p v-if="description" class="font-normal">{{ description }}</p>
      </div>
      <div v-if="pointedArrow" class="tooltip-arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tooltip',
  props: {
    pointedArrow: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'md',
    },
    content: String,
    description: String,
    position: {
      type: String,
      default: 'top',
      validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value),
    },
    delay: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      timeoutId: null,
    };
  },
  computed: {
    tooltipStyle() {
      return {
        zIndex: 1000,
      };
    },
  },
  methods: {
    showTooltip() {
      if (this.disabled) return;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.visible = true;
      }, this.delay);
    },
    hideTooltip() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.visible = false;
    },
  },
  beforeUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  },
};
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-trigger {
  cursor: help;
  border-bottom: 1px dotted #999;
}

.tooltip {
  position: absolute;
  white-space: nowrap;
  background-color: var(--primary---white);
  color: var(--primary---black);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s,
    visibility 0.3s;
  pointer-events: none;
}

.tooltip-visible {
  opacity: 1;
  visibility: visible;
}

.tooltip-content {
  position: relative;
  z-index: 1;
}

/* Sizes */
.tooltip-content.size-sm {
  height: 34px;
}

.tooltip-content.size-md {
  height: 36px;
}

.tooltip-content.size-lg {
  height: 40px;
}

.tooltip-arrow {
  position: absolute;
  width: 20px;
  height: 12px;
  border: 10px solid transparent;
}

/* Posizioni del tooltip */
.tooltip-top {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 14px;
}

.tooltip-top .tooltip-arrow {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: var(--primary---white);
}

.tooltip-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 14px;
}

.tooltip-bottom .tooltip-arrow {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: var(--primary---white);
}

.tooltip-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 14px;
}

.tooltip-left .tooltip-arrow {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: var(--primary---white);
}

.tooltip-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 14px;
}

.tooltip-right .tooltip-arrow {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: var(--primary---white);
}
</style>
