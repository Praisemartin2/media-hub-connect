import { AppLayout } from "@/components/layout/AppLayout";
import { RemoteControl } from "@/components/remote/RemoteControl";

const Remote = () => {
  return (
    <AppLayout title="Remote" description="A universal remote for your active output.">
      <RemoteControl />
    </AppLayout>
  );
};

export default Remote;
