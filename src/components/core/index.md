## 底层 chart

### API

#### Chart

|      参数      |                                                    说明                                                    |      类型      |                            默认值                            |
| :------------: | :--------------------------------------------------------------------------------------------------------: | :------------: | :----------------------------------------------------------: |
|    options     | echarts 图表配置项[http://echarts.baidu.com/option.html#title](http://echarts.baidu.com/option.html#title) |     object     |                              -                               |
|    loading     |                                              是否显示加载状态                                              |    boolean     |                            false                             |
| loadingOptions |                                                图表加载样式                                                |     object     |                              -                               |
|     theme      |                                                    主题                                                    | string\|object |                              xm                              |
|  initOptions   |                                             初始化时的附加参数                                             |     object     | {devicePixelRatio:window.devicePixelRatio,renderer:'canvas'} |

可以通过实例的 getEchartsInstance 方法获取图表实例

```html
<template>
  <v-chart></v-chart>
</template>
```
