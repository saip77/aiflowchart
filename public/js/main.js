async function generate() {
    const promptInput = document.getElementById("userPrompt");
    const mermaidDiv = document.getElementById("chartArea");
    const markdownArea = document.getElementById("markdownArea");
    markdownArea.innerHTML = "";
    
    const prompt = promptInput.value.trim();
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate chart");
      }
      
      const mermaidMd = await response.json();
      console.log(mermaidMd.markdown);
      const value = mermaidMd.markdown;
      const element = document.createElement("div");
      element.id = "graphDiv";
      const { svg } = await window.mermaid.render('graphDiv', value);
      console.log(svg);
      // element.innerHTML = svg;
      markdownArea.innerHTML = value;
      mermaidDiv.innerHTML = svg;
    } catch (error) {
      alert("Error generating flowchart: " + error.message);
      console.error(error);
    }
  }