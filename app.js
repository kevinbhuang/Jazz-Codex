const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const MODULES = [
  {
    id: "welcome",
    step: "Module 1",
    title: "Orientation + Diagram Reading",
    blurb: "Get clear on how this tutorial works before touching voicings.",
  },
  {
    id: "builder",
    step: "Module 2",
    title: "Chord Construction",
    blurb: "Build chords from interval formulas, not shape memory.",
  },
  {
    id: "voicings",
    step: "Module 3",
    title: "Neck Mapping",
    blurb: "Play one harmony in different neck zones.",
  },
  {
    id: "progressions",
    step: "Module 4",
    title: "Progression Fluency",
    blurb: "Practice ii-V-I and turnarounds with voice leading.",
  },
  {
    id: "roadmap",
    step: "Module 5",
    title: "Weekly Practice Plan",
    blurb: "Track progress from first jazz comp to intermediate confidence.",
  },
];

const CHORD_QUALITIES = {
  maj7: {
    name: "Major 7",
    formula: ["1", "3", "5", "7"],
    semitones: [0, 4, 7, 11],
    symbol: "maj7",
  },
  m7: {
    name: "Minor 7",
    formula: ["1", "b3", "5", "b7"],
    semitones: [0, 3, 7, 10],
    symbol: "m7",
  },
  dom7: {
    name: "Dominant 7",
    formula: ["1", "3", "5", "b7"],
    semitones: [0, 4, 7, 10],
    symbol: "7",
  },
  m7b5: {
    name: "Minor 7b5",
    formula: ["1", "b3", "b5", "b7"],
    semitones: [0, 3, 6, 10],
    symbol: "m7b5",
  },
  dim7: {
    name: "Diminished 7",
    formula: ["1", "b3", "b5", "bb7"],
    semitones: [0, 3, 6, 9],
    symbol: "dim7",
  },
};

const LESSONS = [
  {
    title: "Week 1: Guide tones (3rd + 7th)",
    detail: "Play 3rd/7th only for Cmaj7, Dm7, G7 in 3 neck areas.",
  },
  {
    title: "Week 2: Shell voicings",
    detail: "Add roots and comp ii-V-I in 4 keys at 60 bpm.",
  },
  {
    title: "Week 3: Drop-2 voicings",
    detail: "Connect nearest shape on each barline.",
  },
  {
    title: "Week 4: Turnarounds",
    detail: "Practice I-vi-ii-V in all 12 keys with swing rhythm.",
  },
  {
    title: "Week 5+: Standards",
    detail: "Apply fluency to Autumn Leaves and Blue Bossa.",
  },
];

