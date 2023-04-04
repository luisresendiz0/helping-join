import { Box, Heading, Text } from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib21hcnJhbWciLCJhIjoiY2xmdDA1ZG5pMDYwczNmcXl4bWMwNDg1ZCJ9.Q4kaTXVoH5VIfR1mgiRBRg";

const EventScreen = () => {
  const query = useParams();

  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mark = useRef<mapboxgl.Marker | null>(null);
  const [lng, setLng] = useState(-99.14069366766122);
  const [lat, setLat] = useState(19.438492197400965);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 12,
    });

    mark.current = new mapboxgl.Marker({
      anchor: "center",
    })
      .setLngLat([lng, lat])
      .addTo(map.current);
  }, []);

  return (
    <Box>
      <Heading mb={8}>{`Detalle de evento ${query.id}`}</Heading>
      <Text>Descripción</Text>
      <Text>Fecha inicio</Text>
      <Text>Fecha fin</Text>
      <Text>Dirección</Text>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: "400px", height: "400px" }}
      />
      ``{" "}
    </Box>
  );
};

export default EventScreen;
