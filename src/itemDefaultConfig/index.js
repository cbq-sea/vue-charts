// 滚动条设置 如果有需要可直接import 并设置option.dataZoom  =  dataZoom
export const dataZoom = [
  {
    // 添加X轴滚动条
    realtime: true,
    show: true,
    start: 0,
    end: 60,
    height: 16,
  },
  {
    type: 'inside',
    realtime: true,
    start: 0,
    end: 60,
  },
]

// 饼图每块的默认配置
export const pieSeriesConfig = {
  type: 'pie',
  radius: ['35%', '50%'],
  selectedMode: 'single',
  label: {
    formatter: '{b} \n {per|{d}}{per|%}',
    padding: [0, 0],
    textStyle: {
      rich: {
        per: {
          lineHeight: 22,
        },
      },
    },
  },
}

export const pieEmphasisLabel = theme => ({
  show: true,
  fontWeight: 'bold',
  // formatter: '{per|{d}%}\n{name|{b}}',
  formatter: function({ name, percent }) {
    return (
      '{per|' +
      percent +
      '%}\n{name|' +
      (name.length > 5 ? name.substring(0, 5) + '...' : name) +
      '}'
    )
  },
  textStyle: {
    rich: {
      per: {
        fontSize: 16,
        color: theme.startsWith('xm-dark') ? '#fff' : '#959BA3',
        lineHeight: 30,
      },
      name: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#41A6FE',
      },
    },
  },
})
