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
    id: "rhythm_bridge",
    kind: "progression",
    step: "Progression 3",
    title: "Rhythm Changes Bridge",
    blurb: "D7 G7 C7 F7",
  },
  {
    id: "minor_iivi",
    kind: "progression",
    step: "Progression 4",
    title: "Minor ii V I",
    blurb: "Dm7b5 G7 Cm7 Cm7",
  },
  {
    id: "i_to_iv",
    kind: "progression",
    step: "Progression 5",
    title: "I to IV",
    blurb: "Cmaj7 Gm7 C7 Fmaj7",
  },
  {
    id: "top_jazz_scales",
    kind: "scales",
    title: "Top 5 Jazz Scales",
    blurb: "Map scales directly to chord qualities in real progressions.",
  },
  {
    id: "play_along_loop",
    kind: "playalong",
    title: "Play-Along Loop",
    blurb: "Simple drum + bass loop with adjustable tempo.",
  },
];

const ROOT_NOTE_OPTIONS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const tutorialBuilderState = {
  root: "C",
  includeFifth: false,
  extension: "none",
};

const scaleModuleState = {
  root: "C",
  scaleId: "ionian",
  applyModuleId: "major_iivi",
};

const playAlongState = {
  progressionId: "major_iivi",
  key: "C",
  tempo: 90,
};

const PROGRESSION_MODULES = MODULES.filter((module) => module.kind === "progression");

const SCALE_LIBRARY = {
  ionian: {
    name: "Major (Ionian)",
    formula: "1 2 3 4 5 6 7",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    targetQuality: "maj7",
    targetLabel: "Fits major 7 chords (maj7)",
  },
  dorian: {
    name: "Dorian",
    formula: "1 2 b3 4 5 6 b7",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    targetQuality: "m7",
    targetLabel: "Fits minor 7 chords (m7)",
  },
  mixolydian: {
    name: "Mixolydian",
    formula: "1 2 3 4 5 6 b7",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    targetQuality: "dom7",
    targetLabel: "Fits dominant 7 chords (7)",
  },
  locrian: {
    name: "Locrian",
    formula: "1 b2 b3 4 b5 b6 b7",
    intervals: [0, 1, 3, 5, 6, 8, 10],
    targetQuality: "m7b5",
    targetLabel: "Fits half-diminished chords (m7b5)",
  },
  melodic_minor: {
    name: "Melodic Minor",
    formula: "1 2 b3 4 5 6 7",
    intervals: [0, 2, 3, 5, 7, 9, 11],
    targetQuality: "m7",
    targetLabel: "Minor tonic color and altered dominant source",
  },
};

