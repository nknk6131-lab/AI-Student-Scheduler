const sampleInput = 'I have a DSA exam in five days, a DBMS assignment due in two days, and I can study three hours every evening.';

const HOURS_TO_MINUTES = 60;
const VALID_WINDOWS = ['morning', 'afternoon', 'evening', 'night'];
const NUMBER_WORDS = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
  eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12
};
const TASK_TYPES = {
  exam: { label: 'Exam', color: '#fb7185' },
  assignment: { label: 'Assignment', color: '#fbbf24' },
  project: { label: 'Project', color: '#7c9cff' },
  quiz: { label: 'Quiz', color: '#34d399' },
  revision: { label: 'Revision', color: '#a78bfa' },
  reading: { label: 'Reading', color: '#22d3ee' }
};

const TRANSLATIONS = {
  en: { welcome: 'Welcome to the Academy', loginTitle: 'Enter the Magical Study Gate', studentEmail: 'Student Email', magicPassword: 'Magic Password', pasteLogin: '▣ Paste login details', enterTimetable: 'Enter the timetable', language: 'Language', aiPlanner: 'AI Planner', studyHours: 'Study hours/day', preferredTime: 'Preferred time', generateSchedule: 'Generate schedule', useSample: 'Use sample', adaptiveReschedule: 'Adaptive reschedule', studySnapshot: 'Study snapshot', urgentTasks: 'Urgent tasks', totalHours: 'Total hours', focusScore: 'Focus score', breaks: 'Breaks', academyProgression: 'Academy progression', aiGeneratedPlan: 'AI-generated plan', optimizedTimetable: 'Your optimized timetable', planner: 'Planner', quests: 'Quests', calendar: 'Calendar', timetable: 'Timetable', insights: 'Insights', taskAnalysis: 'Task analysis', priorityOverview: 'Priority overview', missionCalendar: 'Mission calendar', today: 'Today', tomorrow: 'Tomorrow', addTask: '＋ Add task', optimizeFromCalendar: '✦ Optimize timetable from calendar', weeklyTimetable: 'Weekly timetable', recommendations: 'Recommendations', plannerContext: 'Describe your deadlines and study availability. Saved calendar tasks are included automatically.', plannerPlaceholder: 'Example: I have a DSA exam in five days, a DBMS assignment due in two days, and I can study three hours every evening.', dailyTaskPlaceholder: 'Add a task for the selected day', sun: 'Sun', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening', night: 'Night', voiceStart: '● Start voice input', voiceReady: 'Voice input ready' },
  ta: { welcome: 'அகாடமிக்கு வரவேற்கிறோம்', loginTitle: 'மாய படிப்பு வாயிலில் நுழைக', studentEmail: 'மாணவர் மின்னஞ்சல்', magicPassword: 'கடவுச்சொல்', pasteLogin: '▣ உள்நுழைவு விவரங்களை ஒட்டுக', enterTimetable: 'அட்டவணைக்குள் நுழைக', language: 'மொழி', aiPlanner: 'AI திட்டமிடுபவர்', studyHours: 'படிப்பு மணி / நாள்', preferredTime: 'விருப்ப நேரம்', generateSchedule: 'அட்டவணையை உருவாக்கு', useSample: 'மாதிரியை பயன்படுத்து', adaptiveReschedule: 'மாற்றியமைத்து அட்டவணையிடு', studySnapshot: 'படிப்பு சுருக்கம்', urgentTasks: 'அவசர பணிகள்', totalHours: 'மொத்த மணி', focusScore: 'கவன மதிப்பெண்', breaks: 'இடைவேளைகள்', academyProgression: 'அகாடமி முன்னேற்றம்', aiGeneratedPlan: 'AI உருவாக்கிய திட்டம்', optimizedTimetable: 'உங்கள் மேம்படுத்திய அட்டவணை', planner: 'திட்டமிடுபவர்', quests: 'பணிகள்', calendar: 'நாட்காட்டி', timetable: 'அட்டவணை', insights: 'பரிந்துரைகள்', taskAnalysis: 'பணி பகுப்பாய்வு', priorityOverview: 'முன்னுரிமை கண்ணோட்டம்', missionCalendar: 'பணி நாட்காட்டி', today: 'இன்று', tomorrow: 'நாளை', addTask: '＋ பணியை சேர்', optimizeFromCalendar: '✦ நாட்காட்டியிலிருந்து அட்டவணையை மேம்படுத்து', weeklyTimetable: 'வார அட்டவணை', recommendations: 'பரிந்துரைகள்', plannerContext: 'உங்கள் காலக்கெடுக்கள் மற்றும் படிப்பு நேரத்தை குறிப்பிடுங்கள். நாட்காட்டி பணிகள் தானாக சேர்க்கப்படும்.', plannerPlaceholder: 'எடுத்துக்காட்டு: ஐந்து நாட்களில் DSA தேர்வு, இரண்டு நாட்களில் DBMS பணி...', dailyTaskPlaceholder: 'தேர்ந்தெடுத்த நாளுக்கான பணியை சேர்க்கவும்', sun: 'ஞா', mon: 'தி', tue: 'செ', wed: 'பு', thu: 'வி', fri: 'வெ', sat: 'ச', voiceStart: '● குரல் உள்ளீட்டை தொடங்கு', voiceReady: 'குரல் உள்ளீடு தயார்' },
  ml: { language: 'ഭാഷ', aiPlanner: 'AI പ്ലാനർ', generateSchedule: 'ഷെഡ്യൂൾ സൃഷ്ടിക്കുക', useSample: 'സാമ്പിൾ ഉപയോഗിക്കുക', calendar: 'കലണ്ടർ', timetable: 'ടൈംടേബിൾ', today: 'ഇന്ന്', tomorrow: 'നാളെ', addTask: '＋ ടാസ്ക് ചേർക്കുക', weeklyTimetable: 'ആഴ്ച ടൈംടേബിൾ', recommendations: 'ശുപാർശകൾ', morning: 'രാവിലെ', afternoon: 'ഉച്ചയ്ക്ക്', evening: 'വൈകുന്നേരം', night: 'രാത്രി' },
  te: { language: 'భాష', aiPlanner: 'AI ప్లానర్', generateSchedule: 'షెడ్యూల్ రూపొందించు', useSample: 'నమూనా వాడు', calendar: 'క్యాలెండర్', timetable: 'టైమ్‌టేబుల్', today: 'ఈ రోజు', tomorrow: 'రేపు', addTask: '＋ టాస్క్ జోడించు', weeklyTimetable: 'వారపు టైమ్‌టేబుల్', recommendations: 'సిఫార్సులు', morning: 'ఉదయం', afternoon: 'మధ్యాహ్నం', evening: 'సాయంత్రం', night: 'రాత్రి' },
  kn: { language: 'ಭಾಷೆ', aiPlanner: 'AI ಪ್ಲಾನರ್', generateSchedule: 'ವೇಳಾಪಟ್ಟಿ ರಚಿಸಿ', useSample: 'ಮಾದರಿ ಬಳಸಿ', calendar: 'ಕ್ಯಾಲೆಂಡರ್', timetable: 'ವೇಳಾಪಟ್ಟಿ', today: 'ಇಂದು', tomorrow: 'ನಾಳೆ', addTask: '＋ ಕಾರ್ಯ ಸೇರಿಸಿ', weeklyTimetable: 'ವಾರದ ವೇಳಾಪಟ್ಟಿ', recommendations: 'ಶಿಫಾರಸುಗಳು', morning: 'ಬೆಳಗ್ಗೆ', afternoon: 'ಮಧ್ಯಾಹ್ನ', evening: 'ಸಂಜೆ', night: 'ರಾತ್ರಿ' },
  hi: { language: 'भाषा', aiPlanner: 'AI योजनाकार', generateSchedule: 'समय-सारणी बनाएं', useSample: 'नमूना उपयोग करें', calendar: 'कैलेंडर', timetable: 'समय-सारणी', today: 'आज', tomorrow: 'कल', addTask: '＋ कार्य जोड़ें', weeklyTimetable: 'साप्ताहिक समय-सारणी', recommendations: 'सुझाव', morning: 'सुबह', afternoon: 'दोपहर', evening: 'शाम', night: 'रात' },
  ja: { language: '言語', aiPlanner: 'AIプランナー', generateSchedule: '予定を作成', useSample: 'サンプルを使用', calendar: 'カレンダー', timetable: '時間割', today: '今日', tomorrow: '明日', addTask: '＋ タスクを追加', weeklyTimetable: '週間時間割', recommendations: 'おすすめ', morning: '朝', afternoon: '午後', evening: '夕方', night: '夜' },
  fr: { language: 'Langue', aiPlanner: 'Planificateur IA', generateSchedule: 'Générer le planning', useSample: 'Utiliser un exemple', calendar: 'Calendrier', timetable: 'Emploi du temps', today: "Aujourd’hui", tomorrow: 'Demain', addTask: '＋ Ajouter une tâche', weeklyTimetable: 'Planning hebdomadaire', recommendations: 'Recommandations', morning: 'Matin', afternoon: 'Après-midi', evening: 'Soir', night: 'Nuit' },
  zh: { language: '语言', aiPlanner: 'AI 计划', generateSchedule: '生成日程', useSample: '使用示例', calendar: '日历', timetable: '时间表', today: '今天', tomorrow: '明天', addTask: '＋ 添加任务', weeklyTimetable: '每周时间表', recommendations: '建议', morning: '早上', afternoon: '下午', evening: '傍晚', night: '晚上' }
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
const loginForm = document.getElementById('loginForm');
const loginWarning = document.getElementById('loginWarning');
const pasteLoginBtn = document.getElementById('pasteLoginBtn');
const clipboardFallback = document.getElementById('clipboardFallback');
const clipboardInput = document.getElementById('clipboardInput');
const applyPasteBtn = document.getElementById('applyPasteBtn');
const loginScreen = document.getElementById('loginScreen');
const appShell = document.getElementById('appShell');
const studentEmail = document.getElementById('studentEmail');
const studentName = document.getElementById('studentName');
const studentNameField = document.getElementById('studentNameField');
const passwordInput = document.getElementById('password');
const accountToggleBtn = document.getElementById('accountToggleBtn');
const languageSelect = document.getElementById('languageSelect');
const levelValue = document.getElementById('levelValue');
const xpValue = document.getElementById('xpValue');
const nextLevelText = document.getElementById('nextLevelText');
const xpBar = document.getElementById('xpBar');
const unlockStatus = document.getElementById('unlockStatus');
const characterCard = document.getElementById('characterCard');
const characterAvatar = document.getElementById('characterAvatar');
const characterName = document.getElementById('characterName');
const characterDescription = document.getElementById('characterDescription');
const sessionCount = document.getElementById('sessionCount');
const streakValue = document.getElementById('streakValue');
const levelRoadmap = document.getElementById('levelRoadmap');
const calendarTitle = document.getElementById('calendarTitle');
const calendarGrid = document.getElementById('calendarGrid');
const holidayList = document.getElementById('holidayList');
const previousMonthBtn = document.getElementById('previousMonthBtn');
const todayBtn = document.getElementById('todayBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const previousDayBtn = document.getElementById('previousDayBtn');
const nextDayBtn = document.getElementById('nextDayBtn');
const selectedDateLabel = document.getElementById('selectedDateLabel');
const dailyTaskInput = document.getElementById('dailyTaskInput');
const dailyTaskTime = document.getElementById('dailyTaskTime');
const addDailyTaskBtn = document.getElementById('addDailyTaskBtn');
const selectedTaskList = document.getElementById('selectedTaskList');
const optimizeCalendarBtn = document.getElementById('optimizeCalendarBtn');
const plannerContextNote = document.getElementById('plannerContextNote');
const voiceInputBtn = document.getElementById('voiceInputBtn');
const voiceStatus = document.getElementById('voiceStatus');
const notificationBtn = document.getElementById('notificationBtn');
const notificationStatus = document.getElementById('notificationStatus');

const state = {
  schedule: [],
  tasks: [],
  xp: 0,
  completedSessions: 0,
  streak: 0,
  lastCompletedDate: '',
  awardedStreakRewards: [],
  completedTaskIds: new Set(),
  calendarDate: new Date(),
  selectedDate: new Date(),
  dailyTasks: JSON.parse(localStorage.getItem('AIStudentSchedulerDailyTasks') || '{}')
};

const HERO_UNLOCKS = [
  { level: 1, rank: 'Beginner', name: 'Tanjiro Kamado', avatar: 'T', reward: 'Start your study journey' },
  { level: 5, rank: 'Rookie', name: 'Deku', avatar: 'D', reward: 'Complete 5 study sessions' },
  { level: 10, rank: 'Skilled', name: 'Itadori Yuji', avatar: 'I', reward: '10 successful sessions' },
  { level: 15, rank: 'Advanced', name: 'Killua Zoldyck', avatar: 'K', reward: '15 sessions + 80% completion' },
  { level: 20, rank: 'Elite', name: 'Levi Ackerman', avatar: 'L', reward: '20 sessions + 85% completion' },
  { level: 30, rank: 'Expert', name: 'Gojo Satoru', avatar: 'G', reward: '30 sessions + 90% completion' },
  { level: 40, rank: 'Master', name: 'Eren Yeager', avatar: 'E', reward: '40 sessions + 7-day streak' },
  { level: 50, rank: 'Legendary', name: 'Goku', avatar: 'G', reward: '50 sessions + 14-day streak' },
  { level: 75, rank: 'Mythic', name: 'Saitama', avatar: 'S', reward: '75 sessions + 90% productivity' },
  { level: 100, rank: 'Ultimate', name: 'Naruto Uzumaki', avatar: 'N', reward: '100 sessions + 30-day streak' }
];

const LEVEL_THRESHOLDS = [
  0, 150, 350, 600, 900, 1250, 1650, 2100, 2600, 3150,
  3750, 4400, 5100, 5850, 6650, 7500, 8000, 8500, 9250, 10000,
  10800, 11650, 12550, 13500, 14500, 15550, 16700, 17900, 19150, 20500,
  22000, 23550, 25200, 26900, 28700, 30600, 32600, 34700, 36900, 39200,
  41600, 44050, 46600, 49200, 51850, 54600, 57450, 60300, 63250, 66250,
  69500, 72750, 76000, 79250, 82500, 85750, 89000, 92250, 95500, 98750,
  102000, 105250, 108500, 111750, 115000, 118250, 121500, 124750, 128000, 131250,
  134500, 137750, 141000, 144250, 147500, 150750, 154000, 157250, 160500, 163750,
  167000, 170250, 173500, 176750, 180000, 183250, 186500, 189750, 193000, 196250,
  199500, 202750, 206000, 209250, 212500, 215750, 219000, 222250, 225500, 228750
];

const CALENDAR_YEAR = new Date().getFullYear();
const HOLIDAY_YEAR_START = CALENDAR_YEAR - 10;
const HOLIDAY_YEAR_END = CALENDAR_YEAR + 10;

const TAMIL_NADU_HOLIDAYS_2026 = {
  '2026-01-01': 'New Year',
  '2026-01-15': 'Pongal',
  '2026-01-16': 'Thiruvalluvar Day',
  '2026-01-17': 'Uzhavar Thirunal',
  '2026-01-26': 'Republic Day',
  '2026-02-01': 'Thai Poosam',
  '2026-03-19': 'Telugu New Year',
  '2026-03-21': 'Ramzan / Id-ul-Fitr',
  '2026-03-31': 'Mahavir Jayanti',
  '2026-04-03': 'Good Friday',
  '2026-04-14': 'Tamil New Year',
  '2026-05-01': 'May Day',
  '2026-05-27': 'Bakrid',
  '2026-06-26': 'Muharram',
  '2026-08-15': 'Independence Day',
  '2026-09-04': 'Krishna Jayanthi',
  '2026-09-14': 'Vinayagar Chaturthi',
  '2026-10-02': 'Gandhi Jayanthi',
  '2026-10-19': 'Ayutha Pooja',
  '2026-10-20': 'Vijaya Dasami',
  '2026-11-08': 'Deepavali',
  '2026-12-25': 'Christmas'
};

const TAMIL_NADU_RECURRING_HOLIDAYS = {
  '01-01': 'New Year',
  '01-15': 'Pongal',
  '01-16': 'Thiruvalluvar Day',
  '01-17': 'Uzhavar Thirunal',
  '01-26': 'Republic Day',
  '04-14': 'Tamil New Year',
  '05-01': 'May Day',
  '08-15': 'Independence Day',
  '10-02': 'Gandhi Jayanthi',
  '12-25': 'Christmas'
};

const TAMIL_NADU_HOLIDAY_OVERRIDES = {
  2024: {
    '01-25': 'Thai Poosam', '03-29': 'Good Friday', '04-09': 'Telugu New Year',
    '04-10': 'Ramzan / Id-ul-Fitr', '04-14': 'Tamil New Year', '04-17': 'Mahavir Jayanti',
    '06-17': 'Bakrid', '07-17': 'Muharram', '08-26': 'Krishna Jayanthi',
    '09-07': 'Vinayagar Chaturthi', '09-16': 'Milad-un-Nabi', '10-11': 'Ayutha Pooja',
    '10-12': 'Vijaya Dasami', '10-31': 'Deepavali'
  },
  2025: {
    '02-11': 'Thai Poosam', '03-31': 'Ramzan / Id-ul-Fitr', '04-14': 'Tamil New Year',
    '04-18': 'Good Friday', '06-07': 'Bakrid', '07-06': 'Muharram',
    '08-16': 'Krishna Jayanthi', '08-27': 'Vinayagar Chaturthi', '09-05': 'Milad-un-Nabi',
    '10-01': 'Ayutha Pooja', '10-02': 'Vijaya Dasami', '10-20': 'Deepavali'
  },
  2027: {
    '01-22': 'Thai Poosam', '03-09': 'Ramzan / Id-ul-Fitr', '03-26': 'Good Friday',
    '04-14': 'Tamil New Year', '05-17': 'Bakrid', '06-16': 'Muharram',
    '08-25': 'Krishna Jayanthi', '09-04': 'Vinayagar Chaturthi', '10-08': 'Ayutha Pooja',
    '10-09': 'Vijaya Dasami', '10-29': 'Deepavali'
  }
};

function getTamilNaduHolidayName(date) {
  const year = date.getFullYear();
  const dateKey = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const monthDay = dateKey.slice(5);
  return TAMIL_NADU_HOLIDAY_FEED[year]?.[monthDay] || '';
}

function isHolidayDataYear(year) {
  return year >= HOLIDAY_YEAR_START && year <= HOLIDAY_YEAR_END;
}

function getHolidayDataStatus(year) {
  if (year > CALENDAR_YEAR) return 'Projected dates · verify against the official Tamil Nadu Gazette';
  return 'Published and recurring holiday entries';
}

function getHolidayCategory(name) {
  if (/Republic|Independence|Gandhi|May Day|New Year|Christmas/i.test(name)) return 'government';
  if (/Pongal|Tamil New Year|Thiruvalluvar|Uzhavar|Ayutha|Vijaya|Vinayagar|Krishna|Telugu/i.test(name)) return 'regional';
  return 'devotional';
}

function getGoodFridayMonthDay(year) {
  const goldenNumber = year % 19;
  const century = Math.floor(year / 100);
  const solarCorrection = century - Math.floor(century / 4) - Math.floor((8 * century + 13) / 25) + 19 * goldenNumber + 15;
  const moonPhase = solarCorrection % 30;
  const weekdayCorrection = (Math.floor(year / 4) + year + Math.floor(year / 100) - Math.floor(year / 400) - moonPhase + 31) % 7;
  const easterMonth = Math.floor((moonPhase + weekdayCorrection + 90) / 25);
  const easterDay = (moonPhase + weekdayCorrection + easterMonth + 19) % 32;
  const goodFriday = new Date(year, easterMonth - 1, easterDay - 2);
  return `${String(goodFriday.getMonth() + 1).padStart(2, '0')}-${String(goodFriday.getDate()).padStart(2, '0')}`;
}

function buildTamilNaduHolidayFeed() {
  const feed = {};

  for (let year = HOLIDAY_YEAR_START; year <= HOLIDAY_YEAR_END; year += 1) {
    feed[year] = {
      ...TAMIL_NADU_RECURRING_HOLIDAYS,
      [getGoodFridayMonthDay(year)]: 'Good Friday'
    };

    Object.entries(TAMIL_NADU_HOLIDAY_OVERRIDES[year] || {}).forEach(([monthDay, name]) => {
      feed[year][monthDay] = name;
    });

    if (year === CALENDAR_YEAR) {
      Object.entries(TAMIL_NADU_HOLIDAYS_2026).forEach(([dateKey, name]) => {
        feed[year][dateKey.slice(5)] = name;
      });
    }
  }

  return feed;
}

const TAMIL_NADU_HOLIDAY_FEED = buildTamilNaduHolidayFeed();

const savedProgress = JSON.parse(localStorage.getItem('AIStudentSchedulerProgress') || '{}');
state.xp = Number(savedProgress.xp) || 0;
state.completedSessions = Number(savedProgress.completedSessions) || 0;
state.streak = Number(savedProgress.streak) || 0;
state.lastCompletedDate = savedProgress.lastCompletedDate || '';
state.awardedStreakRewards = Array.isArray(savedProgress.awardedStreakRewards) ? savedProgress.awardedStreakRewards : [];
state.completedTaskIds = new Set(Array.isArray(savedProgress.completedTaskIds) ? savedProgress.completedTaskIds : []);

function saveProgress() {
  localStorage.setItem('AIStudentSchedulerProgress', JSON.stringify({
    xp: state.xp,
    completedSessions: state.completedSessions,
    streak: state.streak,
    lastCompletedDate: state.lastCompletedDate,
    awardedStreakRewards: state.awardedStreakRewards,
    completedTaskIds: [...state.completedTaskIds]
  }));
}

function getDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function saveDailyTasks() {
  localStorage.setItem('AIStudentSchedulerDailyTasks', JSON.stringify(state.dailyTasks));
}

function saveNotifiedTaskKeys() {
  localStorage.setItem('AIStudentSchedulerNotifiedTasks', JSON.stringify([...notifiedTaskKeys]));
}

function getPreferredReminderTime() {
  const times = getTimeLabel(normalizePreferredWindow(preferredWindow.value, 'evening'));
  const [time, meridian] = times[0].split(' ');
  const [hourText, minuteText] = time.split(':');
  let hour = Number(hourText);
  if (meridian === 'PM' && hour !== 12) hour += 12;
  if (meridian === 'AM' && hour === 12) hour = 0;
  return { hour, minute: Number(minuteText) };
}

function getTaskReminderDate(task) {
  if (task.calendarDate) {
    const reminderDate = new Date(`${task.calendarDate}T${task.calendarTime || '09:00'}:00`);
    return Number.isNaN(reminderDate.getTime()) ? null : reminderDate;
  }

  const reminderDate = new Date();
  reminderDate.setHours(0, 0, 0, 0);
  reminderDate.setDate(reminderDate.getDate() + Math.max(0, task.dueInDays - 1));
  const preferredTime = getPreferredReminderTime();
  reminderDate.setHours(preferredTime.hour, preferredTime.minute, 0, 0);
  return reminderDate;
}

function getNotificationTasks() {
  const generatedTasks = state.tasks.map((task) => ({ ...task, source: 'AI plan' }));
  const calendarTasks = getCalendarTasksForPlan().map((task) => ({ ...task, source: 'Calendar' }));
  return [...generatedTasks, ...calendarTasks];
}

function updateNotificationStatus(message) {
  notificationStatus.textContent = message;
}

function checkTaskNotifications() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const now = new Date();
  getNotificationTasks().forEach((task) => {
    const reminderDate = getTaskReminderDate(task);
    if (!reminderDate || reminderDate > now) return;

    const notificationKey = `${task.id}-${reminderDate.toISOString().slice(0, 16)}`;
    if (notifiedTaskKeys.has(notificationKey)) return;

    new Notification(`Study reminder: ${task.name}`, {
      body: `${task.source} task · ${task.duration || 45} minutes planned · Priority ${task.priority}%`,
      tag: notificationKey
    });
    notifiedTaskKeys.add(notificationKey);
  });
  saveNotifiedTaskKeys();
}

function startTaskNotifications() {
  if (!('Notification' in window)) {
    updateNotificationStatus('This browser does not support notifications');
    return;
  }

  if (Notification.permission === 'denied') {
    updateNotificationStatus('Notifications are blocked in browser settings');
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission !== 'granted') {
      updateNotificationStatus('Notifications remain off');
      return;
    }

    notificationBtn.textContent = 'Notifications enabled';
    notificationBtn.disabled = true;
    updateNotificationStatus('Every task will notify you when it is due');
    checkTaskNotifications();
    if (!notificationTimer) notificationTimer = window.setInterval(checkTaskNotifications, 30000);
  });
}