const SHAPES = {
  maj7: [
    {
      name: "Shell (6th-string root)",
      offsets: [0, null, 1, 1, null, null],
      fingers: [1, null, 3, 4, null, null],
      rootString: 6,
    },
    {
      name: "Shell (5th-string root)",
      offsets: [null, 0, 1, 1, null, null],
      fingers: [null, 1, 3, 4, null, null],
      rootString: 5,
    },
    {
      name: "Drop-2 flavor",
      offsets: [0, null, 1, 0, 0, null],
      fingers: [1, null, 4, 2, 3, null],
      rootString: 6,
    },
  ],
  m7: [
    {
      name: "Shell (6th-string root)",
      offsets: [0, null, 0, 0, null, null],
      fingers: [1, null, 2, 3, null, null],
      rootString: 6,
    },
    {
      name: "Shell (5th-string root)",
      offsets: [null, 0, 0, 0, null, null],
      fingers: [null, 1, 2, 3, null, null],
      rootString: 5,
    },
    {
      name: "Drop-2 flavor",
      offsets: [0, null, 0, 0, 1, null],
      fingers: [1, null, 2, 3, 4, null],
      rootString: 6,
    },
  ],
  dom7: [
    {
      name: "Shell (6th-string root)",
      offsets: [0, null, 0, 1, null, null],
      fingers: [1, null, 2, 4, null, null],
      rootString: 6,
    },
    {
      name: "Shell (5th-string root)",
      offsets: [null, 0, 0, 1, null, null],
      fingers: [null, 1, 2, 4, null, null],
      rootString: 5,
    },
    {
      name: "Drop-2 flavor",
      offsets: [0, null, 0, 1, 0, null],
      fingers: [1, null, 2, 4, 3, null],
      rootString: 6,
    },
  ],
  m7b5: [
    {
      name: "Half-diminished shell",
      offsets: [null, 0, 1, 0, null, null],
      fingers: [null, 1, 3, 2, null, null],
      rootString: 5,
    },
    {
      name: "Compact shape",
      offsets: [0, null, 0, -1, -1, null],
      fingers: [2, null, 4, 1, 1, null],
      rootString: 6,
    },
    {
      name: "Guide-tone shape",
      offsets: [null, 0, null, 0, 1, null],
      fingers: [null, 1, null, 2, 4, null],
      rootString: 5,
    },
  ],
  dim7: [
    {
      name: "Symmetric grip A",
      offsets: [0, null, -1, 0, -1, null],
      fingers: [2, null, 1, 3, 4, null],
      rootString: 6,
    },
    {
      name: "Symmetric grip B",
      offsets: [null, 0, -1, 0, -1, null],
      fingers: [null, 2, 1, 3, 4, null],
      rootString: 5,
    },
    {
      name: "Tight top-set",
      offsets: [null, null, 0, 1, 0, 1],
      fingers: [null, null, 1, 3, 2, 4],
      rootString: 4,
    },
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

const moduleNav = document.getElementById("moduleNav");
const stageModuleLabel = document.getElementById("stageModuleLabel");
const stageTitle = document.getElementById("stageTitle");
const prevModuleBtn = document.getElementById("prevModuleBtn");
const nextModuleBtn = document.getElementById("nextModuleBtn");
const lessonViews = Array.from(document.querySelectorAll(".lesson-view"));

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

let activeModuleId = localStorage.getItem("activeJazzModule") || MODULES[0].id;

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
    if ((open + fret) % 12 === rootIdx) {
      candidates.push(fret);
    }
  }

  const zoneCandidates = candidates.filter((fret) => fret >= minFret && fret <= maxFret);
  const usable = zoneCandidates.length ? zoneCandidates : candidates;
  const center = (minFret + maxFret) / 2;
  return usable.sort((a, b) => Math.abs(a - center) - Math.abs(b - center))[0];
}

function guessFinger(fret, minFret) {
  return String(Math.max(1, Math.min(4, fret - minFret + 1)));
}

function buildVoicing(root, quality, zone, shape) {
  const rootFret = findRootFret(root, shape.rootString, zone);
  const rootIndex = noteToIndex(root);
  const qualityInfo = CHORD_QUALITIES[quality];
  const degreeByInterval = {};
  qualityInfo.semitones.forEach((semi, idx) => {
    degreeByInterval[((semi % 12) + 12) % 12] = qualityInfo.formula[idx];
  });

  const frets = shape.offsets.map((offset) => {
    if (offset === null) return "x";
    const target = rootFret + offset;
    if (target < 0 || target > 16) return "x";
    return target;
  });

  const playedFrets = frets.filter((fret) => Number.isInteger(fret) && fret > 0);
  const minPlayedFret = playedFrets.length ? Math.min(...playedFrets) : 1;

  const resolvedFingers = frets.map((fret, stringIdx) => {
    if (fret === "x") return "x";
    if (fret === 0) return "o";
    const preset = shape.fingers ? shape.fingers[stringIdx] : null;
    if (preset) return String(preset);
    return guessFinger(fret, minPlayedFret);
  });

  const tones = frets.map((fret, stringIdx) => {
    if (!Number.isInteger(fret)) return null;
    const stringNumber = 6 - stringIdx;
    const noteIndex = (openNoteByString[stringNumber] + fret) % 12;
    const interval = (noteIndex - rootIndex + 12) % 12;
    return {
      degree: degreeByInterval[interval] || "?",
      isRoot: interval === 0,
    };
  });

  return {
    name: shape.name,
    frets,
    tones,
    resolvedFingers,
  };
}

