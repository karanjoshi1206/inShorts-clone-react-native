import React, { useContext, useState } from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { categories, country, sources } from "../Api/api";
import { NewsContext } from "../Api/Context";
import Search from "../components/Search";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

const windowWidth = Dimensions.get("window").width;
const SLIDE_WIDTH = Math.round(windowWidth / 3.5);
const DiscoverScreen = () => {
	const [activeIndex, setActiveIndex] = useState();
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);
	const { setCategory, setSource, darkTheme, setCountry } =
		useContext(NewsContext);

	return (
		<View style={styles.discover}>
			<Search />
			{/* Categories */}

			<View style={{ ...styles.container, borderWidth: darkTheme ? 0 : 1 }}>
				<Dropdown
					style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
					placeholderStyle={styles.placeholderStyle}
					selectedTextStyle={styles.selectedTextStyle}
					inputSearchStyle={styles.inputSearchStyle}
					iconStyle={styles.iconStyle}
					data={country}
					search
					maxHeight={300}
					labelField='label'
					valueField='value'
					placeholder={!isFocus ? "Select item" : "..."}
					searchPlaceholder='Search...'
					value={value}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					onChange={(item) => {
						setValue(item.value);
						setIsFocus(false);
						setCountry(item.value);
					}}
					renderLeftIcon={() => (
						<AntDesign
							style={styles.icon}
							color={isFocus ? "blue" : "black"}
							name='Safety'
							size={20}
						/>
					)}
				/>
			</View>
			<Text
				style={{ ...styles.subTitle, color: darkTheme ? "white" : "black" }}>
				Categories
			</Text>
			{/* <Carousel
				layout='default'
				data={categories}
				sliderWidth={windowWidth}
				itemWidth={SLIDE_WIDTH}
				sliderHeight={300}
				activeSlideAlignment='start'
				inactiveSlideOpacity={1}
				inactiveSlideScale={1}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						onPress={() => setCategory(item.name)}
						style={styles.category}>
						<Image style={styles.categoryImage} source={{ uri: item.pic }} />
						<Text
							style={{ ...styles.name, color: darkTheme ? "white" : "black" }}>
							{item.name}
						</Text>
					</TouchableOpacity>
				)}
				onSnapToItem={(index) => setActiveIndex(index)}
			/> */}
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{categories.map((item) => (
					<TouchableOpacity
						onPress={() => setCategory(item.name)}
						style={styles.category}>
						<Image style={styles.categoryImage} source={{ uri: item.pic }} />
						<Text
							style={{ ...styles.name, color: darkTheme ? "white" : "black" }}>
							{item.name}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
			<Text
				style={{ ...styles.subTitle, color: darkTheme ? "white" : "black" }}>
				Sources
			</Text>
			<View style={styles.sources}>
				{sources.map((elem) => (
					<TouchableOpacity
						onPress={() => setSource(elem.id)}
						key={elem.id}
						style={styles.sourceContainer}>
						<Image style={styles.sourceImage} source={{ uri: elem.pic }} />
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default DiscoverScreen;

const styles = StyleSheet.create({
	discover: {
		padding: 10,
		alignItems: "center",
	},
	subTitle: {
		fontSize: 20,
		fontWeight: "bold",
		paddingBottom: 8,
		marginHorizontal: 8,
		borderBottomColor: "#007FFF",
		borderBottomWidth: 5,
		alignSelf: "flex-start",
		borderRadius: 10,
	},
	categoryImage: {
		height: "60%",
		width: "100%",
		resizeMode: "contain",
	},
	name: {
		textTransform: "capitalize",
		fontSize: 14,
	},
	category: {
		height: 130,
		margin: 10,
		alignItems: "center",
		justifyContent: "space-evenly",
		marginHorizontal: 30,
	},
	sourceImage: {
		height: "100%",

		borderRadius: 10,
		resizeMode: "cover",
	},
	sources: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		paddingVertical: 15,
	},
	sourceContainer: {
		height: 150,
		width: "40%",
		borderRadius: 10,
		margin: 15,
		backgroundColor: "#cc313d",
	},

	container: {
		backgroundColor: "white",

		width: "80%",
		position: "relative",
		left: -34,
		borderRadius: 10,
		marginBottom: 20,
	},
	dropdown: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
		color: "black",
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
