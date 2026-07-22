import { useQuery } from "@tanstack/react-query";
import { pb } from "../utils/PB";

export function useCollection(collectionName) {
  //получить все данные из коллекции
  const { data: collection, ...collectionData } = useQuery({
    queryKey: ["collection", collectionName],
    queryFn: async () => {
      const record = await pb.collection(collectionName).getFullList();
      console.log(record);

      return record;
    },
  });
  return { collection, collectionData };
}
