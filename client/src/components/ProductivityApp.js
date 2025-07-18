import React, { useState } from 'react';
import { Plus, Trash2, Gift, CheckCircle, Circle, Star, Loader } from 'lucide-react';
// These would be your custom hooks (uncomment when backend is ready)
// import { useTasks } from '../hooks/useTasks';
// import { useRewards } from '../hooks/useRewards';
// import { useAuth } from '../hooks/useAuth';

const ProductivityApp = () => {
  // Mock data for testing without backend
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React Hooks', points: 10, completed: false, createdAt: '2024-01-15', dueDate : '2024-01-15' },
    { id: 2, title: 'Build a todo app', points: 15, completed: true, createdAt: '2024-01-14', dueDate : '2024-01-15'},
    { id: 3, title: 'Set up API routes', points: 20, completed: false, createdAt: '2024-01-16', dueDate : '2024-01-17'},
    { id: 4, title: 'Write unit tests', points: 25, completed: true, createdAt: '2024-01-13', dueDate : '2024-01-17' },
    { id: 5, title: 'Deploy to production', points: 30, completed: false, createdAt: '2024-01-17', dueData: '2024-01-17' }
  ]);
  
  const [rewards, setRewards] = useState([
    { id: 1, title: 'Watch a movie', cost: 20, createdAt: '2024-01-15' },
    { id: 2, title: 'Order favorite food', cost: 30, createdAt: '2024-01-14' },
    { id: 3, title: 'Buy a new book', cost: 25, createdAt: '2024-01-12' },
    { id: 4, title: 'Gaming session (2 hours)', cost: 35, createdAt: '2024-01-16' },
    { id: 5, title: 'Spa day', cost: 50, createdAt: '2024-01-11' }
  ]);
  
  const [newTask, setNewTask] = useState({ title: '', points: 5 });
  const [newReward, setNewReward] = useState({ title: '', cost: 10 });
  const [loading, setLoading] = useState(false);

  // When backend is ready, replace above with:
  // const { tasks, loading: tasksLoading, createTask, updateTask, deleteTask, toggleTask } = useTasks();
  // const { rewards, loading: rewardsLoading, createReward, updateReward, deleteReward, claimReward } = useRewards();
  // const { user, isAuthenticated } = useAuth();
  
  // Calculate total points earned
  const totalPoints = tasks.filter(task => task.completed).reduce((sum, task) => sum + task.points, 0);
  const availablePoints = totalPoints - rewards.filter(reward => reward.claimed).reduce((sum, reward) => sum + reward.cost, 0);

  // Task CRUD Operations (will be replaced by custom hooks)
  const addTask = async () => {
    if (newTask.title.trim()) {
      setLoading(true);
      try {
        // When backend is ready: await createTask(newTask);
        setTasks([...tasks, {
          id: Date.now(), // Backend will generate proper ID
          title: newTask.title,
          points: parseInt(newTask.points),
          completed: false
        }]);
        setNewTask({ title: '', points: 5 });
      } catch (error) {
        console.error('Failed to create task:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      // When backend is ready: await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id) => {
    setLoading(true);
    try {
      // When backend is ready: await toggleTask(id);
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error('Failed to toggle task:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reward CRUD Operations (will be replaced by custom hooks)
  const addReward = async () => {
    if (newReward.title.trim()) {
      setLoading(true);
      try {
        // When backend is ready: await createReward(newReward);
        setRewards([...rewards, {
          id: Date.now(),
          title: newReward.title,
          cost: parseInt(newReward.cost),
          claimed: false
        }]);
        setNewReward({ title: '', cost: 10 });
      } catch (error) {
        console.error('Failed to create reward:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteReward = async (id) => {
    setLoading(true);
    try {
      // When backend is ready: await deleteReward(id);
      setRewards(rewards.filter(reward => reward.id !== id));
    } catch (error) {
      console.error('Failed to delete reward:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReward = async (id) => {
    const reward = rewards.find(r => r.id === id);
    if (reward && availablePoints >= reward.cost) {
      setLoading(true);
      try {
        // When backend is ready: await claimReward(id);
        setRewards(rewards.map(reward => 
          reward.id === id ? { ...reward, claimed: true } : reward
        ));
      } catch (error) {
        console.error('Failed to claim reward:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Productivity Based Rewards App
        </h1>
        <div className="bg-white rounded-lg shadow-md p-4 inline-block">
          <div className="flex items-center gap-2 text-lg">
            <Star className="text-yellow-500" size={24} />
            <span className="font-semibold">Available Points: {availablePoints}</span>
            {loading && <Loader className="animate-spin text-blue-500" size={20} />}
          </div>
        </div>
      </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              Tasks
            </h2>
            
            {/* Add Task Form */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Add New Task</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Points"
                  value={newTask.points}
                  onChange={(e) => setNewTask({...newTask, points: e.target.value})}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={addTask}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Task
              </button>
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className={`p-4 rounded-lg border-2 transition-all ${
                  task.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`transition-colors ${
                          task.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                        }`}
                      >
                        {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                      </button>
                      <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                        {task.points} pts
                      </span>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Gift className="text-purple-500" />
              Rewards
            </h2>
            
            {/* Add Reward Form */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Add New Reward</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Reward title"
                  value={newReward.title}
                  onChange={(e) => setNewReward({...newReward, title: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  placeholder="Cost"
                  value={newReward.cost}
                  onChange={(e) => setNewReward({...newReward, cost: e.target.value})}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={addReward}
                className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Reward
              </button>
            </div>

            {/* Rewards List */}
            <div className="space-y-3">
              {rewards.map(reward => (
                <div key={reward.id} className={`p-4 rounded-lg border-2 transition-all ${
                  reward.claimed 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gift className={`${reward.claimed ? 'text-yellow-500' : 'text-purple-500'}`} size={20} />
                      <span className={`${reward.claimed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {reward.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                        {reward.cost} pts
                      </span>
                      {!reward.claimed && (
                        <button
                          onClick={() => handleClaimReward(reward.id)}
                          disabled={availablePoints < reward.cost}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            availablePoints >= reward.cost
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Claim
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReward(reward.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityApp;