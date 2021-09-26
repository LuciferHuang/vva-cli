import * as echarts from "echarts";
import { ref } from "vue";
import { getDateRange } from "helper/utils";

export default function usePageChart(id: string, color: string[]) {
  const pageTime = ref(1);
  const pageOptions = [
    {
      label: "昨天",
      value: 1,
    },
    {
      label: "近7天",
      value: 7,
    },
    {
      label: "近30天",
      value: 30,
    },
    {
      label: "全",
      value: -1,
    },
  ];
  async function onPageChange(val) {
    const chart = echarts.init(document.getElementById(id));
    let params = "";
    if (val !== -1) {
      const dateRange = getDateRange(-val, "MM-dd");
      params = `${new Date().getFullYear()}-${
        dateRange[0]
      }+${new Date().getFullYear()}-${dateRange[dateRange.length - 1]}`;
    }
    chart.showLoading();
    setTimeout(() => {
      chart.setOption(getOptions());
      chart.hideLoading();
    }, 888);
  }
  // 图表
  function getOptions() {
    const LEGENDS = [
      "index",
      "column-list",
      "column-detail",
      "resource-list",
      "resource-detail",
      "lab",
      "personal",
      "upload",
    ];
    const viewDatas = [];
    const durDatas = [];
    LEGENDS.forEach((legend) => {
      viewDatas.push({
        name: legend,
        value: Math.floor(Math.random() * 90 + 10),
      });
      durDatas.push({
        name: legend,
        value: Math.floor(Math.random() * 90 + 10),
      });
    });
    return {
      color,
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}",
      },
      legend: {
        left: "rig",
        data: LEGENDS,
      },
      calculable: true,
      series: [
        {
          name: "浏览次数",
          type: "funnel",
          width: "40%",
          left: "12%",
          bottom: "3%",
          label: {
            position: "left",
          },
          data: viewDatas,
        },
        {
          name: "停留时间",
          type: "funnel",
          width: "40%",
          left: "48%",
          bottom: "3%",
          sort: "ascending",
          data: durDatas,
        },
      ],
    };
  }
  function render() {
    onPageChange(pageTime.value);
  }
  return {
    render,
    config: {
      pageTime,
      pageOptions,
      onPageChange,
    },
  };
}
