export const setCurrentValueDropdown = id => {
  let currentValueDropdown;
  switch (id) {
    case "BottomAPD":
      currentValueDropdown = "currentValueDropdownBottomAPD";
      break;
    case "BottomAPT":
      currentValueDropdown = "currentValueDropdownBottomAPT";
      break;
    case "TopAPD":
      currentValueDropdown = "currentValueDropdownTopAPD";
      break;
    case "TopAPT":
      currentValueDropdown = "currentValueDropdownTopAPT";
      break;
    default:
      currentValueDropdown = "currentValueDropdownTopAPT"
      break;
  }

  return currentValueDropdown;
}