import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Alert,
	Modal,
} from "react-native";
import React, { useContext, useState } from "react";
import { NewsContext } from "../Api/Context";
import { Entypo } from "@expo/vector-icons";
import SingleNewsItem from "./SingleNewsItem";

const Search = () => {
	const {
		news: { articles },
		darkTheme,
		setDarkTheme,
	} = useContext(NewsContext);
	const [searchResults, setSearchResults] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [currentNews, setCurrentNews] = useState([]);

	const handleModal = (elem) => {
		setModalVisible(true);
		setCurrentNews(elem);
	};
	const handleSearch = (text) => {
		if (!text) {
			setSearchResults([]);
			return;
		}
		setSearchResults(articles.filter((elem) => elem.title.includes(text)));
	};
	return (
		<View style={{ width: "100%", position: "relative" }}>
			<TextInput
				placeholder='Search for news'
				placeholderTextColor={darkTheme ? "white" : "black"}
				style={{
					...styles.search,
					backgroundColor: darkTheme ? "black" : "lightgrey",
					color: darkTheme ? "white" : "black",
				}}
				onChangeText={(text) => handleSearch(text)}
			/>
			<View style={styles.searchResults}>
				{searchResults.slice(0, 10).map((elem) => (
					<TouchableOpacity
						onPress={() => handleModal(elem)}
						key={elem.title}
						activeOpacity={0.7}>
						<Text
							style={{
								...styles.singleResult,
								backgroundColor: darkTheme ? "black" : "white",
								color: darkTheme ? "white" : "black",
							}}>
							{elem.title}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<TouchableOpacity
					onPress={() => setModalVisible(!modalVisible)}
					style={{
						position: "absolute",
						zIndex: 1,
						right: 0,
						margin: 20,
						top: 30,
					}}>
					<Entypo name='circle-with-cross' size={30} color='white' />
				</TouchableOpacity>
				<View style={{ marginTop: 46 }}>
					<SingleNewsItem item={currentNews} />
				</View>
			</Modal>
		</View>
	);
};

export default Search;

const styles = StyleSheet.create({
	search: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		fontSize: 15,
		marginBottom: 15,
		borderRadius: 10,
	},
	searchResults: {
		position: "absolute",
		zIndex: 1,
		top: 50,
	},
	singleResult: {
		borderRadius: 5,
		padding: 10,
		margin: 0.5,
		shadowColor: "black",
		elevation: 5,
	},
});
