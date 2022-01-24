import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import DiscoverScreen from "../screens/DiscoverScreen";
import NewsScreen from "../screens/NewsScreen";
import Context, { NewsContext } from "../Api/Context";
import TopNavigation from "./TopNavigation";

const InshortsTab = () => {
	const layout = useWindowDimensions();
	const { index, setIndex } = useContext(NewsContext);
	const [routes] = React.useState([
		{ key: "first", title: "Discover" },
		{ key: "second", title: "News" },
	]);
	const renderScene = SceneMap({
		first: DiscoverScreen,
		second: NewsScreen,
	});
	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={() => <TopNavigation index={index} setIndex={setIndex} />}
		/>
	);
};

export default InshortsTab;

const styles = StyleSheet.create({});
