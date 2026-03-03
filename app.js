const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const CHORD_QUALITIES = {
  maj7: {
    name: "Major 7",
    formula: ["1", "3", "5", "7"],
    semitones: [0, 4, 7, 11],
  },
  m7: {
    name: "Minor 7",
    formula: ["1", "b3", "5", "b7"],
    semitones: [0, 3, 7, 10],
  },
  dom7: {
    name: "Dominant 7",
    formula: ["1", "3", "5", "b7"],
    semitones: [0, 4, 7, 10],
  },
  m7b5: {
    name: "Minor 7b5",
    formula: ["1", "b3", "b5", "b7"],
    semitones: [0, 3, 6, 10],
  },
  dim7: {
    name: "Diminished 7",
    formula: ["1", "b3", "b5", "bb7"],
    semitones: [0, 3, 6, 9],
  },
};

const LESSONS = [
  {
    title: "Week 1: Guide tones (3rd + 7th)",
    detail: "Play 3rd/7th only for Cmaj7, Dm7, G7 in 3 areas of the neck.",
  },
  {
    title: "Week 2: Shell voicings",
    detail: "Add roots; comp ii-V-I in 4 keys at 60 bpm.",
  },
  {
    title: "Week 3: Drop-2 voicings",
    detail: "Use 4-note voicings and connect nearest shape on every bar.",
  },
  {
    title: "Week 4: Turnarounds",
    detail: "Practice I-vi-ii-V in all 12 keys with swing rhythm.",
  },
  {
    title: "Week 5+: Standards fluency",
    detail: "Apply to Autumn Leaves + Blue Bossa with smooth voice leading.",
  },
];

const SHAPES = {
  maj7: [
    { name: "Shell (6th-string root)", offsets: [0, null, 1, 1, null, null], rootString: 6 },
    { name: "Shell (5th-string root)", offsets: [null, 0, 1, 1, null, null], rootString: 5 },
    { name: "Drop-2 flavor", offsets: [0, null, 1, 0, 0, null], rootString: 6 },
  ],
  m7: [
    { name: "Shell (6th-string root)", offsets: [0, null, 0, 0, null, null], rootString: 6 },
    { name: "Shell (5th-string root)", offsets: [null, 0, 0, 0, null, null], rootString: 5 },
    { name: "Drop-2 flavor", offsets: [0, null, 0, 0, 1, null], rootString: 6 },
  ],
  dom7: [
    { name: "Shell (6th-string root)", offsets: [0, null, 0, 1, null, null], rootString: 6 },
    { name: "Shell (5th-string root)", offsets: [null, 0, 0, 1, null, null], rootString: 5 },
    { name: "Drop-2 flavor", offsets: [0, null, 0, 1, 0, null], rootString: 6 },
  ],
  m7b5: [
    { name: "Half-diminished shell", offsets: [null, 0, 1, 0, null, null], rootString: 5 },
    { name: "Compact shape", offsets: [0, null, 0, -1, -1, null], rootString: 6 },
    { name: "Guide-tone shape", offsets: [null, 0, null, 0, 1, null], rootString: 5 },
  ],
  dim7: [
    { name: "Symmetric grip A", offsets: [0, null, -1, 0, -1, null], rootString: 6 },
    { name: "Symmetric grip B", offsets: [null, 0, -1, 0, -1, null], rootString: 5 },
    { name: "Tight top-set", offsets: [null, null, 0, 1, 0, 1], rootString: 4 },
  ],
};

const ZONES = {
  low: [1, 5],
  mid: [5, 9],
  high: [9, 13],
};

const openNoteByString = {
  6: 4,
  5: 9,
  4: 2,
  3: 7,
  2: 11,
  1: 4,
};

const rootSelect = document.getElementById("rootSelect");
const qualitySelect = document.getElementById("qualitySelect");
const keySelect = document.getElementById("keySelect");
const zoneSelect = document.getElementById("zoneSelect");
const formulaLine = document.getElementById("formulaLine");
const notesLine = document.getElementById("notesLine");
const voicingCards = document.getElementById("voicingCards");
const progressionOut = document.getElementById("progressionOut");
const lessonList = document.getElementById("lessonList");
const newProgressionBtn = document.getElementById("newProgressionBtn");

