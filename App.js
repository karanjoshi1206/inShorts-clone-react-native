import React, { useContext } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import InshortsTab from "./components/InshortsTab";
import Context, { NewsContext } from "./Api/Context";
function App() {
	const { darkTheme } = useContext(NewsContext);
	return (
		<View
			style={{
				...styles.container,
				backgroundColor: darkTheme ? "#282C35" : "white",
			}}>
			<InshortsTab />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
});
export default () => {
	return (
		<Context>
			<App />
		</Context>
	);
};
