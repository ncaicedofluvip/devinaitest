const CLICKUP_TOKEN = process.env.CLICKUP_TOKEN;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;
const DEVIN_API_KEY = process.env.DEVIN_API_KEY;

const READY_STATUS = (process.env.READY_STATUS || "ready").toLowerCase();
const IN_PROGRESS_STATUS = process.env.IN_PROGRESS_STATUS || "in progress";
const REQUIRED_TAG = (process.env.REQUIRED_TAG || "devin").toLowerCase();
const MAX_TASKS_PER_RUN = Number(process.env.MAX_TASKS_PER_RUN || "2");

if (!CLICKUP_TOKEN || !CLICKUP_LIST_ID || !DEVIN_API_KEY) {
  console.error("Missing env vars: CLICKUP_TOKEN / CLICKUP_LIST_ID / DEVIN_API_KEY");
  process.exit(1);
}

const CU_BASE = "https://api.clickup.com/api/v2";
const DEVIN_BASE = "https://api.devin.ai/v1";

async function cu(path, opts = {}) {
  const res = await fetch(`${CU_BASE}${path}`, {
    ...opts,
    headers: {
      Authorization: CLICKUP_TOKEN,
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`ClickUp ${res.status}: ${await res.text()}`);
  return res.json();
}

async function devinCreateSession(payload) {
  const res = await fetch(`${DEVIN_BASE}/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DEVIN_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Devin ${res.status}: ${await res.text()}`);
  return res.json();
}

function statusOf(task) {
  return (task?.status?.status || "").toLowerCase();
}

function hasRequiredTag(task) {
  return (task.tags || []).some(t => (t.name || "").toLowerCase() === REQUIRED_TAG);
}

function buildPrompt(task) {
  return `
You are working on the connected repo in this Devin environment.

ClickUp Task:
- ID: ${task.id}
- Title: ${task.name}
- URL: ${task.url}

Description:
${task.description || "(no description)"}

Rules:
- Create a branch named: cu-${task.id}
- Implement the task, run tests/lint
- Open a PR with title starting: [CU-${task.id}]
- PR description must include the ClickUp URL and what changed
`;
}

async function main() {
  const data = await cu(`/list/${CLICKUP_LIST_ID}/task?include_closed=false`);
  const tasks = data.tasks || [];

  const candidates = tasks
    .filter(t => statusOf(t) === READY_STATUS)
    .filter(hasRequiredTag)
    .slice(0, MAX_TASKS_PER_RUN);

  console.log(`Found ${candidates.length} candidate task(s).`);

  for (const t of candidates) {
    const session = await devinCreateSession({
      title: `[CU-${t.id}] ${t.name}`,
      prompt: buildPrompt(t),
      tags: [`clickup:${t.id}`],
    });

    const sessionId = session.session_id || session.id;

    await cu(`/task/${t.id}/comment`, {
      method: "POST",
      body: JSON.stringify({
        comment_text: `Started in Devin.\nSession: ${sessionId}`,
      }),
    });

    await cu(`/task/${t.id}`, {
      method: "PUT",
      body: JSON.stringify({ status: IN_PROGRESS_STATUS }),
    });

    console.log(`Task ${t.id} moved to "${IN_PROGRESS_STATUS}".`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
