<template>
  <div class="chart-empty">
    <img :src="emptyImage" />
    <p>{{ emptyText }}</p>
  </div>
</template>
<script>
import EMPTY_IMG from './base64'

export default {
  name: 'Empty',
  props: {
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    emptyImage: {
      type: String,
      default: EMPTY_IMG,
    },
  },
}
</script>
<style lang="less" scoped>
.chart-empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > img {
    width: 100px;
    height: 100px;
  }

  > p {
    color: #fff;
    margin-top: 20px;
  }
}
</style>
