const sampleInput = 'I have a DSA exam in five days, a DBMS assignment due in two days, and I can study three hours every evening.';

const HOURS_TO_MINUTES = 60;
const TASK_TYPES = {
  exam: { label: 'Exam', color: '#fb7185' },
  assignment: { label: 'Assignment', color: '#fbbf24' },
  project: { label: 'Project', color: '#7c9cff' },
  quiz: { label: 'Quiz', color: '#34d399' },
  revision: { label: 'Revision', color: '#a78bfa' },
  reading: { label: 'Reading', color: '#22d3ee' }
};

const inputText = document.getElementById('inputText');
const hoursPerDayInput = document.getElementById('hoursPerDay');
const preferredWindow = document.getElementById('preferredWindow');
const generateBtn = document.getElementById('generateBtn');
const sampleBtn = document.getElementById('sampleBtn');
const rescheduleBtn = document.getElementById('rescheduleBtn');
const taskList = document.getElementById('taskList');
const scheduleGrid = document.getElementById('scheduleGrid');
const recommendationList = document.getElementById('recommendationList');
const urgentCount = document.getElementById('urgentCount');
const totalHours = document.getElementById('totalHours');
const focusScore = document.getElementById('focusScore');
const breakCount = document.getElementById('breakCount');
const statusBadge = document.getElementById('statusBadge');
const windowLabel = document.getElementById('windowLabel');

const state = {
  schedule: [],
  tasks: []
};

function parseNaturalLanguage(input) {
  const normalized = input.trim();
  if (!normalized) {
    return {
      tasks: [],
      hoursPerDay: 3,
      preferredWindow: 'evening'
    };
  }

  const lower = normalized.toLowerCase();
  const hoursMatch = lower.match(/study\s+(\d+(?:\.\d+)?)\s+hours?/i) || lower.match(/(\d+(?:\.\d+)?)\s+hours?\s+every/i);
  const hoursPerDay = hoursMatch ? Number(hoursMatch[1]) : Number(hoursPerDayInput.value || 3);

  const windowMatch = lower.match(/morning|afternoon|evening|night/i);
  const selectedWindow = windowMatch ? windowMatch[0].toLowerCase() : preferredWindow.value || 'evening';

  const tasks = [];
  const clauses = normalized.split(/[,;]|and\b/).filter(Boolean);

  clauses.forEach((clause) => {
    const cleanedClause = clause.trim();
    if (!cleanedClause) return;

    const daysMatch = cleanedClause.match(/(\d+)\s+day(?:s)?/i) || cleanedClause.match(/in\s+(\d+)\s+day(?:s)?/i);
    const dueInDays = daysMatch ? Number(daysMatch[1]) : 3;

    let type = 'revision';
    if (/exam/i.test(cleanedClause)) type = 'exam';
    else if (/assignment/i.test(cleanedClause)) type = 'assignment';
    else if (/project/i.test(cleanedClause)) type = 'project';
    else if (/quiz/i.test(cleanedClause)) type = 'quiz';
    else if (/reading|chapter|notes/i.test(cleanedClause)) type = 'reading';

    const name = cleanedClause.replace(/^(i have|i need|i am|there is|there are|and)/i, '').trim();
    const taskName = name || `${type.charAt(0).toUpperCase() + type.slice(1)} task`;

    tasks.push({
      id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: taskName,
      type,
      dueInDays,
      priority: estimatePriority(type, dueInDays),
      duration: estimateDuration(type, dueInDays),
      progress: 0
    });
  });

  return {
    tasks: tasks.length ? tasks : createDefaultTasks(),
    hoursPerDay,
    preferredWindow: selectedWindow
  };
}

function estimatePriority(type, dueInDays) {
  const urgencyBoost = Math.max(0, 10 - dueInDays) * 7;
  const typeScore = {
    exam: 95,
    assignment: 82,
    project: 74,
    quiz: 68,
    reading: 46,
    revision: 54
  };

  return Math.min(100, Math.round((typeScore[type] || 50) + urgencyBoost));
}

function estimateDuration(type, dueInDays) {
  const base = {
    exam: 80,
    assignment: 70,
    project: 90,
    quiz: 50,
    reading: 40,
    revision: 55
  };

  const urgencyPad = Math.max(0, 7 - dueInDays) * 10;
  return Math.min(120, (base[type] || 50) + urgencyPad);
}