function getCalendarTasksForPlan() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Object.entries(state.dailyTasks).flatMap(([dateKey, tasks]) => {
    const taskDate = new Date(`${dateKey}T00:00:00`);
    const dueInDays = Math.max(1, Math.min(7, Math.ceil((taskDate - today) / 86400000) + 1));

    return tasks.map((task) => ({
      id: `calendar-${dateKey}-${task.id}`,
      name: task.title,
      type: 'revision',
      dueInDays,
      priority: dueInDays <= 2 ? 88 : dueInDays <= 4 ? 74 : 62,
      duration: 45,
      progress: 0,
      calendarDate: dateKey,
      calendarTime: task.time
    }));
  });
}

const USER_DB_NAME = 'AIStudentSchedulerDB';
const USER_STORE_NAME = 'users';

let ambientMusicEnabled = false;
let ambientMusicTimer = null;
let activeLanguage = 'en';
let speechRecognition = null;
let voiceBaseText = '';
let voiceRetryCount = 0;
let notificationTimer = null;
let accountMode = 'login';
const notifiedTaskKeys = new Set(JSON.parse(localStorage.getItem('AIStudentSchedulerNotifiedTasks') || '[]'));

const SPEECH_LANGUAGES = {
  en: 'en-US', ta: 'ta-IN', ml: 'ml-IN', te: 'te-IN', kn: 'kn-IN',
  hi: 'hi-IN', ja: 'ja-JP', fr: 'fr-FR', zh: 'zh-CN'
};

