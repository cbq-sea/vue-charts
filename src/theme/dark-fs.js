import { registerTheme } from 'echarts/lib/echarts'

// const colorPalette = [
//   '#4eb4ff',
//   '#42d8ae',
//   '#ffdc35',
//   '#ff9d4d',
//   '#fe7b5d',
//   '#ff84b7',
//   '#24c4c1',
//   '#48c6fa',
//   '#70a1fc',
//   '#9b91f2',
// ]

const colorPalette = [
  '#179DFF',
  '#0CDCA1',
  '#FFC920',
  '#FA5B36',
  '#05C8C5',
  '#8476FF',
  '#F2E814',
  '#24BBFA',
  '#FF8420',
  '#FE4F97',
]

const contrastColor = '#eee'

const theme = {
  color: colorPalette,
  title: {
    textStyle: {
      fontWeight: 500,
      color: contrastColor,
      fontSize: 16,
    },
  },
  visualMap: {
    itemWidth: 15,
    color: ['#5ab1ef', '#e0ffff'],
  },
  grid: {
    top: 50,
    left: '7%',
    right: '7%',
    bottom: 20,
    containLabel: true,
  },
  legend: {
    top: 'top',
    left: '6%',
    type: 'scroll',
    icon: 'roundRect',
    padding: 0,
    itemHeight: 2,
    itemWidth: 12,
    pageIconColor: '#fff',
    pageTextStyle: {
      color: '#fff',
    },
    textStyle: {
      color: '#fff',
      fontSize: 8,
      rich: {
        // 饼图
        name: {
          fontSize: 8,
        },
        percent: {
          fontSize: 8,
        },
      },
    },
  },
  tooltip: {
    confine: true,
    backgroundColor: 'rgba(0,0,0,0.7)',
    textStyle: {
      color: '#fff',
    },
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.05)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#cbcfd6',
      },
      crossStyle: {
        color: '#cbcfd6',
      },

      shadowStyle: {
        color: 'rgba(200,200,200,0.2)',
      },
    },
  },

  dataZoom: {
    dataBackgroundColor: '#eee',
    fillerColor: 'rgba(200,200,200,0.2)',
    handleColor: '#dd6b66',
    borderRadius: 4,
    textStyle: {
      color: '#fff',
    },
  },

  categoryAxis: {
    boundaryGap: true,
    axisLine: {
      lineStyle: {
        color: '#fff',
      },
    },
    axisLabel: {
      color: '#fff',
      fontSize: 8,
    },
    nameTextStyle: {
      color: '#fff',
      fontSize: 8,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: ['#fff'],
      },
    },
  },

  valueAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#fff',
      },
    },
    axisLabel: {
      color: '#fff',
      fontSize: 8,
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: 'rgba(255,255,255,0.8)',
      },
    },
    minInterval: 1,
    nameTextStyle: {
      color: '#fff',
      fontSize: 8,
    },
    axisTick: {
      show: false,
    },
  },

  candlestick: {
    itemStyle: {
      color: '#FD1050',
      color0: '#0CF49B',
      borderColor: '#FD1050',
      borderColor0: '#0CF49B',
    },
  },

  radar: {
    name: {
      textStyle: { color: '#fff', fontSize: 8 },
    },
    splitArea: { show: false },
  },

  pie: {
    label: {
      fontSize: 8,
    },
  },

  bar: {
    label: {
      fontSize: 8,
    },
  },

  line: {
    label: {
      fontSize: 8,
    },
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [],
      },
    },
    axisLabel: {
      show: true,
      color: '#fff',
      fontSize: 8,
    }, // 刻度标签。
    title: { show: true, offsetCenter: [0, '80%'], color: '#fff' },
    detail: {
      show: false,
    },
  },
}

registerTheme('xm-dark-fs', theme)
