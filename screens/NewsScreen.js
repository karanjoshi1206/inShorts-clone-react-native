import React, { useContext, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Linking,
} from "react-native";
import { NewsContext } from "../Api/Context";
import SingleNewsItem from "../components/SingleNewsItem";

const NewsScreen = () => {
	const {
		news: { articles },
	} = useContext(NewsContext);
	const [activeIndex, setActiveIndex] = useState();
	const windowHeight = Dimensions.get("window").height;
	console.log(articles);
	return (
		<View style={styles.carousel}>
			{articles && (
				// <Carousel
				// 	firstItem={articles.slice(0, 10).length - 1}
				// 	layout='stack'
				// 	data={articles.slice(0, 10)}
				// 	sliderHeight={300}
				// 	itemHeight={windowHeight}
				// 	vertical={true}
				// 	renderItem={({ item, index }) => (
				// 		<SingleNewsItem item={item} index={index} />
				// 	)}
				// 	onSnapToItem={(index) => setActiveIndex(index)}
				// />
				<ScrollView
					snapToEnd={true}
					decelerationRate={0.9}
					snapToInterval={windowHeight} //your element width
					snapToAlignment={"center"}>
					{articles.map((elem) => (
						<SingleNewsItem key={Math.random(0, 100)} item={elem} />
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default NewsScreen;

const styles = StyleSheet.create({
	carousel: {
		flex: 1,
		// transform: [{ scaleY: -1 }],
		backgroundColor: "black",
	},
});
