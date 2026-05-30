import { AppLayout } from "@/components/layout/AppLayout";
import { DeviceCard } from "@/components/devices/DeviceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useDevices } from "@/hooks/useMediaHub";

const Devices = () => {
  const { data: devices = [], isLoading } = useDevices();

  // Group devices by room for an at-a-glance home view.
  const rooms = devices.reduce<Record<string, typeof devices>>((acc, d) => {
    (acc[d.room] ??= []).push(d);
    return acc;
  }, {});

  const onlineCount = devices.filter((d) => d.online).length;

  return (
    <AppLayout
      title="Devices"
      description={
        isLoading
          ? "Discovering devices…"
          : `${onlineCount} of ${devices.length} devices online across ${Object.keys(rooms).length} rooms.`
      }
    >
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(rooms).map(([room, roomDevices]) => (
            <section key={room}>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {room}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {roomDevices.map((d) => (
                  <DeviceCard key={d.id} device={d} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default Devices;
