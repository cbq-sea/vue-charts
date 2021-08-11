<template>
  <div>
    <!-- <xm-progress :percentage="60" :stroke-width="30" :width="200" type="circle" />
    <xm-chart :options="option2" theme="xm" /> -->

    <test-com name="xm-bar" :props="{ options: option }" />
  </div>
</template>

<script>
import { Pie, Line } from '../components'
import TestCom from './test'

import time from './time.png'

export default {
  name: 'HelloWorld',

  components: {
    PieChart: Pie,
    LineChart: Line,
    TestCom,
  },

  props: {
    msg: String,
  },

  data() {
    return {
      time,
      loading: false,
      loadingOptions: {
        color: 'green',
      },
      option: {
        series: [
          {
            data: [
              { value: '90000', name: '30周岁以下' },
              { value: '18000', name: '30-40周岁' },
            ],
            radius: ['30%', '45%'],
          },
        ],
      },
      series: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
  created() {},
  mounted() {
    console.log('打印数据:', this)
    // const a = Vue.extend({
    //   template: '<h1>eeeeee</h1>',
    // })
    // const b = new a({
    //   el: document.createElement('div'),
    // }).$mount()
    // console.log('打印数据n:', b)
    // // console.log('打印数据b.$elb.$el:', b.$el)
    // // document.body.appendChild(b.$el)
  },
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  height: 90px;
  border: 1px solid red;
  margin-top: 10px;
}
a {
  color: #42b983;
}
.button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
@-webkit-keyframes slideOutUp {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes slideOutUp {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}
</style>
