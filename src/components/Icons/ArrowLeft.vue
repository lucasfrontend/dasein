<template>
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 7H1.99997M6.99997 1L1.70708 6.29289C1.31655 6.68342 1.31655 7.31658 1.70708 7.70711L6.99997 13" :stroke="iconColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
</template>

<script>
export default {
  name: 'ArrowLeftIcon',
  props: {
    iconColor: {
      type: String,
      default: '#926948'
    }
  }
}
</script>