<template>
    <v-alert
    v-if="errorMessage"
    type="error"
    border="left"
    colored-border
    dense
    outlined
    class="my-3 px-3"
    >
      {{ errorMessage }}
    </v-alert>   
</template>


<script>
export default {
  props: {
    errorMessage: String,
  },
  data() {
    return {
    };
  },
  methods: {
    saveAction() {
        this.$emit('saveEmail');
        this.$emit('close');
    }
  },
};
</script>