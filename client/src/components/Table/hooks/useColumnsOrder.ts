import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

const CHANGE_ORDER_OPERATIONS = {
  ADD: "add",
  REMOVE: "remove",
} as const;

type ChangeOrderOperation =
  (typeof CHANGE_ORDER_OPERATIONS)[keyof typeof CHANGE_ORDER_OPERATIONS];

const useColumnsOrder = <K extends string>({
  id,
  defaultOrder,
}: {
  id: string;
  defaultOrder: K[];
}) => {
  const [persistedColumnsOrder, setPersistedColumnsOrder] = useLocalStorage(id, defaultOrder);
  const [currentOrder, setCurrentOrder] = useState(persistedColumnsOrder);

  useEffect(() => {
    setPersistedColumnsOrder(currentOrder);
  }, [currentOrder, setPersistedColumnsOrder]);

  const changeOrder = useCallback(
    (operation: ChangeOrderOperation) => (keyToAdd: K) => {
      setCurrentOrder((columnsOrder) => {
        const newColumnsOrder: K[] = [];

        for (const defaultOrderKey of defaultOrder) {
          if (defaultOrderKey === keyToAdd) {
            if (operation === CHANGE_ORDER_OPERATIONS.ADD) {
              newColumnsOrder.push(keyToAdd);
            }
            continue;
          }

          for (const currentOrderKey of columnsOrder) {
            if (currentOrderKey === defaultOrderKey) {
              newColumnsOrder.push(defaultOrderKey);
              break;
            }
          }
        }

        return newColumnsOrder;
      });
    },
    [defaultOrder, setCurrentOrder]
  );

  const addColumn = useMemo(
    () => changeOrder(CHANGE_ORDER_OPERATIONS.ADD),
    [changeOrder]
  );
  const removeColumn = useMemo(
    () => changeOrder(CHANGE_ORDER_OPERATIONS.REMOVE),
    [changeOrder]
  );

  return {
    defaultOrder,
    currentOrder,
    setCurrentOrder,
    addColumn,
    removeColumn,
  };
};

export { useColumnsOrder };
