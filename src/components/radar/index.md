## 雷达图

### API

#### RadarChart

|      参数      |                                                              说明                                                               |      类型      |                            默认值                            |
| :------------: | :-----------------------------------------------------------------------------------------------------------------------------: | :------------: | :----------------------------------------------------------: |
|     radius     |                                                        饼图外半径内半径                                                         | string\|array  |                        ['25%', '40%']                        |
|     center     |                                                            xy 中心点                                                            |     array      |                        ['25%', '50%']                        |
|   showLabel    |                                                      是否显示节点处 label                                                       |    boolean     |                            false                             |
|    options     | echarts 图表配置项 (优先级高于以上配置)[http://echarts.baidu.com/option.html#title](http://echarts.baidu.com/option.html#title) |     object     |                              -                               |
|    loading     |                                                        是否显示加载状态                                                         |    boolean     |                            false                             |
| loadingOptions |                                                          图表加载样式                                                           |     object     |                              -                               |
|     theme      |                                                              主题                                                               | string\|object |                              xm                              |
|  initOptions   |                                                       初始化时的附加参数                                                        |     object     | {devicePixelRatio:window.devicePixelRatio,renderer:'canvas'} |

可以通过实例的 getEchartsInstance 方法获取图表实例

```html
<template>
  <xmbase-radar-chart></xmbase-radar-chart>
</template>
```
