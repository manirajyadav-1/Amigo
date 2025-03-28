import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import mapIconUrl from "../../assets/map.svg"; 



const MapFinder = () => {
  const { posts } = useGetFeedPosts();
  console.log(posts[0]);
  

  return (
    <Box w="100%" h="800px">
      <MapContainer bounds={[[6.4627, 68.1097], [37.0902, 97.3954]]} zoom={12} scrollWheelZoom={true} style={{ height: "800px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posts
          .filter((post) => post.lat && post.lon)
          .map((post) => {
            const lat = parseFloat(post.lat);
            const lon = parseFloat(post.lon);
            if (isNaN(lat) || isNaN(lon)) return null;

            const icon = new L.Icon({
              iconUrl: mapIconUrl,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
              popupAnchor: [0, -40],
            });

            return (
              <Marker key={post.id} position={[lat, lon]} icon={icon}>
                <Popup>
                  <Box textAlign="center">
                    <img
                      src={post.imageURL}
                      alt={post.title}
                      width="150"
                      height="100"
                      style={{ borderRadius: "8px", marginBottom: "5px" }}
                    />
                    <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>{post.title}</h3>
                    <p>{post.description}</p>
                    <p><strong>Location:</strong> {post.location}</p>
                    <p><strong>Preferences:</strong> {post.preferences?.join(", ")}</p>
                    <p><strong>Posted:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                    <p><strong>Price:</strong> {post.price || "N/A"}</p>
                  </Box>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </Box>
  );
};

export default MapFinder;
