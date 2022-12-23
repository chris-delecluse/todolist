import React, {FC} from 'react';
import {TextInput, View} from "react-native";
import {styles} from "./styles";
import {TaskTextInputProps} from "./TaskTextInputProps";

const TaskTextInput: FC<TaskTextInputProps> = ({handleOnChange, children}): JSX.Element => {
    return (
        <View style={{flex: 1}}>
            <TextInput placeholder={'Put your task here'}
                       onChangeText={handleOnChange}
                       style={styles.input}>
                {children}
            </TextInput>
        </View>
    );
};

export default TaskTextInput;
