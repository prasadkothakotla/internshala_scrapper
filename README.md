# 🚀 Internshala Job & Internship Scraper

An automated **Internshala Job & Internship Scraper** built with **n8n** that collects the latest job and internship opportunities from Internshala and delivers them directly to a **Telegram channel or chat**.

No need to manually check Internshala every day — the workflow automatically fetches new opportunities, processes the data, and sends updates to Telegram.

---

## ✨ Features

* 🔎 Automatically scrapes Internshala job and internship listings
* 💼 Supports both **Jobs** and **Internships**
* 🤖 Fully automated using **n8n workflows**
* 📲 Sends new opportunities directly to Telegram
* 🧹 Processes and formats scraped data before sending
* 🔗 Includes direct links to job/internship postings
* ⏰ Can run automatically on a scheduled interval
* 🚫 Helps avoid sending duplicate listings
* ⚡ Near real-time opportunity notifications
* 🛠️ Easily customizable for specific roles, locations, skills, or categories

---

## 🏗️ Workflow Architecture

```text
                ┌──────────────────┐
                │   n8n Scheduler  │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Internshala      │
                │ Job/Internship   │
                │ Listings         │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Scrape / Fetch   │
                │ Job Data         │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Data Processing  │
                │ & Filtering      │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Format Telegram  │
                │ Message          │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Telegram Bot     │
                └────────┬─────────┘
                         │
                         ▼
                 📱 Job/Internship
                    Notification
```

---

## 🧰 Tech Stack

| Technology           | Purpose                             |
| -------------------- | ----------------------------------- |
| **n8n**              | Workflow automation                 |
| **Internshala**      | Source of job & internship listings |
| **Telegram Bot API** | Sends opportunity notifications     |
| **HTTP Requests**    | Fetch listing data                  |
| **JavaScript**       | Data processing and formatting      |
| **Scheduler/Cron**   | Automatic workflow execution        |

---

## 📋 Telegram Notification

The workflow formats each opportunity into a simple Telegram message.

Example:

```text
🚀 NEW INTERNSHIP

💼 Role:
Software Development Intern

🏢 Company:
Example Technologies

📍 Location:
Remote

💰 Stipend:
₹15,000 / Month

⏳ Duration:
6 Months

🔗 Apply:
https://internshala.com/...

━━━━━━━━━━━━━━━━━━
🤖 Automated by Internshala Scraper
```

---

## ⚙️ How It Works

### 1. Schedule Trigger

The n8n workflow starts automatically using a schedule trigger.

You can configure it to run:

* Every hour
* Every few hours
* Daily
* Or any custom interval supported by n8n

### 2. Fetch Internshala Listings

The workflow retrieves the latest Internshala job or internship listing data.

### 3. Extract Information

Relevant information is extracted from each listing, such as:

* Job/Internship title
* Company name
* Location
* Stipend or salary
* Duration
* Experience
* Skills
* Application URL

### 4. Filter & Process

The scraped information can be filtered according to your requirements.

For example:

```text
Software Development
Python
Java
Machine Learning
Data Science
Web Development
Remote
```

### 5. Format the Notification

The extracted information is converted into a clean Telegram-friendly message.

### 6. Send to Telegram

The n8n Telegram node sends the formatted opportunity to your Telegram channel, group, or chat.

---

## 🧩 n8n Workflow

A typical workflow looks like:

```text
Schedule Trigger
       ↓
HTTP Request
       ↓
Extract Listings
       ↓
Filter Opportunities
       ↓
Remove Duplicates
       ↓
Format Message
       ↓
Telegram
```

---

## 🔐 Configuration

Before running the workflow, configure your Telegram bot.

### Telegram Bot

Create a bot using **BotFather** and obtain your:

```text
TELEGRAM_BOT_TOKEN
```

Then configure the Telegram credentials inside n8n.

You will also need the target:

```text
CHAT_ID
```

for the Telegram channel, group, or chat where notifications should be sent.

---

## 🚀 Getting Started

### 1. Install n8n

You can run n8n locally, using Docker, or through a hosted deployment.

### 2. Import the Workflow

Import the provided n8n workflow JSON into your n8n instance.

```text
n8n
 ↓
Workflows
 ↓
Import from File
 ↓
Select workflow JSON
```

### 3. Configure Credentials

Add your Telegram bot credentials to the Telegram node.

### 4. Configure Filters

Modify the workflow to match the opportunities you're interested in.

For example:

```text
Role       → Software Developer
Skills     → Python, Java, React
Location   → Remote / India
Type       → Internship
```

### 5. Activate the Workflow

Once configured, activate the workflow.

n8n will automatically execute the workflow according to your configured schedule.

---

## 🎯 Use Cases

This automation can be useful for:

* 🎓 Students looking for internships
* 👨‍💻 Developers searching for jobs
* 🧑‍🎓 Freshers searching for opportunities
* 📢 Telegram job/internship communities
* 🤖 Automated job-alert systems
* 📊 Personal job opportunity tracking

---

## 🔮 Future Improvements

Possible extensions include:

* AI-powered job filtering
* Resume-based opportunity matching
* Skill-based recommendations
* Multiple Telegram channels
* Email notifications
* WhatsApp notifications
* Database storage for historical listings
* Duplicate detection using a database
* Application deadline reminders
* AI-generated job summaries
* Automatic classification of jobs by technology
* Personalized opportunity scoring

---

## ⚠️ Disclaimer

This project is intended for **educational and personal automation purposes**.

Please respect Internshala's **Terms of Service, robots.txt, rate limits, and other applicable policies** when fetching or processing website data. Avoid excessive requests or behavior that could negatively impact the service.

---

## 👨‍💻 Author

**Kottakotla Prasad**

If you find this project useful, consider giving it a ⭐ on GitHub.

---

## 📜 License

This project is available under the **MIT License**.
