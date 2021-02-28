import React from "react";

import { useUser } from "../../../contexts/userContext";
import ModuleTab from "./moduleTab";

const Cart = () => {
  const user = useUser();

  const modules = user.cart.map((m) => (
    <ModuleTab courseCode={m.courseCode} status={m.status} type={m.type} />
  ));

  const empty = <div class="flex px-4 text-gray-400 py-2">Your cart is empty!</div>

  return (
    <div class="px-4 py-2">
      <div class="px-4 items-center flex flex-row w-full py-2">
        <span class="text-3xl xl:text-4xl">Cart</span>
      </div>
      {user.cart.length ? modules : empty}
    </div>
  );
};

export default Cart;
