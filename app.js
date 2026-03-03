const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const ENHARMONIC_EQUIV = {
  Db: "C#",
  "D#": "Eb",
  Gb: "F#",
  "G#": "Ab",
  "A#": "Bb",
  Cb: "B",
  Fb: "E",
  "E#": "F",
  "B#": "C",
};

const MODULES = [
  {
    id: "shell_chords_foundation",
    kind: "tutorial",
    title: "Shell Chords And Chord Construction",
    blurb: "Step 1: Learn 6th-string and 5th-string shell logic.",
  },
  {
    id: "major_iivi",
    kind: "progression",
    step: "Progression 1",
    title: "Major ii V I",
    blurb: "Dm7 G7 Cmaj7 Cmaj7",
  },
  {
    id: "rhythm_changes_a",
    kind: "progression",
    step: "Progression 2",
    title: "Rhythm Changes A",
    blurb: "Cmaj7 Am7 Dm7 G7 Em7 A7 Dm7 G7",
  },
  {
    id: "descending_iivis",
    kind: "progression",
    step: "Progression 3",
    title: "Descending ii V Is",
    blurb: "C major -> Bb major -> Ab major",
  },
  {
    id: "dim_passing",
    kind: "progression",
    step: "Progression 4",
    title: "Diminished 7 Passing Chords",
    blurb: "Cmaj7 C#dim7 Dm7 D#dim7 Em7 A7",
  },
  {
    id: "a_train",
    kind: "progression",
    step: "Progression 5",
    title: "Take The A Train Changes",
    blurb: "Cmaj7 Cmaj7 D7 D7 Dm7 G7 Cmaj7 Cmaj7",
  },
  {
    id: "i_to_iv",
    kind: "progression",
    step: "Progression 6",
    title: "I to IV",
    blurb: "Cmaj7 Gm7 C7 Fmaj7",
  },
  {
    id: "iv_to_ivm",
    kind: "progression",
    step: "Progression 7",
    title: "IV to iv Minor",
    blurb: "Cmaj7 C7 Fmaj7 Fm7 Em7 A7 Dm7 G7 Cmaj7 Cmaj7",
  },
  {
    id: "rhythm_bridge",
    kind: "progression",
    step: "Progression 8",
    title: "Rhythm Changes Bridge",
    blurb: "D7 G7 C7 F7",
  },
  {
    id: "minor_iivi",
    kind: "progression",
    step: "Progression 9",
    title: "Minor ii V I",
    blurb: "Dm7b5 G7 Cm7 Cm7",
  },
  {
    id: "stray_cat",
    kind: "progression",
    step: "Progression 10",
    title: "Stray Cat Strut",
    blurb: "Cm7 Cm7/Bb Ab7 G7",
  },
];

const ROOT_NOTE_OPTIONS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const tutorialBuilderState = {
  root: "C",
  quality: "maj7",
  rootString: 6,
  zone: "low",
};

const PROGRESSION_MODULES = MODULES.filter((module) => module.kind === "progression");

