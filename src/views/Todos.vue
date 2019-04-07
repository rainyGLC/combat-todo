<template>
  <div class="todoapp">
    <the-header/>
    <the-section/>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheSection from '@/components/TheSection'
import TheFooter from '@/components/TheFooter'
import '@/assets/css/base.css'
import '@/assets/css/index.css'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    let params = this.$route.params
    let filter = params.id || 'all'
    this.$store.commit('changeFilter', filter)
  },
  watch: {
    '$route': function () {
      let params = this.$route.params
      let filter = params.id || 'all'
      this.$store.commit('changeFilter', filter)
    }
  },
  components: {
    'the-header': TheHeader,
    'the-section': TheSection,
    'the-footer': TheFooter
  }
}
</script>
