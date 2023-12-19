# ct-azure-openai-playground

Misc. experiments with Azure OpenAI

## About

Demos use Node.js/TypeScript to run some simple examples against an Azure OpenAI Services resource.

NOTE: repo code is NOT production ready, use at your own risk :sweat_smile:

## Running Locally

### Prerequisites

- Node.js >= 20.x (with npm >= v10.x)
- Azure subscription with [access to Azure OpenAI](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/overview#how-do-i-get-access-to-azure-openai)
  - Deployed/available Azure OpenAI [resource and models](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal)

### Getting Started

1. Clone repo
    - `git clone https://github.com/CU-CommunityApps/ct-azure-openai-playground.git`
1. Enter directory
    - `cd ct-azure-openai-playground`
1. Install dependencies
    - `npm install`
1. Copy `.env.example` to `.env` and then replace necessary values `cp .env.example .env`
    - `AOAI_BASE_PATH` set to your Azure OpenAI resource endpoint
    - `AOAI_API_KEY` set to your Azure OpenAI resource API key
    - `AOAI_GPT4_DEPLOYMENT_NAME` set to the name of the deployed Azure OpenAI GPT-4 model you want to use
    - `AOAI_GPT35_DEPLOYMENT_NAME` set to the name of the deployed Azure OpenAI GPT-35 model you want to use
    - `AOAI_GPT4_VISION_DEPLOYMENT_NAME` set to the name of the deployed Azure OpenAI GPT-4 Vision model you want to use
    - `AOAI_INSTRUCT_DEPLOYMENT_NAME` set to the name of the deployed Azure OpenAI instruct model (e.g. 'gpt-35-turbo-instruct') you want to use
    - `AOAI_DALLE_DEPLOYMENT_NAME` set to the name of the deployed Azure DALL-E 3 model you want to use
    - `AOAI_API_VERSION` set to Azure OpenAI API Version (e.g. `2023-12-01-preview`), supported versions available here: <https://learn.microsoft.com/en-us/azure/cognitive-services/openai/reference#completions>
    - `AOAI_DALLE_API_VERSION` set to Azure OpenAI DALL-E 3 API Version (e.g. `2023-12-01-preview`)
1. Run one of the demos:
    - `npm run text-completion-demo` ([demo info](#text-completion-demo-using-official-nodejs-openai-library))
    - `npm run text-completion-rest-demo` ([demo info](#text-completion-demo-using-rest-api))
    - `npm run image-generation-demo` ([demo info](#image-generation-demo-using-rest-api))

## Demos

### Text Completion Demo (using official Node.js OpenAI library)

Uses the official Node.js OpenAI library to access an Azure OpenAI resource endpoint and generate a completion with a text model.

Demo analyzes a text string and returns a list of emojis that best represent the text. The data is returned as a JSON array of objects
with keys for the emoji, the markdown short code, and the reasoning for choosing that emoji.

NOTE: this demo uses `davinci-002` model

Input text:
> "Cornell is a private, Ivy League university and the land-grant university for New York state. Cornell's mission is to discover, preserve and disseminate knowledge, to educate the next generation of global citizens, and to promote a culture of broad inquiry throughout and beyond the Cornell community. Cornell also aims, through public service, to enhance the lives and livelihoods of students, the people of New York and others around the world."

_source: <https://www.cornell.edu/about/mission.cfm>_

Example output:

```json
[
  {
    "emoji": "🤝",
    "shortCode": ":handshake:",
    "reason": "To represent the collaboration between Cornell and its students, the people of New York, and others around the world."
  },
  {
    "emoji": "📚",
    "shortCode": ":books:",
    "reason": "To represent Cornell's mission to discover, preserve, and disseminate knowledge."
  },
  {
    "emoji": "🌎",
    "shortCode": ":earth_americas:",
    "reason": "To represent Cornell's mission to educate the next generation of global citizens."
  },
  {
    "emoji": "🤔",
    "shortCode": ":thinking:",
    "reason": "To represent Cornell's mission to promote a culture of broad inquiry."
  },
  {
    "emoji": "🙌",
    "shortCode": ":raised_hands:",
    "reason": "To represent Cornell's mission to enhance the lives and livelihoods of its students."
  }
]
```

### Text Completion Demo (using REST API)

Uses [Got HTTP request library](https://github.com/sindresorhus/got) to access an Azure OpenAI resource endpoint and generate
a completion with a text model.

This demo does the same as the above demo, but uses the REST API directly (vs the official Node.js OpenAI library). See above
for more details, input text, and example output.

### Image Generation Demo (using REST API)

Uses [Got HTTP request library](https://github.com/sindresorhus/got) to access an Azure OpenAI resource endpoint and generate an
image with DALL-E.

Demo takes a text prompt and sends it to the DALL-E 3 endpoint to request an image. It then downloads the image and saves it
locally as a PNG file. The terminal output will show the original prompt, the path to the generated image, and a preview of
the image in the terminal.

Input text:
> "Detailed image of a clock tower on an ivy league college campus with a pumpkin on the very top of it's spire in a hyper realistic photo with natural lighting."

Example generated images:

![Generated Image 1](./src/dall-e-image-rest/generated-images/thumbnails/16198ee7-f2a0-44ee-a818-97959206527e.jpg) ![Generated Image 2](./src/dall-e-image-rest/generated-images/thumbnails/74ab7781-a594-4347-a922-7585d9f09a8f.jpg)
![Generated Image 3](./src/dall-e-image-rest/generated-images/thumbnails/c6855b8e-6724-48df-962a-e629e304e0a3.jpg) ![Generated Image 4](./src/dall-e-image-rest/generated-images/thumbnails/a7a8f5d1-1b01-4bc2-8062-e7f17daf04d5.jpg)
