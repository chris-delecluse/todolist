import {Button, StyleSheet, TouchableOpacity, View, Text, Pressable} from 'react-native';
import React, {useState} from "react";
import TaskTextInput from "./src/components/taskTextInput/TaskTextInput";
import {StatusBar} from "expo-status-bar";
import TaskList from "./src/components/taskList/TaskList";

export default function App() {
    const [textInputValue, setTextInputValue] = useState<string>('')
    const [value, setValue] = useState<Array<string>>([])

    const handleOnChange = (text: string) => setTextInputValue(text)

    const handleOnPress = () => {
        textInputValue.length <= 0 ? setTextInputValue('') : setValue(prev => [...prev, textInputValue])
        setTextInputValue('')
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <StatusBar style="auto"/>
                <TaskTextInput handleOnChange={handleOnChange}>{textInputValue}</TaskTextInput>
                <Button title={'Add task'} onPress={handleOnPress}/>

            </View>
            <TaskList tasks={value}/>


            <Pressable onPress={() => {console.log('button pressed')}}>
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