const PROGRESSION_DATA = {
  major_iivi: {
    tonic: "C",
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
    tonic: "C",
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
    tonic: "C",
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
    tonic: "C",
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
    tonic: "C",
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
    tonic: "C",
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
    tonic: "C",
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
    tonic: "C",
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
    tonic: "C",
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
    tonic: "C",
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
const transposeSelectionByModule = {};
Object.entries(PROGRESSION_DATA).forEach(([moduleId, data]) => {
  transposeSelectionByModule[moduleId] = data.tonic || "C";
});

const backingTrackState = {
  audioCtx: null,
  isPlaying: false,
  moduleId: null,
  bars: [],
  mode: "comping",
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

function noteFromIndex(index, preferFlats = false) {
  const normalized = ((index % 12) + 12) % 12;
  const sharpNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const flatNames = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  return preferFlats ? flatNames[normalized] : sharpNames[normalized];
}

function moduleZone(moduleId) {
  const data = PROGRESSION_DATA[moduleId];
  return data && data.zone === "mid" ? "mid" : "low";
}

function transposeChordSymbol(chordSymbol, semitoneShift, preferFlats = false) {
  const parsed = parseChordSymbol(chordSymbol);
  if (!parsed) return chordSymbol;

  const rootIndex = noteToIndex(parsed.root);
  if (rootIndex < 0) return chordSymbol;

  const qualitySuffixByKey = {
    maj7: "maj7",
    m7: "m7",
    dom7: "7",
    m7b5: "m7b5",
    dim7: "dim7",
  };

  const nextRoot = noteFromIndex(rootIndex + semitoneShift, preferFlats);
  const qualitySuffix = qualitySuffixByKey[parsed.quality] || "";
  let nextChord = `${nextRoot}${qualitySuffix}`;

  if (parsed.bass) {
    const bassIndex = noteToIndex(parsed.bass);
    if (bassIndex >= 0) {
      nextChord += `/${noteFromIndex(bassIndex + semitoneShift, preferFlats)}`;
    }
  }

  return nextChord;
}

function getTransposedBarsForModule(moduleId, data) {
  const moduleData = data || PROGRESSION_DATA[moduleId];
  const tonic = moduleData.tonic || "C";
  const selectedKey = transposeSelectionByModule[moduleId] || tonic;
  return transposeBarsFromTonic(moduleData.bars, tonic, selectedKey);
}

function transposeBarsFromTonic(bars, tonic, selectedKey) {
  const shift = (noteToIndex(selectedKey) - noteToIndex(tonic) + 12) % 12;
  if (shift === 0) return [...bars];
  const preferFlats = selectedKey.includes("b");
  return bars.map((chord) => transposeChordSymbol(chord, shift, preferFlats));
}

function recommendedScaleIdForQuality(quality) {
  if (quality === "maj7") return "ionian";
  if (quality === "m7") return "dorian";
  if (quality === "dom7") return "mixolydian";
  if (quality === "m7b5") return "locrian";
  return "melodic_minor";
}

function recommendedScaleIdForChord(chordSymbol) {
  const parsed = parseChordSymbol(chordSymbol);
  if (!parsed) return "ionian";
  return recommendedScaleIdForQuality(parsed.quality);
}

function scalePointsForZone(root, scaleId, zone) {
  const rootIndex = noteToIndex(root);
  const scale = SCALE_LIBRARY[scaleId] || SCALE_LIBRARY.ionian;
  const [minFret, maxFret] = ZONES[zone];
  const points = [];
  if (rootIndex < 0) return points;

  for (let stringNumber = 6; stringNumber >= 1; stringNumber -= 1) {
    for (let fret = minFret; fret <= maxFret; fret += 1) {
      const noteIndex = (openNoteByString[stringNumber] + fret) % 12;
      const interval = (noteIndex - rootIndex + 12) % 12;
      if (!scale.intervals.includes(interval)) continue;
      const degree = INTERVAL_LABELS[interval];
      points.push({
        stringNumber,
        fret,
        midi: openMidiByString[stringNumber] + fret,
        degree,
        isRoot: interval === 0,
      });
    }
  }
  return points;
}

function scaleRunFrequencies(root, scaleId, zone) {
  const points = scalePointsForZone(root, scaleId, zone);
  if (!points.length) return [];
  const sorted = [...points].sort((a, b) => a.midi - b.midi);
  const uniqueMidi = [...new Set(sorted.map((point) => point.midi))];
  const limited = uniqueMidi.slice(0, 9);
  const freqs = limited.map((midi) => 440 * Math.pow(2, (midi - 69) / 12));
  if (freqs.length > 1) {
    const descending = [...freqs].slice(0, freqs.length - 1).reverse();
    return [...freqs, ...descending];
  }
  return freqs;
}

function scaleIdLabel(scaleId) {
  const scale = SCALE_LIBRARY[scaleId] || SCALE_LIBRARY.ionian;
  return scale.name;
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

function placeIntervalOnBestString(frets, preferredStrings, interval, rootIndex, anchorFret) {
  const windowMin = Math.max(0, anchorFret - 1);
  const windowMax = Math.min(16, anchorFret + 3);
  const ranked = [];

  preferredStrings.forEach((stringNumber, rank) => {
    const arrayIdx = 6 - stringNumber;
    if (frets[arrayIdx] !== "x") return;

    const targetNoteIndex = (rootIndex + interval + 12) % 12;
    const candidates = candidateFretsForStringNote(targetNoteIndex, stringNumber);
    candidates.forEach((fret) => {
      const inWindow = fret >= windowMin && fret <= windowMax;
      const distance = Math.abs(fret - anchorFret);
      const outsidePenalty = inWindow ? 0 : 12;
      ranked.push({
        stringNumber,
        fret,
        score: outsidePenalty + distance + rank * 0.2,
      });
    });
  });

  if (!ranked.length) return frets;
  ranked.sort((a, b) => a.score - b.score || a.fret - b.fret);
  const best = ranked[0];
  const next = [...frets];
  next[6 - best.stringNumber] = best.fret;
  return next;
}

function applyBuilderOptionsToFrets(frets, template, rootIndex, anchorFret, options = {}) {
  const includeFifth = options.includeFifth === true;
  const extensionInterval = EXTENSION_INTERVALS[options.extension] ?? null;

  let next = [...frets];
  if (template.rootString === 6) {
    if (includeFifth) {
      next = placeIntervalOnBestString(next, [2, 5, 1], 7, rootIndex, anchorFret);
    }
    if (extensionInterval !== null) {
      next = placeIntervalOnBestString(next, [2, 5, 1], extensionInterval, rootIndex, anchorFret);
    }
    return next;
  }

  if (template.rootString === 5) {
    if (includeFifth) {
      next = placeIntervalOnBestString(next, [4, 1, 6], 7, rootIndex, anchorFret);
    }
    if (extensionInterval !== null) {
      next = placeIntervalOnBestString(next, [1, 4, 6], extensionInterval, rootIndex, anchorFret);
    }
  }
  return next;
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

  const withBuilderOptions = applyBuilderOptionsToFrets(fretsBase, template, rootIndex, anchorFret, options);
  const frets = applySlashBassIfNeeded(parsed, withBuilderOptions, anchorFret);
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
  return `${normalizedRoot}${info.symbol}`;
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

function renderScaleDiagram(root, scaleId, zone) {
  const points = scalePointsForZone(root, scaleId, zone);
  const [baseFret, maxFret] = ZONES[zone];
  const fretCount = maxFret - baseFret + 1;
  const width = 334;
  const height = 236;
  const left = 46;
  const top = 24;
  const fretGap = 40;
  const stringGap = 24;
  const gridWidth = fretGap * fretCount;
  const gridHeight = stringGap * 5;
  const bottomY = top + gridHeight;

  let layers = `<rect x="${left}" y="${top}" width="${gridWidth}" height="${gridHeight}" fill="#6faecc" stroke="#6f6f6f" stroke-width="1.4"/>`;

  for (let col = 0; col <= fretCount; col += 1) {
    const x = left + col * fretGap;
    layers += `<line x1="${x}" y1="${top}" x2="${x}" y2="${bottomY}" stroke="#5a5a5a" stroke-width="1.2"/>`;
  }

  for (let row = 0; row <= 5; row += 1) {
    const y = top + row * stringGap;
    const strokeWidth = row === 5 ? 3.2 : 1.5;
    layers += `<line x1="${left}" y1="${y}" x2="${left + gridWidth}" y2="${y}" stroke="#1f2a30" stroke-width="${strokeWidth}"/>`;
  }

  points.forEach((point) => {
    const row = 6 - point.stringNumber;
    const x = left + (point.fret - baseFret + 0.5) * fretGap;
    const y = top + row * stringGap;
    const fill = point.isRoot ? "#d62828" : "#111111";
    const font = point.degree.length > 1 ? 7 : 9;
    layers += `<circle cx="${x}" cy="${y}" r="9.3" fill="${fill}" stroke="white" stroke-width="1.2"/>`;
    layers += `<text x="${x}" y="${y + 3}" text-anchor="middle" fill="white" font-family="IBM Plex Mono" font-size="${font}">${point.degree}</text>`;
  });

  for (let i = 0; i < fretCount; i += 1) {
    const x = left + (i + 0.5) * fretGap;
    layers += `<text x="${x}" y="${bottomY + 20}" text-anchor="middle" font-size="11" font-family="IBM Plex Mono">${baseFret + i}</text>`;
  }

  return `<svg class="diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="${root} ${scaleId} scale in ${zone} zone">${layers}</svg>`;
}

function noteFrequency(note, octave) {
  const index = noteToIndex(note);
  if (index < 0) return null;
  const midi = (octave + 1) * 12 + index;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function voicingPlaybackNotes(voicing) {
  const notes = [];
  for (let idx = 0; idx < 6; idx += 1) {
    const fret = voicing.frets[idx];
    if (!Number.isInteger(fret)) continue;
    const stringNumber = 6 - idx;
    const midi = openMidiByString[stringNumber] + fret;
    notes.push({
      frequency: 440 * Math.pow(2, (midi - 69) / 12),
      stringNumber,
      fret,
      midi,
    });
  }
  return notes;
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
  let notes = voicing ? voicingPlaybackNotes(voicing) : [];

  if (!notes.length) {
    const root = parseChordRoot(chordSymbol);
    const baseFreq = noteFrequency(root, 3);
    if (!baseFreq) return [];
    notes = [
      { frequency: baseFreq, stringNumber: 6, fret: null, midi: null },
      { frequency: baseFreq * 1.26, stringNumber: 4, fret: null, midi: null },
      { frequency: baseFreq * 1.5, stringNumber: 3, fret: null, midi: null },
      { frequency: baseFreq * 1.89, stringNumber: 2, fret: null, midi: null },
    ];
  }

  return notes;
}

function playGuitarStrum(ctx, notes, startTime, options = {}) {
  const strumGap = options.strumGap || 0.028;
  const peakGain = options.peakGain || 0.115;
  const releaseSeconds = options.releaseSeconds || 2.9;

  const timbreByString = {
    6: { cutoff: 1800, q: 0.9, gainScale: 1.18, releaseScale: 1.2, harmonicMix: 0.58 },
    5: { cutoff: 2000, q: 0.88, gainScale: 1.12, releaseScale: 1.1, harmonicMix: 0.55 },
    4: { cutoff: 2200, q: 0.84, gainScale: 1.04, releaseScale: 1.03, harmonicMix: 0.52 },
    3: { cutoff: 2450, q: 0.8, gainScale: 0.98, releaseScale: 0.98, harmonicMix: 0.5 },
    2: { cutoff: 2700, q: 0.75, gainScale: 0.94, releaseScale: 0.92, harmonicMix: 0.46 },
    1: { cutoff: 3000, q: 0.72, gainScale: 0.9, releaseScale: 0.86, harmonicMix: 0.42 },
  };

  notes.forEach((noteEntry, i) => {
    const frequency = typeof noteEntry === "number" ? noteEntry : noteEntry.frequency;
    if (!Number.isFinite(frequency)) return;
    const stringNumber =
      typeof noteEntry === "number" ? 3 : Number.isInteger(noteEntry.stringNumber) ? noteEntry.stringNumber : 3;
    const timbre = timbreByString[stringNumber] || timbreByString[3];
    const t = startTime + i * strumGap;
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const harmonicGain = ctx.createGain();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(timbre.cutoff, t);
    filter.Q.setValueAtTime(timbre.q, t);

    osc1.type = "triangle";
    osc2.type = "sine";
    osc1.frequency.setValueAtTime(frequency, t);
    osc2.frequency.setValueAtTime(frequency * 2, t);
    osc1.detune.setValueAtTime((Math.random() - 0.5) * 3.5, t);
    osc2.detune.setValueAtTime((Math.random() - 0.5) * 3 + (stringNumber - 3) * 0.25, t);

    const notePeak = peakGain * timbre.gainScale;
    const noteRelease = releaseSeconds * timbre.releaseScale;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(notePeak, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + noteRelease);

    harmonicGain.gain.setValueAtTime(timbre.harmonicMix, t);

    osc1.connect(filter);
    osc2.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + noteRelease + 0.05);
    osc2.stop(t + noteRelease + 0.05);
  });
}

function playScaleRun(ctx, frequencies, startTime, options = {}) {
  const stepSeconds = options.stepSeconds || 0.15;
  const peakGain = options.peakGain || 0.1;
  const releaseSeconds = options.releaseSeconds || 0.3;

  frequencies.forEach((frequency, i) => {
    const t = startTime + i * stepSeconds;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(frequency, t);
    osc.detune.setValueAtTime((Math.random() - 0.5) * 2.4, t);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2700, t);
    filter.Q.setValueAtTime(0.7, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peakGain, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + releaseSeconds);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + releaseSeconds + 0.04);
  });
}

async function playChordPreview(chordSymbol, moduleId) {
  const ctx = await getAudioContext();
  const zone = moduleZone(moduleId);
  const notes = chordFrequenciesFromSymbol(chordSymbol, zone);
  if (!notes.length) return;
  playGuitarStrum(ctx, notes, ctx.currentTime, {
    strumGap: 0.028,
    peakGain: 0.115,
    releaseSeconds: 2.9,
  });
}

async function playTutorialVoicing(root, quality, rootString, zone, includeFifth = false, extension = "none") {
  const ctx = await getAudioContext();
  const chordSymbol = chordSymbolFromRootQuality(root, quality);
  const notes = chordFrequenciesFromSymbol(chordSymbol, zone, {
    preferredRootString: rootString,
    includeFifth,
    extension,
  });
  if (!notes.length) return;
  playGuitarStrum(ctx, notes, ctx.currentTime, {
    strumGap: 0.028,
    peakGain: 0.115,
    releaseSeconds: 2.9,
  });
}

async function playScalePreview(root, scaleId, zone) {
  const ctx = await getAudioContext();
  const runFrequencies = scaleRunFrequencies(root, scaleId, zone);
  if (!runFrequencies.length) return;
  playScaleRun(ctx, runFrequencies, ctx.currentTime, {
    stepSeconds: 0.145,
    peakGain: 0.1,
    releaseSeconds: 0.28,
  });
}

async function playScaleOverChordPreview(root, scaleId) {
  const ctx = await getAudioContext();
  const scale = SCALE_LIBRARY[scaleId] || SCALE_LIBRARY.ionian;
  const zone = "mid";
  const chordSymbol = chordSymbolFromRootQuality(root, scale.targetQuality);
  const chordNotes = chordFrequenciesFromSymbol(chordSymbol, zone);
  const runFrequencies = scaleRunFrequencies(root, scaleId, zone);
  if (!chordNotes.length || !runFrequencies.length) return;

  playGuitarStrum(ctx, chordNotes, ctx.currentTime, {
    strumGap: 0.026,
    peakGain: 0.1,
    releaseSeconds: 2.2,
  });
  playScaleRun(ctx, runFrequencies, ctx.currentTime + 0.28, {
    stepSeconds: 0.135,
    peakGain: 0.09,
    releaseSeconds: 0.26,
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
  const zone = moduleZone(backingTrackState.moduleId);
  const notes = chordFrequenciesFromSymbol(chordSymbol, zone);
  if (!notes.length) return;

  playGuitarStrum(ctx, notes, time, {
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

  if (backingTrackState.mode === "playalong") {
    scheduleClick(time, beatInBar);
    scheduleBass(time, chord, beatInBar);
  } else {
    scheduleCompingChord(time, chord, beatInBar);
  }
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

async function startBackingTrack(moduleId, bars, tempo, statusEl, startBtn, stopBtn, barEls, options = {}) {
  if (backingTrackState.isPlaying) {
    stopBackingTrack();
  }

  if (!Array.isArray(bars) || !bars.length) {
    throw new Error("No bars available for this progression.");
  }

  await getAudioContext();

  backingTrackState.moduleId = moduleId;
  backingTrackState.bars = bars;
  backingTrackState.mode = options.mode === "playalong" ? "playalong" : "comping";
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

const EXTENSION_INTERVALS = {
  none: null,
  "9": 2,
  "11": 5,
  "13": 9,
};

function tutorialFormulaWithOptions(baseFormula, includeFifth, extension) {
  const tones = baseFormula.split(" ");
  if (includeFifth && !tones.includes("5")) {
    tones.splice(2, 0, "5");
  }
  if (extension && extension !== "none" && !tones.includes(extension)) {
    tones.push(extension);
  }
  return tones.join(" ");
}

function voicingHasDegree(voicing, degree) {
  return voicing.tones.some((tone) => tone && tone.degree === degree);
}

function displayChordSymbol(root, quality, includeFifth, extension) {
  const base = chordSymbolFromRootQuality(root, quality);
  const extras = [];
  if (includeFifth) extras.push("5");
  if (extension && extension !== "none") extras.push(extension);
  return extras.length ? `${base}(${extras.join(",")})` : base;
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

function renderTutorialBuilderCard(root, quality, rootString, zone, includeFifth, extension) {
  const chordSymbol = chordSymbolFromRootQuality(root, quality);
  const labelSymbol = displayChordSymbol(root, quality, includeFifth, extension);
  const voicing = buildVoicing(chordSymbol, zone, {
    preferredRootString: rootString,
    includeFifth,
    extension,
  });
  if (!voicing) return "";

  const summary = qualitySummary(quality);
  const effectiveIncludeFifth = includeFifth && voicingHasDegree(voicing, "5");
  const effectiveExtension =
    extension && extension !== "none" && voicingHasDegree(voicing, extension) ? extension : "none";
  const formula = tutorialFormulaWithOptions(summary.formula, effectiveIncludeFifth, effectiveExtension);
  return `
    <article class="chord-card">
      <div class="chord-card-top">
        <h4>${labelSymbol}</h4>
        <button
          type="button"
          class="play-tutorial-chord-btn"
          data-root="${root}"
          data-quality="${quality}"
          data-root-string="${rootString}"
          data-zone="${zone}"
          data-include-fifth="${includeFifth ? "1" : "0"}"
          data-extension="${extension}"
          aria-label="Play ${labelSymbol}"
        >🔈</button>
      </div>
      ${renderDiagram(voicing)}
      <p class="tutorial-card-copy">${summary.label} | Root on string ${rootString} | Formula: ${formula}</p>
    </article>
  `;
}

function renderTutorialModule() {
  const root6Cards = ["maj7", "m7", "dom7"]
    .map((quality) => renderTutorialShellCard("C", quality, 6, "low"))
    .join("");

  const root5Cards = ["maj7", "m7", "dom7"]
    .map((quality) => renderTutorialShellCard("C", quality, 5, "mid"))
    .join("");

  const builderTopRow = [
    { quality: "maj7", rootString: 6, zone: "low" },
    { quality: "m7", rootString: 6, zone: "low" },
    { quality: "dom7", rootString: 6, zone: "low" },
  ]
    .map(({ quality, rootString, zone }) =>
      renderTutorialBuilderCard(
        tutorialBuilderState.root,
        quality,
        rootString,
        zone,
        tutorialBuilderState.includeFifth,
        tutorialBuilderState.extension
      )
    )
    .join("");
  const builderBottomRow = [
    { quality: "maj7", rootString: 5, zone: "mid" },
    { quality: "m7", rootString: 5, zone: "mid" },
    { quality: "dom7", rootString: 5, zone: "mid" },
  ]
    .map(({ quality, rootString, zone }) =>
      renderTutorialBuilderCard(
        tutorialBuilderState.root,
        quality,
        rootString,
        zone,
        tutorialBuilderState.includeFifth,
        tutorialBuilderState.extension
      )
    )
    .join("");

  return `
    <section class="lesson-block">
      <h3>Interactive Builder</h3>
      <div class="builder-controls">
        <div class="builder-root-wrap">
          <span>Root</span>
          <div class="builder-root-group" role="radiogroup" aria-label="Root note">
            ${ROOT_NOTE_OPTIONS.map(
              (note) =>
                `<button type="button" class="root-choice ${tutorialBuilderState.root === note ? "active" : ""}" data-root-option="${note}" aria-pressed="${tutorialBuilderState.root === note ? "true" : "false"}">${note}</button>`
            ).join("")}
          </div>
        </div>
        <label>
          <span>Add 5th</span>
          <input id="builderIncludeFifth" type="checkbox" ${tutorialBuilderState.includeFifth ? "checked" : ""}/>
        </label>
        <div class="builder-extension-wrap">
          <span>Add extension</span>
          <div class="builder-extension-group" role="radiogroup" aria-label="Add extension">
            <button type="button" class="extension-choice ${tutorialBuilderState.extension === "none" ? "active" : ""}" data-extension-option="none" aria-pressed="${tutorialBuilderState.extension === "none" ? "true" : "false"}">None</button>
            <button type="button" class="extension-choice ${tutorialBuilderState.extension === "9" ? "active" : ""}" data-extension-option="9" aria-pressed="${tutorialBuilderState.extension === "9" ? "true" : "false"}">9</button>
            <button type="button" class="extension-choice ${tutorialBuilderState.extension === "11" ? "active" : ""}" data-extension-option="11" aria-pressed="${tutorialBuilderState.extension === "11" ? "true" : "false"}">11</button>
            <button type="button" class="extension-choice ${tutorialBuilderState.extension === "13" ? "active" : ""}" data-extension-option="13" aria-pressed="${tutorialBuilderState.extension === "13" ? "true" : "false"}">13</button>
          </div>
        </div>
      </div>

      <div class="builder-output">
        <div class="builder-stack">
          <h4 class="builder-row-label">6th-string root</h4>
          <div class="diagram-grid tutorial-grid builder-fixed-grid">${builderTopRow || "<p>Unable to build top row voicings.</p>"}</div>
          <h4 class="builder-row-label">5th-string root</h4>
          <div class="diagram-grid tutorial-grid builder-fixed-grid">${builderBottomRow || "<p>Unable to build bottom row voicings.</p>"}</div>
        </div>
      </div>
    </section>

    <section class="examples-divider" aria-label="Examples section">
      <h3>Reference Examples</h3>
      <p>Static example voicings for C root.</p>
    </section>

    <section class="lesson-block">
      <h3>6th-String Root Shell Examples (C Root)</h3>
      <div class="diagram-grid tutorial-grid">${root6Cards}</div>
    </section>

    <section class="lesson-block">
      <h3>5th-String Root Shell Examples (C Root)</h3>
      <div class="diagram-grid tutorial-grid">${root5Cards}</div>
    </section>
  `;
}

function wireTutorialModule() {
  const rootButtons = lessonContent.querySelectorAll("[data-root-option]");
  const includeFifthInput = document.getElementById("builderIncludeFifth");
  const extensionButtons = lessonContent.querySelectorAll("[data-extension-option]");

  const rerender = () => {
    renderLesson();
  };

  rootButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tutorialBuilderState.root = button.dataset.rootOption || "C";
      rerender();
    });
  });

  if (includeFifthInput) {
    includeFifthInput.addEventListener("change", () => {
      tutorialBuilderState.includeFifth = includeFifthInput.checked;
      rerender();
    });
  }

  extensionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextExtension = button.dataset.extensionOption || "none";
      tutorialBuilderState.extension = ["9", "11", "13"].includes(nextExtension) ? nextExtension : "none";
      rerender();
    });
  });

  lessonContent.querySelectorAll(".play-tutorial-chord-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const root = button.dataset.root || "C";
      const quality = button.dataset.quality || "maj7";
      const rootString = Number(button.dataset.rootString || 6);
      const zone = button.dataset.zone === "mid" ? "mid" : "low";
      const includeFifth = button.dataset.includeFifth === "1";
      const extension = ["9", "11", "13"].includes(button.dataset.extension || "")
        ? button.dataset.extension
        : "none";
      await playTutorialVoicing(root, quality, rootString, zone, includeFifth, extension);
    });
  });
}