function noteToIndex(note) {
  return NOTES.indexOf(note);
}

function transpose(root, semitones) {
  const idx = noteToIndex(root);
  return NOTES[(idx + semitones + 12) % 12];
}

function findRootFret(root, rootString, zone) {
  const open = openNoteByString[rootString];
  const rootIdx = noteToIndex(root);
  const [minFret, maxFret] = ZONES[zone];
  let candidates = [];
  for (let fret = 0; fret <= 16; fret += 1) {
    if ((open + fret) % 12 === rootIdx) candidates.push(fret);
  }
  candidates = candidates.filter((fret) => fret >= minFret && fret <= maxFret);
  if (candidates.length === 0) {
    for (let fret = 0; fret <= 16; fret += 1) {
      if ((open + fret) % 12 === rootIdx) candidates.push(fret);
    }
  }
  const center = (minFret + maxFret) / 2;
  return candidates.sort((a, b) => Math.abs(a - center) - Math.abs(b - center))[0];
}

function buildVoicing(root, quality, zone, shape) {
  const rootFret = findRootFret(root, shape.rootString, zone);
  const frets = shape.offsets.map((offset) => {
    if (offset === null) return "x";
    const target = rootFret + offset;
    if (target < 0 || target > 16) return "x";
    return target;
  });
  return {
    name: shape.name,
    root,
    quality,
    frets,
  };
}

function renderDiagram({ frets }) {
  const width = 220;
  const height = 240;
  const left = 28;
  const top = 30;
  const stringGap = 32;
  const fretGap = 36;

  const numericFrets = frets.filter((f) => Number.isInteger(f));
  const minFret = numericFrets.length ? Math.min(...numericFrets.filter((f) => f > 0)) : 1;
  const baseFret = minFret > 1 ? minFret : 1;

  let lines = "";
  for (let i = 0; i < 6; i += 1) {
    const x = left + i * stringGap;
    lines += `<line x1="${x}" y1="${top}" x2="${x}" y2="${top + fretGap * 4}" stroke="currentColor"/>`;
  }

  for (let i = 0; i < 5; i += 1) {
    const y = top + i * fretGap;
    lines += `<line x1="${left}" y1="${y}" x2="${left + stringGap * 5}" y2="${y}" stroke="currentColor"/>`;
  }

  if (baseFret === 1) {
    lines += `<line x1="${left}" y1="${top}" x2="${left + stringGap * 5}" y2="${top}" stroke="currentColor" stroke-width="4"/>`;
  }

  let markers = "";
  for (let stringIdx = 0; stringIdx < 6; stringIdx += 1) {
    const x = left + stringIdx * stringGap;
    const val = frets[stringIdx];
    if (val === "x") {
      markers += `<text x="${x - 4}" y="${top - 10}" font-size="16">x</text>`;
    } else if (val === 0) {
      markers += `<text x="${x - 4}" y="${top - 10}" font-size="16">o</text>`;
    } else {
      const y = top + (val - baseFret + 0.5) * fretGap;
      markers += `<circle cx="${x}" cy="${y}" r="10" fill="currentColor"/>`;
    }
  }

  const fretLabel = baseFret > 1 ? `<text x="4" y="${top + 18}" font-size="12">${baseFret}fr</text>` : "";

  return `<svg class="diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="Chord diagram">
    ${lines}
    ${markers}
    ${fretLabel}
  </svg>`;
}

function updateChordBuilder() {
  const root = rootSelect.value;
  const quality = qualitySelect.value;
  const data = CHORD_QUALITIES[quality];
  formulaLine.textContent = `${root}${quality === "dom7" ? "7" : quality}: ${data.formula.join(" - ")}`;
  const notes = data.semitones.map((st) => transpose(root, st));
  notesLine.textContent = `Chord tones: ${notes.join("  ")}`;
}

