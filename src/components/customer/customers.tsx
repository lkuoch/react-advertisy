import * as React from "react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";

import { currentCustomerAtom, customerQueryAtom } from "@features/customer/atom";

import { Customer } from "@features/customer/types";

const Customers = () => {
  const customers = useAtomValue<Customer[]>(customerQueryAtom);
  const [currentCustomer, setCurrentCustomer] = useAtom(currentCustomerAtom);

  React.useEffect(() => {
    if (customers.length) {
      setCurrentCustomer(customers[0].id);
    }
  }, [customers]);

  return (
    <>
      {customers.map(({ id, name }) => (
        <a
          key={id}
          className={`item ${id === currentCustomer ? "red active" : ""}`}
          onClick={() => (id !== currentCustomer ? setCurrentCustomer(id) : null)}
        >
          {name}
        </a>
      ))}
    </>
  );
};

export default Customers;
