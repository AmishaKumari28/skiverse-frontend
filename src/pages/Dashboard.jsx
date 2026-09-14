import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

// ---------- Mock data ----------

const OVERVIEW = {
  totalStudents: 312,
  activeThisWeek: 118,
  totalMentors: 47,
  totalUnlocks: 861,
};

const WEEKLY_ACTIVITY = [
  { week: "Wk 1", learners: 18, mentors: 4 },
  { week: "Wk 2", learners: 34, mentors: 9 },
  { week: "Wk 3", learners: 52, mentors: 14 },
  { week: "Wk 4", learners: 71, mentors: 19 },
  { week: "Wk 5", learners: 96, mentors: 28 },
  { week: "Wk 6", learners: 118, mentors: 34 },
];

const MENTORS = [
  { id: "m1", name: "Ayush P.", skill: "DSA" },
  { id: "m2", name: "Riya S.", skill: "Web Dev" },
  { id: "m3", name: "Khushi M.", skill: "Python" },
  { id: "m4", name: "Disha K.", skill: "UI Design" },
];

const LEARNERS = [
  { id: "l1", name: "Aman" },
  { id: "l2", name: "Priya" },
  { id: "l3", name: "Yash" },
  { id: "l4", name: "Simran" },
  { id: "l5", name: "Rohan" },
  { id: "l6", name: "Neha" },
  { id: "l7", name: "Karan" },
  { id: "l8", name: "Tanvi" },
];

const UNLOCKS = [
  {
    learner: "l1",
    mentor: "m1",
    video: "Trees & Graphs Crash Course",
    pct: 100,
    date: "Sep 10",
  },
  {
    learner: "l2",
    mentor: "m1",
    video: "Dynamic Programming Basics",
    pct: 82,
    date: "Sep 11",
  },
  {
    learner: "l3",
    mentor: "m2",
    video: "React Hooks in 20 min",
    pct: 100,
    date: "Sep 11",
  },
  {
    learner: "l4",
    mentor: "m2",
    video: "Building REST APIs",
    pct: 45,
    date: "Sep 12",
  },
  {
    learner: "l5",
    mentor: "m3",
    video: "NumPy for Beginners",
    pct: 100,
    date: "Sep 12",
  },
  {
    learner: "l6",
    mentor: "m3",
    video: "Python OOP Concepts",
    pct: 70,
    date: "Sep 13",
  },
  {
    learner: "l7",
    mentor: "m4",
    video: "Figma to Frontend",
    pct: 100,
    date: "Sep 13",
  },
  {
    learner: "l1",
    mentor: "m2",
    video: "State Management 101",
    pct: 60,
    date: "Sep 13",
  },
  {
    learner: "l8",
    mentor: "m1",
    video: "Trees & Graphs Crash Course",
    pct: 100,
    date: "Sep 14",
  },
  {
    learner: "l3",
    mentor: "m4",
    video: "Design Systems Intro",
    pct: 30,
    date: "Sep 14",
  },
];

const STUDENT_PROGRESS = [
  { name: "Aman", unlocked: 6, completed: 4, credits: 40 },
  { name: "Priya", unlocked: 4, completed: 4, credits: 55 },
  { name: "Yash", unlocked: 8, completed: 5, credits: 30 },
  { name: "Simran", unlocked: 3, completed: 1, credits: 15 },
  { name: "Rohan", unlocked: 5, completed: 5, credits: 60 },
  { name: "Neha", unlocked: 7, completed: 3, credits: 25 },
];

// ---------- Skiverse colors ----------

const COLORS = {
  bg: "#F7F8FF",
  surface: "#FFFFFF",
  surfaceRaised: "#DCE9FF",
  border: "#D8DEEE",
  primary: "#174F78",
  secondary: "#215579",
  blue: "#8D9FBE",
  lightBlue: "#DCE9FF",
  yellow: "#E6C221",
  text: "#24344D",
  muted: "#6B7280",
};

