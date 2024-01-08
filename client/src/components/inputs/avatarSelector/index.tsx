import { IconCircleCheckFilled, IconReload } from "@tabler/icons-react";
import { FC, useMemo, useState } from "react";
import avatar from "../../../services/avatar";

interface AvatarSelectorProps {
  currentSeed: string | null;
  selected: string;
  changeFn: (selection: string) => void;
}
const AvatarSelector: FC<AvatarSelectorProps> = ({ currentSeed, selected, changeFn }) => {
  const [generate, setGenerate] = useState(false);

  //Generate random seeds
  const seeds = useMemo(() => {
    const seeds = [];
    for (let i = 0; i < 6; i++) {
      const seed = avatar.generateRandomSeed();
      seeds.push({ seed, svg: avatar.getSvgBySeed(seed) });
    }
    return seeds;
  }, [generate]);

  //Current seed svg
  const currentSeedSvg = useMemo(() => avatar.getSvgBySeed(currentSeed || ""), [currentSeed]);

  return (
    <div className="flex gap-2 py-6">
      <div className="border-r border-neutral-300 my-6 pr-6 flex flex-col items-center">
        <p className="pb-4 font-semibold">Current avatar</p>
        <img src={currentSeedSvg} className="h-20 w-20 rounded-md" />
      </div>
      <div className="p-6">
        <span className="flex gap-2 items-center pb-4">
          <IconReload
            className="h-4 w-4  cursor-pointer hover:text-blue-500 transition duration-200"
            onClick={() => setGenerate((prev) => !prev)}
          />
          <p>More options</p>
        </span>
        <div className="flex gap-4">
          {seeds.map((seed, i) => {
            return seed.seed === selected ? (
              <div key={i} className="relative">
                <img
                  src={seed.svg}
                  className="h-20 w-20 rounded-md  outline outline-4 outline-blue-500 cursor-pointer"
                  onClick={() => changeFn("")}
                />
                <IconCircleCheckFilled className="absolute right-0 top-0 text-blue-500 translate-x-1 -translate-y-1" />
              </div>
            ) : (
              <img
                key={i}
                src={seed.svg}
                className="h-20 w-20 rounded-md hover:outline outline-4 outline-blue-500 cursor-pointer transition duration-200"
                onClick={() => changeFn(seed.seed)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AvatarSelector;
