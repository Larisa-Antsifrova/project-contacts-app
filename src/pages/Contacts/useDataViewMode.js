import { useEffect, useState } from "react";
import { DATA_VIEW_MODE } from "./viewModesConstants";

export const useDataViewMode = () => {
  const savedDataViewMode =
    localStorage.getItem("dataViewMode") || DATA_VIEW_MODE.TABLE;

  const [dataViewMode, setDataViewMode] = useState(savedDataViewMode);

  useEffect(() => {
    localStorage.setItem("dataViewMode", dataViewMode);
  }, [dataViewMode]);

  return [dataViewMode, setDataViewMode];
};
