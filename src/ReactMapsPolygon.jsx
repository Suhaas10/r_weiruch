import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Polygon,
  InfoWindow
} from "@react-google-maps/api";

const ReactMapsPolygon = () => {
  const [polygons, setPolygons] = useState([
    {
      outer: [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 },
        { lat: 25.774, lng: -80.19 } // Close the polygon
      ],
      inner: [
        { lat: 25.0, lng: -75.0 },
        { lat: 22.5, lng: -72.0 },
        { lat: 27.5, lng: -72.0 },
        { lat: 25.0, lng: -75.0 } // Close the inner polygon
      ]
    },
    {
      outer: [
        { lat: 35.774, lng: -90.19 },
        { lat: 28.466, lng: -76.118 },
        { lat: 42.321, lng: -74.757 },
        { lat: 35.774, lng: -90.19 } // Close the polygon
      ],
      inner: [] // No inner polygon
    }
  ]);

  const [hoveredPolygon, setHoveredPolygon] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px"
  };

  const center = {
    lat: 28.0,
    lng: -77.0
  };

  const outerPolygonOptions = {
    fillColor: "lightblue",
    fillOpacity: 0.4,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: true,
    draggable: false,
    editable: true,
    geodesic: false,
    zIndex: 1
  };

  const innerPolygonOptions = {
    fillColor: "yellow",
    fillOpacity: 0.4,
    strokeColor: "green",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: true,
    draggable: false,
    editable: true,
    geodesic: false,
    zIndex: 2 // Higher zIndex to ensure it renders above the outer polygon
  };

  const getPolygonCenter = (polygonPath) => {
    const bounds = new window.google.maps.LatLngBounds();
    polygonPath.forEach((point) => bounds.extend(point));
    return bounds.getCenter();
  };

  const handleMouseOver = (e, index, isInner = false) => {
    setHoveredPolygon({ index, isInner });
    setMousePosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handleMouseOut = () => {
    setHoveredPolygon(null);
    setMousePosition(null);
  };

  return (
    <div>
      <h2>React Google Maps Multiple Polygons</h2>
      <LoadScript googleMapsApiKey="test">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={5}
          center={center}
        >
          {polygons.map((polygon, index) => (
            <React.Fragment key={index}>
              {/* Outer Polygon */}
              <Polygon
                paths={polygon.outer}
                options={outerPolygonOptions}
                onMouseOver={(e) => handleMouseOver(e, index, false)}
                onMouseOut={handleMouseOut}
              />
              {/* Inner Polygon */}
              {polygon.inner.length > 0 && (
                <Polygon
                  paths={polygon.inner}
                  options={innerPolygonOptions}
                  onMouseOver={(e) => handleMouseOver(e, index, true)}
                  onMouseOut={handleMouseOut}
                />
              )}
              {hoveredPolygon &&
                hoveredPolygon.index === index &&
                mousePosition && (
                  <InfoWindow
                    position={mousePosition}
                    onCloseClick={() => setHoveredPolygon(null)}
                  >
                    <div>
                      <h3>
                        {hoveredPolygon.isInner
                          ? `Inner Polygon ${index + 1}`
                          : `Outer Polygon ${index + 1}`}
                      </h3>
                      <p>
                        Vertices:{" "}
                        {hoveredPolygon.isInner
                          ? polygon.inner.length
                          : polygon.outer.length}
                      </p>
                      <p>Click to edit vertices</p>
                    </div>
                  </InfoWindow>
                )}
            </React.Fragment>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ReactMapsPolygon;