function renderScaleModule() {
  const scale = SCALE_LIBRARY[scaleModuleState.scaleId] || SCALE_LIBRARY.ionian;
  const applyProgression = PROGRESSION_MODULES.find((module) => module.id === scaleModuleState.applyModuleId) || PROGRESSION_MODULES[0];
  const applyData = applyProgression ? PROGRESSION_DATA[applyProgression.id] : null;
  const applyBars = applyData ? getTransposedBarsForModule(applyProgression.id, applyData) : [];
  const applyMarkup = applyBars
    .map((chord, idx) => {
      const recommendedId = recommendedScaleIdForChord(chord);
      const recommended = SCALE_LIBRARY[recommendedId] || SCALE_LIBRARY.ionian;
      const active = recommendedId === scaleModuleState.scaleId ? "active-bar" : "";
      return `<div class="bar-item ${active}">Bar ${idx + 1}: <strong>${chord}</strong><br/><small>Recommended: ${recommended.name}</small></div>`;
    })
    .join("");
  const applyScaleDiagrams = applyBars
    .map((chord, idx) => {
      const root = parseChordRoot(chord) || scaleModuleState.root;
      const scaleId = recommendedScaleIdForChord(chord);
      return `
        <article class="chord-card">
          <h4>Bar ${idx + 1}: ${chord}</h4>
          <p class="tutorial-card-copy">${scaleIdLabel(scaleId)}</p>
          ${renderScaleDiagram(root, scaleId, "low")}
        </article>
      `;
    })
    .join("");

  return `
    <section class="lesson-block">
      <h3>Step 3: Top 5 Jazz Scales</h3>
      <div class="builder-controls">
        <div class="builder-root-wrap">
          <span>Root</span>
          <div class="builder-root-group" role="radiogroup" aria-label="Scale root note">
            ${ROOT_NOTE_OPTIONS.map(
              (note) =>
                `<button type="button" class="root-choice ${scaleModuleState.root === note ? "active" : ""}" data-scale-root-option="${note}" aria-pressed="${scaleModuleState.root === note ? "true" : "false"}">${note}</button>`
            ).join("")}
          </div>
        </div>
        <div class="builder-extension-wrap">
          <span>Scale</span>
          <div class="builder-extension-group" role="radiogroup" aria-label="Scale selection">
            ${Object.entries(SCALE_LIBRARY)
              .map(
                ([id, info]) =>
                  `<button type="button" class="extension-choice scale-choice ${scaleModuleState.scaleId === id ? "active" : ""}" data-scale-option="${id}" aria-pressed="${scaleModuleState.scaleId === id ? "true" : "false"}">${info.name}</button>`
              )
              .join("")}
          </div>
        </div>
      </div>
      <p><strong>Formula:</strong> ${scale.formula} <span class="chip">${scale.targetLabel}</span></p>
      <div class="player-controls">
        <button type="button" class="start-track-btn" id="playScaleLowBtn">Play Scale (Low Zone)</button>
        <button type="button" class="start-track-btn" id="playScaleMidBtn">Play Scale (Mid Zone)</button>
        <button type="button" class="start-track-btn" id="playScaleOverChordBtn">Play Over Chord</button>
      </div>
    </section>

    <section class="lesson-block">
      <h3>Scale Fingerboards</h3>
      <div class="diagram-grid">
        <article class="chord-card">
          <h4>Low Zone</h4>
          ${renderScaleDiagram(scaleModuleState.root, scaleModuleState.scaleId, "low")}
        </article>
        <article class="chord-card">
          <h4>Mid Zone</h4>
          ${renderScaleDiagram(scaleModuleState.root, scaleModuleState.scaleId, "mid")}
        </article>
      </div>
    </section>

    <section class="lesson-block">
      <h3>Apply To Step 2 Progressions</h3>
      <label>
        Progression
        <select id="scaleApplyProgressionSelect" class="tempo-input">
          ${PROGRESSION_MODULES.map(
            (module) => `<option value="${module.id}" ${module.id === scaleModuleState.applyModuleId ? "selected" : ""}>${module.title}</option>`
          ).join("")}
        </select>
      </label>
      <p class="tutorial-card-copy">Bars highlighted in gold match your currently selected scale.</p>
      <div class="bar-grid">${applyMarkup}</div>
      <div class="diagram-grid tutorial-grid apply-scale-grid">${applyScaleDiagrams}</div>
    </section>
  `;
}

