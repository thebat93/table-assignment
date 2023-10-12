import { useCallback, useState } from "react";

const useSelection = <K extends string>(defaultRowIds: K[] = []) => {
  const [rowIds, setRowIds] = useState(defaultRowIds);
  const [selectedIds, setSelectedIds] = useState<Set<K>>(new Set());

  const onChangeSelection = useCallback((id: K) => {
    setSelectedIds((oldSelectedIds) => {
      const newSelectedIds = new Set(oldSelectedIds);

      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }

      return newSelectedIds;
    });
  }, []);

  const onChangeSelectionAll = useCallback(() => {
    let newSelectedIds = new Set<K>();

    if (selectedIds.size < rowIds.length) {
      newSelectedIds = new Set<K>(rowIds);
    }

    setSelectedIds(newSelectedIds);
  }, [rowIds, selectedIds]);

  return {
    selectedIds,
    setSelectedIds,
    onChangeSelection,
    onChangeSelectionAll,
    setRowIds,
  };
};

export { useSelection };
