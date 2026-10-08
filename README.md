# PhonePoint AI - n8n final project


An import-ready submission for an imaginary phone shop called **PhonePoint**. It includes the two requested n8n workflows, a Hebrew RTL chat interface, and the business knowledge file used by the chatbot.


## Contents


| File | Purpose |
| --- | --- |
| `workflows/01-phonepoint-chatbot.json` | PhonePoint customer-service chatbot: Webhook, GitHub knowledge file, Gemini, a 15-message memory window, and an AI Agent |
| `workflows/02-birthday-greeting.json` | Birthday greeting automation: Webhook/form payload, Gemini, Airtable, Brevo, and JSON response |
| `web/index.html` | Responsive Hebrew chat UI for the first workflow |
| `knowledge/phonepoint-knowledge.txt` | Store-only knowledge base, intentionally below 5,000 words |
| `examples/birthday-request.json` | A ready Postman body for the second workflow |


## Run the chatbot


1. Import `workflows/01-phonepoint-chatbot.json` into n8n.
2. In the **Google Gemini Chat Model** node, select a Gemini credential and an available text model (for example `gemini-2.0-flash`).
3. The workflow already points to this repository's public raw knowledge file. If you fork or rename the repository, update the URL in the **Get PhonePoint Knowledge** node.
4. Activate the workflow. Copy its Production webhook URL.
5. Open `web/index.html` and replace `PASTE_N8N_WEBHOOK_URL_HERE` with that URL. Open the file in a browser.


The agent only answers questions about PhonePoint. For unrelated questions it politely says it can only assist with the store, as required by the assignment. The memory node retains the latest 15 messages per browser session.


## Run the birthday flow


1. Import `workflows/02-birthday-greeting.json` into n8n.
2. Configure credentials in the **Google Gemini Chat Model**, **Create Airtable Record**, and **Send via Brevo** nodes. Set the Airtable base/table and Brevo sender address for your own accounts.
3. Activate the workflow and send a POST request to its Production webhook URL. Use `examples/birthday-request.json` as the JSON body.


Required fields are `recipientName`, `senderName`, `recipientEmail`, `favoriteTopics`, and `style`. The workflow creates the greeting with AI, saves these six required columns (excluding Airtable ID), emails it with Brevo, and responds with the final greeting.


## Airtable columns


Create these exact columns in Airtable: `Recipient Name`, `Sender Name`, `Recipient Email`, `Favorite Topics`, `AI Greeting`, `Email Sent`.


## Notes for submission


Keep both JSON workflow exports and the `web` folder in the GitHub repository. Do not commit API keys, webhook secrets, or credentials; n8n credentials are deliberately referenced by name only.

