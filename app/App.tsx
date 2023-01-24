import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import TaskTextInput from "./src/components/taskTextInput/TaskTextInput";
import { StatusBar } from "expo-status-bar";
import TaskList from "./src/components/taskList/TaskList";
import { userLoginAxios, userLogoutAxios } from "./src/api";
import { storeToken } from "./src/utils";

export default function App() {
	const [textInputValue, setTextInputValue] = useState<string>('')
	const [value, setValue] = useState<Array<string>>([])

	const handleOnChange = (text: string) => setTextInputValue(text)

	const handleOnPress = () => {
		textInputValue.length <= 0 ? setTextInputValue('') : setValue(prev => [...prev, textInputValue])
		setTextInputValue('')
	}

	useEffect(() => {
		const t = async () => {
			const test = await userLoginAxios({
				email: 'diwaa@gmail.com',
				password: 'Root1'
			})

			await storeToken(test.data.results.token)
		}
		t().then()
	}, [])

	const buttonPress = async () => {
		const t = await userLogoutAxios()
		console.log(t.data)
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputWrapper}>
				<StatusBar style="auto"/>
				<TaskTextInput handleOnChange={handleOnChange}>{textInputValue}</TaskTextInput>
				<Button title={'Add task'} onPress={handleOnPress}/>

			</View>
			<TaskList tasks={value}/>


			<Pressable onPress={() => {
				buttonPress().then()
			}}>
				<Text>Hello</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 100,
	},
	inputWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "lightgray"
	}
});
