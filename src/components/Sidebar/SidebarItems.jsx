import CreatePost from "./CreatePost";
import Home from "./Home";
import MapFinderLink from "./MapFinderLink";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = () => {
	return (
		<>
			<Home />
			<MapFinderLink />
			<Search />
			<CreatePost />
			<ProfileLink />
		</>
	);
};

export default SidebarItems;