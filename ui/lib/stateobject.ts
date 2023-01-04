import { Dispatch, SetStateAction } from "react";

export default function updateStateObject<
  T extends Record<string, any>,
  K extends keyof T
>(
  [record, setterFunction]: [T, Dispatch<SetStateAction<T>>],
  [key, value]: [K, T[K]]
) {
  setterFunction({ ...record, [key]: value });
  console.log(record);
}


