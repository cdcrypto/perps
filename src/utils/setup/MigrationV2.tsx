import { MigrationV2Modal } from "@web/components/Migration";
import { useClientStore } from "stores";

export const MigrationV2 = () => {
  const migration = useClientStore((s) => s.migration);
  const setMigration = useClientStore((s) => s.setMigration);

  return (
    <MigrationV2Modal
      open={migration?.migrationRequired || false}
      onComplete={() => setMigration(undefined)}
    />
  );
};
