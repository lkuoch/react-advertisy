import { Offer, OfferType } from "@features/customer/types";

const calculateBasePrice = ({ qty, price }: { qty: number; price: number }) => qty * price;
const calculateDiscountPrice = ({ basePrice, finalPrice }: { basePrice: number; finalPrice: number }) =>
  basePrice - finalPrice;

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

const applyOffer = ({ qty, price, offer }: { qty: number; price: number; offer: Offer }) =>
  ({
    [OfferType.NewPrice]: calculateOfferNewPrice({ qty, newPrice: offer.values[0] }),
    [OfferType.XYDeal]: calculateXYDeal({ qty, price, x: offer.values[0], y: offer.values[1] }),
  }[offer.type]);

export { calculateBasePrice, calculateDiscountPrice, applyOffer };