function wireScaleModule() {
  lessonContent.querySelectorAll("[data-scale-root-option]").forEach((button) => {
    button.addEventListener("click", () => {
      scaleModuleState.root = button.dataset.scaleRootOption || "C";
      renderLesson();
    });
  });

  lessonContent.querySelectorAll("[data-scale-option]").forEach((button) => {
    button.addEventListener("click", () => {
      scaleModuleState.scaleId = button.dataset.scaleOption || "ionian";
      renderLesson();
    });
  });

  const applySelect = document.getElementById("scaleApplyProgressionSelect");
  if (applySelect) {
    applySelect.addEventListener("change", () => {
      scaleModuleState.applyModuleId = applySelect.value;
      renderLesson();
    });
  }

  const playLowBtn = document.getElementById("playScaleLowBtn");
  const playMidBtn = document.getElementById("playScaleMidBtn");
  const playOverBtn = document.getElementById("playScaleOverChordBtn");

  if (playLowBtn) {
    playLowBtn.addEventListener("click", async () => {
      await playScalePreview(scaleModuleState.root, scaleModuleState.scaleId, "low");
    });
  }
  if (playMidBtn) {
    playMidBtn.addEventListener("click", async () => {
      await playScalePreview(scaleModuleState.root, scaleModuleState.scaleId, "mid");
    });
  }
  if (playOverBtn) {
    playOverBtn.addEventListener("click", async () => {
      await playScaleOverChordPreview(scaleModuleState.root, scaleModuleState.scaleId);
    });
  }
}