const PROGRESSION_DATA = {
  major_iivi: {
    keyLabel: "C major",
    zone: "low",
    bars: ["Dm7", "G7", "Cmaj7", "Cmaj7"],
    focus: "Make every change smooth, especially G7 -> Cmaj7.",
    groove: "Quarter-note comping at 60-90 bpm.",
    songs: [
      "Autumn Leaves",
      "Blue Bossa",
      "There Will Never Be Another You",
      "All The Things You Are",
      "Tune Up",
    ],
  },
  rhythm_changes_a: {
    keyLabel: "Rhythm Changes A",
    zone: "low",
    bars: ["Cmaj7", "Am7", "Dm7", "G7", "Em7", "A7", "Dm7", "G7"],
    focus: "Hear the repeated I-vi-ii-V cycle and keep your time locked.",
    groove: "Swing feel, accent 2 and 4.",
    songs: [
      "Moose the Mooche",
      "Shaw Nuff",
      "Cheek to Cheek",
      "Mean to Me",
      "Isn't It Romantic",
    ],
  },
  descending_iivis: {
    keyLabel: "C -> Bb -> Ab",
    zone: "mid",
    bars: ["Cmaj7", "Cmaj7", "Cm7", "F7", "Bbmaj7", "Bbmaj7", "Bbm7", "Eb7", "Abmaj7", "Abmaj7", "Abm7", "Db7"],
    focus: "Follow the key changes cleanly while keeping the same groove.",
    groove: "1 bar per chord, then try 2 beats per chord.",
    songs: [
      "How High the Moon",
      "Tune Up",
      "Cherokee",
      "Joy Spring",
      "Solar",
    ],
  },
  dim_passing: {
    keyLabel: "C major color movement",
    zone: "mid",
    bars: ["Cmaj7", "C#dim7", "Dm7", "D#dim7", "Em7", "A7"],
    focus: "Use the diminished chords as passing tension, then resolve smoothly.",
    groove: "Comp lightly and let the bass movement be obvious.",
    songs: [
      "Cherokee",
      "Have You Met Miss Jones",
      "Joy Spring",
      "But Beautiful",
      "Ain't Misbehavin'",
    ],
  },
  a_train: {
    keyLabel: "C major with II7",
    zone: "low",
    bars: ["Cmaj7", "Cmaj7", "D7", "D7", "Dm7", "G7", "Cmaj7", "Cmaj7"],
    focus: "Make Imaj7 -> II7 -> iim7 sound intentional.",
    groove: "Start with 2 beats per chord before 1 beat per chord.",
    songs: [
      "Take the A Train",
      "The Girl from Ipanema",
      "Desafinado",
      "Mood Indigo",
      "Satin Doll",
    ],
  },
  i_to_iv: {
    keyLabel: "C major to IV",
    zone: "low",
    bars: ["Cmaj7", "Gm7", "C7", "Fmaj7"],
    focus: "Hear the move to IV as a mini cadence.",
    groove: "Loop it for 3 minutes without stopping.",
    songs: [
      "Satin Doll",
      "There Will Never Be Another You",
      "Cherokee",
      "Joy Spring",
      "Have You Met Miss Jones",
    ],
  },
  iv_to_ivm: {
    keyLabel: "Major to minor color shift",
    zone: "mid",
    bars: ["Cmaj7", "C7", "Fmaj7", "Fm7", "Em7", "A7", "Dm7", "G7", "Cmaj7", "Cmaj7"],
    focus: "Pay attention to IVmaj7 -> ivm7; that color change is the point.",
    groove: "Comp softly and voice-lead top notes by half-step where possible.",
    songs: [
      "All of Me",
      "All The Things You Are",
      "There Will Never Be Another You",
      "Moose the Mooche",
      "Shaw Nuff",
    ],
  },
  rhythm_bridge: {
    keyLabel: "Cycle of dominants",
    zone: "mid",
    bars: ["D7", "G7", "C7", "F7"],
    focus: "Connect 3rds and b7s through the cycle.",
    groove: "Stay relaxed at 70 bpm before pushing tempo.",
    songs: [
      "Oleo",
      "Anthropology",
      "Dexterity",
      "Rhythm-A-Ning",
      "Lester Leaps In",
    ],
  },
  minor_iivi: {
    keyLabel: "C minor",
    zone: "low",
    bars: ["Dm7b5", "G7", "Cm7", "Cm7"],
    focus: "Keep the tension in G7 and resolve clearly to Cm7.",
    groove: "Long tones first, then swing comping.",
    songs: [
      "Softly, as in a Morning Sunrise",
      "Alone Together",
      "Blue Bossa",
      "Beautiful Love",
      "Nardis",
    ],
  },
  stray_cat: {
    keyLabel: "Minor turnaround",
    zone: "mid",
    bars: ["Cm7", "Cm7/Bb", "Ab7", "G7"],
    focus: "Emphasize the descending bass motion in bar 2.",
    groove: "Loop continuously and keep each bar even.",
    songs: [
      "Stray Cat Strut",
      "Minor Swing",
      "Blue Bossa",
      "Caravan",
      "Black Orpheus",
    ],
  },
};

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

const INTERVAL_LABELS = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "#5", "6", "b7", "7"];