function renderDiagram(voicing) {
  const { frets, tones, resolvedFingers } = voicing;
  const width = 290;
  const height = 250;
  const left = 28;
  const top = 30;
  const stringGap = 32;
  const fretGap = 36;
  const rightColX = left + stringGap * 5 + 38;

  const numericFrets = frets.filter((fret) => Number.isInteger(fret));
  const positiveFrets = numericFrets.filter((fret) => fret > 0);
  const minFret = positiveFrets.length ? Math.min(...positiveFrets) : 1;
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
  let fingerLabels = `<text x="${rightColX - 12}" y="${top - 10}" font-size="11" font-family="IBM Plex Mono">LH</text>`;

  for (let stringIdx = 0; stringIdx < 6; stringIdx += 1) {
    const x = left + stringIdx * stringGap;
    const fret = frets[stringIdx];

    if (fret === "x") {
      markers += `<text x="${x - 4}" y="${top - 10}" font-size="16">x</text>`;
      continue;
    }

    if (fret === 0) {
      markers += `<text x="${x - 4}" y="${top - 10}" font-size="16">o</text>`;
      continue;
    }

    const y = top + (fret - baseFret + 0.5) * fretGap;
    const tone = tones[stringIdx];
    const degreeLabel = tone ? tone.degree : "";
    const fill = tone && tone.isRoot ? "#d62828" : "#111111";
    const degreeFontSize = degreeLabel.length > 1 ? 8 : 10;

    markers += `<circle cx="${x}" cy="${y}" r="11" fill="${fill}" stroke="white" stroke-width="1.5"/>`;
    markers += `<text x="${x}" y="${y + 3}" text-anchor="middle" font-size="${degreeFontSize}" fill="white" font-family="IBM Plex Mono">${degreeLabel}</text>`;

    const finger = resolvedFingers[stringIdx];
    if (finger !== "x" && finger !== "o") {
      fingerLabels += `<text x="${rightColX}" y="${y + 4}" font-size="13" font-weight="700">${finger}</text>`;
    }
  }

  const fretLabel = baseFret > 1 ? `<text x="4" y="${top + 18}" font-size="12">${baseFret}fr</text>` : "";

  return `<svg class="diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="Chord diagram with fingering">${lines}${markers}${fingerLabels}${fretLabel}</svg>`;
}

function updateChordBuilder() {
  const root = rootSelect.value;
  const quality = qualitySelect.value;
  const data = CHORD_QUALITIES[quality];
  formulaLine.textContent = `${root}${data.symbol}: ${data.formula.join(" - ")}`;
  const notes = data.semitones.map((semitone) => transpose(root, semitone));
  notesLine.textContent = `Chord tones: ${notes.join("  ")}`;
}

function updateVoicings() {
  const root = rootSelect.value;
  const quality = qualitySelect.value;
  const zone = zoneSelect.value;
  const shapes = SHAPES[quality] || SHAPES.maj7;
  const symbol = CHORD_QUALITIES[quality].symbol;

  voicingCards.innerHTML = shapes
    .map((shape) => buildVoicing(root, quality, zone, shape))
    .map((voicing) => {
      return `<article class="voicing-card">
        <strong>${root}${symbol}</strong> - ${voicing.name}<br/>
        <small>Strings 6->1: ${voicing.frets.join(" ")}</small><br/>
        <small class="finger-line">Fingers 6->1: ${voicing.resolvedFingers.join(" ")}</small>
        ${renderDiagram(voicing)}
      </article>`;
    })
    .join("");
}

function buildIIVI(key) {
  return [`${transpose(key, 2)}m7`, `${transpose(key, 7)}7`, `${key}maj7`, `${key}maj7`];
}

function buildTurnaround(key) {
  return [`${key}maj7`, `${transpose(key, 9)}m7`, `${transpose(key, 2)}m7`, `${transpose(key, 7)}7`];
}

function buildMinorIIVI(key) {
  return [`${transpose(key, 2)}m7b5`, `${transpose(key, 7)}7`, `${key}m7`, `${key}m7`];
}

function randomProgression(key) {
  const choices = [
    {
      name: "Major ii-V-I",
      bars: buildIIVI(key),
      focus: "Keep the top voice moving by step where possible.",
    },
    {
      name: "Turnaround I-vi-ii-V",
      bars: buildTurnaround(key),
      focus: "Comp lightly on beats 2 and 4 for swing feel.",
    },
    {
      name: "Minor ii-V-i",
      bars: buildMinorIIVI(key),
      focus: "Highlight minor color with b3 and b5 clarity.",
    },
  ];

  return choices[Math.floor(Math.random() * choices.length)];
}

