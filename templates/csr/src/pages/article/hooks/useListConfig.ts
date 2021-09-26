import { addEdit as diaFormItems } from "config/dialogForm";
import { common as filterFormItems } from "config/filterForm";
import { stateFilter } from "config/filters";
import { common as tableOprates } from "config/tableOprate";
import { article as tableConfig } from "config/tableConfigs";

export default function useListConfig() {
  return {
    diaFormItems,
    dataPath: "list",
    diaDataUrl: "/article/list?id=",
    tableOprates,
    filterFormItems,
    tableConfig,
    filterMap: {
      status: stateFilter,
    },
  };
}
