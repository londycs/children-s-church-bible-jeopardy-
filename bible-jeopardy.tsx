import { useState } from "react";

// ── Default game data (shown on first load) ───────────────────────────────────
const DEFAULT_CATEGORIES = [
  "The Christmas Story",
  "Bible Animals",
  "Kings of the Bible",
  "God's Promises",
  "The Easter Story",
];

const DEFAULT_QUESTIONS = [
  [
    { q: "Jesus was born in this kind of place because there was no room at the inn.", a: "A stable", ddq: "What town was Jesus born in?", dda: "Bethlehem" },
    { q: "These men followed a bright star to find baby Jesus and brought him gifts.", a: "The Wise Men (Magi)", ddq: "Name one of the three gifts they brought to Jesus.", dda: "Gold, frankincense, or myrrh" },
    { q: "An angel appeared to this man in a dream and told him Mary's baby was the Son of God.", a: "Joseph", ddq: "What other name did the angel say Jesus would be called, which means 'God with us'?", dda: "Immanuel" },
    { q: "King Herod wanted to hurt baby Jesus. Where did Joseph and Mary escape to in order to keep Jesus safe?", a: "Egypt", ddq: "How did Joseph know to flee to Egypt?", dda: "An angel warned him in a dream" },
    { q: "The prophet Isaiah predicted that a virgin would give birth to a son. What name did he say the child would be called?", a: "Immanuel", ddq: "Which prophet predicted the Messiah would be born in Bethlehem specifically?", dda: "Micah" },
  ],
  [
    { q: "God told Noah to bring two of every animal onto this.", a: "The ark", ddq: "How many of each clean animal did God tell Noah to bring — 2 or 7 pairs?", dda: "7 pairs (14 of each clean animal)" },
    { q: "Samson killed one of these big wild cats with his bare hands.", a: "A lion", ddq: "What did Samson later find living inside the dead lion's body?", dda: "A beehive full of honey" },
    { q: "God sent a plague of these jumping animals all over Egypt — they got into people's beds and ovens.", a: "Frogs", ddq: "What did Moses do to end the plague of frogs?", dda: "He prayed and God caused all the frogs to die" },
    { q: "These birds brought bread and meat to the prophet Elijah while he hid in the wilderness.", a: "Ravens", ddq: "How often did the ravens bring Elijah food?", dda: "Morning and evening, every day" },
    { q: "In the book of Numbers, God made this animal talk out loud to warn its rider that an angel was blocking the road.", a: "Balaam's donkey", ddq: "How many times did the donkey turn away from the angel before God let Balaam see it?", dda: "3 times" },
  ],
  [
    { q: "This shepherd boy killed Goliath and became one of Israel's greatest kings.", a: "David", ddq: "What city did King David make the capital of Israel?", dda: "Jerusalem" },
    { q: "This king was David's son and was known as the wisest man who ever lived.", a: "Solomon", ddq: "What is the most famous thing King Solomon built?", dda: "The Temple in Jerusalem" },
    { q: "King Nebuchadnezzar had a dream about a giant statue that only this young man could explain.", a: "Daniel", ddq: "Starting from the head down, what materials was the statue made of?", dda: "Gold head, silver chest, bronze belly, iron legs, clay feet" },
    { q: "This queen traveled from far away to test King Solomon with difficult questions and was amazed by his wisdom.", a: "The Queen of Sheba", ddq: "What did she say after seeing Solomon's wisdom and wealth for herself?", dda: "That his wisdom exceeded everything she had heard" },
    { q: "This king married Jezebel and led Israel into sin by building temples for the false god Baal.", a: "King Ahab", ddq: "What did the prophet Elijah tell Ahab would happen as punishment?", dda: "That dogs would lick his blood where Naboth's blood was shed" },
  ],
  [
    { q: "After the great flood, God placed this in the sky as a sign of his promise never to flood the earth again.", a: "A rainbow", ddq: "What is the Bible word for a serious, binding promise God makes with his people?", dda: "A covenant" },
    { q: "God promised Abraham that his family would grow as many as these things in the night sky.", a: "The stars", ddq: "How old was Abraham when God first made him this promise?", dda: "75 years old" },
    { q: "God promised the Israelites a land 'flowing with milk and honey.' What was this land also called?", a: "The Promised Land (Canaan)", ddq: "Name the two faithful spies who said the Israelites could take the land.", dda: "Joshua and Caleb" },
    { q: "God promised King David that someone from his family would rule on his throne forever. Who fulfilled that promise?", a: "Jesus", ddq: "What do we call it when an Old Testament prediction comes true in the New Testament?", dda: "A fulfilled prophecy" },
    { q: "In Jeremiah 29:11, God promised his people hope and a future. What difficult situation were the Israelites in when they received this promise?", a: "They were exiled in Babylon", ddq: "How many years did God say the exile would last?", dda: "70 years" },
  ],
  [
    { q: "Jesus died on this.", a: "A cross", ddq: "What was the name of the hill where Jesus was crucified?", dda: "Golgotha (the Place of the Skull)" },
    { q: "Jesus rose from the dead on this day of the week.", a: "Sunday", ddq: "Who were the first people to discover the tomb was empty?", dda: "Mary Magdalene and the other women" },
    { q: "The night before his arrest, Jesus shared a special meal with his disciples. What do we call it today?", a: "The Last Supper", ddq: "What two things did Jesus use to represent his body and blood?", dda: "Bread and wine" },
    { q: "Peter denied knowing Jesus three times. What did Peter hear right after his third denial that made him weep?", a: "A rooster crowing", ddq: "How many times did Jesus say Peter would deny him?", dda: "3 times, before the rooster crowed" },
    { q: "After rising from the dead, Jesus appeared to his disciples for 40 days. What happened to him at the very end?", a: "He ascended into heaven", ddq: "Paul wrote that after the resurrection Jesus appeared to more than how many people at one time?", dda: "More than 500 people" },
  ],
];