const VOICING_TEMPLATES = {
  maj7: [
    { name: "Root-6 shell", rootString: 6, intervals: [0, null, 11, 4, null, null] },
    { name: "Root-5 shell", rootString: 5, intervals: [null, 0, null, 11, 4, null] },
  ],
  m7: [
    { name: "Root-6 shell", rootString: 6, intervals: [0, null, 10, 3, null, null] },
    { name: "Root-5 shell", rootString: 5, intervals: [null, 0, null, 10, 3, null] },
  ],
  dom7: [
    { name: "Root-6 shell", rootString: 6, intervals: [0, null, 10, 4, null, null] },
    { name: "Root-5 shell", rootString: 5, intervals: [null, 0, null, 10, 4, null] },
  ],
  m7b5: [
    { name: "Root-6 m7b5", rootString: 6, intervals: [0, null, 10, 3, 6, null] },
    { name: "Root-5 m7b5", rootString: 5, intervals: [null, 0, 10, 6, 3, null] },
  ],
  dim7: [
    { name: "Root-6 dim7", rootString: 6, intervals: [0, null, 9, 6, 3, null] },
    { name: "Root-5 dim7", rootString: 5, intervals: [null, 0, 9, 6, 3, null] },
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

const openMidiByString = {
  6: 40,
  5: 45,
  4: 50,
  3: 55,
  2: 59,
  1: 64,
};

const moduleNav = document.getElementById("moduleNav");
const stageModuleLabel = document.getElementById("stageModuleLabel");
const stageTitle = document.getElementById("stageTitle");
const prevModuleBtn = document.getElementById("prevModuleBtn");
const nextModuleBtn = document.getElementById("nextModuleBtn");
const lessonContent = document.getElementById("lessonContent");

function safeGetStoredModule() {
  try {
    return window.localStorage.getItem("activeJazzModule");
  } catch (error) {
    return null;
  }
}

function safeSetStoredModule(moduleId) {
  try {
    window.localStorage.setItem("activeJazzModule", moduleId);
  } catch (error) {
    // no-op when storage is unavailable
  }
}

let activeModuleId = safeGetStoredModule() || MODULES[0].id;
if (!MODULES.some((module) => module.id === activeModuleId)) {
  activeModuleId = MODULES[0].id;
}
const zoneSelectionByModule = {};
Object.entries(PROGRESSION_DATA).forEach(([moduleId, data]) => {
  zoneSelectionByModule[moduleId] = data.zone === "mid" ? "mid" : "low";
});

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

function clampTempo(value) {
  if (!Number.isFinite(value)) return 80;
  return Math.max(50, Math.min(220, Math.round(value)));
}

function normalizeNoteName(note) {
  if (!note) return note;
  return ENHARMONIC_EQUIV[note] || note;
}

function noteToIndex(note) {
  return NOTES.indexOf(normalizeNoteName(note));
}

function parseChordRoot(chordSymbol) {
  const base = chordSymbol.split("/")[0];
  const match = base.match(/^([A-G](?:#|b)?)/);
  return match ? normalizeNoteName(match[1]) : null;
}

function parseChordSymbol(chordSymbol) {
  const [basePart, bassPart] = chordSymbol.split("/");
  const base = basePart.replace("°", "dim");

  const qualities = ["maj7", "m7b5", "dim7", "m7", "7"];
  for (const suffix of qualities) {
    if (base.endsWith(suffix)) {
      const rootRaw = base.slice(0, base.length - suffix.length);
      const root = normalizeNoteName(rootRaw);
      const quality = suffix === "7" ? "dom7" : suffix;
      const bass = bassPart ? normalizeNoteName(bassPart) : null;
      return { root, quality, symbol: chordSymbol, bass };
    }
  }

  return null;
}

function rootCandidates(root, rootString) {
  const open = openNoteByString[rootString];
  const rootIdx = noteToIndex(root);
  const candidates = [];
  for (let fret = 0; fret <= 16; fret += 1) {
    if ((open + fret) % 12 === rootIdx) {
      candidates.push(fret);
    }
  }
  return candidates;
}

function rootPlacement(root, rootString, zone) {
  const [minFret, maxFret] = ZONES[zone];
  const center = (minFret + maxFret) / 2;
  const candidates = rootCandidates(root, rootString);
  const zoneHits = candidates.filter((fret) => fret >= minFret && fret <= maxFret);
  const pool = zoneHits.length ? zoneHits : candidates;
  const fret = pool.sort((a, b) => Math.abs(a - center) - Math.abs(b - center))[0];
  return { fret, inZone: zoneHits.length > 0 };
}

function chooseTemplate(quality, root, zone, preferredRootString = null) {
  const templates = VOICING_TEMPLATES[quality] || VOICING_TEMPLATES.maj7;
  const pool = Number.isInteger(preferredRootString)
    ? templates.filter((template) => template.rootString === preferredRootString)
    : templates;
  const usableTemplates = pool.length ? pool : templates;

  const [minFret, maxFret] = ZONES[zone];
  const center = (minFret + maxFret) / 2;

  const scored = usableTemplates.map((template) => {
    const placement = rootPlacement(root, template.rootString, zone);
    const distance = Math.abs(placement.fret - center);
    const penalty = placement.inZone ? 0 : 8;
    return {
      template,
      anchorFret: placement.fret,
      score: distance + penalty,
    };
  });

  scored.sort((a, b) => a.score - b.score);
  return scored[0];
}

function candidateFretsForStringNote(targetNoteIndex, stringNumber) {
  const open = openNoteByString[stringNumber];
  const candidates = [];
  for (let fret = 0; fret <= 16; fret += 1) {
    if ((open + fret) % 12 === targetNoteIndex) {
      candidates.push(fret);
    }
  }
  return candidates;
}

function chooseClosestFret(candidates, anchorFret) {
  if (!candidates.length) return null;
  const closePool = candidates.filter((fret) => Math.abs(fret - anchorFret) <= 4);
  const pool = closePool.length ? closePool : candidates;
  return pool.sort((a, b) => Math.abs(a - anchorFret) - Math.abs(b - anchorFret) || a - b)[0];
}

function resolveFingerings(frets) {
  const fretted = frets.filter((fret) => Number.isInteger(fret) && fret > 0);
  const uniqueFrets = [...new Set(fretted)].sort((a, b) => a - b);
  const fingerByFret = {};
  uniqueFrets.forEach((fret, idx) => {
    fingerByFret[fret] = String(Math.min(4, idx + 1));
  });

  return frets.map((fret) => {
    if (fret === "x") return "x";
    if (fret === 0) return "o";
    return fingerByFret[fret] || "1";
  });
}

function applySlashBassIfNeeded(parsed, frets, anchorFret) {
  if (!parsed.bass) return frets;
  const bassIdx = noteToIndex(parsed.bass);
  if (bassIdx < 0) return frets;

  const candidates6 = candidateFretsForStringNote(bassIdx, 6);
  const candidates5 = candidateFretsForStringNote(bassIdx, 5);
  const fret6 = chooseClosestFret(candidates6, anchorFret);
  const fret5 = chooseClosestFret(candidates5, anchorFret);

  const out = [...frets];

  if (fret6 !== null && Math.abs(fret6 - anchorFret) <= 6) {
    out[0] = fret6;
    return out;
  }

  if (fret5 !== null) {
    out[0] = "x";
    out[1] = fret5;
  }

  return out;
}

function buildVoicing(chordSymbol, zone, options = {}) {
  const parsed = parseChordSymbol(chordSymbol);
  if (!parsed) return null;

  const { root, quality } = parsed;
  const rootIndex = noteToIndex(root);
  const qualityInfo = CHORD_QUALITIES[quality];
  if (!qualityInfo || rootIndex < 0) return null;

  const preferredRootString = Number.isInteger(options.preferredRootString)
    ? options.preferredRootString
    : null;
  const selected = chooseTemplate(quality, root, zone, preferredRootString);
  if (!selected) return null;

  const template = selected.template;
  const anchorFret = selected.anchorFret;

  const fretsBase = template.intervals.map((interval, idx) => {
    if (interval === null) return "x";
    const stringNumber = 6 - idx;
    const targetNoteIndex = (rootIndex + interval + 12) % 12;
    const candidates = candidateFretsForStringNote(targetNoteIndex, stringNumber);
    const fret = chooseClosestFret(candidates, anchorFret);
    if (fret === null || fret < 0 || fret > 16) return "x";
    return fret;
  });

  const frets = applySlashBassIfNeeded(parsed, fretsBase, anchorFret);
  const resolvedFingers = resolveFingerings(frets);

  const tones = frets.map((fret, idx) => {
    if (!Number.isInteger(fret)) return null;
    const stringNumber = 6 - idx;
    const noteIndex = (openNoteByString[stringNumber] + fret) % 12;
    const interval = (noteIndex - rootIndex + 12) % 12;
    return {
      degree: INTERVAL_LABELS[interval],
      isRoot: interval === 0,
    };
  });

  return {
    chord: chordSymbol,
    name: template.name,
    frets,
    tones,
    resolvedFingers,
  };
}

function chordSymbolFromRootQuality(root, quality) {
  const normalizedRoot = normalizeNoteName(root);
  const info = CHORD_QUALITIES[quality] || CHORD_QUALITIES.maj7;
  return ``;
}

function renderDiagram(voicing) {
  const { frets, tones, resolvedFingers } = voicing;
  const width = 318;
  const height = 224;
  const left = 44;
  const top = 24;
  const fretGap = 44;
  const stringGap = 24;
  const gridWidth = fretGap * 4;
  const gridHeight = stringGap * 5;
  const rightX = left + gridWidth + 20;
  const leftX = left - 18;
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

  

  for (let row = 0; row < 6; row += 1) {
    const stringNumber = row + 1;
    const arrayIdx = 6 - stringNumber;
    const fret = frets[arrayIdx];
    const tone = tones[arrayIdx];
    const finger = resolvedFingers[arrayIdx];
    const y = top + row * stringGap;

    if (fret === "x") {
      layers += `<text x="${leftX}" y="${y + 6}" font-size="14" font-weight="700">x</text>`;
    }

    if (fret === 0) {
      layers += `<text x="${leftX}" y="${y + 6}" font-size="14" font-weight="700">o</text>`;
    }

    if (Number.isInteger(fret) && fret > 0) {
      const x = left + (fret - baseFret + 0.5) * fretGap;
      const fill = tone && tone.isRoot ? "#d62828" : "#111111";
      const degree = tone ? tone.degree : "1";
      const degreeFont = degree.length > 1 ? 7 : 9;
      layers += `<circle cx="${x}" cy="${y}" r="9.5" fill="${fill}" stroke="white" stroke-width="1.4"/>`;
      layers += `<text x="${x}" y="${y + 3}" text-anchor="middle" fill="white" font-family="IBM Plex Mono" font-size="${degreeFont}">${degree}</text>`;
    }

    if (finger !== "x" && finger !== "o") {
      layers += `<text x="${rightX}" y="${y + 5}" font-size="12" font-weight="700">${finger}</text>`;
    }
  }

  for (let i = 0; i < 4; i += 1) {
    const fretLabelX = left + (i + 0.5) * fretGap;
    layers += `<text x="${fretLabelX}" y="${bottomY + 20}" text-anchor="middle" font-size="11" font-family="IBM Plex Mono">${baseFret + i}</text>`;
  }

  return `<svg class="diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="Chord diagram with left mute/open marks, bottom frets, low E on bottom, and right-hand fingering numbers">${layers}</svg>`;
}

function noteFrequency(note, octave) {
  const index = noteToIndex(note);
  if (index < 0) return null;
  const midi = (octave + 1) * 12 + index;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function voicingFrequencies(voicing) {
  const freqs = [];
  for (let idx = 0; idx < 6; idx += 1) {
    const fret = voicing.frets[idx];
    if (!Number.isInteger(fret)) continue;
    const stringNumber = 6 - idx;
    const midi = openMidiByString[stringNumber] + fret;
    freqs.push(440 * Math.pow(2, (midi - 69) / 12));
  }
  return freqs;
}

async function getAudioContext() {
  if (!backingTrackState.audioCtx) {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      throw new Error("Web Audio is not supported in this browser.");
    }
    backingTrackState.audioCtx = new AudioContextCtor();
  }
  await backingTrackState.audioCtx.resume();
  return backingTrackState.audioCtx;
}

function chordFrequenciesFromSymbol(chordSymbol, zone, options = {}) {
  const voicing = buildVoicing(chordSymbol, zone, options);
  let frequencies = voicing ? voicingFrequencies(voicing) : [];

  if (!frequencies.length) {
    const root = parseChordRoot(chordSymbol);
    const baseFreq = noteFrequency(root, 3);
    if (!baseFreq) return [];
    frequencies = [baseFreq, baseFreq * 1.26, baseFreq * 1.5, baseFreq * 1.89];
  }

  return frequencies;
}

function playGuitarStrum(ctx, frequencies, startTime, options = {}) {
  const strumGap = options.strumGap || 0.028;
  const peakGain = options.peakGain || 0.115;
  const releaseSeconds = options.releaseSeconds || 2.9;

  frequencies.forEach((frequency, i) => {
    const t = startTime + i * strumGap;
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2600, t);
    filter.Q.setValueAtTime(0.8, t);

    osc1.type = "triangle";
    osc2.type = "sine";
    osc1.frequency.setValueAtTime(frequency, t);
    osc2.frequency.setValueAtTime(frequency * 2, t);
    osc1.detune.setValueAtTime((Math.random() - 0.5) * 4, t);
    osc2.detune.setValueAtTime((Math.random() - 0.5) * 4, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peakGain, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + releaseSeconds);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + releaseSeconds + 0.05);
    osc2.stop(t + releaseSeconds + 0.05);
  });
}

async function playChordPreview(chordSymbol, moduleId) {
  const ctx = await getAudioContext();
  const zone = zoneSelectionByModule[moduleId] || "low";
  const frequencies = chordFrequenciesFromSymbol(chordSymbol, zone);
  if (!frequencies.length) return;
  playGuitarStrum(ctx, frequencies, ctx.currentTime, {
    strumGap: 0.028,
    peakGain: 0.115,
    releaseSeconds: 2.9,
  });
}

async function playTutorialVoicing(root, quality, rootString, zone) {
  const ctx = await getAudioContext();
  const chordSymbol = chordSymbolFromRootQuality(root, quality);
  const frequencies = chordFrequenciesFromSymbol(chordSymbol, zone, { preferredRootString: rootString });
  if (!frequencies.length) return;
  playGuitarStrum(ctx, frequencies, ctx.currentTime, {
    strumGap: 0.028,
    peakGain: 0.115,
    releaseSeconds: 2.9,
  });
}

function scheduleClick(time, beatInBar) {
  const ctx = backingTrackState.audioCtx;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const accent = beatInBar === 2 || beatInBar === 4;

  osc.type = "triangle";
  osc.frequency.setValueAtTime(accent ? 1900 : 1300, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(accent ? 0.16 : 0.1, time + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.08);
}

function scheduleBass(time, chordSymbol, beatInBar) {
  if (beatInBar !== 1 && beatInBar !== 3) return;
  const ctx = backingTrackState.audioCtx;

  const parsed = parseChordSymbol(chordSymbol);
  const bassNote = parsed && parsed.bass ? parsed.bass : parseChordRoot(chordSymbol);
  const frequency = noteFrequency(bassNote, 2);
  if (!frequency) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(frequency, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.14, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.38);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.4);
}

function scheduleCompingChord(time, chordSymbol, beatInBar) {
  if (beatInBar !== 1 && beatInBar !== 3) return;
  const ctx = backingTrackState.audioCtx;
  const zone = zoneSelectionByModule[backingTrackState.moduleId] || "low";
  const frequencies = chordFrequenciesFromSymbol(chordSymbol, zone);
  if (!frequencies.length) return;

  playGuitarStrum(ctx, frequencies, time, {
    strumGap: 0.028,
    peakGain: 0.115,
    releaseSeconds: 2.9,
  });
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

  scheduleCompingChord(time, chord, beatInBar);
  queuePlaybackUi(barIndex, beatInBar, time);

  backingTrackState.nextNoteTime += 60 / backingTrackState.tempo;
  backingTrackState.step += 1;
}

function schedulerLoop() {
  if (!backingTrackState.isPlaying || !backingTrackState.audioCtx) return;
  const lookAhead = 0.12;
  try {
    while (backingTrackState.nextNoteTime < backingTrackState.audioCtx.currentTime + lookAhead) {
      scheduleBeat();
    }
  } catch (error) {
    console.error(error);
    stopBackingTrack("Track error: " + String(error.message || error));
  }
}

function stopBackingTrack(statusMessage = "Stopped") {
  if (backingTrackState.timerId) {
    clearInterval(backingTrackState.timerId);
    backingTrackState.timerId = null;
  }

  backingTrackState.isPlaying = false;
  clearUiTimers();
  clearBarHighlights();

  if (backingTrackState.statusEl) {
    backingTrackState.statusEl.textContent = statusMessage;
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

  if (!Array.isArray(bars) || !bars.length) {
    throw new Error("No bars available for this progression.");
  }

  await getAudioContext();

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
  statusEl.textContent = `Playing at ${tempo} BPM...`;

  backingTrackState.timerId = setInterval(schedulerLoop, 25);
  schedulerLoop();
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

function qualitySummary(quality) {
  if (quality === "maj7") return { label: "Major 7", formula: "1 3 7" };
  if (quality === "m7") return { label: "Minor 7", formula: "1 b3 b7" };
  if (quality === "dom7") return { label: "Dominant 7", formula: "1 3 b7" };
  return { label: "Chord", formula: "1 3 7" };
}

function renderTutorialShellCard(root, quality, rootString, zone) {
  const chordSymbol = chordSymbolFromRootQuality(root, quality);
  const voicing = buildVoicing(chordSymbol, zone, { preferredRootString: rootString });
  if (!voicing) return "";

  const summary = qualitySummary(quality);
  return `
    <article class="chord-card">
      <div class="chord-card-top">
        <h4>${chordSymbol}</h4>
        <button
          type="button"
          class="play-tutorial-chord-btn"
          data-root="${root}"
          data-quality="${quality}"
          data-root-string="${rootString}"
          data-zone="${zone}"
          aria-label="Play ${chordSymbol}"
        >🔈</button>
      </div>
      ${renderDiagram(voicing)}
      <p class="tutorial-card-copy">${summary.label} shell (${summary.formula})</p>
    </article>
  `;
}

function renderTutorialModule() {
  const builderChordSymbol = chordSymbolFromRootQuality(tutorialBuilderState.root, tutorialBuilderState.quality);
  const builderVoicing = buildVoicing(builderChordSymbol, tutorialBuilderState.zone, {
    preferredRootString: tutorialBuilderState.rootString,
  });

  const root6Cards = ["maj7", "m7", "dom7"]
    .map((quality) => renderTutorialShellCard("C", quality, 6, "low"))
    .join("");

  const root5Cards = ["maj7", "m7", "dom7"]
    .map((quality) => renderTutorialShellCard("C", quality, 5, "mid"))
    .join("");

  const builderSummary = qualitySummary(tutorialBuilderState.quality);

  return `
    <section class="lesson-block">
      <h3>Step 1 Tutorial: Build Shell Chords Yourself</h3>
      <p>Start with shell chords so you can comp through jazz standards quickly without memorizing huge grips.</p>
      <ol class="tutorial-list">
        <li>Pick the root note on string 6 or string 5.</li>
        <li>Choose chord quality: maj7, m7, or 7.</li>
        <li>Add the guide tones (3rd and 7th) around that root.</li>
        <li>Move the same shape to any root to build chords in new keys.</li>
      </ol>
    </section>

    <section class="lesson-block">
      <h3>How Chords Are Constructed</h3>
      <table class="formula-table">
        <thead>
          <tr><th>Quality</th><th>Formula</th><th>What Defines It</th></tr>
        </thead>
        <tbody>
          <tr><td>Major 7</td><td>1 3 7</td><td>Major 3rd + Major 7th</td></tr>
          <tr><td>Minor 7</td><td>1 b3 b7</td><td>Minor 3rd + Minor 7th</td></tr>
          <tr><td>Dominant 7</td><td>1 3 b7</td><td>Major 3rd + Minor 7th</td></tr>
        </tbody>
      </table>
    </section>

    <section class="lesson-block">
      <h3>6th-String Root Shell Examples (C Root)</h3>
      <div class="diagram-grid tutorial-grid">${root6Cards}</div>
    </section>

    <section class="lesson-block">
      <h3>5th-String Root Shell Examples (C Root)</h3>
      <div class="diagram-grid tutorial-grid">${root5Cards}</div>
    </section>

    <section class="lesson-block">
      <h3>Interactive Builder</h3>
      <div class="builder-controls">
        <label>
          Root
          <select id="builderRoot">
            ${ROOT_NOTE_OPTIONS.map((note) => `<option value="${note}" ${tutorialBuilderState.root === note ? "selected" : ""}>${note}</option>`).join("")}
          </select>
        </label>
        <label>
          Quality
          <select id="builderQuality">
            <option value="maj7" ${tutorialBuilderState.quality === "maj7" ? "selected" : ""}>maj7</option>
            <option value="m7" ${tutorialBuilderState.quality === "m7" ? "selected" : ""}>m7</option>
            <option value="dom7" ${tutorialBuilderState.quality === "dom7" ? "selected" : ""}>7</option>
          </select>
        </label>
        <label>
          Root string
          <select id="builderRootString">
            <option value="6" ${tutorialBuilderState.rootString === 6 ? "selected" : ""}>6th string</option>
            <option value="5" ${tutorialBuilderState.rootString === 5 ? "selected" : ""}>5th string</option>
          </select>
        </label>
        <label>
          Neck zone
          <select id="builderZone">
            <option value="low" ${tutorialBuilderState.zone === "low" ? "selected" : ""}>Low</option>
            <option value="mid" ${tutorialBuilderState.zone === "mid" ? "selected" : ""}>Mid</option>
          </select>
        </label>
      </div>

      <div class="builder-output">
        <article class="chord-card builder-card">
          <div class="chord-card-top">
            <h4>${builderChordSymbol}</h4>
            <button
              type="button"
              class="play-tutorial-chord-btn"
              data-root="${tutorialBuilderState.root}"
              data-quality="${tutorialBuilderState.quality}"
              data-root-string="${tutorialBuilderState.rootString}"
              data-zone="${tutorialBuilderState.zone}"
              aria-label="Play ${builderChordSymbol}"
            >🔈</button>
          </div>
          ${builderVoicing ? renderDiagram(builderVoicing) : "<p>Unable to build this voicing.</p>"}
          <p class="tutorial-card-copy">Formula: ${builderSummary.formula} | Root on string ${tutorialBuilderState.rootString}</p>
        </article>
      </div>
    </section>
  `;
}

function wireTutorialModule() {
  const rootSelect = document.getElementById("builderRoot");
  const qualitySelect = document.getElementById("builderQuality");
  const rootStringSelect = document.getElementById("builderRootString");
  const zoneSelect = document.getElementById("builderZone");

  const rerender = () => {
    renderLesson();
  };

  if (rootSelect) {
    rootSelect.addEventListener("change", () => {
      tutorialBuilderState.root = rootSelect.value;
      rerender();
    });
  }

  if (qualitySelect) {
    qualitySelect.addEventListener("change", () => {
      tutorialBuilderState.quality = qualitySelect.value;
      rerender();
    });
  }

  if (rootStringSelect) {
    rootStringSelect.addEventListener("change", () => {
      tutorialBuilderState.rootString = rootStringSelect.value === "5" ? 5 : 6;
      rerender();
    });
  }

  if (zoneSelect) {
    zoneSelect.addEventListener("change", () => {
      tutorialBuilderState.zone = zoneSelect.value === "mid" ? "mid" : "low";
      rerender();
    });
  }

  lessonContent.querySelectorAll(".play-tutorial-chord-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const root = button.dataset.root || "C";
      const quality = button.dataset.quality || "maj7";
      const rootString = Number(button.dataset.rootString || 6);
      const zone = button.dataset.zone === "mid" ? "mid" : "low";
      await playTutorialVoicing(root, quality, rootString, zone);
    });
  });
}

function renderProgressionModule(module) {
  const data = PROGRESSION_DATA[module.id];
  const bars = data.bars;
  const uniqueChords = uniqueChordsInOrder(bars);
  const tempoDefault = 80;
  const selectedZone = zoneSelectionByModule[module.id] || "low";

  const barsMarkup = bars
    .map(
      (chord, idx) =>
        `<div class="bar-item" data-bar-index="${idx}">Bar ${idx + 1}: <strong>${chord}</strong></div>`
    )
    .join("");

  const diagramsMarkup = uniqueChords
    .map((chord) => {
      const voicing = buildVoicing(chord, selectedZone);
      if (!voicing) return "";
      return `
        <article class="chord-card">
          <div class="chord-card-top">
            <h4>${chord}</h4>
            <button type="button" class="play-chord-btn" data-chord="${chord}" data-module="${module.id}" aria-label="Play ${chord}">🔈</button>
          </div>
          ${renderDiagram(voicing)}
        </article>
      `;
    })
    .join("");

  return `
    <section class="lesson-block">
      <h3>Progression: ${module.title}</h3>
      <p><strong>Key/Context:</strong> ${data.keyLabel} <span class="chip">Neck zone: ${selectedZone}</span></p>
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
      <div class="fingering-controls">
        <label>
          Neck zone
          <select id="zoneSelect-${module.id}" class="zone-select">
            <option value="low" ${selectedZone === "low" ? "selected" : ""}>Low neck zone</option>
            <option value="mid" ${selectedZone === "mid" ? "selected" : ""}>Mid neck zone</option>
          </select>
        </label>
      </div>
      <div class="diagram-grid">${diagramsMarkup}</div>
    </section>
  `;
}
function wireChordPreviewButtons() {
  lessonContent.querySelectorAll(".play-chord-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      await playChordPreview(button.dataset.chord || "", button.dataset.module || activeModuleId);
    });
  });
}

