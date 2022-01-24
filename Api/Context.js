import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getNewsAPI, getSourceAPI, sources } from "./api";
export const NewsContext = createContext();
const Context = ({ children }) => {
	const [news, setNews] = useState([]);
	const [category, setCategory] = useState("general");
	const [index, setIndex] = useState(1);
	const [source, setSource] = useState();
	const [country, setCountry] = useState();
	const [darkTheme, setDarkTheme] = useState(true);
	const fetchNews = async (reset = category) => {
		console.log("Runns");

		try {
			const { data } = await axios.get(getNewsAPI(reset, country));
			setNews(data);
			setIndex(1);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchNewsFromSource = async () => {
		try {
			const { data } = await axios.get(getSourceAPI(source));
			setNews(data);
			setIndex(1);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchNews();
		return () => {
			setNews([]);
		};
	}, [category, country]);
	useEffect(() => {
		fetchNewsFromSource();
		return () => {
			setNews([]);
		};
	}, [source]);

	return (
		<NewsContext.Provider
			value={{
				news,
				index,
				darkTheme,
				setIndex,
				setCategory,
				setSource,
				fetchNews,
				setDarkTheme,
				setCountry,
			}}>
			{children}
		</NewsContext.Provider>
	);
};
export default Context;
