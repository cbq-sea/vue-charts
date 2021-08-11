## 面积图

### API

#### AreaChart

|      参数      |                                                              说明                                                               |      类型      |                            默认值                            |
| :------------: | :-----------------------------------------------------------------------------------------------------------------------------: | :------------: | :----------------------------------------------------------: |
|  boundaryGap   |                                                          是否两边留白                                                           |    boolean     |                            true                             |
|     rotate     |                                                     x 轴 label 字体 rotate                                                      |     number     |                              0                               |
|    interval    |                                              设置坐标轴分割间隔（设置 0 强制显示）                                              | number\|string |                            'auto'                            |
|   showLabel    |                                                      是否显示节点处 label                                                       |    boolean     |                            false                             |
|    options     | echarts 图表配置项 (优先级高于以上配置)[http://echarts.baidu.com/option.html#title](http://echarts.baidu.com/option.html#title) |     object     |                              -                               |
|    loading     |                                                        是否显示加载状态                                                         |    boolean     |                            false                             |
| loadingOptions |                                                          图表加载样式                                                           |     object     |                              -                               |
|     theme      |                                                              主题                                                               | string\|object |                              xm                              |
|  initOptions   |                                                       初始化时的附加参数                                                        |     object     | {devicePixelRatio:window.devicePixelRatio,renderer:'canvas'} |

可以通过实例的 getEchartsInstance 方法获取图表实例

```html
<template>
  <xm-area></xm-area>
</template>
```
