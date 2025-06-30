const express = require("express");
const router = express.Router();
const { generateFlowchart } = require("../controllers/flowchartController");
router.post("/generate", generateFlowchart);
module.exports = router;