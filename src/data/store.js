import { reactive } from 'vue';

export const store = reactive({
  restaurants: {
    data: null,
    error: null,
    loading: false,
  },
});
