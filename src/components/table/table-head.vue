<template>
  <th class="table-head" :class="{ relative: !isFirst, isFixed: isFirst }">
    <div v-if="sort" class="sort absolute top-1/2 left-0 -translate-y-1/2 w-6 h-9 flex flex-col items-center justify-center cursor-pointer">
      <ChevronsUpDown v-if="true" size="16" />
      <ChevronUp v-if="false" size="16" />
      <ChevronDown v-if="false" size="16" />
    </div>
    <div v-if="head" class="text-black text-sm font-semibold">{{ head }}</div>
  </th>
</template>

<script>
// ICONS
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-vue-next';

export default {
  name: 'table-row',
  components: {
    // ICONS
    ChevronsUpDown,
    ChevronUp,
    ChevronDown,
  },
  props: {
    isFirst: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: Boolean,
      default: false,
    },
    head: String,
  },
};
</script>

<style scoped>
.isFixed {
  position: relative;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  background-color: transparent;
}

.isFixed::after {
  position: absolute;
  top: 0;
  left: 100%;
  width: 6px;
  height: 100%;
  content: '';
  background: transparent;
}

.table-head {
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.sort {
  opacity: 0;

  transition-property: opacity;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.table-head:hover .sort {
  opacity: 1;
}

.table-head:hover {
  background-color: var(--primary---white);
}

@media only screen and (max-width: 768px) {
  .isFixed {
    position: sticky;
    background-color: white;
  }

  .isFixed::after {
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.12), hsla(0, 0%, 100%, 0));
  }
}
</style>
