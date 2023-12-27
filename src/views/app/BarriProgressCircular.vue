<template>
  <v-progress-circular
    v-if="loading"
    :size="size"
    color="pink"
    indeterminate
    class="mt-8"
  ></v-progress-circular>
</template>


<script>
export default {
  props: {
    loading: Boolean,
    size: Number
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  watch: {
  },
  methods: {
  },
  computed: {
  },
};
</script>
