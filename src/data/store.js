import { reactive } from 'vue';

export const store = reactive({
  sidebar: {
    isOpen: true,
  },

  restaurants: {
    data: null,
    error: null,
    loading: false,
  },
});
