import { useState, useEffect } from "react";
const localCache = {};

export default function useBreedList(animal) {
  const [breedList, updateBreedList] = useState([]);
  const [status, updateStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      updateBreedList([]);
    } else if (localCache[animal]) {
      updateBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      updateBreedList([]);
      updateStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      updateBreedList(localCache[animal]);
      updateStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
