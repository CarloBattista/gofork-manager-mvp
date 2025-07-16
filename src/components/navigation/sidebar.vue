<template>
  <div
    class="fixed z-[9999] top-0 left-0 min-w-[74px] max-w-60 h-svh border-r border-solid border-black/10 bg-white"
    :class="{ 'w-fit': !isOpen, 'w-full': isOpen }"
  ></div>
</template>

<script>
export default {
  name: 'sidebar',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 1024) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped></style>