function updateVoicings() {
  const root = rootSelect.value;
  const quality = qualitySelect.value;
  const zone = zoneSelect.value;

  const shapes = SHAPES[quality] || SHAPES.maj7;
  const rendered = shapes
    .map((shape) => buildVoicing(root, quality, zone, shape))
    .map((voicing) => {
      const labelQuality = quality === "dom7" ? "7" : quality;
      return `
      <article class="voicing-card">
        <strong>${voicing.root}${labelQuality}</strong> - ${voicing.name}<br/>
        <small>Strings 6->1: ${voicing.frets.join(" ")}</small>
        ${renderDiagram(voicing)}
      </article>`;
    })
    .join("");

  voicingCards.innerHTML = rendered;
}

function buildIIVI(key) {
  return [
    `${transpose(key, 2)}m7`,
    `${transpose(key, 7)}7`,
    `${key}maj7`,
    `${key}maj7`,
  ];
}

function buildTurnaround(key) {
  return [
    `${key}maj7`,
    `${transpose(key, 9)}m7`,
    `${transpose(key, 2)}m7`,
    `${transpose(key, 7)}7`,
  ];
}

function buildMinorIIVI(key) {
  return [
    `${transpose(key, 2)}m7b5`,
    `${transpose(key, 7)}7`,
    `${key}m7`,
    `${key}m7`,
  ];
}

function randomProgression(key) {
  const choices = [
    { name: "Major ii-V-I", bars: buildIIVI(key), focus: "Connect the 3rd and 7th with minimum movement." },
    { name: "Turnaround I-vi-ii-V", bars: buildTurnaround(key), focus: "Aim for consistent swing comping on beats 2 and 4." },
    { name: "Minor ii-V-i", bars: buildMinorIIVI(key), focus: "Hear the darker color by emphasizing b3 and b5." },
  ];

  return choices[Math.floor(Math.random() * choices.length)];
}

function updateProgression() {
  const key = keySelect.value;
  const p = randomProgression(key);

  progressionOut.innerHTML = `
    <div class="bar"><strong>${p.name}</strong></div>
    ${p.bars.map((chord, idx) => `<div class="bar">Bar ${idx + 1}: <strong>${chord}</strong></div>`).join("")}
    <div class="bar good">Fluency target: ${p.focus}</div>
  `;
}

function initLessons() {
  const stored = JSON.parse(localStorage.getItem("jazzLessonChecks") || "{}");
  lessonList.innerHTML = LESSONS.map((lesson, idx) => {
    const id = `lesson-${idx}`;
    return `<li class="lesson-row">
      <div><strong>${lesson.title}</strong><small>${lesson.detail}</small></div>
      <input type="checkbox" id="${id}" ${stored[id] ? "checked" : ""} />
    </li>`;
  }).join("");

  LESSONS.forEach((_, idx) => {
    const id = `lesson-${idx}`;
    document.getElementById(id).addEventListener("change", (e) => {
      const state = JSON.parse(localStorage.getItem("jazzLessonChecks") || "{}");
      state[id] = e.target.checked;
      localStorage.setItem("jazzLessonChecks", JSON.stringify(state));
    });
  });
}

function fillSelects() {
  rootSelect.innerHTML = NOTES.map((note) => `<option value="${note}">${note}</option>`).join("");
  keySelect.innerHTML = NOTES.map((note) => `<option value="${note}">${note}</option>`).join("");
  qualitySelect.innerHTML = Object.entries(CHORD_QUALITIES)
    .map(([value, q]) => `<option value="${value}">${q.name}</option>`)
    .join("");

  rootSelect.value = "C";
  keySelect.value = "C";
  qualitySelect.value = "maj7";
}

fillSelects();
initLessons();
updateChordBuilder();
updateVoicings();
updateProgression();

[rootSelect, qualitySelect].forEach((el) =>
  el.addEventListener("change", () => {
    updateChordBuilder();
    updateVoicings();
  })
);

zoneSelect.addEventListener("change", updateVoicings);
keySelect.addEventListener("change", updateProgression);
newProgressionBtn.addEventListener("click", updateProgression);
