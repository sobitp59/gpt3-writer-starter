import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Write me a detailed table of contents for a blog post with the title below.

Title:
`

const generateAction = async (req, res) => {

 // prompt to generate the table of contents
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 600,
  });
  const basePromptOutput = baseCompletion.data.choices.pop();

  // prompt to generate the final blogposts
  const finalPrompt = `
  Take the table of contents and title of the blog post below and generate a blog post. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

  Title: ${req.body.userInput}

  Table of Contents: ${basePromptOutput.text}

  Blog Post:
  `

  const finalCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${finalPrompt}`,
    temperature: 0.8,
    max_tokens: 1250,
  })

  const finalPromptOutput = finalCompletion.data.choices.pop()

  res.status(200).json({ output: finalPromptOutput });
};

export default generateAction;