const serverHealth = async (req, res) => {
  console.log("Server health check initiated");
  try {
    // Simulate a health check by returning a simple response
    res.status(200).json({ status: "Server is healthy" });
  } catch (error) {
    console.error("Error during health check:", error);
    res.status(500).json({ status: "Server is unhealthy" });
  }
};

module.exports = { serverHealth };
