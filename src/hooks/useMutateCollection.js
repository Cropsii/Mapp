import { useMutation } from "@tanstack/react-query";
import { pb } from "../utils/PB";

export function useMutateCollection() {
  //Добавить запись в коллекцию
  const { mutate: addToCollection, ...addToCollectionData } = useMutation({
    mutationFn: async ({ collectionName, data }) => {
      const record = await pb.collection(collectionName).create(data);
      return record;
    },
  });
  return { addToCollection, addToCollectionData };
}
