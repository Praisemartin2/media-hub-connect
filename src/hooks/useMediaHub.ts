import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mediaHubApi } from "@/api/mediaHubApi";
import type { Device } from "@/types/media";

// React Query hooks over the stubbed API layer. Components consume these and
// never touch the API client directly.

export const mediaKeys = {
  devices: ["devices"] as const,
  library: ["library"] as const,
  nowPlaying: ["now-playing"] as const,
};

export function useDevices() {
  return useQuery({
    queryKey: mediaKeys.devices,
    queryFn: () => mediaHubApi.getDevices(),
  });
}

export function useLibrary() {
  return useQuery({
    queryKey: mediaKeys.library,
    queryFn: () => mediaHubApi.getLibrary(),
  });
}

export function useSetDevicePower() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ deviceId, online }: { deviceId: string; online: boolean }) =>
      mediaHubApi.setDevicePower(deviceId, online),
    onSuccess: (devices: Device[]) => {
      queryClient.setQueryData(mediaKeys.devices, devices);
    },
  });
}
