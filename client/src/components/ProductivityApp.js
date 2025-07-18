import React, { useState } from 'react'
import { Plus, Trash2, Gift, CheckCircle, Circle, Star, Loader } from 'lucide-react';


const ProductivityApp = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Learn React Hooks', points: 10, completed: false },
        { id: 2, title: 'Build a todo app', points: 15, completed: true }
    ]);
    const [rewards, setRewards] = useState([
        { id: 1, title: 'Watch a movie', cost: 20, claimed: false },
        { id: 2, title: 'Order favorite food', cost: 30, claimed: false }
    ]);

    // the following three lines will be replaced when the backend is ready 
    const [newTask, setNewTask] = useState({ title: '', points: 0 });
    const [newReward, setNewReward] = useState({ title: '', points: 0 });
    const [loading, setLoading] = useState(false);

    const totalPoints = tasks.filter(task => task.completed).reduce((sum, task) => sum + task.points, 0);
    const availablePoints = totalPoints - rewards.filter(reward => reward.claimed).reduce((sum, reward) => sum + reward.cost, 0);

    const addTask = async () => {
        if (newTask.title.trim()) {
            setLoading(true);
            try {
                // when backend is ready, I can replace this with await createTask(newTask)
                setTasks([...tasks, {
                    id: Date.now(), // Backend will generate proper ID
                    title: newTask.title,
                    points: parseInt(newTask.points),
                    completed: false
                }]);
                setNewTask({ title: '', points: 5 });
            } catch (error) {
                console.log("Failed to create task: ", error);
            } finally {
                setLoading(false);
            }
        }
    }

    const handleDeleteTask = async (id) => {
        setLoading(true);
        try {
            // when backend is ready, I can add await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.log("Failed to delete task: ", error);
        } finally {
            setLoading(false);
        }
    }

    const handleToggleTask = async (id) => {
        setLoading(true);
        try {
            // When backend is ready: await toggleTask(id);
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ));
        } catch (error) {
            console.log("Failed to delete task: ", error);
        } finally {
            setLoading(false); 
        }
    }
}