import { Box, Heading, Text } from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { getEventById } from "../../services/api/getEventById";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib21hcnJhbWciLCJhIjoiY2xmdDA1ZG5pMDYwczNmcXl4bWMwNDg1ZCJ9.Q4kaTXVoH5VIfR1mgiRBRg";

const EventScreen = () => {
  const query = useParams();

  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mark = useRef<mapboxgl.Marker | null>(null);
  const [details, setDetails] = useState<any>(null); // TODO: change type

  const currentDirection = `${details?.calle} ${details?.numero_exterior}, ${details?.colonia}, ${details?.alcaldia}, ${details?.entidad}, Mexico`


  const fetchData = useCallback(() => {

    const geocodingClient = mbxGeocoding({
      accessToken: mapboxgl.accessToken,
    });

    // geocoding with countries
    return geocodingClient
      .forwardGeocode({
        query: currentDirection,
        countries: ['mx'],
        types: ["address"],
        limit: 1,
        language: ['es']
      })
      .send()
      .then((response) => {
        const match = response.body;
        const coordinates = match.features[0].geometry.coordinates;
        const placeName = match.features[0].place_name;
        const center = match.features[0].center;

        return {
          type: 'Feature',
          center: center,
          geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
          properties: {
            description: placeName,
          },
        };
      });  
  },[details]);

  useEffect(() => {
    const getEventoDetails = async () => {
      try {
        const details = await getEventById(Number(query.id));
        setDetails(details.data);

        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [-99.14069366766122, 19.438492197400965],
          zoom: 12,
        });
      } catch (error) {
        console.error(error);
      }
    }

    getEventoDetails();

  }, []);

  useEffect(() => {
    if (!map.current || !details) return; // Waits for the map to initialise

    const results = fetchData();

    results.then((marker) => {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';
      let coord: [number,number] = [marker.geometry.coordinates.at(0)! , marker.geometry.coordinates.at(1)!]; 
      let cen: [number,number] = [marker.center.at(0)!,marker.center.at(1)!];

      // make a marker for each feature and add it to the map
      mark.current = new mapboxgl.Marker({
        anchor: "center",
      })
        .setLngLat([coord[0], coord[1]])
        .addTo(map.current!);

      map.current!.on('load', async () => {
        map.current!.flyTo({
          center: cen,
        });
      });
    });
  }, [fetchData, details, map.current]);

  
  
  return (
    <Box>
      <Heading mb={8}>{`Detalle de evento ${query.id}`}</Heading>
      <Text>Descripción</Text>
      <Text>Fecha inicio</Text>
      <Text>Fecha fin</Text>
      <Text>Dirección: {currentDirection}</Text>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: "400px", height: "400px" }}
      />
    </Box>
  );
};

export default EventScreen;
