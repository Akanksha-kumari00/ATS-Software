router.get("/stats", async (req, res) => {
  try {
    const stats = {
      totalApplications: 156,
      cvShared: 28,
      shortlisted: 38,
      interview: 26,
      selected: 18,
      rejected: 14,
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});