function createDefaultTasks() {
  return [
    { id: 'dsa-exam', name: 'DSA exam', type: 'exam', dueInDays: 5, priority: 95, duration: 90, progress: 0 },
    { id: 'dbms-assignment', name: 'DBMS assignment', type: 'assignment', dueInDays: 2, priority: 86, duration: 75, progress: 0 },
    { id: 'oop-project', name: 'OOP project', type: 'project', dueInDays: 7, priority: 72, duration: 95, progress: 0 }
  ];
}

function getTimeLabel(windowName) {
  const windows = {
    morning: ['7:30 AM', '8:00 AM', '9:00 AM'],
    afternoon: ['1:00 PM', '2:30 PM', '4:00 PM'],
    evening: ['6:30 PM', '7:30 PM', '8:30 PM'],
    night: ['9:00 PM', '10:00 PM', '11:00 PM']
  };

  return windows[windowName] || windows.evening;
}

function generateSchedule(tasks, hoursPerDay, preferredWindowName) {
  const sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority);
  const dayPlan = [];
  const plannedTimes = getTimeLabel(preferredWindowName);
  let breakCounter = 0;

  for (let day = 0; day < 7; day += 1) {
    const sessions = [];
    const remainingMinutes = hoursPerDay * HOURS_TO_MINUTES;
    let usedMinutes = 0;

    sortedTasks.forEach((task, index) => {
      if (usedMinutes >= remainingMinutes) return;
      const isEarlyDeadline = task.dueInDays <= 3;
      const baseDuration = isEarlyDeadline ? Math.min(task.duration, 60) : Math.min(task.duration, 50);
      const sessionDuration = Math.min(baseDuration, remainingMinutes - usedMinutes);

      if (sessionDuration <= 0) return;

      const labelIndex = index % plannedTimes.length;
      const slotStart = plannedTimes[labelIndex];
      const slotEnd = addMinutes(slotStart, sessionDuration);
      sessions.push({
        time: `${slotStart} - ${slotEnd}`,
        title: task.name,
        type: task.type,
        minutes: sessionDuration,
        priority: task.priority
      });
      usedMinutes += sessionDuration;

      if (usedMinutes < remainingMinutes && sessions.length % 2 === 0) {
        breakCounter += 1;
        sessions.push({
          time: `${addMinutes(slotEnd, 5)} break`,
          title: 'Break',
          type: 'break',
          minutes: 10,
          priority: 0
        });
        usedMinutes += 10;
      }
    });

    if (sessions.length > 0) {
      dayPlan.push({
        day: `Day ${day + 1}`,
        sessions
      });
    }
  }

  const totalPlannedMinutes = dayPlan.reduce((sum, day) => sum + day.sessions.reduce((inner, session) => inner + (session.type === 'break' ? 0 : session.minutes), 0), 0);

  return {
    schedule: dayPlan,
    totalPlannedMinutes,
    breakCounter,
    totalHours: Math.round(totalPlannedMinutes / 60)
  };
}

function addMinutes(timeString, extraMinutes) {
  const [rawTime, meridian] = timeString.split(' ');
  const [hourText, minuteText] = rawTime.split(':');
  let hour = Number(hourText);
  let minute = Number(minuteText);

  if (meridian === 'AM' && hour === 12) hour = 0;
  if (meridian === 'PM' && hour !== 12) hour += 12;

  const totalMinutes = hour * 60 + minute + extraMinutes;
  const finalHour = Math.floor(totalMinutes / 60) % 24;
  const finalMinute = totalMinutes % 60;
  const finalMeridian = finalHour >= 12 ? 'PM' : 'AM';
  const friendlyHour = finalHour % 12 || 12;

  return `${friendlyHour}:${String(finalMinute).padStart(2, '0')} ${finalMeridian}`;
}

function renderTaskSummary(tasks) {
  taskList.innerHTML = tasks
    .sort((a, b) => b.priority - a.priority)
    .map((task) => `<li><span class="task-pill" style="background:${TASK_TYPES[task.type]?.color || '#7c9cff'}"></span>${task.name} · ${task.priority}% priority</li>`)
    .join('');
}

function renderSchedule(scheduleData) {
  scheduleGrid.innerHTML = scheduleData.schedule
    .map((day) => `
      <div class="day-card">
        <div class="day-header">
          <strong>${day.day}</strong>
          <span>${day.sessions.filter((session) => session.type !== 'break').length} focus blocks</span>
        </div>
        <div class="day-body">
          ${day.sessions.map((session) => {
            if (session.type === 'break') {
              return `<div class="break-row">${session.time} · ${session.title}</div>`;
            }
            return `
              <div class="session">
                <div class="session-time">${session.time}</div>
                <div class="session-title">${session.title}</div>
                <div class="session-meta">${TASK_TYPES[session.type]?.label || 'Study'} • ${session.minutes} min</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `)
    .join('');
}

function renderRecommendations(tasks, totalHoursPlanned, preferredWindowName) {
  const sorted = [...tasks].sort((a, b) => b.priority - a.priority);
  const items = [
    `Use ${preferredWindowName} for your most demanding tasks, especially ${sorted[0]?.name}.`,
    `Keep at least one 10-minute break after every 50-60 minutes of work to maintain focus.`,
    `Review ${sorted[1]?.name} first to reduce deadline risk before moving to lower-priority tasks.`
  ];

  if (totalHoursPlanned < 10) {
    items.push('Your study load is light. Add one revision cycle to strengthen retention before tests.');
  }

  recommendationList.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
}

function updateStats(tasks, scheduleData, hoursPerDay) {
  const urgent = tasks.filter((task) => task.priority >= 80 || task.dueInDays <= 3).length;
  urgentCount.textContent = String(urgent);
  totalHours.textContent = `${scheduleData.totalHours}h`;
  const averagePriority = Math.round(tasks.reduce((sum, task) => sum + task.priority, 0) / tasks.length);
  focusScore.textContent = `${Math.min(100, averagePriority)}%`;
  breakCount.textContent = String(scheduleData.breakCounter);
  statusBadge.textContent = `Plan (${hoursPerDay}h/day)`;
}

function generateFromInput() {
  const parsed = parseNaturalLanguage(inputText.value || sampleInput);
  const hoursPerDay = Number(hoursPerDayInput.value || parsed.hoursPerDay || 3);
  const chosenWindow = preferredWindow.value || parsed.preferredWindow || 'evening';

  const tasks = parsed.tasks;
  const scheduleData = generateSchedule(tasks, hoursPerDay, chosenWindow);

  state.tasks = tasks;
  state.schedule = scheduleData;

  inputText.value = inputText.value || sampleInput;
  preferredWindow.value = chosenWindow;
  windowLabel.textContent = `${capitalize(chosenWindow)} sessions`;

  renderTaskSummary(tasks);
  renderSchedule(scheduleData);
  renderRecommendations(tasks, scheduleData.totalHours, chosenWindow);
  updateStats(tasks, scheduleData, hoursPerDay);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function adaptiveReschedule() {
  if (!state.tasks.length) {
    generateFromInput();
    return;
  }

  const tasks = state.tasks.map((task) => ({
    ...task,
    priority: Math.min(100, task.priority + (task.type === 'exam' ? 8 : 5)),
    dueInDays: Math.max(1, task.dueInDays - 1)
  }));

  const hours = Number(hoursPerDayInput.value || 3);
  const chosenWindow = preferredWindow.value || 'evening';
  const scheduleData = generateSchedule(tasks, hours, chosenWindow);

  state.tasks = tasks;
  state.schedule = scheduleData;

  renderTaskSummary(tasks);
  renderSchedule(scheduleData);
  renderRecommendations(tasks, scheduleData.totalHours, chosenWindow);
  updateStats(tasks, scheduleData, hours);
  statusBadge.textContent = 'Rescheduled';
}

sampleBtn.addEventListener('click', () => {
  inputText.value = sampleInput;
  hoursPerDayInput.value = 3;
  preferredWindow.value = 'evening';
  generateFromInput();
});

generateBtn.addEventListener('click', generateFromInput);
rescheduleBtn.addEventListener('click', adaptiveReschedule);

inputText.value = sampleInput;
generateFromInput();
