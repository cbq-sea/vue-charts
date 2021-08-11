<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },

    props: Object,
  },

  render(h) {
    console.log('打印数据:', this.$scopedSlots)
    return h('component', {
      is: this.name,
      props: this.props,
      scopedSlots: this.$scopedSlots,
    })
  },
}
</script>

<style lang="scss" scoped></style>
