import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Dialog } from "../../../components/Dialog";

import s from "./AssignLicenseDialog.module.css";
import { Button } from "../../../components/Button";

const AssignLicenseDialog = ({
  isOpen,
  onSubmit,
  onClose,
}: {
  isOpen: boolean;
  onSubmit: (name: string) => Promise<void>;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");

      try {
        await onSubmit(name);
        onClose();
      } catch (error) {
        if (error instanceof Error) {
          return setError(error.message);
        }

        console.error(error);
      }
    },
    [onClose, name, onSubmit]
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <p className={s.title}>Assign license(s) to</p>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="name" className={s.nameField}>
          <span>Name</span>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onNameChange}
          />
        </label>
        {error.length > 0 && <div>{error}</div>}
        <div className={s.formFooter}>
          <Button type="submit" isDisabled={name.length === 0}>
            OK
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export { AssignLicenseDialog };
