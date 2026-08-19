import { Flex } from "antd";
import { HailsideControl } from "./HailsideControl";
import { LightControlCard } from "./LightControlCard";
import { EarthQuake } from "./EarthQuake";

export const AdditionalMapStyles = () => {
  return (
    <Flex vertical gap={10}>
      <LightControlCard></LightControlCard>
      <HailsideControl></HailsideControl>
      <EarthQuake></EarthQuake>
    </Flex>
  );
};
