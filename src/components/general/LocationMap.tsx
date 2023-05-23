import React, {
  useRef,
  useEffect,
  useState,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import mapboxgl from "mapbox-gl";
import GeocodingClient from "@mapbox/mapbox-sdk/services/geocoding";
import { AspectRatio, Box } from "@chakra-ui/react";

const ACCESS_TOKEN =
  "pk.eyJ1Ijoib21hcnJhbWciLCJhIjoiY2xmdDA1ZG5pMDYwczNmcXl4bWMwNDg1ZCJ9.Q4kaTXVoH5VIfR1mgiRBRg";

mapboxgl.accessToken = ACCESS_TOKEN;

interface LocationMapProps {
  currentAddress: string;
  cp: string;
}

const LocationMap: FunctionComponent<PropsWithChildren<LocationMapProps>> = (
  props
) => {
  const currentAddress = props.currentAddress;

  const geocodingClient = GeocodingClient({ accessToken: ACCESS_TOKEN });

  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-99.14069366766122, 19.438492197400965],
      zoom: 12,
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    geocodingClient
      .forwardGeocode({
        query: currentAddress,
        countries: ["mx"],
        types: ["address"],
        limit: 2,
        language: ["es"],
      })
      .send()
      .then((response) => {
        const results = response.body.features.filter((feature) =>
          feature.place_name.includes(props.cp)
        );
        const { center } =
          results.length > 0 ? results[0] : response.body.features[0];
        new mapboxgl.Marker({ anchor: "center" })
          .setLngLat(center as [number, number])
          .addTo(map.current!);
        map.current?.flyTo({ center: center as [number, number], zoom: 12 });
      });
  }, [map.current]);

  return (
    <AspectRatio ratio={16 / 9}>
      <Box ref={mapContainer}></Box>
    </AspectRatio>
  );
};

export default LocationMap;
