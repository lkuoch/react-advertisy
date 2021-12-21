const customers = [
  {
    id: "f5758372-9329-4ed7-8cd3-4304b545b6e0",
    name: "Default",
  },
  {
    id: "c00086bf-9a9e-4793-bac1-8055e1b486ff",
    name: "SecondBite",
    offers: {
      "fdc697e8-dec8-4c67-ba5c-23b23a9ce21a": [
        {
          type: "XYDeal",
          values: [3, 2],
        },
      ],
    },
  },
  {
    id: "6646e172-037e-47cd-a233-ba30b0582f82",
    name: "Axil Coffee Roasters",
    offers: {
      "2258da74-7a25-46fd-b2d3-dacfe30464ce": [
        {
          type: "NewPrice",
          values: [299.99],
        },
      ],
    },
  },
  {
    id: "a0bbe0c4-bafe-4043-a455-a3a54bdedc8b",
    name: "MYER",
    offers: {
      "2258da74-7a25-46fd-b2d3-dacfe30464ce": [
        {
          type: "XYDeal",
          values: [5, 4],
        },
      ],
      "01562650-3000-42b7-9147-56822ed009fc": [
        {
          type: "NewPrice",
          values: [389.99],
        },
      ],
    },
  },
];

export default customers;