function translate(key, fallback = '') {
  return { ...TRANSLATIONS.en, ...TRANSLATIONS[activeLanguage] }[key] || fallback;
}

function applyLanguage(language) {
  const selectedLanguage = TRANSLATIONS[language] ? language : 'en';
  const translation = { ...TRANSLATIONS.en, ...TRANSLATIONS[selectedLanguage] };
  activeLanguage = selectedLanguage;
  document.documentElement.lang = selectedLanguage;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (translation[key]) element.textContent = translation[key];
  });
  document.querySelectorAll('[data-placeholder-i18n]').forEach((element) => {
    const key = element.dataset.placeholderI18n;
    if (translation[key]) element.placeholder = translation[key];
  });
  languageSelect.value = selectedLanguage;
  if (speechRecognition) speechRecognition.lang = SPEECH_LANGUAGES[selectedLanguage];
  localStorage.setItem('NKSchedulerLanguage', selectedLanguage);
}

function setupVoiceInput() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    voiceInputBtn.disabled = true;
    voiceStatus.textContent = 'Voice input is not supported in this browser';
    return;
  }

  speechRecognition = new Recognition();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = SPEECH_LANGUAGES[activeLanguage];

  speechRecognition.onstart = () => {
    voiceInputBtn.textContent = '■ Stop voice input';
    voiceInputBtn.classList.add('listening');
    voiceStatus.textContent = `Listening in ${languageSelect.options[languageSelect.selectedIndex].text}...`;
  };

  speechRecognition.onresult = (event) => {
    let finalText = '';
    let interimText = '';
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const transcript = event.results[index][0].transcript;
      if (event.results[index].isFinal) finalText += transcript;
      else interimText += transcript;
    }

    if (finalText) {
      inputText.value = `${voiceBaseText}${voiceBaseText ? ' ' : ''}${finalText.trim()}`.trim();
      voiceBaseText = inputText.value;
    }
    voiceStatus.textContent = interimText ? `Hearing: ${interimText}` : 'Voice captured';
  };

  speechRecognition.onerror = (event) => {
    if (event.error === 'network' && voiceRetryCount === 0) {
      voiceRetryCount += 1;
      speechRecognition.abort();
      voiceStatus.textContent = 'Retrying voice recognition...';
      window.setTimeout(() => {
        speechRecognition.lang = activeLanguage === 'en' ? 'en-IN' : SPEECH_LANGUAGES[activeLanguage];
        try {
          speechRecognition.start();
        } catch (error) {
          voiceStatus.textContent = 'Voice recognition could not restart. Use Chrome or Edge with microphone access.';
        }
      }, 250);
      return;
    }
    const messages = {
      'not-allowed': 'Microphone permission was blocked. Allow access and try again.',
      'network': 'This browser cannot reach its speech-recognition service. Open Way to Success in Chrome or Edge and allow microphone access.',
      'no-speech': 'No speech detected. Try speaking again.',
      'audio-capture': 'No microphone was found. Check your microphone and try again.'
    };
    voiceStatus.textContent = messages[event.error] || 'Voice input is unavailable. You can type in the planner instead.';
    voiceInputBtn.classList.remove('listening');
    voiceInputBtn.textContent = translate('voiceStart', '● Start voice input');
  };

  speechRecognition.onend = () => {
    voiceInputBtn.classList.remove('listening');
    voiceInputBtn.textContent = translate('voiceStart', '● Start voice input');
    if (voiceStatus.textContent.startsWith('Listening')) voiceStatus.textContent = 'Voice input ready';
  };
}

