import React from "react";
import { useState } from 'react';
import styles from './styles.module.css';
import TaskDetails from "./TaskDetails";

const ShowTasks = ({ tasks, setTasks }) => {
    const [selectedTask, setSelectedTask] = useState(null);

    const handleSelectTask = (task) => {
        setSelectedTask(task);
    };

    const handleCloseDetails = () => {
        setSelectedTask(null);
    };

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        setSelectedTask(null);
    };


    return (
        <div className={styles.usersBox}>
            {selectedTask ? (
                <TaskDetails task={selectedTask} onClose={handleCloseDetails} onDelete={handleDeleteTask} />
            ) : (
                tasks.map((task) => (
                    <button className={styles.buttonContent} key={task._id} onClick={() => handleSelectTask(task)}>
                        {task.nazwaZadania} {task.opis} {task.tresc}
                    </button>
                ))
            )}
        </div>
    );
};

export default ShowTasks;