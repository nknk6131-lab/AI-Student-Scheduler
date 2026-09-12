# NK Scheduler

A lightweight AI-style study planner that turns natural-language academic requirements into an adaptive weekly timetable.

## Features

- Understands natural-language task input
- Prioritizes exams, assignments, projects, and revision blocks
- Creates daily study sessions based on available hours and preferred study time
- Includes short breaks between sessions
- Allows adaptive rescheduling when deadlines shift or priorities change
- Displays a simple productivity summary and recommendations

## Run locally

Open the project folder in a browser, then load `index.html` directly.

For a local web server:

```bash
cd "C:\Users\Nandhakishore N\Vs project\AI Student scheduler"
python -m http.server 8000
```

Then open http://localhost:8000

## Example prompt

> I have a DSA exam in five days, a DBMS assignment due in two days, and I can study three hours every evening.

## Project files

- `index.html` — app structure
- `styles.css` — visual design
- `script.js` — AI scheduling logic and adaptive update flow
