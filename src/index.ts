import { Flatt } from "./type";
function flat<T extends Array<any>>(arr: T): Array<Flatt<T>> {
  return new Array().concat(
    ...arr.map((item) => (Array.isArray(item) ? flat(item) : item))
  );
}
console.log(flat([[[[23], 3]]]));
