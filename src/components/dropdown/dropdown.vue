<template>
  <div ref="dropdownContainer" class="relative min-w-[200px]">
    <div @click="toggleDropdown" class="w-full p-2 pb-0 cursor-pointer">
      <slot name="trigger"></slot>
    </div>

    <div v-if="isOpen" class="w-full p-2 max-h-[350px] rounded-2xl bg-white flex flex-col overflow-y-auto">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    handleClickOutside(event) {
      if (this.$refs.dropdownContainer && !this.$refs.dropdownContainer.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped></style>
