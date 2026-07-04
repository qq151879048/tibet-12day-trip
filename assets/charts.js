(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart: Budget Pie ---
  var chartBudget = echarts.init(document.getElementById('budgetChart'), null, { renderer: 'svg' });
  chartBudget.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      formatter: function(p) { return p.name + '<br/>双人合计: <b>' + p.value + ' 元</b><br/>占比: ' + p.percent + '%'; }
    },
    legend: {
      bottom: 0,
      textStyle: { fontSize: 12, color: muted, fontFamily: 'NotoSansCJK, sans-serif' },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 16
    },
    series: [{
      type: 'pie',
      radius: ['42%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 6, borderColor: bg2, borderWidth: 2 },
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        fontSize: 12,
        color: ink,
        fontFamily: 'NotoSansCJK, sans-serif'
      },
      labelLine: { length: 12, length2: 8 },
      data: [
        { value: 7741.5, name: '住宿', itemStyle: { color: '#C45C26' } },
        { value: 6500, name: '租车', itemStyle: { color: '#2A7B6F' } },
        { value: 8358, name: '机票', itemStyle: { color: '#3B6B9A' } },
        { value: 4800, name: '餐饮', itemStyle: { color: '#B8960C' } },
        { value: 3600, name: '油费', itemStyle: { color: '#8B8680' } },
        { value: 2500, name: '门票/补给', itemStyle: { color: '#C0392B' } },
        { value: 520, name: '停车费', itemStyle: { color: '#7B8D6E' } }
      ]
    }]
  });
  window.addEventListener('resize', function() { chartBudget.resize(); });

  // --- Chart: Altitude Line ---
  var chartAlt = echarts.init(document.getElementById('elevationChart'), null, { renderer: 'svg' });
  chartAlt.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      formatter: function(params) {
        var p = params[0];
        return p.name + '<br/>住宿海拔: <b>' + p.value + ' m</b>';
      }
    },
    grid: { top: 40, bottom: 60, left: 60, right: 20 },
    xAxis: {
      type: 'category',
      data: ['D1\n9.27\n林芝', 'D2\n9.28\n拉萨', 'D3\n9.29\n拉萨', 'D4\n9.30\n日喀则', 'D5\n10.01\n珠峰', 'D6\n10.02\n萨嘎', 'D7\n10.03\n塔尔钦', 'D8\n10.04\n札达', 'D9\n10.05\n狮泉河', 'D10\n10.06\n日喀则', 'D11\n10.07\n贡嘎', 'D12\n10.08\n贡嘎'],
      axisLabel: { fontSize: 10, color: muted, fontFamily: 'NotoSansCJK, sans-serif', rotate: 0, lineHeight: 14 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      min: 2500,
      max: 5200,
      name: '海拔 (m)',
      nameTextStyle: { fontSize: 12, color: muted, fontFamily: 'NotoSansCJK, sans-serif' },
      axisLabel: { fontSize: 11, color: muted, fontFamily: 'Outfit, sans-serif', formatter: '{value}' },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLine: { show: false }
    },
    series: [
      {
        type: 'line',
        data: [2980, 3650, 3650, 3836, 4300, 4500, 4650, 3700, 4255, 3836, 3570, 3570],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: accent },
        itemStyle: { color: accent, borderColor: '#fff', borderWidth: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(196,92,38,0.3)' },
              { offset: 1, color: 'rgba(196,92,38,0.02)' }
            ]
          }
        },
        markPoint: {
          data: [
            { type: 'max', name: '最高', symbolSize: 50, label: { fontSize: 11, fontFamily: 'NotoSansCJK, sans-serif' } },
            { type: 'min', name: '最低', symbolSize: 50, label: { fontSize: 11, fontFamily: 'NotoSansCJK, sans-serif' } }
          ],
          itemStyle: { color: accent }
        },
        markLine: {
          data: [{ yAxis: 4000, name: '4000m警戒线', label: { formatter: '4000m', fontSize: 10, color: '#C0392B', fontFamily: 'NotoSansCJK, sans-serif' } }],
          lineStyle: { color: '#C0392B', type: 'dashed', width: 1 }
        }
      }
    ]
  });
  window.addEventListener('resize', function() { chartAlt.resize(); });
})();