const DEFAULT_FINAL_POOL = [
  { cat: "The Passover", q: "The 10th plague finally convinced Pharaoh to free the Israelites. Name the plague AND what the Israelites had to do to protect their own families from it.", a: "Plague: Death of every firstborn son. Protection: Put lamb's blood on their doorposts so the angel of death would pass over their homes." },
  { cat: "Palm Sunday", q: "The week before Easter, Jesus rode into Jerusalem and crowds celebrated. Name two things the people did to welcome him.", a: "Any 2 of: Waved palm branches / Spread cloaks on the road / Shouted 'Hosanna!' / Called him the King of Israel" },
  { cat: "The Armor of God", q: "In Ephesians 6, Paul describes the full Armor of God. Name any three pieces.", a: "Any 3 of: Belt of truth / Breastplate of righteousness / Shoes of peace / Shield of faith / Helmet of salvation / Sword of the Spirit" },
  { cat: "Creation Week", q: "God created everything in 6 days. Name what he made on Day 2 and Day 6.", a: "Day 2: The sky (separated waters above and below). Day 6: Land animals and humans (Adam and Eve)." },
  { cat: "The Lord's Prayer", q: "Jesus taught his disciples the Lord's Prayer. Finish these lines: 'Our Father, who art in heaven, _______ be thy name' and 'on earth as it is in _______.'", a: "'Hallowed' be thy name. On earth as it is in 'heaven.'" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const pointValues = [100, 200, 300, 400, 500];
const TEAM_COLORS = ["#5b8dee", "#e05c5c", "#4caf82", "#e09a2e"];
const TEAM_NAMES = ["Team 1", "Team 2", "Team 3", "Team 4"];

function pickDailyDoubles() {
  const pool = [];
  for (let col = 0; col < 5; col++)
    for (let row = 1; row < 5; row++)
      pool.push([col, row]);
  return pool.sort(() => Math.random() - 0.5).slice(0, 2);
}

function isDD(ddList, col, row) {
  return ddList.some(([c, r]) => c === col && r === row);
}

function pickFinalQ(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── AI generation ─────────────────────────────────────────────────────────────
async function generateGameData() {
  const prompt = `Generate a completely new Bible Jeopardy game for children in grades 1-5 (ages 6-11) who attend church.

Return ONLY valid JSON — no markdown, no explanation, nothing else.

The JSON must follow this exact structure:
{
  "categories": ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"],
  "questions": [
    [
      { "q": "easy $100 question", "a": "answer", "ddq": "harder daily double version", "dda": "daily double answer" },
      { "q": "$200 question", "a": "answer", "ddq": "harder version", "dda": "answer" },
      { "q": "$300 question", "a": "answer", "ddq": "harder version", "dda": "answer" },
      { "q": "$400 question", "a": "answer", "ddq": "harder version", "dda": "answer" },
      { "q": "$500 hardest question", "a": "answer", "ddq": "harder version", "dda": "answer" }
    ],
    ... (5 arrays total, one per category)
  ],
  "finalJeopardyPool": [
    { "cat": "Category Name", "q": "challenging final question", "a": "full answer" },
    { "cat": "Category Name", "q": "another question", "a": "full answer" },
    { "cat": "Category Name", "q": "another question", "a": "full answer" },
    { "cat": "Category Name", "q": "another question", "a": "full answer" },
    { "cat": "Category Name", "q": "another question", "a": "full answer" }
  ]
}

Rules:
- Pick 5 fresh, creative Bible categories (do NOT use: The Christmas Story, Bible Animals, Kings of the Bible, God's Promises, The Easter Story, Miracles, Parables of Jesus, Famous Numbers, Heroes of Faith, Angels & Heaven)
- $100-$200 questions must be answerable by a 1st grader who attends church
- $300 is medium difficulty
- $400-$500 are challenging but fair for a 5th grader
- Daily Double questions are harder versions of the same topic
- Final Jeopardy questions should be multi-part or require deeper knowledge
- Keep all answers concise and clear for a teacher to read aloud
- All content must be biblically accurate`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const text = data.content.map(b => b.text || "").join("").trim();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ── Final Jeopardy ────────────────────────────────────────────────────────────
function FinalJeopardy({ scores, teamCount, finalPool, onFinish }) {
  const [phase, setPhase] = useState("intro");
  const [wagers, setWagers] = useState(Array(4).fill(0));
  const [correct, setCorrect] = useState(Array(4).fill(null));
  const [finalQ] = useState(() => pickFinalQ(finalPool));
  const [showAnswer, setShowAnswer] = useState(false);

  const setWager = (i, val) => {
    const max = Math.max(scores[i], 100);
    setWagers(prev => prev.map((w, idx) => idx === i ? Math.max(0, Math.min(max, val)) : w));
  };

  const toggleCorrect = (i) => setCorrect(prev => prev.map((v, idx) => idx === i ? !v : v));

  const finalScores = scores.map((sc, i) =>
    i < teamCount ? (correct[i] === true ? sc + wagers[i] : correct[i] === false ? sc - wagers[i] : sc) : sc
  );
  const winnerIdx = finalScores.slice(0, teamCount).indexOf(Math.max(...finalScores.slice(0, teamCount)));

  if (phase === "intro") return (
    <div style={s.overlay}>
      <div style={s.modalBox}>
        <p style={s.fjLabel}>Final Jeopardy</p>
        <p style={{ color: "#aaa", fontSize: 14, margin: 0 }}>Each team wagers up to all their points. Get it right — earn your wager. Get it wrong — lose it.</p>
        <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Category: <span style={{ color: "#eee", fontWeight: 700 }}>{finalQ.cat}</span></p>
        <button style={s.primaryBtn} onClick={() => setPhase("wager")}>Set Wagers</button>
        <button style={s.nobodyBtn} onClick={onFinish}>Cancel</button>
      </div>
    </div>
  );

  if (phase === "wager") return (
    <div style={s.overlay}>
      <div style={{ ...s.modalBox, gap: 14 }}>
        <p style={s.fjLabel}>Set Your Wagers</p>
        <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Category: <span style={{ color: "#eee", fontWeight: 700 }}>{finalQ.cat}</span></p>
        {scores.slice(0, teamCount).map((sc, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ ...s.teamLabel, color: TEAM_COLORS[i], fontSize: 12 }}>{TEAM_NAMES[i]} — Score: ${sc}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={s.wagerBtn} onClick={() => setWager(i, wagers[i] - 100)}>−</button>
              <span style={s.wagerVal}>${wagers[i]}</span>
              <button style={s.wagerBtn} onClick={() => setWager(i, wagers[i] + 100)}>+</button>
              <button style={{ ...s.wagerBtn, fontSize: 11, padding: "6px 10px" }} onClick={() => setWager(i, sc)}>All In</button>
            </div>
          </div>
        ))}
        <button style={s.primaryBtn} onClick={() => setPhase("question")}>Lock In Wagers</button>
      </div>
    </div>
  );

  if (phase === "question") return (
    <div style={s.overlay}>
      <div style={s.modalBox}>
        <p style={s.fjLabel}>Final Jeopardy</p>
        <p style={{ color: "#666", fontSize: 12, margin: 0, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600 }}>{finalQ.cat}</p>
        <p style={s.question}>{finalQ.q}</p>
        {!showAnswer
          ? <button style={s.primaryBtn} onClick={() => setShowAnswer(true)}>Show Answer</button>
          : <>
            <div style={s.answerBox}>{finalQ.a}</div>
            <p style={s.awardPrompt}>Who got it right?</p>
            <div style={s.btnRow}>
              {scores.slice(0, teamCount).map((_, i) => (
                <button key={i} style={{
                  ...s.teamBtn,
                  borderColor: correct[i] === true ? TEAM_COLORS[i] : "#333",
                  color: correct[i] === true ? TEAM_COLORS[i] : "#555",
                  background: correct[i] === true ? `${TEAM_COLORS[i]}18` : "transparent",
                }} onClick={() => toggleCorrect(i)}>
                  {correct[i] === true ? "✓ " : ""}{TEAM_NAMES[i]}
                </button>
              ))}
            </div>
            <button style={s.primaryBtn} onClick={() => setPhase("done")}>Show Final Scores</button>
          </>
        }
      </div>
    </div>
  );

  if (phase === "done") return (
    <div style={s.overlay}>
      <div style={s.modalBox}>
        <p style={s.fjLabel}>Final Results</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {finalScores.slice(0, teamCount).map((sc, i) => {
            const delta = wagers[i] * (correct[i] === true ? 1 : correct[i] === false ? -1 : 0);
            const isWinner = i === winnerIdx;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: isWinner ? "#1e2a1e" : "#161616",
                border: `1px solid ${isWinner ? "#4caf82" : "#2a2a2a"}`,
                borderRadius: 10, padding: "12px 16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: TEAM_COLORS[i], fontWeight: 700, fontSize: 13 }}>{TEAM_NAMES[i]}</span>
                  {isWinner && <span style={{ color: "#4caf82", fontSize: 12, fontWeight: 700 }}>Winner</span>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#eee", fontWeight: 800, fontSize: 20 }}>${sc}</div>
                  {delta !== 0 && <div style={{ fontSize: 12, color: delta > 0 ? "#4caf82" : "#e05c5c", fontWeight: 600 }}>{delta > 0 ? `+$${delta}` : `-$${Math.abs(delta)}`}</div>}
                </div>
              </div>
            );
          })}
        </div>
        <button style={s.primaryBtn} onClick={onFinish}>Done</button>
      </div>
    </div>
  );

  return null;
}

// ── Main game ─────────────────────────────────────────────────────────────────
export default function BibleJeopardy() {
  const [teamCount, setTeamCount] = useState(2);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [used, setUsed] = useState(() => Array(5).fill(null).map(() => Array(5).fill(false)));
  const [dailyDoubles, setDailyDoubles] = useState(() => pickDailyDoubles());
  const [modal, setModal] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [started, setStarted] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  // Game content — starts with defaults, replaced by AI generation
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [finalPool, setFinalPool] = useState(DEFAULT_FINAL_POOL);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState(null);

  const dd = modal ? isDD(dailyDoubles, modal.col, modal.row) : false;
  const activePts = modal ? (dd ? pointValues[modal.row] * 2 : pointValues[modal.row]) : 0;
  const activeQ = modal ? (dd ? questions[modal.col][modal.row].ddq : questions[modal.col][modal.row].q) : "";
  const activeA = modal ? (dd ? questions[modal.col][modal.row].dda : questions[modal.col][modal.row].a) : "";

  const handleGenerate = async () => {
    setGenerating(true);
    setGenError(null);
    try {
      const data = await generateGameData();
      setCategories(data.categories);
      setQuestions(data.questions);
      setFinalPool(data.finalJeopardyPool);
      // Reset the board
      setScores([0, 0, 0, 0]);
      setUsed(Array(5).fill(null).map(() => Array(5).fill(false)));
      setDailyDoubles(pickDailyDoubles());
      setModal(null);
      setShowFinal(false);
    } catch (e) {
      setGenError("Something went wrong. Try again.");
    } finally {
      setGenerating(false);
    }
  };

  const openTile = (col, row) => { if (used[col][row]) return; setModal({ col, row }); setShowAnswer(false); };
  const award = (teamIdx) => { setScores(prev => prev.map((s, i) => i === teamIdx ? s + activePts : s)); finish(); };
  const finish = () => {
    setUsed(prev => prev.map((c, ci) => c.map((v, ri) => (ci === modal.col && ri === modal.row) ? true : v)));
    setModal(null); setShowAnswer(false);
  };
  const resetBoard = () => {
    setScores([0, 0, 0, 0]);
    setUsed(Array(5).fill(null).map(() => Array(5).fill(false)));
    setDailyDoubles(pickDailyDoubles());
    setModal(null); setShowAnswer(false); setShowFinal(false);
  };

  const allTilesUsed = used.every(col => col.every(v => v));

  // ── Splash ──
  if (!started) return (
    <div style={s.page}>
      <div style={s.splashBox}>
        <p style={s.cross}>✝</p>
        <h1 style={s.splashTitle}>Bible Jeopardy</h1>
        <p style={s.splashSub}>Grades 1 – 5</p>
        <div style={{ marginTop: 8, width: "100%" }}>
          <p style={s.label}>Number of teams</p>
          <div style={s.row}>
            {[2, 3, 4].map(n => (
              <button key={n} style={{ ...s.countBtn, ...(teamCount === n ? s.countBtnActive : {}) }}
                onClick={() => setTeamCount(n)}>{n}</button>
            ))}
          </div>
        </div>
        <button style={s.startBtn} onClick={() => setStarted(true)}>Start Game</button>
        <div style={s.divider} />
        <button style={s.generateBtn} onClick={handleGenerate} disabled={generating}>
          {generating ? "Generating…" : "✦ Generate New Questions"}
        </button>
        {genError && <p style={s.errorTxt}>{genError}</p>}
        <p style={s.genHint}>Uses AI to build a brand new game with fresh categories and questions every time.</p>
      </div>
    </div>
  );

  // ── Board ──
  return (
    <div style={s.page}>
      <div style={s.scoreRow}>
        {scores.slice(0, teamCount).map((sc, i) => (
          <div key={i} style={{ ...s.scoreBox, borderColor: TEAM_COLORS[i] }}>
            <span style={{ ...s.teamLabel, color: TEAM_COLORS[i] }}>{TEAM_NAMES[i]}</span>
            <span style={s.scoreNum}>${sc}</span>
          </div>
        ))}
      </div>

      <div style={{ ...s.grid, gridTemplateColumns: "repeat(5, 1fr)" }}>
        {categories.map((cat, ci) => <div key={ci} style={s.catHeader}>{cat}</div>)}
        {pointValues.map((pt, ri) =>
          categories.map((_, ci) => {
            const done = used[ci][ri];
            const ddTile = isDD(dailyDoubles, ci, ri);
            return (
              <button key={`${ci}-${ri}`} style={{
                ...s.tile, opacity: done ? 0.15 : 1, cursor: done ? "default" : "pointer",
                borderColor: ddTile && !done ? "#c8a84b" : "#2a2a2a",
              }} onClick={() => openTile(ci, ri)} disabled={done}>
                {done ? "" : ddTile ? "★" : `$${pt}`}
              </button>
            );
          })
        )}
      </div>

      <div style={s.bottomRow}>
        {allTilesUsed && !showFinal && (
          <button style={s.finalBtn} onClick={() => setShowFinal(true)}>Final Jeopardy</button>
        )}
        <button style={s.resetBtn} onClick={resetBoard}>Reset Board</button>
        <button style={s.generateBtn} onClick={handleGenerate} disabled={generating}>
          {generating ? "Generating…" : "✦ New Questions"}
        </button>
      </div>
      {genError && <p style={s.errorTxt}>{genError}</p>}

      {/* Question modal */}
      {modal && (
        <div style={s.overlay}>
          <div style={s.modalBox}>
            <div style={s.modalTop}>
              {dd && <span style={s.ddTag}>★ Daily Double</span>}
              <span style={s.modalPts}>${activePts}</span>
              <span style={s.modalCat}>{categories[modal.col]}</span>
            </div>
            <p style={s.question}>{activeQ}</p>
            {!showAnswer
              ? <button style={s.primaryBtn} onClick={() => setShowAnswer(true)}>Show Answer</button>
              : <>
                <div style={s.answerBox}>{activeA}</div>
                <p style={s.awardPrompt}>Who got it?</p>
                <div style={s.btnRow}>
                  {scores.slice(0, teamCount).map((_, i) => (
                    <button key={i} style={{ ...s.teamBtn, borderColor: TEAM_COLORS[i], color: TEAM_COLORS[i] }}
                      onClick={() => award(i)}>{TEAM_NAMES[i]}</button>
                  ))}
                  <button style={s.nobodyBtn} onClick={finish}>Nobody</button>
                </div>
              </>
            }
          </div>
        </div>
      )}

      {/* Generating overlay */}
      {generating && (
        <div style={s.overlay}>
          <div style={{ ...s.modalBox, alignItems: "center", textAlign: "center", gap: 12 }}>
            <p style={s.fjLabel}>Generating New Game</p>
            <p style={{ color: "#888", fontSize: 14, margin: 0 }}>Coming up with fresh categories and questions…</p>
            <div style={s.spinner} />
          </div>
        </div>
      )}

      {showFinal && (
        <FinalJeopardy scores={scores} teamCount={teamCount} finalPool={finalPool} onFinish={() => setShowFinal(false)} />
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: "#111", display: "flex", flexDirection: "column", alignItems: "center", padding: 16, gap: 12, fontFamily: "system-ui, sans-serif", color: "#eee" },
  splashBox: { marginTop: 40, background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 16, padding: "36px 32px", maxWidth: 340, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" },
  cross: { fontSize: 36, margin: 0, color: "#c8a84b" },
  splashTitle: { margin: 0, fontSize: 30, fontWeight: 700, color: "#eee", letterSpacing: 1 },
  splashSub: { margin: 0, fontSize: 14, color: "#888" },
  label: { margin: "0 0 10px", fontSize: 14, color: "#aaa", fontWeight: 600 },
  row: { display: "flex", gap: 10, justifyContent: "center" },
  countBtn: { background: "#222", border: "1px solid #333", color: "#aaa", borderRadius: 8, padding: "10px 20px", fontSize: 18, fontWeight: 700, cursor: "pointer" },
  countBtnActive: { background: "#c8a84b", border: "1px solid #c8a84b", color: "#111" },
  startBtn: { background: "#c8a84b", color: "#111", border: "none", borderRadius: 10, padding: "12px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", width: "100%" },
  divider: { width: "100%", height: 1, background: "#2a2a2a" },
  generateBtn: { background: "transparent", border: "1px solid #444", color: "#aaa", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "system-ui, sans-serif", width: "100%" },
  genHint: { color: "#555", fontSize: 12, margin: 0, lineHeight: 1.4 },
  errorTxt: { color: "#e05c5c", fontSize: 13, margin: 0 },
  scoreRow: { display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 700 },
  scoreBox: { background: "#1a1a1a", border: "1px solid", borderRadius: 10, padding: "8px 16px", display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 },
  teamLabel: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 },
  scoreNum: { fontSize: 22, fontWeight: 800, color: "#eee", marginTop: 2 },
  grid: { display: "grid", gap: 5, width: "100%", maxWidth: 700 },
  catHeader: { background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, padding: "10px 6px", textAlign: "center", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#aaa", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52, lineHeight: 1.3 },
  tile: { background: "#1a1a1a", border: "1px solid", borderRadius: 8, minHeight: 58, fontSize: 18, fontWeight: 800, color: "#c8a84b", cursor: "pointer", fontFamily: "system-ui, sans-serif" },
  bottomRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "center" },
  finalBtn: { background: "#1a1a1a", border: "1px solid #c8a84b", color: "#c8a84b", borderRadius: 8, padding: "9px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "system-ui, sans-serif" },
  resetBtn: { background: "transparent", border: "1px solid #333", color: "#888", borderRadius: 8, padding: "8px 20px", fontSize: 13, cursor: "pointer", fontFamily: "system-ui, sans-serif" },
  overlay: { position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 },
  modalBox: { background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 14, padding: "28px 24px", maxWidth: 460, width: "100%", display: "flex", flexDirection: "column", gap: 16 },
  modalTop: { display: "flex", flexDirection: "column", gap: 4 },
  ddTag: { fontSize: 12, fontWeight: 700, color: "#c8a84b", textTransform: "uppercase", letterSpacing: 2 },
  modalPts: { fontSize: 32, fontWeight: 900, color: "#c8a84b", lineHeight: 1 },
  modalCat: { fontSize: 12, color: "#666", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600 },
  question: { fontSize: 19, fontWeight: 600, color: "#eee", lineHeight: 1.5, margin: 0 },
  primaryBtn: { background: "#c8a84b", color: "#111", border: "none", borderRadius: 8, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "system-ui, sans-serif" },
  answerBox: { background: "#111", border: "1px solid #2e2e2e", borderRadius: 8, padding: "14px 16px", fontSize: 17, fontWeight: 700, color: "#eee", lineHeight: 1.4 },
  awardPrompt: { margin: 0, fontSize: 13, color: "#888", fontWeight: 600 },
  btnRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  teamBtn: { background: "transparent", border: "1px solid", borderRadius: 8, padding: "9px 16px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "system-ui, sans-serif" },
  nobodyBtn: { background: "transparent", border: "1px solid #333", borderRadius: 8, padding: "9px 16px", fontSize: 14, fontWeight: 600, color: "#666", cursor: "pointer", fontFamily: "system-ui, sans-serif" },
  fjLabel: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#c8a84b", margin: 0 },
  wagerBtn: { background: "#222", border: "1px solid #333", color: "#eee", borderRadius: 6, padding: "8px 14px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "system-ui, sans-serif" },
  wagerVal: { fontSize: 22, fontWeight: 800, color: "#c8a84b", minWidth: 70, textAlign: "center" },
  spinner: { width: 32, height: 32, border: "3px solid #333", borderTop: "3px solid #c8a84b", borderRadius: "50%", animation: "spin 0.8s linear infinite", "@keyframes spin": { to: { transform: "rotate(360deg)" } } },
};

