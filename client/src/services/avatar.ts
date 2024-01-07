import { thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

const generateRandomSeed = (): string => {
  return Math.random().toString(36).substring(6);
};

const getSvgBySeed = (seed: string): string => {
  const avatar = createAvatar(thumbs, {
    seed,
  });
  const svg = avatar.toDataUriSync();
  return svg;
};

export default { generateRandomSeed, getSvgBySeed };
