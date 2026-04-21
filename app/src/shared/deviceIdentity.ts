export type DeviceIdentity = {
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
};

function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return `h${Math.abs(hash)}`;
}

function getFallbackIdentity(): DeviceIdentity {
  const key = "receipta_local_machine_id";
  let localMachineId = localStorage.getItem(key);
  if (!localMachineId) {
    localMachineId = `local-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    localStorage.setItem(key, localMachineId);
  }

  const platform = navigator.platform || "unknown";
  const arch = "unknown";
  const release = navigator.userAgent || "unknown";
  const cpu = navigator.userAgent || null;
  const cpuCores = navigator.hardwareConcurrency || null;
  const ramGB =
    typeof (navigator as any).deviceMemory === "number"
      ? (navigator as any).deviceMemory
      : 0;
  const ramBytes = ramGB ? ramGB * 1024 ** 3 : 0;
  const model = "Browser";
  const manufacturer = null;
  const winVersion = platform.includes("Win") ? "Windows" : null;

  const fingerprintSource = JSON.stringify({
    machineId: localMachineId,
    platform,
    release,
    cpu,
    cpuCores,
    ramGB,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    lang: navigator.language,
  });

  return {
    machineId: localMachineId,
    fingerprint: hashString(fingerprintSource),
    deviceInfo: {
      cpu,
      cpuCores,
      ramBytes,
      ramGB,
      os: {
        platform,
        arch,
        release,
        winVersion,
      },
      model,
      manufacturer,
    },
  };
}

export async function getDeviceIdentity(): Promise<DeviceIdentity | null> {
  try {
    const api = window.electronAPI;
    if (api?.getDeviceIdentity) {
      const device = await api.getDeviceIdentity();
      if (device?.machineId || device?.fingerprint) {
        return device;
      }
    }
    return getFallbackIdentity();
  } catch {
    return getFallbackIdentity();
  }
}