function toggleVoiceInput() {
  if (!speechRecognition) {
    setupVoiceInput();
    if (!speechRecognition) return;
  }

  if (voiceInputBtn.classList.contains('listening')) {
    speechRecognition.stop();
    return;
  }

  voiceBaseText = inputText.value.trim();
  voiceRetryCount = 0;
  speechRecognition.lang = SPEECH_LANGUAGES[activeLanguage];
  try {
    speechRecognition.start();
  } catch (error) {
    voiceStatus.textContent = 'Voice input is already starting. Please try again in a moment.';
  }
}

function applyClipboardText(clipboardText) {
  const parts = String(clipboardText || '').trim().split(/\r?\n|\t/).map((part) => part.trim()).filter(Boolean);
  const email = parts.find((part) => /\S+@\S+\.\S+/.test(part));
  const password = parts.find((part) => part !== email);

  if (!email || !password) {
    loginWarning.textContent = 'Use two lines: email first, password second.';
    clipboardFallback.hidden = false;
    clipboardInput.focus();
    return false;
  }

  studentEmail.value = email;
  passwordInput.value = password;
  clipboardFallback.hidden = true;
  loginWarning.textContent = 'Login details pasted. Press Enter the timetable to continue.';
  return true;
}

async function pasteLoginDetails() {
  if (!navigator.clipboard?.readText) {
    clipboardFallback.hidden = false;
    clipboardInput.focus();
    loginWarning.textContent = 'Paste your copied email and password into the box below.';
    return;
  }

  try {
    const clipboardText = await Promise.race([
      navigator.clipboard.readText(),
      new Promise((_, reject) => window.setTimeout(() => reject(new Error('Clipboard read timed out.')), 1200))
    ]);
    applyClipboardText(clipboardText);
  } catch (error) {
    console.warn('Clipboard read unavailable:', error);
    clipboardFallback.hidden = false;
    clipboardInput.focus();
    loginWarning.textContent = 'Press Ctrl+V in the box below, then choose Use pasted details.';
  }
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function openUserDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(USER_DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
        const store = db.createObjectStore(USER_STORE_NAME, { keyPath: 'email' });
        store.createIndex('passwordIndex', 'password', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Unable to open user database.'));
  });
}

