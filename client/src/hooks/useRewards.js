export const useRewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      setError(null);
      const rewardsData = await apiService.getRewards();
      setRewards(rewardsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createReward = async (rewardData) => {
    try {
      const newReward = await apiService.createReward(rewardData);
      setRewards(prev => [...prev, newReward]);
      return newReward;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateReward = async (id, updates) => {
    try {
      const updatedReward = await apiService.updateReward(id, updates);
      setRewards(prev => prev.map(reward => 
        reward.id === id ? { ...reward, ...updatedReward } : reward
      ));
      return updatedReward;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteReward = async (id) => {
    try {
      await apiService.deleteReward(id);
      setRewards(prev => prev.filter(reward => reward.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const claimReward = async (id) => {
    await updateReward(id, { claimed: true });
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  return {
    rewards,
    loading,
    error,
    createReward,
    updateReward,
    deleteReward,
    claimReward,
    refetch: fetchRewards
  };
};