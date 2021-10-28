import { Offer, OfferType } from "@features/customer/types";

const calculateBasePrice = ({ qty, price }: { qty: number; price: number }) => qty * price;
const calculateFinalPrice = ({ basePrice, discountPrice }: { basePrice: number; discountPrice: number }) =>
  basePrice - discountPrice;

const calculateOfferNewPrice = ({ newPrice, qty }: { newPrice: number; qty: number }) => newPrice * qty;

const calculateXYDeal = ({ x, y, qty, price }: { x: number; y: number; qty: number; price: number }) => {
  // Normal price
  if (qty < x) {
    return price * qty;
  }

  const quotient = Math.floor(qty / x);
  const remainder = qty % x;

  return quotient * y * price + remainder * price;
};

const calculateDiscountSavings = ({ qty, price, offer }: { qty: number; price: number; offer: Offer }) =>
  ({
    [OfferType.NewPrice]:
      calculateBasePrice({ qty, price }) - calculateOfferNewPrice({ qty, newPrice: offer.values[0] }),
    [OfferType.XYDeal]:
      calculateBasePrice({ qty, price }) - calculateXYDeal({ qty, price, x: offer.values[0], y: offer.values[1] }),
  }[offer.type]);

export { calculateDiscountSavings, calculateFinalPrice };
