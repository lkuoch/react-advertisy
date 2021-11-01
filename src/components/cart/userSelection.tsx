import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { actions as customerActions, selectors as customerSelectors } from "@features/customer/state";

import type { Product } from "@features/cart/types";

interface Props {
  product: Product;
}

const UserSelection = ({ product: { id } }: Props) => {
  const dispatch = useDispatch();
  const qty = useSelector((state) => customerSelectors.selectCurrentProductQuantity(state, id));

  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="outlined"
        onClick={() =>
          dispatch(
            customerActions.removeFromCart({
              productId: id,
              qty,
            })
          )
        }
        startIcon={<RemoveIcon />}
      >
        REMOVE
      </Button>

      <Button
        variant="contained"
        onClick={() =>
          dispatch(
            customerActions.addToCart({
              productId: id,
              qty,
            })
          )
        }
        startIcon={<AddIcon />}
      >
        ADD
      </Button>
    </Stack>
  );
};

export default UserSelection;
