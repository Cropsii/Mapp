import { Badge, Button } from "antd";
import React from "react";

export const ClusterPoint = ({ isCluster, clusterData }) => {

  if (isCluster) {
    return (
      <Button type="primary" shape="circle">
        {clusterData.properties.point_count_abbreviated}
      </Button>
    );
  }
  return <Badge status="processing" style={{ scale: 1.5 }}></Badge>;
};
