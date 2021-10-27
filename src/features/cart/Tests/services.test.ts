export {};

// import * as services from "@features/cart/services";
// import { Product } from "@features/cart/models";
// import { CustomerSelection, Offers } from "@features/customer/models";
// import { CustomerState } from "@features/customer/redux";

// describe("Cart Service Tests", () => {
//   let customerState: CustomerState;
//   let currentOffers: Offers | undefined;
//   let products: Product[];

//   describe("[calculateCustomerSpecialPrices]", () => {
//     beforeEach(() => {
//       customerState = {
//         current: 0,
//         selections: {},
//         meta: {},
//       };

//       currentOffers = undefined;
//       products = [
//         {
//           id: 0,
//           Name: "Test Product",
//           Description: "Test Product Description",
//           RetailPrice: 100.0,
//         },
//       ];
//     });

//     describe("no current offers", () => {
//       it("SHOULD return null", () => {
//         const expectedResult = null;

//         expect(
//           services.calculateCustomerSpecialPrices({
//             customerState,
//             currentOffers,
//             products,
//           })
//         ).toEqual(expectedResult);
//       });
//     });

//     describe("NewPrice offers", () => {
//       beforeEach(() => {
//         currentOffers = {
//           "0": [
//             {
//               type: "NewPrice",
//               values: [75.0],
//             },
//           ],
//         };
//       });

//       it("SHOULD return updated price", () => {
//         const expectedResult: CustomerSelection = {
//           0: {
//             0: {
//               customerPrice: 75,
//             },
//           },
//         };

//         expect(
//           services.calculateCustomerSpecialPrices({
//             customerState,
//             currentOffers,
//             products,
//           })
//         ).toEqual(expectedResult);
//       });
//     });
//   });
// });