function renderPlayAlongModule() {
  const module = PROGRESSION_MODULES.find((item) => item.id === playAlongState.progressionId) || PROGRESSION_MODULES[0];
  const data = PROGRESSION_DATA[module.id];
  const bars = transposeBarsFromTonic(data.bars, data.tonic || "C", playAlongState.key);
  const barsMarkup = bars
    .map((chord, idx) => `<div class="bar-item" data-bar-index="${idx}">Bar ${idx + 1}: <strong>${chord}</strong></div>`)
    .join("");

  return `
    <section class="lesson-block">
      <h3>Step 4: Play-Along Loop</h3>
      <p>Simple drum + bass groove so you can comp or solo over real harmonic motion.</p>
      <div class="practice-player">
        <label>
          Progression
          <select id="playAlongProgressionSelect" class="tempo-input">
            ${PROGRESSION_MODULES.map(
              (item) => `<option value="${item.id}" ${item.id === module.id ? "selected" : ""}>${item.title}</option>`
            ).join("")}
          </select>
        </label>
        <div class="transpose-chip-wrap">
          <span>Key</span>
          <div class="transpose-chip-group" role="radiogroup" aria-label="Play-along key">
            ${ROOT_NOTE_OPTIONS.map(
              (note) =>
                `<button type="button" class="transpose-choice ${playAlongState.key === note ? "active" : ""}" data-playalong-key-option="${note}" aria-pressed="${playAlongState.key === note ? "true" : "false"}">${note}</button>`
            ).join("")}
          </div>
        </div>
        <label>
          Tempo (BPM)
          <input id="playAlongTempoInput" class="tempo-input" type="number" min="50" max="220" value="${playAlongState.tempo}" />
        </label>
        <div class="player-controls">
          <button id="startPlayAlongBtn" class="start-track-btn" type="button">Start Play-Along Loop</button>
          <button id="stopPlayAlongBtn" class="stop-track-btn" type="button" disabled>Stop</button>
        </div>
        <p id="playAlongStatus" class="track-status">Stopped</p>
      </div>
      <div class="bar-grid">${barsMarkup}</div>
    </section>
  `;
}

