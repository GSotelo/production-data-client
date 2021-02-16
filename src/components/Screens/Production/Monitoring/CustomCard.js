import CardWithoutFooter from "../../../UI/Card/CardWithoutFooter/CardWithoutFooter";
import { ReactComponent as PowderGun } from "../../../../assets/svg/powderGun.svg";
import { ReactComponent as Runtime } from "../../../../assets/svg/runtime.svg";
import { ReactComponent as Stop } from "../../../../assets/svg/stop.svg";

export const CustomCard = ({ units, value, type }) => {
  let icon;
  if (type === 1) icon = <Runtime />
  if (type === 2) icon = <PowderGun />
  if (type === 3) icon = <Stop />

  return (
    <CardWithoutFooter
      icon={icon}
      units={units}
      value={value}
    />
  );
};

