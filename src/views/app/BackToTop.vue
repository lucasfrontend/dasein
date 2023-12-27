<template>
  <v-btn dark fab color="primary" class="back-to-top" :class="{ visible: isVisible }" @click="scrollToTop">
    <v-icon >mdi-airplane</v-icon>
  </v-btn>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
//import { Icon } from "@iconify/vue";

export default {
  setup() {
    const isVisible = ref(false);

    const handleScroll = () => {
      isVisible.value = window.scrollY > 200;
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isVisible,
      scrollToTop,
    };
  },
};
</script>

<style scoped>
.back-to-top {
  position: fixed;
  background-color: #f65c5c;
  opacity: 10;
  visibility: hidden;
  transition: all 0.3s ease;
  bottom: 70px;
  right: 0px;
  z-index: 999;
  padding: 0.5rem;
  border-radius: 0.5rem 0 0 0.5rem;
  box-shadow: 1px 1px 9px #f65c5c;
  transition: all 0.5s;
  cursor: pointer;
}

.back-to-top:hover {
  box-shadow: 1px 1px 18px #f6695c;
  transition: all 0.5s;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}
</style>