function updateProgression() {
  const key = keySelect.value;
  const progression = randomProgression(key);
  progressionOut.innerHTML = `
    <div class="bar"><strong>${progression.name} in ${key}</strong></div>
    ${progression.bars.map((chord, idx) => `<div class="bar">Bar ${idx + 1}: <strong>${chord}</strong></div>`).join("")}
    <div class="bar good">Fluency target: ${progression.focus}</div>
  `;
}

function initRoadmap() {
  const saved = JSON.parse(localStorage.getItem("jazzLessonChecks") || "{}");
  lessonList.innerHTML = LESSONS.map((lesson, idx) => {
    const id = `lesson-${idx}`;
    return `<li class="lesson-row">
      <div><strong>${lesson.title}</strong><small>${lesson.detail}</small></div>
      <input type="checkbox" id="${id}" ${saved[id] ? "checked" : ""} />
    </li>`;
  }).join("");

  LESSONS.forEach((_, idx) => {
    const id = `lesson-${idx}`;
    const checkbox = document.getElementById(id);
    checkbox.addEventListener("change", (event) => {
      const state = JSON.parse(localStorage.getItem("jazzLessonChecks") || "{}");
      state[id] = event.target.checked;
      localStorage.setItem("jazzLessonChecks", JSON.stringify(state));
    });
  });
}

function fillSelects() {
  rootSelect.innerHTML = NOTES.map((note) => `<option value="${note}">${note}</option>`).join("");
  keySelect.innerHTML = NOTES.map((note) => `<option value="${note}">${note}</option>`).join("");
  qualitySelect.innerHTML = Object.entries(CHORD_QUALITIES)
    .map(([value, quality]) => `<option value="${value}">${quality.name}</option>`)
    .join("");

  rootSelect.value = "C";
  keySelect.value = "C";
  qualitySelect.value = "maj7";
}

function renderModuleNav() {
  moduleNav.innerHTML = MODULES.map((module, idx) => {
    return `<li>
      <button type="button" data-module-id="${module.id}">
        <strong>${idx + 1}. ${module.title}</strong>
        <small>${module.blurb}</small>
      </button>
    </li>`;
  }).join("");

  const buttons = moduleNav.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveModule(button.dataset.moduleId);
    });
  });
}

function setActiveModule(moduleId) {
  const index = MODULES.findIndex((module) => module.id === moduleId);
  const safeIndex = index >= 0 ? index : 0;
  const activeModule = MODULES[safeIndex];

  activeModuleId = activeModule.id;
  localStorage.setItem("activeJazzModule", activeModuleId);

  stageModuleLabel.textContent = `${activeModule.step} of ${MODULES.length}`;
  stageTitle.textContent = activeModule.title;

  lessonViews.forEach((view) => {
    view.hidden = view.dataset.module !== activeModuleId;
  });

  moduleNav.querySelectorAll("button").forEach((button) => {
    const selected = button.dataset.moduleId === activeModuleId;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-current", selected ? "page" : "false");
  });

  prevModuleBtn.disabled = safeIndex === 0;
  nextModuleBtn.disabled = safeIndex === MODULES.length - 1;
}

function stepModule(direction) {
  const currentIndex = MODULES.findIndex((module) => module.id === activeModuleId);
  const nextIndex = currentIndex + direction;
  if (nextIndex >= 0 && nextIndex < MODULES.length) {
    setActiveModule(MODULES[nextIndex].id);
  }
}

fillSelects();
initRoadmap();
renderModuleNav();
setActiveModule(activeModuleId);
updateChordBuilder();
updateVoicings();
updateProgression();

[rootSelect, qualitySelect].forEach((element) => {
  element.addEventListener("change", () => {
    updateChordBuilder();
    updateVoicings();
  });
});

zoneSelect.addEventListener("change", updateVoicings);
keySelect.addEventListener("change", updateProgression);
newProgressionBtn.addEventListener("click", updateProgression);
prevModuleBtn.addEventListener("click", () => stepModule(-1));
nextModuleBtn.addEventListener("click", () => stepModule(1));
