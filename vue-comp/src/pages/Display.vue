<template>
  <div>
    <i-display :code="code"></i-display>
  </div>
</template>

<script>
import iDisplay from '../components/Display'
export default {
  components: {
    iDisplay
  },
  data () {
    return {
      code: '<template><div>{{message}}</div></template><script>export default {data() {return {message: "ok"}}}</script>'
    }
  }
}
</script>

<style>

</style>
