import {
	Dimensions,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Linking,
	Button,
} from "react-native";
import React, { useContext, useState } from "react";
import * as Speech from "expo-speech";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { NewsContext } from "../Api/Context";
import { useSwipe } from "../customHooks/useSwipe";
import moment from "moment";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleNewsItem = ({ item }) => {
	const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

	const { darkTheme, setDarkTheme } = useContext(NewsContext);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const textToSpeech = (text) => {
		setIsSpeaking(true);
		Speech.speak(text);
	};
	function onSwipeLeft() {
		console.log("SWIPE_LEFT");
		Linking.openURL(item.url);
	}

	function onSwipeRight() {
		console.log("SWIPE_RIGHT");
	}
	return (
		// <GestureRecognizer
		// 	onSwipeLeft={() => {
		// 		Linking.openURL(item.url);
		// 	}}>
		<View
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
			style={{
				height: windowHeight,
				width: windowWidth,
				// transform: [{ scaleY: -1 }],
				paddingBottom: 30,
			}}>
			<Image
				source={{ uri: item.urlToImage }}
				style={{ height: "45%", resizeMode: "cover", width: windowWidth }}
			/>
			<View
				style={{
					...styles.description,
					backgroundColor: darkTheme ? "#282C35" : "white",
				}}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						paddingRight: 30,
						width: windowWidth - 30,
					}}>
					<Text
						style={{ ...styles.title, color: darkTheme ? "white" : "black" }}>
						{item.title}
					</Text>
					{isSpeaking == false ? (
						<TouchableOpacity
							onPress={() => {
								textToSpeech(item.title);
								setIsSpeaking(true);
							}}>
							<Entypo
								name='sound'
								size={30}
								color={darkTheme ? "white" : "black"}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={() => {
								if (isSpeaking) {
									Speech.stop();
									setIsSpeaking(false);
								} else {
									Speech.resume();
								}
							}}>
							<FontAwesome name='hand-stop-o' size={30} color='white' />
						</TouchableOpacity>
					)}
				</View>

				<Text
					style={{ ...styles.content, color: darkTheme ? "white" : "black" }}>
					{item?.description?.split(" ").splice(0, 50).join(" ")}
				</Text>
				<Text style={{ color: darkTheme ? "white" : "black" }}>
					Short by {item.author ?? "Unknown"}
				</Text>
				<Text style={{ color: darkTheme ? "white" : "black", marginTop: 10 }}>
					Published At {moment(item.publishedAt).format("DD-MM-YYYY")}
				</Text>
				<ImageBackground
					blurRadius={30}
					style={styles.footer}
					source={{ uri: item.urlToImage }}>
					<TouchableOpacity onPress={() => Linking.openURL(item.url)}>
						<Text
							style={{ fontSize: 15, color: darkTheme ? "white" : "black" }}>
							{item.content?.slice(0, 45)}...
						</Text>
						<Text
							style={{
								fontSize: 17,
								fontWeight: "bold",
								color: darkTheme ? "white" : "black",
							}}>
							Read more
						</Text>
					</TouchableOpacity>
				</ImageBackground>
			</View>
		</View>
		// </GestureRecognizer>
	);
};

export default SingleNewsItem;

const styles = StyleSheet.create({
	title: {
		color: "white",
		fontSize: 22,
		paddingBottom: 10,
		fontWeight: "bold",
	},
	content: { fontSize: 18, paddingBottom: 10 },
	footer: {
		height: 80,
		width: windowWidth,
		position: "absolute",
		bottom: 0,
		backgroundColor: "#d7be69",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	description: {
		flex: 1,
		padding: 15,
	},
});