function wirePracticePlayer(module, data) {
  const zoneSelect = document.getElementById(`zoneSelect-${module.id}`);
  const tempoInput = document.getElementById(`tempoInput-${module.id}`);
  const startBtn = document.getElementById(`startTrackBtn-${module.id}`);
  const stopBtn = document.getElementById(`stopTrackBtn-${module.id}`);
  const statusEl = document.getElementById(`trackStatus-${module.id}`);
  const barEls = Array.from(lessonContent.querySelectorAll(".bar-item"));

  if (!zoneSelect || !tempoInput || !startBtn || !stopBtn || !statusEl) return;

  zoneSelect.addEventListener("change", () => {
    zoneSelectionByModule[module.id] = zoneSelect.value === "mid" ? "mid" : "low";
    stopBackingTrack();
    renderLesson();
  });

  startBtn.addEventListener("click", async () => {
    try {
      const tempo = clampTempo(Number(tempoInput.value));
      tempoInput.value = String(tempo);
      await startBackingTrack(module.id, data.bars, tempo, statusEl, startBtn, stopBtn, barEls);
    } catch (error) {
      console.error(error);
      stopBackingTrack("Unable to start: " + String(error.message || error));
    }
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

function renderLesson() {
  const module = MODULES.find((item) => item.id === activeModuleId) || MODULES[0];

  if (module.kind === "tutorial") {
    lessonContent.innerHTML = renderTutorialModule();
    wireTutorialModule();
    return;
  }

  lessonContent.innerHTML = renderProgressionModule(module);
  wireChordPreviewButtons();
  wirePracticePlayer(module, PROGRESSION_DATA[module.id]);
}

function renderModuleNav() {
  const step1Module = MODULES.find((module) => module.kind === "tutorial");
  const step2Modules = PROGRESSION_MODULES;

  const step2Markup = step2Modules
    .map((module, idx) => {
      return `
        <li>
          <button type="button" data-module-id="${module.id}">
            <strong>${idx + 1}. ${module.title}</strong>
            <small>${module.blurb}</small>
          </button>
        </li>
      `;
    })
    .join("");

  moduleNav.innerHTML = `
    <li class="nav-section">Step 1: Foundation</li>
    <li>
      <button type="button" data-module-id="${step1Module.id}">
        <strong>${step1Module.title}</strong>
        <small>${step1Module.blurb}</small>
      </button>
    </li>
    <li class="nav-section">Step 2: Progressions</li>
    ${step2Markup}
  `;

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
  safeSetStoredModule(activeModuleId);

  if (module.kind === "tutorial") {
    stageModuleLabel.textContent = "Step 1 of 2";
    stageTitle.textContent = module.title;
  } else {
    const progressionIndex = PROGRESSION_MODULES.findIndex((item) => item.id === module.id) + 1;
    stageModuleLabel.textContent = `Step 2 of 2 - Progression ${progressionIndex}/${PROGRESSION_MODULES.length}`;
    stageTitle.textContent = module.title;
  }

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

function bootstrapApp() {
  try {
    renderModuleNav();
    setActiveModule(activeModuleId);

    prevModuleBtn.addEventListener("click", () => stepModule(-1));
    nextModuleBtn.addEventListener("click", () => stepModule(1));
  } catch (error) {
    console.error(error);
    if (lessonContent) {
      lessonContent.innerHTML = `<section class="lesson-block"><h3>App Error</h3><p>Something failed while loading this lesson. Hard refresh and try again.</p><p><code>${String(error.message || error)}</code></p></section>`;
    }
  }
}

bootstrapApp();
