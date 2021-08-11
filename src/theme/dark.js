import { registerTheme } from 'echarts/lib/echarts'

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
      fontSize: 12,
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
      fontSize: 12,
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
      textStyle: { color: '#fff' },
    },
    splitArea: { show: false },
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
    }, // 刻度标签。
    title: { show: true, offsetCenter: [0, '80%'], color: '#fff' },
    detail: {
      show: false,
    },
  },
}

registerTheme('xm-dark', theme)
