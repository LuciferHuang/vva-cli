import { stateFilter } from "config/filters";
import { formateNum } from "helper/utils";

export default function useDetailFilter() {
  function statusFilter(v: string | number) {
    const target = stateFilter[v];
    if (target) {
      return target.text;
    }
    return v;
  }
  function styleFilter(v: string | number) {
    const target = stateFilter[v];
    if (target) {
      return target.color;
    }
    return v;
  }
  return {
    formateNum,
    statusFilter,
    styleFilter,
  };
}
