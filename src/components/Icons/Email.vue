<template>
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="22" :fill="circleColor"/>
    <path d="M28.7941 15.5293H15.2058C14.3124 15.5293 13.5882 16.2535 13.5882 17.1469V26.8528C13.5882 27.7462 14.3124 28.4705 15.2058 28.4705H28.7941C29.6875 28.4705 30.4117 27.7462 30.4117 26.8528V17.1469C30.4117 16.2535 29.6875 15.5293 28.7941 15.5293Z" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28.7941 15.5293H15.2058C14.3124 15.5293 13.5882 16.2535 13.5882 17.1469V26.8528C13.5882 27.7462 14.3124 28.4705 15.2058 28.4705H28.7941C29.6875 28.4705 30.4117 27.7462 30.4117 26.8528V17.1469C30.4117 16.2535 29.6875 15.5293 28.7941 15.5293Z" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.1762 18.1174L21.9997 22.6468L27.8233 18.1174" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script>
export default {
  name: 'emailIcon',
  props: {
    circleColor: {
      type: String,
      default: 'white'
    },
    iconColor: {
      type: String,
      default: 'white'
    }
  }
}
</script>