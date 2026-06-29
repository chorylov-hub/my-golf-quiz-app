import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  // O/X 문제 10개
  {
    id: 1,
    type: "ox",
    question: "티샷이 OB가 나면 1벌타 후 원래 위치에서 다시 친다",
    answer: true,
    explanation: "OB(아웃오브바운즈) 시 1벌타 페널티 후 이전 위치에서 다시 티샷합니다.",
  },
  {
    id: 2,
    type: "ox",
    question: "워터해저드에 빠진 볼은 반드시 드롭해야 하며 1벌타가 부과된다",
    answer: true,
    explanation: "페널티 구역(워터해저드)에 들어간 볼은 1벌타 페널티로 드롭해야 합니다.",
  },
  {
    id: 3,
    type: "ox",
    question: "그린 위에서 다른 플레이어의 퍼팅 라인을 밟아도 벌타가 없다",
    answer: false,
    explanation: "그린 위에서 다른 플레이어의 퍼팅 라인을 밟으면 2벌타가 부과됩니다.",
  },
  {
    id: 4,
    type: "ox",
    question: "벙커 안에서 클럽으로 모래를 연습 스윙으로 건드려도 괜찮다",
    answer: false,
    explanation: "벙커에서 연습 스윙으로 모래를 건드리면 2벌타 페널티입니다.",
  },
  {
    id: 5,
    type: "ox",
    question: "볼이 나무에 걸린 경우 언플레이어블을 선언하고 1벌타로 드롭할 수 있다",
    answer: true,
    explanation: "나무 등으로 인해 플레이가 불가능하면 언플레이어블 선언 후 1벌타로 드롭할 수 있습니다.",
  },
  {
    id: 6,
    type: "ox",
    question: "홀아웃 후 다음 홀 티잉구역에서 연습 퍼팅을 해도 된다",
    answer: false,
    explanation: "다음 홀 티잉구역에서 연습 퍼팅은 2벌타 페널티 대상입니다.",
  },
  {
    id: 7,
    type: "ox",
    question: "캐디가 실수로 볼을 건드리면 플레이어에게 1벌타가 부과된다",
    answer: false,
    explanation: "캐디가 실수로 볼을 건드려도 플레이어에게는 벌타가 없습니다.",
  },
  {
    id: 8,
    type: "ox",
    question: "그린 밖에서 퍼터로 퍼팅하는 것은 규칙 위반이다",
    answer: false,
    explanation: "그린 밖에서도 퍼터 사용은 허용됩니다. 규칙 위반이 아닙니다.",
  },
  {
    id: 9,
    type: "ox",
    question: "같은 홀에서 두 번 연속 OB가 나면 총 2벌타가 누적된다",
    answer: true,
    explanation: "OB가 연속으로 나면 각각 1벌타씩, 총 2벌타가 누적됩니다.",
  },
  {
    id: 10,
    type: "ox",
    question: "볼 마커로 볼을 마크하지 않고 집어 올리면 1벌타다",
    answer: false,
    explanation: "볼 마킹은 그린 위에서만 필요합니다. 그린 밖에서는 마킹 없이 집어 올려도 됩니다.",
  },

  // 4지선다 문제 10개
  {
    id: 11,
    type: "mcq",
    question: "OB(아웃오브바운즈)의 경계를 나타내는 말뚝 색깔은?",
    options: ["노란색", "빨간색", "흰색", "파란색"],
    correctIndex: 2,
    explanation: "흰색 말뚝이 OB 경계를 나타냅니다.",
  },
  {
    id: 12,
    type: "mcq",
    question: "파3 홀에서 티샷이 홀인원이 되면 스코어는?",
    options: ["-3", "-2", "-1", "0"],
    correctIndex: 1,
    explanation: "파3에서 1타 = 2언더 = 홀인원(-2)입니다.",
  },
  {
    id: 13,
    type: "mcq",
    question: "골프에서 파보다 1타 적게 친 경우 부르는 명칭은?",
    options: ["이글", "버디", "보기", "알바트로스"],
    correctIndex: 1,
    explanation: "버디 = 파보다 1타 적게 친 경우입니다.",
  },
  {
    id: 14,
    type: "mcq",
    question: "14개를 초과하는 클럽을 가지고 라운드하면 몇 벌타인가?",
    options: [
      "홀당 1벌타 최대 2벌타",
      "홀당 2벌타 최대 4벌타",
      "즉시 실격",
      "벌타 없음",
    ],
    correctIndex: 1,
    explanation: "14개 초과 클럽 시 홀당 2벌타, 최대 4벌타가 부과됩니다.",
  },
  {
    id: 15,
    type: "mcq",
    question: "그린 위에서 볼이 홀에 걸쳐 있을 때 기다릴 수 있는 시간은?",
    options: ["5초", "10초", "30초", "무제한"],
    correctIndex: 1,
    explanation: "볼이 홀에 걸쳐 있을 때는 10초 이내에 결정해야 합니다.",
  },
  {
    id: 16,
    type: "mcq",
    question: "워터해저드(페널티구역) 경계를 나타내는 말뚝 색깔은?",
    options: ["흰색", "파란색", "노란색 또는 빨간색", "초록색"],
    correctIndex: 2,
    explanation: "노란색(일반), 빨간색(래터럴) 말뚝이 페널티 구역 경계입니다.",
  },
  {
    id: 17,
    type: "mcq",
    question: "프로 골프 대회에서 72홀 기준 가장 낮은 타수로 우승하는 방식은?",
    options: ["매치플레이", "스트로크플레이", "스킨스게임", "라이더컵"],
    correctIndex: 1,
    explanation: "스트로크플레이는 총 타수가 가장 낮은 플레이어가 우승합니다.",
  },
  {
    id: 18,
    type: "mcq",
    question:
      "퍼팅 시 홀에 가장 멀리 있는 플레이어가 먼저 치는 규칙을 무엇이라 하나?",
    options: ["아너 시스템", "레디골프", "퍼팅 순서", "어웨이 룰"],
    correctIndex: 3,
    explanation: "어웨이(away) 룰 — 홀에서 가장 먼 플레이어가 먼저 퍼팅합니다.",
  },
  {
    id: 19,
    type: "mcq",
    question: "볼이 카트도로(인공구조물)에 멈췄을 때 올바른 처리 방법은?",
    options: [
      "1벌타 드롭",
      "그 자리에서 그냥 침",
      "무벌타 구제 드롭",
      "즉시 언플레이어블",
    ],
    correctIndex: 2,
    explanation: "장애물 구제는 무벌타로 가까운 지점에서 드롭할 수 있습니다.",
  },
  {
    id: 20,
    type: "mcq",
    question: "다음 중 홀의 정규 명칭이 아닌 것은?",
    options: ["버디", "콘도르", "슈퍼이글", "알바트로스"],
    correctIndex: 2,
    explanation: "슈퍼이글은 없는 명칭입니다. 파-4는 알바트로스입니다.",
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
export const OX_COUNT = 10;
export const MCQ_COUNT = 10;
