import { FC } from "react";
import { ProfileSectionProps } from "../../../@types/props";

const ProfileSection: FC<ProfileSectionProps> = ({ title, children }) => {
  return (
    <section className="py-6">
      {title && <h1 className="text-3xl font-semibold text-neutral-700">{title}</h1>}
      <div className="border-t border-neutral-300 pt-2">{children}</div>
    </section>
  );
};

export default ProfileSection;
