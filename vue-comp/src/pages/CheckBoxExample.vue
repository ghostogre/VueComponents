<template>
  <div>
    <i-checkbox-group v-model="list">
      <i-checkbox label="青菜">青菜</i-checkbox>
      <i-checkbox label="白菜">白菜</i-checkbox>
      <i-checkbox label="黄花菜">黄花菜</i-checkbox>
    </i-checkbox-group>
  </div>
</template>

<script>
import iCheckbox from '../components/Checkbox'
import iCheckboxGroup from '../components/CheckboxGroup'
export default {
  components: {
    iCheckbox,
    iCheckboxGroup
  },
  data () {
    return {
      list: []
    }
  }
}
</script>

<style>

</style>
