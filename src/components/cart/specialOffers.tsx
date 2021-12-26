import React from "react";
import { useAtomValue } from "jotai/utils";

import type { Product } from "../../features/cart/types";
import { OfferType } from "../../features/customer/types";
import { customerProductOfferAtom } from "../../features/customer/atoms";

interface Props {
  product: Product;
}

const SpecialOffers = ({ product: { id: productId, retailPrice } }: Props) => {
  const newPriceOffer = useAtomValue(customerProductOfferAtom({ productId, offerType: OfferType.NewPrice }));
  const xyDealOffer = useAtomValue(customerProductOfferAtom({ productId, offerType: OfferType.XYDeal }));

  const hasOffers = newPriceOffer.length > 0 || xyDealOffer.length > 0;

  return (
    <>
      {hasOffers && (
        <article className="pt-3 prose-sm">
          <p className="font-semibold text-gray-600 underline">SPECIAL OFFER:</p>

          <div className="ml-3">
            {newPriceOffer.length > 0 && (
              <p className="text-sky-600">{`> We have slashed the price from ${retailPrice} -> ${newPriceOffer[0]}`}</p>
            )}

            {xyDealOffer.length > 0 && (
              <p className="text-sky-600">{`> Buy ${xyDealOffer[0]} for the price of ${xyDealOffer[1]}`}</p>
            )}
          </div>
        </article>
      )}
    </>
  );
};

export default SpecialOffers;
