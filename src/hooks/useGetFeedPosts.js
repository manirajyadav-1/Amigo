import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			try {
				const postQuery = query(collection(firestore, "posts"));
				const querySnapshot = await getDocs(postQuery);

				const feedPosts = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				const sortedPosts = feedPosts.sort((a, b) => {
					const timeA = a.createdAt?.toMillis?.() || 0;
					const timeB = b.createdAt?.toMillis?.() || 0;
					return timeB - timeA;
				});

				setPosts(sortedPosts);
			} catch (error) {
				console.error("Error fetching feed posts:", error);
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		if (authUser) fetchPosts();
	}, [authUser, setPosts, showToast]);

	return { isLoading, posts };
};

export default useGetFeedPosts;