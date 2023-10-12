import { useCallback, useState } from "react";

const useDialog = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setShowDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  return {
    isOpen: showDialog,
    open: handleOpenDialog,
    close: handleCloseDialog,
  };
};

export { useDialog };
