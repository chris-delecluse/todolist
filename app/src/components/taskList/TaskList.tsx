import React, {FC} from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import {TaskListProps} from "./TaskListProps";

const TaskList: FC<TaskListProps> = ({tasks}): JSX.Element => {
        return (
            <React.Fragment>
                {tasks.map((item, index) => {
                    return (
                        <View key={index}
                              style={styles.container}>
                            <Text>{item}</Text>
                            <Button title={'remove'}
                                    onPress={() => tasks.splice(tasks.indexOf(item), 1)}/>
                        </View>
                    )
                })}
            </React.Fragment>
        );
    }
;

export default TaskList;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})