function saveUserRecord(email, password, name = '') {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openUserDatabase();
      const transaction = db.transaction(USER_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(USER_STORE_NAME);
      const userRecord = {
        email: normalizeEmail(email),
        password: String(password || '').trim(),
        name: String(name || '').trim(),
        createdAt: new Date().toISOString()
      };

      const request = store.put(userRecord);
      request.onsuccess = () => {
        db.close();
        resolve(userRecord);
      };
      request.onerror = () => {
        db.close();
        reject(request.error || new Error('Unable to save user data.'));
      };
    } catch (error) {
      reject(error);
    }
  });
}

function getUserRecord(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openUserDatabase();
      const transaction = db.transaction(USER_STORE_NAME, 'readonly');
      const store = transaction.objectStore(USER_STORE_NAME);
      const request = store.get(normalizeEmail(email));

      request.onsuccess = () => {
        db.close();
        resolve(request.result || null);
      };
      request.onerror = () => {
        db.close();
        reject(request.error || new Error('Unable to load user data.'));
      };
    } catch (error) {
      reject(error);
    }
  });
}

function startAmbientMusic() {
  if (ambientMusicEnabled) return;

  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const audioContext = new AudioCtx();
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0.05;
  masterGain.connect(audioContext.destination);

  const melody = [220, 246.94, 293.66, 329.63, 293.66, 246.94, 196, 220];
  let noteIndex = 0;

  const playNote = () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const frequency = melody[noteIndex % melody.length];

    oscillator.type = 'triangle';
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.7);

    oscillator.connect(gainNode);
    gainNode.connect(masterGain);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.8);
    noteIndex += 1;
  };

  ambientMusicTimer = window.setInterval(playNote, 420);
  ambientMusicEnabled = true;

  const resumeAudio = () => {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  };

  window.addEventListener('pointerdown', resumeAudio, { once: true });
}

function normalizeHoursPerDay(rawValue, fallback = 3) {
  const parsedValue = Number(rawValue);
  if (!Number.isFinite(parsedValue)) return fallback;
  return Math.min(12, Math.max(1, Math.round(parsedValue)));
}

