import CloseButton from "../../UI/Button/CloseButton/CloseButton";
import Logo from "../../Logo/Logo";
import Screen from "../../Screen/Screen";
import SideBar from "../../Bar/SideBar/SideBar";
import SystemDate from "../../SystemDate/SystemDate";
import TopBar from "../../Bar/TopBar/TopBar";

import sideBarData from "../../Bar/SideBar/utilities/data";

export const propsSideBar = {
  data: sideBarData
};

export const propsTopBar = {
  brandLogo: <Logo />,
  currentDate: <SystemDate />,
  closeButton: <CloseButton />
};

export const propsLayout = {
  topBar:<TopBar {...propsTopBar} />,
  sideBar:<SideBar {...propsSideBar} />,
  screen:<Screen />
}