const productionItems = [
  {
    key: "sub1-i1",
    value: "Monitoring",
    path: "/production/monitoring"
  },
  {
    key: "sub1-i2",
    value: "Color change",
    path: "/production/color_change"
  },
  {
    key: "sub1-i3",
    value: "Batch information",
    path: "/production/batch_information"
  }
];

const consumptionItems = [
  {
    key: "sub2-i1",
    value: "Sprayed powder",
    path: "/consumption/sprayed_powder"
  },
  {
    key: "sub2-i2",
    value: "Fresh powder",
    path: "/consumption/fresh_powder"
  },
  {
    key: "sub2-i3",
    value: "Powder type",
    path: "/consumption/powder_type"
  },
  {
    key: "sub2-i4",
    value: "Electricity and air",
    path: "/consumption/electricity_air"
  },
  {
    key: "sub2-i5",
    value: "Humidity and temperature",
    path: "/consumption/humidity_temperature"
  },
  {
    key: "sub2-i6",
    value: "Air pressure",
    path: "/consumption/air_pressure"
  }
];

const menuItems = [
  {
    key: 'sub1',
    title: 'Production',
    items: productionItems
  },
  {
    key: 'sub2',
    title: 'Consumption',
    items: consumptionItems
  }
];

export default menuItems;