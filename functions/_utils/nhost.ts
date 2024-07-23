import { NhostClient } from '@nhost/nhost-js';

const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN ?? 'local',
  region: process.env.NHOST_REGION,
});

export { nhost };

export const getFilePath = (path?: string | null): string | undefined => {
  if (!path) return undefined;
  return nhost.storage.getPublicUrl({ fileId: path });
};
