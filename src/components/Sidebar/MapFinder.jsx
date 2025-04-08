import { Box, Spinner, Center } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import mapIconUrl from "../../assets/map.svg";

const customIcon = new L.Icon({
  iconUrl: mapIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const MapFinder = () => {
  const { posts, loading } = useGetFeedPosts();

  if (loading) {
    return (
      <Center h="800px">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Center>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Center h="800px">
        <Box fontSize="xl" fontWeight="semibold">
          No posts available on the map.
        </Box>
      </Center>
    );
  }

  return (
    <Box w="100%" h="800px">
      <MapContainer
        bounds={[
          [6.4627, 68.1097],
          [37.0902, 97.3954],
        ]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "800px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {posts
          .filter(
            (post) =>
              !isNaN(parseFloat(post.lat)) && !isNaN(parseFloat(post.lon))
          )
          .map((post) => {
            const lat = parseFloat(post.lat);
            const lon = parseFloat(post.lon);

            return (
              <Marker key={post.id} position={[lat, lon]} icon={customIcon}>
                <Popup>
                  <Box textAlign="center" maxW="200px">
                    <img
                      src={post.imageURL || "https://via.placeholder.com/150"}
                      alt={post.title || "No Title"}
                      width="100%"
                      height="100"
                      style={{
                        borderRadius: "8px",
                        marginBottom: "5px",
                        objectFit: "cover",
                      }}
                    />
                    <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      {post.title || "Untitled"}
                    </h3>
                    {post.description && <p>{post.description}</p>}
                    <p>
                      <strong>📍 Location:</strong> {post.location || "Unknown"}
                    </p>
                    {post.preferences?.length > 0 && (
                      <p>
                        <strong>🎯 Preferences:</strong>{" "}
                        {post.preferences.join(", ")}
                      </p>
                    )}
                    <p>
                      <strong>🕒 Posted:</strong>{" "}
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>💰 Price:</strong> {post.price || "N/A"}
                    </p>
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
