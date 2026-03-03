const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const MODULES = [
  {
    id: "major_iivi_c",
    step: "Module 1",
    title: "Major ii-V-I in C",
    kind: "progression",
    blurb: "Your core jazz cadence: Dm7 -> G7 -> Cmaj7.",
  },
  {
    id: "minor_iivi_a",
    step: "Module 2",
    title: "Minor ii-V-i in A Minor",
    kind: "progression",
    blurb: "Essential minor movement: Bm7b5 -> E7 -> Am7.",
  },
  {
    id: "turnaround_c",
    step: "Module 3",
    title: "Turnaround I-vi-ii-V in C",
    kind: "progression",
    blurb: "The loop behind countless jazz intros and endings.",
  },
  {
    id: "blues_f",
    step: "Module 4",
    title: "12-Bar Jazz Blues in F",
    kind: "progression",
    blurb: "Comp through a blues form with jazz harmony.",
  },
  {
    id: "bridge_cycle",
    step: "Module 5",
    title: "Cycle of Dominants (Rhythm-Changes Bridge)",
    kind: "progression",
    blurb: "E7 -> A7 -> D7 -> G7 voice-leading workout.",
  },
  {
    id: "songs",
    step: "Module 6",
    title: "Songs You Can Play Now",
    kind: "songs",
    blurb: "Apply these progressions to real tunes.",
  },
];

const PROGRESSION_DATA = {
  major_iivi_c: {
    keyLabel: "C major",
    zone: "low",
    bars: ["Dm7", "G7", "Cmaj7", "Cmaj7"],
    focus: "Keep chord changes legato by moving each voice the shortest distance.",
    groove: "Comp with quarter notes at 60-90 bpm. Accent beats 2 and 4.",
  },
  minor_iivi_a: {
    keyLabel: "A minor",
    zone: "low",
    bars: ["Bm7b5", "E7", "Am7", "Am7"],
    focus: "Hear the tension in E7 resolving to Am7 without rushing.",
    groove: "Play each bar twice before advancing tempo.",
  },
  turnaround_c: {
    keyLabel: "C major",
    zone: "mid",
    bars: ["Cmaj7", "Am7", "Dm7", "G7"],
    focus: "Treat this as a loop: start and end on Cmaj7 with identical time feel.",
    groove: "Try 2 bars per chord, then 1 bar per chord.",
  },
  blues_f: {
    keyLabel: "F blues",
    zone: "low",
    bars: ["F7", "Bb7", "F7", "F7", "Bb7", "Bb7", "F7", "D7", "Gm7", "C7", "F7", "C7"],
    focus: "Lock the form first. Count all 12 bars out loud while comping.",
    groove: "Use a swung quarter-note pulse before adding rhythmic variations.",
  },
  bridge_cycle: {
    keyLabel: "Dominant cycle",
    zone: "mid",
    bars: ["E7", "A7", "D7", "G7"],
    focus: "Voice-lead the 3rd and 7th smoothly through the cycle.",
    groove: "Loop this for 3-5 minutes without stopping.",
  },
};