function normalizePreferredWindow(rawValue, fallback = 'evening') {
  const normalized = String(rawValue || fallback).trim().toLowerCase();
  return VALID_WINDOWS.includes(normalized) ? normalized : fallback;
}

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
  const hoursMatch = lower.match(/study\s+(\d+(?:\.\d+)?)\s+hours?/i)
    || lower.match(/(\d+(?:\.\d+)?)\s+hours?\s+every/i)
    || lower.match(/(\d+(?:\.\d+)?)\s+hours?\s*\/\s*day/i);
  const preferredTimeFromText = lower.match(/morning|afternoon|evening|night/i);

  const resolvedHours = hoursMatch
    ? normalizeHoursPerDay(hoursMatch[1], Number(hoursPerDayInput.value || 3))
    : normalizeHoursPerDay(hoursPerDayInput.value, 3);
  const resolvedWindow = normalizePreferredWindow(
    preferredWindow.value || (preferredTimeFromText ? preferredTimeFromText[0].toLowerCase() : 'evening'),
    'evening'
  );

  const tasks = [];
  const clauses = normalized.split(/[,;]|\s+and\s+|\s+plus\s+/i).filter(Boolean);

  clauses.forEach((clause) => {
    const cleanedClause = clause.replace(/\s+/g, ' ').trim();
    if (!cleanedClause || cleanedClause.length < 3) return;
    if (/\b(?:study|studying|can study|will study)\s+(?:\d+(?:\.\d+)?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+hours?/i.test(cleanedClause)
      || /(?:\d+(?:\.\d+)?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+hours?\s+(?:every|per)\b/i.test(cleanedClause)) return;

    const dueInDays = extractDueInDays(cleanedClause) || 3;
    const type = detectTaskType(cleanedClause);
    const taskName = buildTaskName(cleanedClause, type);

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
    hoursPerDay: resolvedHours,
    preferredWindow: resolvedWindow
  };
}

function extractDueInDays(text) {
  const amountPattern = '(\\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)';
  const match = text.match(new RegExp(`(?:in|within|after|for)\\s+${amountPattern}\\s+(?:day|days)`, 'i'))
    || text.match(new RegExp(`${amountPattern}\\s+(?:day|days)\\s*(?:from now|left)?`, 'i'));

  if (!match) return null;
  return NUMBER_WORDS[match[1].toLowerCase()] || Number(match[1]);
}

function detectTaskType(text) {
  if (/exam|test|midterm|final/i.test(text)) return 'exam';
  if (/assignment|homework|lab work|report/i.test(text)) return 'assignment';
  if (/project|application|mini project/i.test(text)) return 'project';
  if (/quiz|mcq|assessment/i.test(text)) return 'quiz';
  if (/reading|chapter|notes|study materials/i.test(text)) return 'reading';
  return 'revision';
}

function buildTaskName(text, type) {
  const numberWordPattern = 'one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve';
  const withoutNoise = text
    .replace(/^(i have|i need|i am|there is|there are|i can|i will|and)\s+/i, '')
    .replace(/\b(?:study|studying|can study|have)\b/gi, '')
    .replace(/\s+/g, ' ')
    .replace(/^(?:a|an|the)\s+/i, '')
    .trim();

  if (!withoutNoise) {
    return `${type.charAt(0).toUpperCase() + type.slice(1)} task`;
  }

  return withoutNoise
    .replace(new RegExp(`\\s+(?:in|within|after|for)\\s+(?:\\d+|${numberWordPattern})\\s+(?:day|days)\\b.*$`, 'i'), '')
    .replace(/\s+(?:is|are|due)\b.*$/i, '')
    .trim();
}

function estimatePriority(type, dueInDays) {
  const typeScore = {
    exam: 96,
    assignment: 84,
    project: 74,
    quiz: 70,
    reading: 48,
    revision: 58
  };

  const urgencyLift = Math.max(0, 7 - dueInDays) * 6;
  return Math.min(100, Math.round((typeScore[type] || 50) + urgencyLift));
}

function estimateDuration(type, dueInDays) {
  const base = {
    exam: 90,
    assignment: 80,
    project: 100,
    quiz: 55,
    reading: 40,
    revision: 60
  };

  const urgencyBoost = dueInDays <= 2 ? 25 : dueInDays <= 5 ? 15 : 0;
  return Math.min(140, (base[type] || 60) + urgencyBoost);
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

function formatInputTime(timeValue) {
  if (!/^\d{2}:\d{2}$/.test(String(timeValue || ''))) return timeValue;
  const [hourText, minuteText] = timeValue.split(':');
  const hour = Number(hourText);
  const meridian = hour >= 12 ? 'PM' : 'AM';
  const friendlyHour = hour % 12 || 12;
  return `${friendlyHour}:${minuteText} ${meridian}`;
}

function getPriorityBand(task) {
  if (task.priority >= 85 || task.dueInDays <= 2) return { label: 'Critical', className: 'critical' };
  if (task.priority >= 70 || task.dueInDays <= 4) return { label: 'High', className: 'high' };
  return { label: 'Planned', className: 'planned' };
}

function getPriorityReason(task) {
  const deadline = task.dueInDays <= 1 ? 'due today' : `due in ${task.dueInDays} days`;
  const typeLabel = TASK_TYPES[task.type]?.label || 'Study';
  return `${typeLabel} weight + deadline pressure (${deadline})`;
}

function buildTaskSession(task, preferredWindowName, dayIndex, slotIndex) {
  const slotOptions = getTimeLabel(preferredWindowName);
  const startTime = task.calendarTime ? formatInputTime(task.calendarTime) : slotOptions[slotIndex % slotOptions.length];
  const endTime = addMinutes(startTime, task.minutes);

  return {
    id: `${task.id}-${dayIndex}-${slotIndex}`,
    taskId: task.id,
    time: `${startTime} - ${endTime}`,
    title: task.name,
    type: task.type,
    minutes: task.minutes,
    priority: task.priority
  };
}

function generateSchedule(tasks, hoursPerDay, preferredWindowName) {
  const sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority || a.dueInDays - b.dueInDays);
  const capacityPerDay = hoursPerDay * HOURS_TO_MINUTES;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayPlan = Array.from({ length: 7 }, (_, index) => ({
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + index),
    day: new Intl.DateTimeFormat('en', { weekday: 'short' }).format(new Date(today.getFullYear(), today.getMonth(), today.getDate() + index)),
    sessions: [],
    usedMinutes: 0
  }));

  sortedTasks.forEach((task) => {
    let remainingMinutes = task.duration;
    const calendarDayIndex = task.calendarDate
      ? Math.round((new Date(`${task.calendarDate}T00:00:00`) - today) / 86400000)
      : null;
    const preferredDay = calendarDayIndex === null ? Math.max(0, Math.min(6, task.dueInDays - 1)) : Math.max(0, Math.min(6, calendarDayIndex));
    const preferredDayOrder = Array.from({ length: 7 }, (_, index) => index)
      .sort((a, b) => {
        const aDistance = Math.abs(a - preferredDay);
        const bDistance = Math.abs(b - preferredDay);
        if (aDistance !== bDistance) return aDistance - bDistance;
        return a - b;
      });

    while (remainingMinutes > 0) {
      let placed = false;

      for (const dayIndex of preferredDayOrder) {
        const targetDay = dayPlan[dayIndex];
        const available = capacityPerDay - targetDay.usedMinutes;
        if (available <= 0) continue;

        const chunkMinutes = Math.min(Math.max(30, Math.min(60, remainingMinutes)), available);
        targetDay.sessions.push(buildTaskSession({ ...task, minutes: chunkMinutes }, preferredWindowName, dayIndex, targetDay.sessions.length));
        targetDay.usedMinutes += chunkMinutes;
        remainingMinutes -= chunkMinutes;
        placed = true;
        break;
      }

      if (!placed) {
        const fallbackDay = dayPlan.find((day) => day.usedMinutes < capacityPerDay);
        if (!fallbackDay) break;

        const fallbackIndex = dayPlan.indexOf(fallbackDay);
        const chunkMinutes = Math.min(Math.max(30, remainingMinutes), capacityPerDay - fallbackDay.usedMinutes);
        fallbackDay.sessions.push(buildTaskSession({ ...task, minutes: chunkMinutes }, preferredWindowName, fallbackIndex, fallbackDay.sessions.length));
        fallbackDay.usedMinutes += chunkMinutes;
        remainingMinutes -= chunkMinutes;
      }
    }
  });

  const totalPlannedMinutes = dayPlan.reduce((sum, day) => sum + day.sessions.reduce((inner, session) => inner + session.minutes, 0), 0);
  const breakCounter = dayPlan.reduce((sum, day) => sum + Math.max(0, day.sessions.length - 1), 0);

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

function getHourFromTimeLabel(timeLabel) {
  const match = String(timeLabel || '').match(/(\d+):\d+\s*(AM|PM)/i);
  if (!match) return null;
  let hour = Number(match[1]) % 12;
  if (match[2].toUpperCase() === 'PM') hour += 12;
  return hour;
}

function renderTaskSummary(tasks, scheduleData = state.schedule) {
  const taskMap = new Map(tasks.map((task) => [task.id, task]));
  taskList.innerHTML = (scheduleData?.schedule || []).map((day) => {
    const sessionsByHour = new Map();
    day.sessions.forEach((session) => {
      const hour = getHourFromTimeLabel(session.time);
      if (hour !== null) sessionsByHour.set(hour, session);
    });

    const hours = Array.from({ length: 24 }, (_, hour) => {
      const session = sessionsByHour.get(hour);
      const task = session ? taskMap.get(session.taskId) : null;
      const complete = task && state.completedTaskIds.has(task.id);
      const label = `${String(hour).padStart(2, '0')}:00`;
      return `<div class="hour-row ${session ? 'scheduled' : 'free'} ${complete ? 'completed' : ''}">
        <time>${label}</time>
        ${session && task ? `<button class="hour-task" data-task-id="${task.id}" aria-label="${complete ? 'Mark incomplete' : 'Complete'} ${task.name}"><strong>${session.title}</strong><small>${session.time} · ${session.minutes} min</small></button>` : '<span class="free-hour">Available</span>'}
      </div>`;
    }).join('');

    return `<section class="hour-day"><header><strong>${day.day}</strong><span>${day.date.toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span></header>${hours}</section>`;
  }).join('');
}

function getLevelFromXp(xp) {
  const cappedXp = Math.max(0, xp);
  let level = 1;
  for (let index = 1; index < LEVEL_THRESHOLDS.length; index += 1) {
    if (cappedXp < LEVEL_THRESHOLDS[index]) break;
    level = index + 1;
  }

  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || currentThreshold + 5000;
  return {
    level,
    currentXp: cappedXp - currentThreshold,
    requiredXp: nextThreshold - currentThreshold,
    totalToNext: nextThreshold
  };
}

function renderProgression() {
  const progression = getLevelFromXp(state.xp);
  const unlocked = HERO_UNLOCKS.filter((hero) => progression.level >= hero.level).at(-1);
  levelValue.textContent = `LVL ${progression.level}`;
  xpValue.textContent = String(state.xp);
  nextLevelText.textContent = `${Math.max(0, progression.requiredXp - progression.currentXp)} XP to level ${progression.level + 1}`;
  xpBar.style.width = `${Math.min(100, Math.round((progression.currentXp / progression.requiredXp) * 100))}%`;
  sessionCount.textContent = String(state.completedSessions);
  streakValue.textContent = String(state.streak);

  if (unlocked) {
    characterCard.classList.remove('locked');
    characterAvatar.textContent = unlocked.avatar;
    characterName.textContent = unlocked.name;
    characterDescription.textContent = `${unlocked.rank} student · ${unlocked.reward}`;
    unlockStatus.textContent = `${unlocked.name} unlocked at level ${unlocked.level}.`;
  } else {
    const nextHero = HERO_UNLOCKS.find((hero) => hero.level > progression.level) || HERO_UNLOCKS.at(-1);
    characterCard.classList.add('locked');
    characterAvatar.textContent = '?';
    characterName.textContent = 'Hero vault locked';
    characterDescription.textContent = `${nextHero.level - progression.level} levels until ${nextHero.name}.`;
    unlockStatus.textContent = `Reach level ${nextHero.level} to unlock your next hero.`;
  }

  levelRoadmap.innerHTML = HERO_UNLOCKS.map((hero) => {
    const reached = progression.level >= hero.level;
    return `<div class="roadmap-item ${reached ? 'unlocked' : ''}"><span class="roadmap-level">Lv. ${hero.level}</span><strong>${reached ? hero.avatar : '🔒'} ${hero.name}</strong><small>${hero.rank} · ${hero.reward}</small></div>`;
  }).join('');
}

function renderCalendar() {
  const year = state.calendarDate.getFullYear();
  const month = state.calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const scheduledDates = new Map();
  const selectedDateKey = getDateKey(state.selectedDate);

  state.schedule.schedule.forEach((day, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + index);
    scheduledDates.set(date.toDateString(), day.sessions);
  });

  calendarTitle.textContent = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(state.calendarDate);
  const withinHolidayRange = isHolidayDataYear(year);
  document.querySelector('.calendar-data-note').textContent = withinHolidayRange
    ? `Tamil Nadu holidays · ${HOLIDAY_YEAR_START}-${HOLIDAY_YEAR_END} · ${getHolidayDataStatus(year)}`
    : `Holiday data available from ${HOLIDAY_YEAR_START} through ${HOLIDAY_YEAR_END}`;
  selectedDateLabel.textContent = `Selected day: ${new Intl.DateTimeFormat('en', { weekday: 'long', month: 'short', day: 'numeric' }).format(state.selectedDate)}`;
  const selectedTasks = state.dailyTasks[selectedDateKey] || [];
  selectedTaskList.innerHTML = selectedTasks.length
    ? selectedTasks.map((task) => `<div class="selected-task"><button class="remove-task-btn" data-task-id="${task.id}" aria-label="Remove ${task.title}">×</button><span>${task.time || 'Any time'}</span><strong>${task.title}</strong></div>`).join('')
    : '<span class="no-daily-tasks">No daily tasks for this date yet.</span>';
  calendarGrid.innerHTML = '';
  const monthHolidays = [];

  for (let cell = 0; cell < 42; cell += 1) {
    const dayNumber = cell - firstDay + 1;
    const inMonth = dayNumber > 0 && dayNumber <= daysInMonth;
    const date = inMonth ? new Date(year, month, dayNumber) : null;
    const sessions = date ? scheduledDates.get(date.toDateString()) || [] : [];
    const dailyTasks = date ? state.dailyTasks[getDateKey(date)] || [] : [];
    const isToday = date && date.toDateString() === today.toDateString();
    const dateKey = date ? `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}` : '';
    const holidayName = date && withinHolidayRange ? getTamilNaduHolidayName(date) : '';
    const isWeekend = date && (date.getDay() === 0 || date.getDay() === 6);
    const isSelected = date && date.toDateString() === state.selectedDate.toDateString();
    const cellElement = document.createElement('div');
    cellElement.className = `calendar-day ${inMonth ? '' : 'outside-month'} ${isToday ? 'today' : ''} ${isSelected ? 'selected-day' : ''} ${isWeekend ? 'weekend' : ''} ${holidayName ? 'government-leave' : ''}`;
    cellElement.innerHTML = inMonth ? `<span class="date-number">${dayNumber}</span>${holidayName ? `<span class="leave-label">${holidayName}</span>` : ''}${sessions.length ? `<span class="calendar-event">${sessions.length} quest${sessions.length > 1 ? 's' : ''}</span>` : ''}${dailyTasks.length ? `<span class="calendar-task-event">${dailyTasks.length} task${dailyTasks.length > 1 ? 's' : ''}</span>` : ''}` : '';
    if (holidayName) {
      const category = getHolidayCategory(holidayName);
      monthHolidays.push({ dayNumber, name: holidayName, category });
      cellElement.classList.add(category);
    }
    if (inMonth) {
      cellElement.addEventListener('click', () => {
        state.selectedDate = new Date(year, month, dayNumber);
        state.calendarDate = new Date(year, month, 1);
        renderCalendar();
      });
    }
    calendarGrid.appendChild(cellElement);
  }

  holidayList.innerHTML = monthHolidays.length
    ? `<strong>${monthHolidays.length} leave day${monthHolidays.length > 1 ? 's' : ''} this month</strong>${monthHolidays.map((holiday) => `<span class="holiday-list-item ${holiday.category}"><b>${holiday.dayNumber}</b>${holiday.name}<small>${capitalize(holiday.category)}</small></span>`).join('')}`
    : '<span class="no-holidays">No listed government, regional, or devotional leave this month.</span>';
}

function renderSchedule(scheduleData) {
  scheduleGrid.innerHTML = scheduleData.schedule
    .map((day) => `
      <div class="day-card">
        <div class="day-header">
          <strong>${day.day} · ${day.date.toLocaleDateString('en', { month: 'short', day: 'numeric' })}</strong>
          <span>${day.sessions.length} focus blocks</span>
        </div>
        <div class="day-body">
          ${day.sessions.length ? day.sessions.map((session) => `
            <div class="session">
              <div class="session-time">${session.time}</div>
              <div class="session-title">${session.title}</div>
              <div class="session-meta">${TASK_TYPES[session.type]?.label || 'Study'} • ${session.minutes} min</div>
            </div>
          `).join('') : '<div class="session"><div class="session-time">No study planned</div><div class="session-title">Rest or revision</div><div class="session-meta">Keep this day free</div></div>'}
        </div>
      </div>
    `)
    .join('');
}

function renderRecommendations(tasks, totalHoursPlanned, preferredWindowName, hoursPerDay = 3) {
  if (!tasks.length) {
    recommendationList.innerHTML = '<li><strong>Start with your deadlines</strong><span>Add an exam, assignment, project, or calendar task so the AI can build a focused recommendation.</span></li>';
    return;
  }

  const sorted = [...tasks].sort((a, b) => b.priority - a.priority || a.dueInDays - b.dueInDays);
  const urgent = sorted.filter((task) => task.dueInDays <= 2 || task.priority >= 85);
  const totalRequestedHours = tasks.reduce((sum, task) => sum + task.duration, 0) / 60;
  const weeklyCapacity = hoursPerDay * 7;
  const capacityPercent = Math.round((totalRequestedHours / weeklyCapacity) * 100);
  const topTask = sorted[0];
  const topType = TASK_TYPES[topTask.type]?.label || 'Study';
  const deadlineText = topTask.dueInDays <= 1 ? 'due today' : `due in ${topTask.dueInDays} days`;
  const strategy = topTask.type === 'exam'
    ? 'Use active recall and finish with a timed practice set.'
    : topTask.type === 'assignment'
      ? 'Split it into research, draft, and final-review blocks.'
      : topTask.type === 'project'
        ? 'Start with the smallest deliverable so progress is visible early.'
        : 'Use a short first block, then test yourself without notes.';
  const items = [
    {
      label: 'Next action',
      title: `Start ${topTask.name}`,
      body: `${topType} priority is ${topTask.priority}/100 and is ${deadlineText}. ${strategy}`
    },
    {
      label: 'Capacity analysis',
      title: `${Math.round(totalRequestedHours * 10) / 10}h requested vs ${weeklyCapacity}h available`,
      body: capacityPercent > 100
        ? `The plan is over capacity by ${Math.round((totalRequestedHours - weeklyCapacity) * 10) / 10}h. Add study time, reduce scope, or move lower-priority work.`
        : `Your plan uses ${capacityPercent}% of weekly capacity. Keep ${preferredWindowName} for high-focus work and protect one recovery block.`
    },
    {
      label: 'Priority queue',
      title: urgent.length ? `${urgent.length} task${urgent.length > 1 ? 's' : ''} need immediate attention` : 'No critical deadline detected',
      body: urgent.length
        ? `Work in this order: ${urgent.slice(0, 3).map((task) => task.name).join(', ')}.`
        : `After ${topTask.name}, continue with ${sorted[1]?.name || 'a revision cycle'} to keep the week balanced.`
    },
    {
      label: 'Focus rhythm',
      title: 'Use 50-minute focus blocks',
      body: `Schedule a 10-minute break after each block. The timetable currently plans ${totalHoursPlanned}h of study.`
    }
  ];

  recommendationList.innerHTML = items.map((item) => `<li><small>${item.label}</small><strong>${item.title}</strong><span>${item.body}</span></li>`).join('');
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
  const rawInput = inputText.value.trim();
  const parsed = parseNaturalLanguage(rawInput || sampleInput);
  const hoursPerDay = normalizeHoursPerDay(hoursPerDayInput.value, parsed.hoursPerDay || 3);
  const chosenWindow = normalizePreferredWindow(preferredWindow.value || parsed.preferredWindow || 'evening', 'evening');

  const calendarTasks = getCalendarTasksForPlan();
  const tasks = [...parsed.tasks, ...calendarTasks];
  const scheduleData = generateSchedule(tasks, hoursPerDay, chosenWindow);

  state.tasks = tasks;
  state.schedule = scheduleData;

  inputText.value = rawInput || sampleInput;
  hoursPerDayInput.value = hoursPerDay;
  preferredWindow.value = chosenWindow;
  windowLabel.textContent = `${capitalize(chosenWindow)} sessions`;

  renderTaskSummary(tasks, scheduleData);
  renderSchedule(scheduleData);
  renderProgression();
  renderCalendar();
  renderRecommendations(tasks, scheduleData.totalHours, chosenWindow, hoursPerDay);
  updateStats(tasks, scheduleData, hoursPerDay);
  statusBadge.textContent = calendarTasks.length ? `AI plan (${calendarTasks.length} calendar tasks)` : `Plan (${hoursPerDay}h/day)`;
  plannerContextNote.textContent = calendarTasks.length
    ? `${translate('calendarTasksIncluded', 'AI included')} ${calendarTasks.length} ${translate('savedCalendarTasks', 'saved calendar task(s)')} ${translate('prioritizedByDeadline', 'and prioritized them by deadline.')}`
    : translate('plannerContext', 'Describe your deadlines and study availability. Saved calendar tasks are included automatically.');
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function adaptiveReschedule() {
  const baseTasks = state.tasks.length ? state.tasks : parseNaturalLanguage(inputText.value || sampleInput).tasks;

  const tasks = baseTasks.map((task) => ({
    ...task,
    priority: Math.min(100, task.priority + (task.type === 'exam' ? 8 : 5)),
    dueInDays: Math.max(1, task.dueInDays - 1)
  }));

  const hours = normalizeHoursPerDay(hoursPerDayInput.value, 3);
  const chosenWindow = normalizePreferredWindow(preferredWindow.value, 'evening');
  const scheduleData = generateSchedule(tasks, hours, chosenWindow);

  state.tasks = tasks;
  state.schedule = scheduleData;

  hoursPerDayInput.value = hours;
  preferredWindow.value = chosenWindow;
  windowLabel.textContent = `${capitalize(chosenWindow)} sessions`;

  renderTaskSummary(tasks, scheduleData);
  renderSchedule(scheduleData);
  renderRecommendations(tasks, scheduleData.totalHours, chosenWindow, hours);
  updateStats(tasks, scheduleData, hours);
  statusBadge.textContent = 'Rescheduled';
}

sampleBtn.addEventListener('click', () => {
  inputText.value = sampleInput;
  hoursPerDayInput.value = 3;
  preferredWindow.value = 'evening';
  generateFromInput();
});

generateBtn.addEventListener('click', () => {
  generateFromInput();
  statusBadge.textContent = 'Generated';
});
rescheduleBtn.addEventListener('click', () => {
  adaptiveReschedule();
  statusBadge.textContent = 'Rescheduled';
});

pasteLoginBtn.addEventListener('click', pasteLoginDetails);
applyPasteBtn.addEventListener('click', () => applyClipboardText(clipboardInput.value));

function getTaskCompletionReward(task) {
  let reward = 100;
  if (task.type === 'assignment') reward += 50;
  if (task.dueInDays > 0) reward += 200;
  if (task.type === 'exam') reward += 500;
  return reward;
}

function updateStudyStreak() {
  const todayKey = getDateKey(new Date());
  if (state.lastCompletedDate === todayKey) return 0;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  state.streak = state.lastCompletedDate === getDateKey(yesterday) ? state.streak + 1 : 1;
  state.lastCompletedDate = todayKey;
  return state.streak;
}

function awardCompletionBonuses(task) {
  const reward = getTaskCompletionReward(task);
  let bonus = reward;
  const currentStreak = updateStudyStreak();

  [7, 14].forEach((milestone) => {
    if (currentStreak >= milestone && !state.awardedStreakRewards.includes(milestone)) {
      state.awardedStreakRewards.push(milestone);
      bonus += 500;
    }
  });

  const allTasksCompleted = state.tasks.length > 0 && state.tasks.every((item) => state.completedTaskIds.has(item.id));
  if (allTasksCompleted) bonus += 250;
  state.xp += bonus;
}

taskList.addEventListener('click', (event) => {
  const button = event.target.closest('.hour-task');
  if (!button) return;
  const task = state.tasks.find((item) => item.id === button.dataset.taskId);
  if (!task) return;

  if (state.completedTaskIds.has(task.id)) {
    state.completedTaskIds.delete(task.id);
    state.completedSessions = Math.max(0, state.completedSessions - 1);
    state.xp = Math.max(0, state.xp - getTaskCompletionReward(task));
  } else {
    state.completedTaskIds.add(task.id);
    state.completedSessions += 1;
    awardCompletionBonuses(task);
  }
  saveProgress();
  renderTaskSummary(state.tasks, state.schedule);
  renderProgression();
});

previousMonthBtn.addEventListener('click', () => {
  state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() - 1, 1);
  renderCalendar();
});
nextMonthBtn.addEventListener('click', () => {
  state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() + 1, 1);
  renderCalendar();
});
todayBtn.addEventListener('click', () => {
  state.selectedDate = new Date();
  state.calendarDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth(), 1);
  renderCalendar();
});

