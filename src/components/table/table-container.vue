<template>
  <div class="table-container w-full rounded-lg overflow-x-auto">
    <table class="w-full">
      <thead class="border-b border-solid border-black/10">
        <tr>
          <slot name="head" />
        </tr>
      </thead>
      <tbody v-if="!loading" class="w-full">
        <slot name="body" />
      </tbody>
      <tbody v-else-if="loading" class="w-full">
        <tr v-for="index in 5" :key="index" class="not-last:border-b border-solid border-black/10" :class="'table-column-loading-' + index">
          <td v-for="index in 6" :key="index" class="table-cell-loading h-[73px] pl-6 pr-4 py-3 text-start">
            <div class="flex flex-col gap-1">
              <div class="load-row relative w-20 h-5"></div>
              <div class="load-row relative w-7 h-3"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'table-container',
  props: {
    loading: Boolean,
  },
};
</script>

<style scoped>
.table-column-loading-1 .table-cell-loading .load-row {
  animation-delay: 0s;
}
.table-column-loading-2 .table-cell-loading .load-row {
  animation-delay: 0.2s;
}
.table-column-loading-3 .table-cell-loading .load-row {
  animation-delay: 0.4s;
}
.table-column-loading-4 .table-cell-loading .load-row {
  animation-delay: 0.6s;
}
.table-column-loading-5 .table-cell-loading .load-row {
  animation-delay: 0.8s;
}
.table-column-loading-6 .table-cell-loading .load-row {
  animation-delay: 1s;
}
.table-column-loading-7 .table-cell-loading .load-row {
  animation-delay: 1.2s;
}
.table-column-loading-8 .table-cell-loading .load-row {
  animation-delay: 1.4s;
}
.table-column-loading-9 .table-cell-loading .load-row {
  animation-delay: 1.6s;
}
.table-column-loading-10 .table-cell-loading .load-row {
  animation-delay: 1.8s;
}

.table-cell-loading .load-row {
  animation: pulse 5s ease infinite;
}

@keyframes pulse {
  0% {
    background-color: var(--grey--200);
  }
  25% {
    background-color: var(--grey--200);
  }
  75% {
    background-color: var(--primary---white);
  }
  100% {
    background-color: var(--grey--200);
  }
}
</style>
