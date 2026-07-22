import { Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Marker, useMap } from "react-map-gl/maplibre";
import Supercluster from "supercluster";
const radiusPixels = 35;
const zoomLevel = 5;
export const ClusterComponent = ({ features }) => {
  const { current: mapref } = useMap();

  const [zoom, setZoom] = useState(2);
  const [bbox, setBbox] = useState([]);

  useEffect(() => {
    if (!mapref) return;

    const updateMapData = () => {
      const bounds = mapref.getBounds();

      setZoom(mapref.getZoom());

      setBbox([
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ]);
    };

    mapref.on("move", updateMapData);

    return () => {
      mapref.off("move", updateMapData);
    };
  }, [mapref]);

  const index = useMemo(() => {
    const cluster = new Supercluster({
      radius: radiusPixels,
      maxZoom: zoomLevel,
    });

    cluster.load(features ?? []);

    return cluster;
  }, [features]);

  const clusters = useMemo(() => {
    return index.getClusters(bbox, Math.floor(zoom));
  }, [index, bbox, zoom]);

  return (
    <>
      {clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const isCluster = cluster.properties?.cluster;
        
        return (
          <Marker
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              e.originalEvent.preventDefault();
              if (isCluster) {
                const zoom = index.getClusterExpansionZoom(cluster.id);
                mapref.flyTo({ center: [lng, lat], zoom, duration: 1000 });
              } else {
                mapref.flyTo({ center: [lng, lat], zoom: 10 });
              }
            }}
            key={
              isCluster
                ? cluster.properties?.cluster_id
                : cluster.properties?.id
            }
            longitude={lng}
            latitude={lat}
          >
            {isCluster ? (
              <Button type="primary">
                {cluster.properties.point_count_abbreviated}
              </Button>
            ) : (
              <Button>{cluster.properties.title}</Button>
            )}
          </Marker>
        );
      })}
    </>
  );
};
