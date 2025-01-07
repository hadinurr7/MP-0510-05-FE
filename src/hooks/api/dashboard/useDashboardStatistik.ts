import { useState, useEffect } from "react";
import axios from "axios";

interface DashboardStats {
  totalRevenue: number;
  totalAttendees: number;
  totalEvent: number;
  chart: { month: string; count: number }[];
}

const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/dashboard/statistics");
        setStats(response.data);
      } catch (error) {
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

export default useDashboardStats;