function StatCard({ label, value, sub, accent }) {
  return (
    <div
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: "20px 22px",
        flex: "1 1 180px",
        minWidth: 160,
        boxShadow: "0 2px 8px rgba(23, 79, 120, 0.05)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          color: COLORS.muted,
          marginBottom: 8,
          fontFamily: "monospace",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: accent || COLORS.primary,
          lineHeight: 1,
        }}
      >
        {value}
      </div>

      {sub && (
        <div
          style={{
            fontSize: 12,
            color: COLORS.muted,
            marginTop: 7,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function Overview() {
  return (
    <div>
      <h2
        style={{
          fontSize: 25,
          color: COLORS.primary,
          marginBottom: 18,
          fontWeight: 700,
        }}
      >
        Platform Overview
      </h2>

      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          marginBottom: 28,
        }}
      >
        <StatCard
          label="Registered Students"
          value={OVERVIEW.totalStudents}
        />

        <StatCard
          label="Active This Week"
          value={OVERVIEW.activeThisWeek}
          sub="unlocked ≥1 video"
          accent={COLORS.secondary}
        />

        <StatCard
          label="Active Mentors"
          value={OVERVIEW.totalMentors}
          sub="uploaded ≥1 video"
          accent={COLORS.yellow}
        />

        <StatCard
          label="Total Unlocks"
          value={OVERVIEW.totalUnlocks}
        />
      </div>

      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: "20px 20px 8px",
          boxShadow: "0 2px 8px rgba(23, 79, 120, 0.05)",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: COLORS.muted,
            marginBottom: 14,
            fontFamily: "monospace",
          }}
        >
          Weekly Growth — Learners vs. Mentors
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={WEEKLY_ACTIVITY}
            margin={{ left: -10, right: 10 }}
          >
            <CartesianGrid
              stroke={COLORS.border}
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="week"
              stroke={COLORS.muted}
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: COLORS.border }}
            />

            <YAxis
              stroke={COLORS.muted}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                fontSize: 12,
              }}
            />

            <Legend wrapperStyle={{ fontSize: 12 }} />

            <Line
              type="monotone"
              dataKey="learners"
              name="Learners"
              stroke={COLORS.primary}
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />

            <Line
              type="monotone"
              dataKey="mentors"
              name="Mentors"
              stroke={COLORS.yellow}
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function UnlockNetwork() {
  const [hovered, setHovered] = useState(null);

  const width = 640;
  const height = 360;
  const mentorX = 130;
  const learnerX = 510;

  const mentorPos = useMemo(() => {
    const map = {};

    MENTORS.forEach((m, i) => {
      map[m.id] = {
        x: mentorX,
        y: 40 + i * ((height - 80) / (MENTORS.length - 1)),
      };
    });

    return map;
  }, []);

  const learnerPos = useMemo(() => {
    const map = {};

    LEARNERS.forEach((l, i) => {
      map[l.id] = {
        x: learnerX,
        y: 20 + i * ((height - 40) / (LEARNERS.length - 1)),
      };
    });

    return map;
  }, []);

  return (
    <div>
      <h2
        style={{
          fontSize: 25,
          color: COLORS.primary,
          marginBottom: 6,
          fontWeight: 700,
        }}
      >
        Unlock Network
      </h2>

      <p
        style={{
          fontSize: 13,
          color: COLORS.muted,
          marginBottom: 18,
        }}
      >
        Who unlocked whose video — blue nodes are mentors, yellow nodes
        represent learning activity.
      </p>

      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: 20,
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          boxShadow: "0 2px 8px rgba(23, 79, 120, 0.05)",
        }}
      >
        <svg
          width={width}
          height={height}
          style={{
            flex: "0 0 auto",
            maxWidth: "100%",
          }}
        >
          {UNLOCKS.map((u, i) => {
            const from = mentorPos[u.mentor];
            const to = learnerPos[u.learner];
            const isHovered = hovered === i;

            return (
              <path
                key={i}
                d={`M ${from.x} ${from.y} C ${
                  (from.x + to.x) / 2
                } ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${
                  to.y
                }`}
                fill="none"
                stroke={
                  isHovered ? COLORS.primary : COLORS.border
                }
                strokeWidth={isHovered ? 2.5 : 1.2}
                opacity={isHovered ? 1 : 0.8}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  cursor: "pointer",
                  transition: "stroke .15s, stroke-width .15s",
                }}
              />
            );
          })}

          {MENTORS.map((m) => (
            <g key={m.id}>
              <circle
                cx={mentorPos[m.id].x}
                cy={mentorPos[m.id].y}
                r={9}
                fill={COLORS.primary}
              />

              <text
                x={mentorPos[m.id].x - 16}
                y={mentorPos[m.id].y + 4}
                textAnchor="end"
                fontSize={12}
                fill={COLORS.text}
                fontFamily="monospace"
              >
                {m.name}
              </text>
            </g>
          ))}

          {LEARNERS.map((l) => (
            <g key={l.id}>
              <circle
                cx={learnerPos[l.id].x}
                cy={learnerPos[l.id].y}
                r={6}
                fill={COLORS.yellow}
              />

              <text
                x={learnerPos[l.id].x + 14}
                y={learnerPos[l.id].y + 4}
                fontSize={12}
                fill={COLORS.muted}
                fontFamily="monospace"
              >
                {l.name}
              </text>
            </g>
          ))}
        </svg>

        <div
          style={{
            flex: "1 1 220px",
            minWidth: 220,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: COLORS.muted,
              marginBottom: 8,
            }}
          >
            {hovered !== null
              ? "Selected unlock"
              : "Hover a line to inspect"}
          </div>

          {hovered !== null ? (
            <div
              style={{
                background: COLORS.lightBlue,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: 14,
                fontSize: 13,
                color: COLORS.text,
              }}
            >
              <div style={{ marginBottom: 6 }}>
                <b>{UNLOCKS[hovered].video}</b>
              </div>

              <div style={{ color: COLORS.muted }}>
                {
                  MENTORS.find(
                    (m) => m.id === UNLOCKS[hovered].mentor
                  )?.name
                }{" "}
                →{" "}
                {
                  LEARNERS.find(
                    (l) => l.id === UNLOCKS[hovered].learner
                  )?.name
                }
              </div>

              <div
                style={{
                  marginTop: 8,
                  color: COLORS.muted,
                }}
              >
                Watched: {UNLOCKS[hovered].pct}% ·{" "}
                {UNLOCKS[hovered].date}
              </div>
            </div>
          ) : (
            <div
              style={{
                fontSize: 13,
                color: COLORS.muted,
                lineHeight: 1.6,
              }}
            >
              {UNLOCKS.length} unlocks logged this week across{" "}
              {MENTORS.length} mentors and {LEARNERS.length} active
              learners.
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: 18,
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(23, 79, 120, 0.05)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
            }}
          >
            <thead>
              <tr
                style={{
                  background: COLORS.lightBlue,
                  color: COLORS.secondary,
                  textAlign: "left",
                }}
              >
                {[
                  "Learner",
                  "Video",
                  "Mentor",
                  "Watched",
                  "Date",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {UNLOCKS.map((u, i) => (
                <tr
                  key={i}
                  style={{
                    borderTop: `1px solid ${COLORS.border}`,
                    color: COLORS.text,
                  }}
                >
                  <td style={{ padding: "10px 16px" }}>
                    {
                      LEARNERS.find(
                        (l) => l.id === u.learner
                      )?.name
                    }
                  </td>

                  <td
                    style={{
                      padding: "10px 16px",
                      color: COLORS.muted,
                    }}
                  >
                    {u.video}
                  </td>

                  <td style={{ padding: "10px 16px" }}>
                    {
                      MENTORS.find(
                        (m) => m.id === u.mentor
                      )?.name
                    }
                  </td>

                  <td style={{ padding: "10px 16px" }}>
                    <span
                      style={{
                        color:
                          u.pct >= 70
                            ? COLORS.primary
                            : COLORS.muted,
                        fontWeight: u.pct >= 70 ? 600 : 400,
                      }}
                    >
                      {u.pct}%
                    </span>
                  </td>

                  <td
                    style={{
                      padding: "10px 16px",
                      color: COLORS.muted,
                    }}
                  >
                    {u.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StudentProgress() {
  return (
    <div>
      <h2
        style={{
          fontSize: 25,
          color: COLORS.primary,
          marginBottom: 6,
          fontWeight: 700,
        }}
      >
        Student Progress
      </h2>

      <p
        style={{
          fontSize: 13,
          color: COLORS.muted,
          marginBottom: 18,
        }}
      >
        Videos unlocked vs. completed after crossing the 70% watch
        threshold, and credit balance per student.
      </p>

      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: "20px 20px 8px",
          marginBottom: 18,
          boxShadow: "0 2px 8px rgba(23, 79, 120, 0.05)",
        }}
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={STUDENT_PROGRESS}
            margin={{ left: -10, right: 10 }}
          >
            <CartesianGrid
              stroke={COLORS.border}
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke={COLORS.muted}
              fontSize={12}
              tickLine={false}
              axisLine={{
                stroke: COLORS.border,
              }}
            />

            <YAxis
              stroke={COLORS.muted}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                fontSize: 12,
              }}
            />

            <Legend wrapperStyle={{ fontSize: 12 }} />

            <Bar
              dataKey="unlocked"
              name="Unlocked"
              fill={COLORS.blue}
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="completed"
              name="Completed (≥70%)"
              fill={COLORS.primary}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(23, 79, 120, 0.05)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
            }}
          >
            <thead>
              <tr
                style={{
                  background: COLORS.lightBlue,
                  color: COLORS.secondary,
                  textAlign: "left",
                }}
              >
                {[
                  "Student",
                  "Unlocked",
                  "Completed",
                  "Completion Rate",
                  "Credit Balance",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {STUDENT_PROGRESS.map((s) => {
                const rate = Math.round(
                  (s.completed / s.unlocked) * 100
                );

                return (
                  <tr
                    key={s.name}
                    style={{
                      borderTop: `1px solid ${COLORS.border}`,
                      color: COLORS.text,
                    }}
                  >
                    <td style={{ padding: "10px 16px" }}>
                      {s.name}
                    </td>

                    <td
                      style={{
                        padding: "10px 16px",
                        color: COLORS.muted,
                      }}
                    >
                      {s.unlocked}
                    </td>

                    <td
                      style={{
                        padding: "10px 16px",
                        color: COLORS.muted,
                      }}
                    >
                      {s.completed}
                    </td>

                    <td style={{ padding: "10px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 60,
                            height: 6,
                            background: COLORS.border,
                            borderRadius: 3,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${rate}%`,
                              height: "100%",
                              background: COLORS.primary,
                            }}
                          />
                        </div>

                        <span
                          style={{
                            color: COLORS.muted,
                            fontSize: 12,
                          }}
                        >
                          {rate}%
                        </span>
                      </div>
                    </td>

                    <td
                      style={{
                        padding: "10px 16px",
                        color: COLORS.yellow,
                        fontWeight: 700,
                      }}
                    >
                      {s.credits}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function SkiverseDashboard() {
  const [tab, setTab] = useState("overview");

  const NAV = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "network",
      label: "Unlock Network",
    },
    {
      id: "progress",
      label: "Student Progress",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <main
        style={{
          width: "100%",
          padding: "30px 36px",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 15,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              Skiverse Dashboard
            </h1>

            <p
              style={{
                margin: "6px 0 0",
                color: COLORS.muted,
                fontSize: 13,
              }}
            >
              Track learning activity, unlocks and student progress.
            </p>
          </div>

          <div
            style={{
              background: COLORS.lightBlue,
              color: COLORS.primary,
              padding: "8px 14px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Admin Overview
          </div>
        </div>

        {/* Dashboard navigation */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 25,
            flexWrap: "wrap",
          }}
        >
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                border:
                  tab === n.id
                    ? `1px solid ${COLORS.primary}`
                    : `1px solid ${COLORS.border}`,
                cursor: "pointer",
                background:
                  tab === n.id
                    ? COLORS.primary
                    : COLORS.surface,
                color:
                  tab === n.id
                    ? "#FFFFFF"
                    : COLORS.primary,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {n.label}
            </button>
          ))}
        </div>

        {tab === "overview" && <Overview />}
        {tab === "network" && <UnlockNetwork />}
        {tab === "progress" && <StudentProgress />}
      </main>
    </div>
  );
}