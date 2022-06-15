import { getRandomId } from "../misc/helperFuncs";

export default function Turf(id, flags) {
  return {
    id: id ?? getRandomId(),
    flags: flags ?? { main: null, second: null, third: null, other: [] },
  };
}