function wirePlayAlongModule() {
  const progressionSelect = document.getElementById("playAlongProgressionSelect");
  const tempoInput = document.getElementById("playAlongTempoInput");
  const startBtn = document.getElementById("startPlayAlongBtn");
  const stopBtn = document.getElementById("stopPlayAlongBtn");
  const statusEl = document.getElementById("playAlongStatus");
  const barEls = Array.from(lessonContent.querySelectorAll(".bar-item"));
  const keyButtons = lessonContent.querySelectorAll("[data-playalong-key-option]");

  if (!progressionSelect || !tempoInput || !startBtn || !stopBtn || !statusEl) return;

  progressionSelect.addEventListener("change", () => {
    playAlongState.progressionId = progressionSelect.value;
    stopBackingTrack();
    renderLesson();
  });

  keyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      playAlongState.key = button.dataset.playalongKeyOption || "C";
      stopBackingTrack();
      renderLesson();
    });
  });

  startBtn.addEventListener("click", async () => {
    try {
      const tempo = clampTempo(Number(tempoInput.value));
      playAlongState.tempo = tempo;
      tempoInput.value = String(tempo);
      const module = PROGRESSION_MODULES.find((item) => item.id === playAlongState.progressionId) || PROGRESSION_MODULES[0];
      const data = PROGRESSION_DATA[module.id];
      const bars = transposeBarsFromTonic(data.bars, data.tonic || "C", playAlongState.key);
      await startBackingTrack("play_along_loop", bars, tempo, statusEl, startBtn, stopBtn, barEls, { mode: "playalong" });
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
    playAlongState.tempo = tempo;
    tempoInput.value = String(tempo);
    if (backingTrackState.isPlaying && backingTrackState.moduleId === "play_along_loop") {
      backingTrackState.tempo = tempo;
      statusEl.textContent = `Tempo changed to ${tempo} BPM`;
    }
  });
}

