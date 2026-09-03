import { LightControlCard } from "./LightControlCard";
import { HailsideControl } from "./HailsideControl";
import { EarthQuake } from "./EarthQuake";
import { Flex } from "antd";

export const AdditionalMapStyles = () => {
  return (
    <Flex vertical gap={10}>
      <LightControlCard></LightControlCard>
      <HailsideControl></HailsideControl>
      <EarthQuake></EarthQuake>
      </Flex>
  );
};
