<template>
  <div ref="display"></div>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      html: '',
      css: '',
      js: ''
    }
  },
  methods: {
    getSources (source, type) {
      const regex = new RegExp(`<${type}[^>]*>`)
      let openingTag = source.match(regex)

      if (!openingTag) return ''
      else openingTag = openingTag[0]

      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`))
    },
    splitCode () {
      const script = this.getSources(this.code, 'script').replace(/export default/, 'return')
      const style = this.getSources(this.code, 'style')
      const template = '<div id="app">' + this.getSources(this.code, 'template') + '</div>'

      this.js = script
      this.css = style
      this.html = template
    }
  }
}
</script>

<style>

</style>
