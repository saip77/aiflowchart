const openai = require("../config/openai");

const generateFlowchart = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `  You are an assistant to help user build diagram with Mermaid.
                                You only need to return the output Mermaid code block.
                                Do not include any description, do not include the \`\`\`.
                                Code (no \`\`\`): +
                                The following is the syntax for creating mermaid mindmap notation:

                                1. It should start with the word mindmap, and the first node has to be the "root" node followed by two barkets like:
                                root((main idea))

                                2. ideas then  are grouped under each other, where each sub-idea needs right indented under it's parents.

                                3. Except for the root node, Ideas and sub-ideas shouldn't include any types of brackets, like curly brackets, brackets, or square brackets

                                4. Also, you can use ::icon(fa fa-icon-name) from https://fontawesome.com/ to illustrate a node with relevant in a seperate line under the node or subnode for illustation

                                5. Limit the node to 3 words maximum and the sub-nodes and downwards to 2 words maximum.

                                As per the mermaid mindmap notation above, please summarize the article below into a mermaid mindmap notation.
                                `,
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        res.json({ markdown: response.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to generate Mermaid chart" });
    }
};

module.exports = { generateFlowchart };

