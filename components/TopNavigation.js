import {
	AntDesign,
	MaterialCommunityIcons,
	SimpleLineIcons,
} from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NewsContext } from "../Api/Context";

const TopNavigation = ({ index, setIndex }) => {
	const { fetchNews, setDarkTheme, darkTheme } = useContext(NewsContext);
	return (
		<View
			style={{
				...styles.container,
				backgroundColor: darkTheme ? "#282c35" : "white",
			}}>
			{index == 0 ? (
				<>
					<TouchableOpacity
						style={styles.left}
						onPress={() => setDarkTheme(!darkTheme)}>
						<Text
							style={{
								...styles.text,
							}}>
							<MaterialCommunityIcons
								name='theme-light-dark'
								size={24}
								color='#007FFF'
							/>
						</Text>
					</TouchableOpacity>
				</>
			) : (
				<>
					<TouchableOpacity
						style={styles.left}
						onPress={() => setIndex(index === 0 ? 1 : 0)}>
						<SimpleLineIcons name='arrow-left' size={15} color='#007FFF' />
						<Text
							style={{ ...styles.text, color: darkTheme ? "white" : "black" }}>
							Discover
						</Text>
					</TouchableOpacity>
				</>
			)}
			<Text style={{ ...styles.center, color: darkTheme ? "white" : "black" }}>
				{index == 1 ? "All news" : "Discover"}
			</Text>

			{index ? (
				<TouchableOpacity
					style={styles.right}
					onPress={() => fetchNews("general")}>
					<Text style={{ ...styles.text, color: "#007FFF" }}>
						<AntDesign name='reload1' size={24} color='#007FFF' />
					</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={styles.right}
					onPress={() => setIndex(index === 0 ? 1 : 0)}>
					<Text
						style={{
							...styles.text,
							color: darkTheme ? "lightgrey" : "black",
						}}>
						All News
						<SimpleLineIcons name='arrow-right' size={15} color='#007FFF' />
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default TopNavigation;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		borderBottomColor: "black",
		borderBottomWidth: 0.5,
	},
	text: {
		fontSize: 16,
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
		width: 80,
		justifyContent: "space-between",
	},
	right: {
		// flexDirection: "row",
		alignItems: "flex-end",
		width: 80,
		// justifyContent: "space-between",
	},

	center: {
		paddingBottom: 6,
		borderBottomWidth: 0.5,
		borderBottomColor: "#007FFF",
		fontSize: 16,
		borderRadius: 10,
		fontWeight: "700",
	},
});
