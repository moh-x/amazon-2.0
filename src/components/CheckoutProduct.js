import { StarIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  addOne,
  removeOne,
} from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
  units,
}) {
  const dispatch = useDispatch();
  // const addItemToBasket = () => {
  //   const product = {
  //     id,
  //     title,
  //     price,
  //     rating,
  //     description,
  //     category,
  //     image,
  //     hasPrime,
  //     units,
  //   };
  //   dispatch(addToBasket(product));
  // };
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  const addOneToItem = () => {
    dispatch(addOne({ id }));
  };
  const removeOneFromItem = () => {
    dispatch(removeOne({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} alt="" height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-sm my-2 line-clamp-3">{description}</p>
        <Currency quantity={price * units * 100} currency="NGN" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <div className="flex">
          <button onClick={removeOneFromItem} className="button p-1">
            <MinusSmIcon className="w-4" />
          </button>
          <span className="flex-grow text-center">{units}</span>
          <button onClick={addOneToItem} className="button p-1">
            <PlusSmIcon className="w-4" />
          </button>
        </div>
        {/* <button onClick={addItemToBasket} className="button">
          Add to Basket
        </button> */}
        <button onClick={removeItemFromBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