languageSelect.addEventListener('change', () => applyLanguage(languageSelect.value));
voiceInputBtn.addEventListener('click', toggleVoiceInput);
notificationBtn.addEventListener('click', startTaskNotifications);

addDailyTaskBtn.addEventListener('click', () => {
  const title = dailyTaskInput.value.trim();
  if (!title) {
    dailyTaskInput.focus();
    return;
  }

  const dateKey = getDateKey(state.selectedDate);
  state.dailyTasks[dateKey] = state.dailyTasks[dateKey] || [];
  state.dailyTasks[dateKey].push({
    id: `daily-${Date.now()}`,
    title,
    time: dailyTaskTime.value
  });
  saveDailyTasks();
  dailyTaskInput.value = '';
  dailyTaskTime.value = '';
  renderCalendar();
});

optimizeCalendarBtn.addEventListener('click', () => {
  if (!Object.keys(state.dailyTasks).length) {
    statusBadge.textContent = 'Add a calendar task first';
    dailyTaskInput.focus();
    return;
  }
  generateFromInput();
  statusBadge.textContent = 'AI timetable optimized';
  document.getElementById('timetableSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

selectedTaskList.addEventListener('click', (event) => {
  const button = event.target.closest('.remove-task-btn');
  if (!button) return;
  const dateKey = getDateKey(state.selectedDate);
  state.dailyTasks[dateKey] = (state.dailyTasks[dateKey] || []).filter((task) => task.id !== button.dataset.taskId);
  saveDailyTasks();
  renderCalendar();
});
previousDayBtn.addEventListener('click', () => {
  state.selectedDate = new Date(state.selectedDate);
  state.selectedDate.setDate(state.selectedDate.getDate() - 1);
  state.calendarDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth(), 1);
  renderCalendar();
});
nextDayBtn.addEventListener('click', () => {
  state.selectedDate = new Date(state.selectedDate);
  state.selectedDate.setDate(state.selectedDate.getDate() + 1);
  state.calendarDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth(), 1);
  renderCalendar();
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = studentName.value.trim();
  const email = studentEmail.value.trim();
  const password = passwordInput.value.trim();

  const validEmail = /\S+@\S+\.\S+/.test(email);
  if ((accountMode === 'create' && !name) || !validEmail || !password) {
    loginWarning.textContent = accountMode === 'create'
      ? 'Enter your name, a valid email, and a password to create your account.'
      : 'Enter a valid student email and password to continue.';
    return;
  }

  try {
    const existingUser = await getUserRecord(email);

    if (accountMode === 'create') {
      if (existingUser) {
        loginWarning.textContent = 'An account already exists for this email. Switch to sign in.';
        return;
      }
      await saveUserRecord(email, password, name);
      loginWarning.textContent = 'Account created. Opening your magical timetable...';
    } else if (!existingUser) {
      await saveUserRecord(email, password);
      loginWarning.textContent = 'Welcome aboard! Your account has been saved.';
    } else if (existingUser.password !== password) {
      loginWarning.textContent = 'This password does not match the saved account. Please try again.';
      return;
    } else {
      loginWarning.textContent = 'Welcome back. Opening your magical timetable...';
    }

    startAmbientMusic();
    loginScreen.classList.add('hidden');
    appShell.classList.add('visible');
  } catch (error) {
    console.error('Login database error:', error);
    loginWarning.textContent = 'Database error. Please try again.';
  }
});

accountToggleBtn.addEventListener('click', () => {
  accountMode = accountMode === 'login' ? 'create' : 'login';
  const creatingAccount = accountMode === 'create';
  studentNameField.hidden = !creatingAccount;
  studentName.required = creatingAccount;
  accountToggleBtn.textContent = creatingAccount ? 'Already have an account? Sign in' : 'Create an account';
  loginForm.querySelector('.login-btn').textContent = creatingAccount ? 'Create account' : translate('enterTimetable', 'Enter the timetable');
  loginWarning.textContent = creatingAccount ? 'Create your student profile to save your progress.' : 'Use your saved email and password to continue.';
  if (creatingAccount) studentName.focus();
});

applyLanguage(localStorage.getItem('NKSchedulerLanguage') || 'en');
setupVoiceInput();
inputText.value = sampleInput;
generateFromInput();
