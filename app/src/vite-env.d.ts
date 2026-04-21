/// <reference types="vite/client" />

declare global {
  interface Window {
    electronAPI?: {
      getDeviceIdentity?: () => Promise<{
        machineId: string | null;
        fingerprint: string;
        deviceInfo: {
          cpu: string | null;
          cpuCores: number | null;
          ramBytes: number;
          ramGB: number;
          os: {
            platform: string;
            arch: string;
            release: string;
            winVersion: string | null;
          };
          model: string | null;
          manufacturer: string | null;
        };
      }>;
    };
  }
}

export {};
