import * as React from "react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";

import { currentCustomerIdAtom, customerQueryAtom } from "../../features/customer/atoms";

import UserIcon from "@heroicons/react/outline/UserIcon";

const Customers = () => {
  const customers = useAtomValue(customerQueryAtom);
  const [customerId, setCustomerId] = useAtom(currentCustomerIdAtom);

  React.useEffect(() => {
    if (customers.length) {
      setCustomerId(customers[0].id);
    }
  }, [customers.length]);

  return (
    <ul className="divide-y-2 divide-gray-200 flex flex-col py-4">
      {customers.map(({ id, name }) => (
        <li className="p-2" key={id}>
          <div
            className={`cursor-pointer flex flex-row h-12 items-center text-lg ${
              id === customerId ? "font-bold text-rose-500 underline" : "text-gray-500"
            }`}
            onClick={() => id !== customerId && setCustomerId(id)}
          >
            <UserIcon className="h-10 w-10" />
            <p>{name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Customers;
