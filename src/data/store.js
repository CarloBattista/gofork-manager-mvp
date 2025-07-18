import { reactive } from 'vue';

export const store = reactive({
  sidebar: {
    isOpen: true,
  },

  modals: {
    member_edit: {
      isOpen: false,
      data: {},
      error: {},
      loading: false,
    },
  },

  restaurants: {
    data: null,
    error: null,
    loading: false,
  },
});