function renderProgressionModule(module) {
  const data = PROGRESSION_DATA[module.id];
  const transposeKey = transposeSelectionByModule[module.id] || data.tonic || "C";
  const bars = getTransposedBarsForModule(module.id, data);
  const uniqueChords = uniqueChordsInOrder(bars);
  const tempoDefault = 80;
  const selectedZone = moduleZone(module.id);

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
      <p><strong>Key/Context:</strong> ${data.keyLabel} <span class="chip">Transpose key: ${transposeKey}</span></p>
      <div class="practice-player">
        <div class="transpose-chip-wrap">
          <span>Transpose</span>
          <div class="transpose-chip-group" role="radiogroup" aria-label="Transpose key">
            ${ROOT_NOTE_OPTIONS.map(
              (note) =>
                `<button type="button" class="transpose-choice ${transposeKey === note ? "active" : ""}" data-transpose-option="${note}" aria-pressed="${transposeKey === note ? "true" : "false"}">${note}</button>`
            ).join("")}
          </div>
        </div>
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
function wireChordPreviewButtons() {
  lessonContent.querySelectorAll(".play-chord-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      await playChordPreview(button.dataset.chord || "", button.dataset.module || activeModuleId);
    });
  });
}

function wirePracticePlayer(module, data) {
  const transposeButtons = lessonContent.querySelectorAll("[data-transpose-option]");
  const tempoInput = document.getElementById(`tempoInput-${module.id}`);
  const startBtn = document.getElementById(`startTrackBtn-${module.id}`);
  const stopBtn = document.getElementById(`stopTrackBtn-${module.id}`);
  const statusEl = document.getElementById(`trackStatus-${module.id}`);
  const barEls = Array.from(lessonContent.querySelectorAll(".bar-item"));

  if (!tempoInput || !startBtn || !stopBtn || !statusEl) return;

  transposeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      transposeSelectionByModule[module.id] = button.dataset.transposeOption || data.tonic || "C";
      stopBackingTrack();
      renderLesson();
    });
  });

  startBtn.addEventListener("click", async () => {
    try {
      const tempo = clampTempo(Number(tempoInput.value));
      tempoInput.value = String(tempo);
      const transposedBars = getTransposedBarsForModule(module.id, data);
      await startBackingTrack(module.id, transposedBars, tempo, statusEl, startBtn, stopBtn, barEls);
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

  if (module.kind === "scales") {
    lessonContent.innerHTML = renderScaleModule();
    wireScaleModule();
    return;
  }

  if (module.kind === "playalong") {
    lessonContent.innerHTML = renderPlayAlongModule();
    wirePlayAlongModule();
    return;
  }

  lessonContent.innerHTML = renderProgressionModule(module);
  wireChordPreviewButtons();
  wirePracticePlayer(module, PROGRESSION_DATA[module.id]);
}

function renderModuleNav() {
  const step1Module = MODULES.find((module) => module.kind === "tutorial");
  const step2Modules = PROGRESSION_MODULES;
  const step3Module = MODULES.find((module) => module.kind === "scales");
  const step4Module = MODULES.find((module) => module.kind === "playalong");

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
    <li class="nav-section">Step 3: Scales</li>
    <li>
      <button type="button" data-module-id="${step3Module.id}">
        <strong>${step3Module.title}</strong>
        <small>${step3Module.blurb}</small>
      </button>
    </li>
    <li class="nav-section">Step 4: Play-Along</li>
    <li>
      <button type="button" data-module-id="${step4Module.id}">
        <strong>${step4Module.title}</strong>
        <small>${step4Module.blurb}</small>
      </button>
    </li>
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
    stageModuleLabel.textContent = "Step 1 of 4";
    stageTitle.textContent = module.title;
  } else if (module.kind === "progression") {
    const progressionIndex = PROGRESSION_MODULES.findIndex((item) => item.id === module.id) + 1;
    stageModuleLabel.textContent = `Step 2 of 4 - Progression ${progressionIndex}/${PROGRESSION_MODULES.length}`;
    stageTitle.textContent = module.title;
  } else if (module.kind === "scales") {
    stageModuleLabel.textContent = "Step 3 of 4 - Scales";
    stageTitle.textContent = module.title;
  } else {
    stageModuleLabel.textContent = "Step 4 of 4 - Play-Along";
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
