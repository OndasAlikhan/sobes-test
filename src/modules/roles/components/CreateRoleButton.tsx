import { useState } from "react";
import { Button } from "antd";
import { RoleFormModal } from "./RoleFormModal";

export const CreateModalButton = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setCreateModalOpen(true)}>
        New
      </Button>
      <RoleFormModal
        open={createModalOpen}
        onModalClose={() => setCreateModalOpen(false)}
      />
    </>
  );
};
