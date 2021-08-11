# @xm/vue-charts

## 用法


```javascript
xnpm  install -S @xm/vue-charts

import Vue from 'vue'
import Chart,{ VChart, BarChart, LineChart, AreaChart, PieChart, MapChart, registerTheme, registerMap } from '@xm/vue-charts'

Vue.use(Chart) // 整体引入组件

Vue.use(BarChart)

```

### Props _(all reactive)_

- `initOptions`

  Used to initialize ECharts instance.

- `theme`

  The theme used for current ECharts instance.

- `options`

  Used to update data for ECharts instance. Modifying this prop will trigger ECharts' `setOption` method.

  If you mutate the data bound to `options` while retaining the object reference, `setOption` will be called with `notMerge: false`. Otherwise, if you bind a new object to `options`, `setOption` will be called with `notMerge: true`.

  For example, if we have the following template:

  ```html
  <v-chart :options="data" />
  ```

  Then:

  ```js
  this.data = newObject // setOption(this.options, true)
  this.data.title.text = 'Trends' // setOption(this.options, false)
  ```

- `group`

  This prop is automatically bound to the same prop of the ECharts instance.

- `autoresize` (default: `false`)

  This prop indicates ECharts instance should be resized automatically whenever its root is resized.

- `manual-update` (default: `false`)

  For performance critical scenarios (having a large dataset) we'd better bypass Vue's reactivity system for `options` prop. By specifying `manual-update` prop with `true` and not providing `options` prop, the dataset won't be watched any more. After doing so, you need to retrieve the component instance with `ref` and manually call `mergeOptions` method to update the chart.

### Computed

- `width` **[readonly]**

  Used to retrieve the current width of the ECharts instance.

- `height` **[readonly]**

  Used to retrieve the current height of the ECharts instance.

- `computedOptions` **[readonly]**

  Used to retrive the actual options calculated by ECharts after updating `options`.

### Methods

- `mergeOptions` (use `setOption` in ECharts under the hood)

  _Provides a better method name to describe the actual behavior of `setOption`._

- `appendData`
- `resize`
- `dispatchAction`
- `showLoading`
- `hideLoading`
- `convertToPixel`
- `convertFromPixel`
- `containPixel`
- `getDataURL`
- `getConnectedDataURL`
- `clear`
- `dispose`

### Static Methods

- `connect`
- `disconnect`
- `registerMap`
- `registerTheme`
- `graphic.clipPointsByRect`
- `graphic.clipRectByRect`

### Events

Vue-ECharts support the following events:

- `legendselectchanged`
- `legendselected`
- `legendunselected`
- `legendscroll`
- `datazoom`
- `datarangeselected`
- `timelinechanged`
- `timelineplaychanged`
- `restore`
- `dataviewchanged`
- `magictypechanged`
- `geoselectchanged`
- `geoselected`
- `geounselected`
- `pieselectchanged`
- `pieselected`
- `pieunselected`
- `mapselectchanged`
- `mapselected`
- `mapunselected`
- `axisareaselected`
- `focusnodeadjacency`
- `unfocusnodeadjacency`
- `brush`
- `brushselected`
- `rendered`
- `finished`
- Mouse events
  - `click`
  - `dblclick`
  - `mouseover`
  - `mouseout`
  - `mousemove`
  - `mousedown`
  - `mouseup`
  - `globalout`
  - `contextmenu`
- ZRender events _(since v4.1.0)_
  - `click`
  - `mousedown`
  - `mouseup`
  - `mousewheel`
  - `dblclick`
  - `contextmenu`

For further details, see [ECharts' API documentation](https://echarts.apache.org/en/api.html).

## Local development

```bash
$ npm i
$ npm run serve
```

Open `http://localhost:8080/` to see the demo.
