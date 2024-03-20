export const priorityTask = [
  {
    id: "complete-profile",
    score: 45,
    reward: 5,
    approximateTime: 5,
    bgColor: "bg-[#D8EBFF]",
    taskTitle: "Complete profile",
    priority: true,
    completed: true,
    icon: "/images/complete-profile-d.svg",
  },
  {
    id: "verify-identity",
    score: 55,
    reward: 5,
    approximateTime: 8,
    bgColor: "bg-[#FFE9E7]",
    taskTitle: "Verify phone number",
    priority: true,
    completed: true,
    icon: "/images/group.svg",
  },
  {
    id: 3,
    score: 55,
    reward: 7,
    approximateTime: 8,
    bgColor: "bg-[#FFE9E7]",
    taskTitle: "Verify your identity",
    priority: true,
    completed: true,
    icon: "/images/group.svg",
  },
];

export const todo = [
  {
    id: "emplyment-task",
    score: 15,
    reward: 5,
    approximateTime: 8,
    bgColor: "bg-white",
    taskTitle: "Employment Task",
    ratings: 675,
    ratingsLevel: "/images/ratings.svg",
    completed: true,
  },
  {
    id: "lifestyle-task",
    score: 70,
    reward: 5,
    approximateTime: 8,
    bgColor: "bg-white",
    taskTitle: "Lifestyle Task",
    ratings: 675,
    ratingsLevel: "/images/ratings.svg",
    completed: true,
  },
];

export const surveys = [
  {
    id: "health-survey",
    score: 45,
    reward: 5,
    approximateTime: 5,
    bgColor: "bg-[#D8EBFF]",
    surveyTitle: "HEALTH SURVEYS",
    surveyDescription: "Complete 5 surveys and Earn more tokens",
    priority: false,
    completed: true,
  },
  {
    id: "health-survey",
    score: 45,
    reward: 5,
    approximateTime: 5,
    bgColor: "bg-[#D8EBFF]",
    surveyTitle: "HEALTH SURVEYS",
    surveyDescription: "Complete 5 surveys and Earn more tokens",
    priority: false,
    completed: true,
  },
];

export const qData = {
  phone: {
    imageUrl: "/images/questionnaire/questions.svg",
    description: "Verify your phone number",
    reward: "3",
    rewardText: "Verify your phone number for a token of 2 WLD",
    rewardPoint: "15",
    rewardPointText: "verifying your phone number",
    completionTime: "1 minute",
    completionText: "Complete this task in just 1 minute",
  },
  pin: {
    imageUrl: "/images/questionnaire/questions.svg",
    description: "Set sign up pin",
    reward: "3",
    rewardText: "set sign up pin for a token of 2 WLD",
    rewardPoint: "15",
    rewardPointText: "setting up your pin",
    completionTime: "1 minute",
    completionText: "Complete this task in just 1 minute",
  },
};
