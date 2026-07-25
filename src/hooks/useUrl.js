import { useQuery } from "@tanstack/react-query";
import { pb } from "../utils/PB";

export function useUrl(record, fileName) {
  return useQuery({
    queryKey: ["fileUrl", record?.id, fileName],
    enabled: !!record && !!fileName,
    queryFn: () => pb.files.getURL(record, fileName),
  });
}