const SONG_SUGGESTIONS = [
  {
    title: "Autumn Leaves",
    use: "Major and minor ii-V-I movement",
  },
  {
    title: "Blue Bossa",
    use: "Minor ii-V-i and major ii-V-I",
  },
  {
    title: "Satin Doll",
    use: "Turnaround and ii-V progressions",
  },
  {
    title: "C Jam Blues",
    use: "12-bar jazz blues form",
  },
  {
    title: "I Got Rhythm (or rhythm-changes backing tracks)",
    use: "Dominant-cycle bridge practice",
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
  ],
  dim7: [
    {
      name: "Symmetric grip",
      offsets: [null, 0, -1, 0, -1, null],
      fingers: [null, 2, 1, 3, 4, null],
      rootString: 5,
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
const lessonContent = document.getElementById("lessonContent");

let activeModuleId = localStorage.getItem("activeJazzModule") || MODULES[0].id;
const backingTrackState = {
  audioCtx: null,
  isPlaying: false,
  moduleId: null,
  bars: [],
  tempo: 80,
  nextNoteTime: 0,
  step: 0,
  timerId: null,
  statusEl: null,
  startBtn: null,
  stopBtn: null,
  barEls: [],
  uiTimers: [],
};

function noteToIndex(note) {
  return NOTES.indexOf(note);
}

function findRootFret(root, rootString, zone) {
  const open = openNoteByString[rootString];
  const rootIdx = noteToIndex(root);
  const [minFret, maxFret] = ZONES[zone];
  const candidates = [];

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

function parseChordSymbol(chordSymbol) {
  const qualities = ["maj7", "m7b5", "m7", "dim7", "7"];
  for (const suffix of qualities) {
    if (chordSymbol.endsWith(suffix)) {
      const root = chordSymbol.slice(0, chordSymbol.length - suffix.length);
      const quality = suffix === "7" ? "dom7" : suffix;
      return { root, quality, symbol: chordSymbol };
    }
  }
  return null;
}

function chooseShape(quality, root) {
  const options = SHAPES[quality] || SHAPES.maj7;
  const rootIndex = noteToIndex(root);
  if (rootIndex >= 7 && options[1]) return options[1];
  return options[0];
}

function guessFinger(fret, minFret) {
  return String(Math.max(1, Math.min(4, fret - minFret + 1)));
}

function buildVoicing(chordSymbol, zone) {
  const parsed = parseChordSymbol(chordSymbol);
  if (!parsed) return null;

  const { root, quality } = parsed;
  const shape = chooseShape(quality, root);
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
    chord: chordSymbol,
    name: shape.name,
    frets,
    tones,
    resolvedFingers,
  };
}

function renderDiagram(voicing) {
  const { frets, tones, resolvedFingers } = voicing;
  const width = 420;
  const height = 290;
  const left = 60;
  const top = 34;
  const fretGap = 62;
  const stringGap = 32;
  const gridWidth = fretGap * 4;
  const gridHeight = stringGap * 5;
  const rightX = left + gridWidth + 30;
  const leftX = left - 24;
  const bottomY = top + gridHeight;

  const numericFrets = frets.filter((fret) => Number.isInteger(fret) && fret > 0);
  const minFret = numericFrets.length ? Math.min(...numericFrets) : 1;
  const baseFret = minFret > 1 ? minFret : 1;

  let layers = `<rect x="${left}" y="${top}" width="${gridWidth}" height="${gridHeight}" fill="#6faecc" stroke="#6f6f6f" stroke-width="1.4"/>`;

  for (let col = 0; col <= 4; col += 1) {
    const x = left + col * fretGap;
    layers += `<line x1="${x}" y1="${top}" x2="${x}" y2="${bottomY}" stroke="#5a5a5a" stroke-width="1.2"/>`;
  }

  for (let row = 0; row <= 5; row += 1) {
    const y = top + row * stringGap;
    const strokeWidth = row === 5 ? 3.2 : 1.5;
    layers += `<line x1="${left}" y1="${y}" x2="${left + gridWidth}" y2="${y}" stroke="#1f2a30" stroke-width="${strokeWidth}"/>`;
  }

  if (baseFret === 1) {
    layers += `<line x1="${left}" y1="${top}" x2="${left}" y2="${bottomY}" stroke="#f6f6f6" stroke-width="3.5"/>`;
  }

  layers += `<text x="${rightX - 7}" y="${top - 10}" font-size="11" font-family="IBM Plex Mono" fill="#1f2a30">LH</text>`;

  for (let row = 0; row < 6; row += 1) {
    const stringNumber = row + 1;
    const arrayIdx = 6 - stringNumber;
    const fret = frets[arrayIdx];
    const tone = tones[arrayIdx];
    const finger = resolvedFingers[arrayIdx];
    const y = top + row * stringGap;

    if (fret === "x") {
      layers += `<text x="${leftX}" y="${y + 6}" font-size="18" font-weight="700">x</text>`;
    }

    if (fret === 0) {
      layers += `<text x="${leftX}" y="${y + 6}" font-size="18" font-weight="700">o</text>`;
    }

    if (Number.isInteger(fret) && fret > 0) {
      const x = left + (fret - baseFret + 0.5) * fretGap;
      const fill = tone && tone.isRoot ? "#d62828" : "#111111";
      const degree = tone ? tone.degree : "?";
      const degreeFont = degree.length > 1 ? 8 : 10;
      layers += `<circle cx="${x}" cy="${y}" r="12" fill="${fill}" stroke="white" stroke-width="1.4"/>`;
      layers += `<text x="${x}" y="${y + 3}" text-anchor="middle" fill="white" font-family="IBM Plex Mono" font-size="${degreeFont}">${degree}</text>`;
    }

    if (finger !== "x" && finger !== "o") {
      layers += `<text x="${rightX}" y="${y + 5}" font-size="14" font-weight="700">${finger}</text>`;
    }
  }

  for (let i = 0; i < 4; i += 1) {
    const fretLabelX = left + (i + 0.5) * fretGap;
    layers += `<text x="${fretLabelX}" y="${bottomY + 28}" text-anchor="middle" font-size="14" font-family="IBM Plex Mono">${baseFret + i}</text>`;
  }

  return `<svg class="diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="Chord diagram with left mute/open marks, bottom frets, low E on bottom, and right-hand fingering numbers">${layers}</svg>`;
}

function clampTempo(value) {
  if (!Number.isFinite(value)) return 80;
  return Math.max(50, Math.min(220, Math.round(value)));
}

function parseChordRoot(chordSymbol) {
  const match = chordSymbol.match(/^([A-G](?:#|b)?)/);
  return match ? match[1] : null;
}

function noteFrequency(note, octave) {
  const index = noteToIndex(note);
  if (index < 0) return null;
  const midi = (octave + 1) * 12 + index;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function scheduleClick(time, beatInBar) {
  const ctx = backingTrackState.audioCtx;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const accent = beatInBar === 2 || beatInBar === 4;

  osc.type = "triangle";
  osc.frequency.setValueAtTime(accent ? 1900 : 1300, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(accent ? 0.13 : 0.08, time + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.06);
}

function scheduleBass(time, chordSymbol, beatInBar) {
  if (beatInBar !== 1 && beatInBar !== 3) return;
  const ctx = backingTrackState.audioCtx;
  const root = parseChordRoot(chordSymbol);
  const frequency = noteFrequency(root, 2);
  if (!frequency) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(frequency, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.11, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.24);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.26);
}

function clearBarHighlights() {
  backingTrackState.barEls.forEach((bar) => bar.classList.remove("active-bar"));
}

function clearUiTimers() {
  while (backingTrackState.uiTimers.length) {
    clearTimeout(backingTrackState.uiTimers.pop());
  }
}

function updatePlaybackUi(barIndex, beatInBar) {
  const { barEls, statusEl, bars } = backingTrackState;
  if (!statusEl) return;

  clearBarHighlights();
  if (barEls[barIndex]) {
    barEls[barIndex].classList.add("active-bar");
  }

  statusEl.textContent = `Playing bar ${barIndex + 1}/${bars.length} (${bars[barIndex]}) - beat ${beatInBar}`;
}

function queuePlaybackUi(barIndex, beatInBar, atTime) {
  const delayMs = Math.max(0, (atTime - backingTrackState.audioCtx.currentTime) * 1000);
  const timer = setTimeout(() => {
    updatePlaybackUi(barIndex, beatInBar);
  }, delayMs);
  backingTrackState.uiTimers.push(timer);
}

function scheduleBeat() {
  const barIndex = Math.floor(backingTrackState.step / 4) % backingTrackState.bars.length;
  const beatInBar = (backingTrackState.step % 4) + 1;
  const chord = backingTrackState.bars[barIndex];
  const time = backingTrackState.nextNoteTime;

  scheduleClick(time, beatInBar);
  scheduleBass(time, chord, beatInBar);
  queuePlaybackUi(barIndex, beatInBar, time);

  backingTrackState.nextNoteTime += 60 / backingTrackState.tempo;
  backingTrackState.step += 1;
}

function schedulerLoop() {
  const lookAhead = 0.12;
  while (backingTrackState.nextNoteTime < backingTrackState.audioCtx.currentTime + lookAhead) {
    scheduleBeat();
  }
}

function stopBackingTrack() {
  if (backingTrackState.timerId) {
    clearInterval(backingTrackState.timerId);
    backingTrackState.timerId = null;
  }

  backingTrackState.isPlaying = false;
  clearUiTimers();
  clearBarHighlights();

  if (backingTrackState.statusEl) {
    backingTrackState.statusEl.textContent = "Stopped";
  }
  if (backingTrackState.startBtn) {
    backingTrackState.startBtn.disabled = false;
  }
  if (backingTrackState.stopBtn) {
    backingTrackState.stopBtn.disabled = true;
  }
}

async function startBackingTrack(moduleId, bars, tempo, statusEl, startBtn, stopBtn, barEls) {
  if (backingTrackState.isPlaying) {
    stopBackingTrack();
  }

  if (!backingTrackState.audioCtx) {
    backingTrackState.audioCtx = new window.AudioContext();
  }
  await backingTrackState.audioCtx.resume();

  backingTrackState.moduleId = moduleId;
  backingTrackState.bars = bars;
  backingTrackState.tempo = tempo;
  backingTrackState.step = 0;
  backingTrackState.nextNoteTime = backingTrackState.audioCtx.currentTime + 0.05;
  backingTrackState.statusEl = statusEl;
  backingTrackState.startBtn = startBtn;
  backingTrackState.stopBtn = stopBtn;
  backingTrackState.barEls = barEls;
  backingTrackState.isPlaying = true;

  startBtn.disabled = true;
  stopBtn.disabled = false;
  statusEl.textContent = `Starting at ${tempo} BPM...`;

  backingTrackState.timerId = setInterval(schedulerLoop, 25);
}

function renderSchematicBlock() {
  const sample = buildVoicing("Cmaj7", "mid");
  return `
    <section class="lesson-block schematic-block">
      <h3>Fingering Schematic (always use this map)</h3>
      <p>
        Left side = <strong>x/o</strong> (mute/open). Bottom = fret numbers. Bottom thick line = low E string.
        Right side = left-hand fingering (1-4) aligned to each string.
      </p>
      <div class="schematic-wrap">${renderDiagram(sample)}</div>
    </section>
  `;
}

function uniqueChordsInOrder(bars) {
  const seen = new Set();
  const ordered = [];
  bars.forEach((bar) => {
    if (!seen.has(bar)) {
      seen.add(bar);
      ordered.push(bar);
    }
  });
  return ordered;
}

function renderProgressionModule(module) {
  const data = PROGRESSION_DATA[module.id];
  const bars = data.bars;
  const uniqueChords = uniqueChordsInOrder(bars);
  const tempoDefault = 80;

  const barsMarkup = bars
    .map(
      (chord, idx) =>
        `<div class="bar-item" data-bar-index="${idx}">Bar ${idx + 1}: <strong>${chord}</strong></div>`
    )
    .join("");

  const diagramsMarkup = uniqueChords
    .map((chord) => {
      const voicing = buildVoicing(chord, data.zone);
      if (!voicing) return "";
      return `
        <article class="chord-card">
          <h4>${chord}</h4>
          <p class="mini">${voicing.name}</p>
          <p class="mini">Strings 6->1: ${voicing.frets.join(" ")}</p>
          <p class="mini">Fingers 6->1: ${voicing.resolvedFingers.join(" ")}</p>
          ${renderDiagram(voicing)}
        </article>
      `;
    })
    .join("");

  return `
    ${renderSchematicBlock()}
    <section class="lesson-block">
      <h3>Progression: ${module.title}</h3>
      <p><strong>Key:</strong> ${data.keyLabel} <span class="chip">Suggested neck zone: ${data.zone}</span></p>
      <div class="practice-player">
        <label>
          Tempo (BPM)
          <input id="tempoInput-${module.id}" class="tempo-input" type="number" min="50" max="220" value="${tempoDefault}" />
        </label>
        <div class="player-controls">
          <button id="startTrackBtn-${module.id}" class="start-track-btn" type="button">Start Backing Track</button>
          <button id="stopTrackBtn-${module.id}" class="stop-track-btn" type="button" disabled>Stop</button>
        </div>
        <p id="trackStatus-${module.id}" class="track-status">Stopped</p>
      </div>
      <div class="bar-grid">${barsMarkup}</div>
      <p><strong>Focus:</strong> ${data.focus}</p>
      <p><strong>Practice groove:</strong> ${data.groove}</p>
    </section>

    <section class="lesson-block">
      <h3>Chord Fingerings For This Progression</h3>
      <div class="diagram-grid">${diagramsMarkup}</div>
    </section>
  `;
}

function wirePracticePlayer(module, data) {
  const tempoInput = document.getElementById(`tempoInput-${module.id}`);
  const startBtn = document.getElementById(`startTrackBtn-${module.id}`);
  const stopBtn = document.getElementById(`stopTrackBtn-${module.id}`);
  const statusEl = document.getElementById(`trackStatus-${module.id}`);
  const barEls = Array.from(lessonContent.querySelectorAll(".bar-item"));

  if (!tempoInput || !startBtn || !stopBtn || !statusEl) return;

  startBtn.addEventListener("click", async () => {
    const tempo = clampTempo(Number(tempoInput.value));
    tempoInput.value = String(tempo);
    await startBackingTrack(module.id, data.bars, tempo, statusEl, startBtn, stopBtn, barEls);
  });

  stopBtn.addEventListener("click", () => {
    stopBackingTrack();
  });

  tempoInput.addEventListener("change", () => {
    const tempo = clampTempo(Number(tempoInput.value));
    tempoInput.value = String(tempo);

    if (backingTrackState.isPlaying && backingTrackState.moduleId === module.id) {
      backingTrackState.tempo = tempo;
      statusEl.textContent = `Tempo changed to ${tempo} BPM`;
    }
  });
}

function renderSongsModule() {
  const songsMarkup = SONG_SUGGESTIONS.map(
    (song) => `<li><strong>${song.title}</strong> - ${song.use}</li>`
  ).join("");

  return `
    ${renderSchematicBlock()}
    <section class="lesson-block">
      <h3>Now Play Real Songs</h3>
      <p>
        Use your 5 progression modules as your toolkit. Start with slow backing tracks, comp cleanly,
        and keep time more than adding extra chords.
      </p>
      <ol class="song-list">${songsMarkup}</ol>
      <p><strong>Next move:</strong> Pick one song and comp only the core progression for the full form.</p>
    </section>
  `;
}

function renderLesson() {
  const module = MODULES.find((item) => item.id === activeModuleId) || MODULES[0];
  if (module.kind === "songs") {
    lessonContent.innerHTML = renderSongsModule();
    return;
  }

  lessonContent.innerHTML = renderProgressionModule(module);
  wirePracticePlayer(module, PROGRESSION_DATA[module.id]);
}

function renderModuleNav() {
  moduleNav.innerHTML = MODULES.map((module, idx) => {
    return `
      <li>
        <button type="button" data-module-id="${module.id}">
          <strong>${idx + 1}. ${module.title}</strong>
          <small>${module.blurb}</small>
        </button>
      </li>
    `;
  }).join("");

  moduleNav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveModule(button.dataset.moduleId);
    });
  });
}

function setActiveModule(moduleId) {
  stopBackingTrack();

  const index = MODULES.findIndex((item) => item.id === moduleId);
  const safeIndex = index >= 0 ? index : 0;
  const module = MODULES[safeIndex];

  activeModuleId = module.id;
  localStorage.setItem("activeJazzModule", activeModuleId);

  stageModuleLabel.textContent = `${module.step} of ${MODULES.length}`;
  stageTitle.textContent = module.title;

  moduleNav.querySelectorAll("button").forEach((button) => {
    const selected = button.dataset.moduleId === module.id;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-current", selected ? "page" : "false");
  });

  prevModuleBtn.disabled = safeIndex === 0;
  nextModuleBtn.disabled = safeIndex === MODULES.length - 1;

  renderLesson();
}

function stepModule(direction) {
  const currentIndex = MODULES.findIndex((item) => item.id === activeModuleId);
  const nextIndex = currentIndex + direction;
  if (nextIndex >= 0 && nextIndex < MODULES.length) {
    setActiveModule(MODULES[nextIndex].id);
  }
}

renderModuleNav();
setActiveModule(activeModuleId);

prevModuleBtn.addEventListener("click", () => stepModule(-1));
nextModuleBtn.addEventListener("click", () => stepModule(1));
