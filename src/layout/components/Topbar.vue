<template>
  <div class="top-container">
    <logo :class="!isCollapse?'logo-top':'logo-top-collapse'" :collapse="isCollapse"/>
  </div>
</template>
<script>
import Logo from './Sidebar/Logo.vue'
import { mapGetters } from 'vuex'
export default {
  components: { Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped>

</style>
