import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";


const MapFinder = () => {
  const { posts } = useGetFeedPosts();

  return (
    <Box>
      <MapContainer
        bounds={[[6.4627, 68.1097], [37.0902, 97.3954]]} 
        zoom={13}
        scrollWheelZoom={true}
        className="mapContainer"
        style={{ height: "800px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posts
          .filter((post) => Array.isArray(post.geo) && post.geo.length === 2)
          .map((post, idx) => {
            const [lat, lng] = post.geo || [0, 0]; 

            const icon = new L.Icon({
              iconUrl: post.image_url || "https://leafletjs.com/examples/custom-icons/leaf-red.png",
              iconSize: [40, 40],
            });

            return (
              <Marker key={`mapPost${idx}`} position={[lat, lng]} icon={icon}>
                <Popup>
                  <a href={`/post/${post.id}`}>
                    <h3 className="userName">{post.creator_name}</h3>
                    <small className="location">{post.location}</small>
                    <p>{post.title}</p>
                  </a>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </Box>
  );
};

export default MapFinder;
