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
    title: "Chord Construction",
    blurb: "Step 1: Learn 6th-string and 5th-string chord construction.",
  },
  {
    id: "shell_chords_substep",
    kind: "tutorial",
    title: "Shell Chords",
    blurb: "Step 1 sub-step: Keep 3rd/7th on D and G strings.",
  },
  {
    id: "shell_diatonic_7ths",
    kind: "tutorial",
    title: "Shell Diatonic 7th Chords",
    blurb: "Step 1 sub-step: Diatonic shell movement in one key.",
  },
  {
    id: "secondary_dominant",
    kind: "tutorial",
    title: "Secondary Dominant",
    blurb: "Step 1 sub-step: Build the most common ii-V to a target chord.",
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
    title: "Jazz Scales",
    blurb: "Map scales directly to chord qualities in real progressions.",
  },
  {
    id: "major_scale_harmony",
    kind: "major_scales",
    title: "Major Scales",
    blurb: "Step 4: Build diatonic 7th chords with Roman numerals.",
  },
];

const ROOT_NOTE_OPTIONS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const tutorialBuilderState = {
  root: "C",
  includeFifth: true,
  extension: "none",
};

const shellBuilderState = {
  root: "C",
};

const shellDiatonicState = {
  key: "C",
  mode: "major",
};

const secondaryDominantState = {
  targetRoot: "C",
  targetQuality: "maj7",
};

const scaleModuleState = {
  root: "C",
  scaleId: "ionian",
  applyModuleId: "major_iivi",
  applyKey: "C",
  chordTonesOnly: true,
};

const majorScaleStepState = {
  key: "C",
  zone: "low",
  includeFifth: true,
};

const playAlongState = {
  progressionId: "major_iivi",
  key: "C",
  tempo: 90,
  includeDrums: true,
  includeMetronome: false,
  includeWalkingBass: true,
  swing: 60,
  drumStyle: "sticks",
  rideVariation: "classic",
};

const earTrainingState = {
  mode: "quality",
  score: 0,
  attempts: 0,
  currentChord: null,
  correctAnswer: null,
  feedback: "Press New Question to begin.",
};

const progressionUiState = {};

const uiState = {
  showNoteNames: false,
};

const PROGRESSION_MODULES = MODULES.filter((module) => module.kind === "progression");
const TUTORIAL_MODULES = MODULES.filter((module) => module.kind === "tutorial");

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

const MAJOR_SCALE_ROMANS = ["I", "ii", "iii", "IV", "V", "vi", "vii&deg;"];
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const MAJOR_SCALE_QUALITIES = ["maj7", "m7", "m7", "maj7", "dom7", "m7", "m7b5"];
const NATURAL_MINOR_ROMANS = ["i", "ii&oslash;", "III", "iv", "v", "VI", "VII"];
const NATURAL_MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10];
const NATURAL_MINOR_QUALITIES = ["m7", "m7b5", "maj7", "m7", "m7", "maj7", "dom7"];

function scaleChordsForKey(key, mode = "major") {
  const tonicIndex = noteToIndex(key);
  if (tonicIndex < 0) return [];
  const preferFlats = key.includes("b");
  const isMinor = mode === "minor";
  const intervals = isMinor ? NATURAL_MINOR_INTERVALS : MAJOR_SCALE_INTERVALS;
  const qualities = isMinor ? NATURAL_MINOR_QUALITIES : MAJOR_SCALE_QUALITIES;
  const romans = isMinor ? NATURAL_MINOR_ROMANS : MAJOR_SCALE_ROMANS;

  return intervals.map((interval, idx) => {
    const root = noteFromIndex(tonicIndex + interval, preferFlats);
    const quality = qualities[idx];
    return {
      roman: romans[idx],
      chord: chordSymbolFromRootQuality(root, quality),
      quality,
    };
  });
}

function majorScaleChordsForKey(key) {
  return scaleChordsForKey(key, "major");
}

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

const JAZZ_QUALITY_NOTATION = {
  maj7: { symbol: "△7", name: "Major 7" },
  m7: { symbol: "m7", name: "Minor 7" },
  dom7: { symbol: "7", name: "Dominant 7" },
  m7b5: { symbol: "ø7", name: "Half-diminished 7" },
  dim7: { symbol: "°7", name: "Diminished 7" },
};

const INTERVAL_LABELS = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "#5", "6", "b7", "7"];

function intervalDegreeLabel(interval, quality = null) {
  if (quality === "dim7" && interval === 9) return "bb7";
  return INTERVAL_LABELS[interval] || "";
}

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
    { name: "Root-5 m7b5", rootString: 5, intervals: [null, 0, 6, 10, 3, null] },
  ],
  dim7: [
    { name: "Root-6 dim7", rootString: 6, intervals: [0, null, 9, 3, 6, null] },
    { name: "Root-5 dim7", rootString: 5, intervals: [null, 0, 6, 9, 3, null] },
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
const showNoteNamesToggle = document.getElementById("showNoteNamesToggle");
const lessonContent = document.getElementById("lessonContent");
const easterEggGuitarBtn = document.getElementById("easterEggGuitarBtn");
const tunerToggleBtn = document.getElementById("tunerToggleBtn");
const miniTunerPanel = document.getElementById("miniTunerPanel");
const tunerCloseBtn = document.getElementById("tunerCloseBtn");
const tunerStatus = document.getElementById("tunerStatus");
const tunerPitchReadout = document.getElementById("tunerPitchReadout");
const tunerNeedle = document.getElementById("tunerNeedle");
const tunerMeterTrack = document.querySelector(".mini-tuner-meter-track");
const tunerMicStartBtn = document.getElementById("tunerMicStartBtn");
const tunerMicStopBtn = document.getElementById("tunerMicStopBtn");
const tunerStringButtons = Array.from(document.querySelectorAll("[data-tuner-frequency]"));

const tunerState = {
  micStream: null,
  micSource: null,
  analyser: null,
  rafId: null,
};

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

const includeFifthSelectionByModule = {};
Object.keys(PROGRESSION_DATA).forEach((moduleId) => {
  includeFifthSelectionByModule[moduleId] = false;
});

const backingTrackState = {
  audioCtx: null,
  noiseBuffer: null,
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

function moduleIncludeFifth(moduleId) {
  return includeFifthSelectionByModule[moduleId] === true;
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

function scalePointsForZone(root, scaleId, zone, fretRange = null) {
  const rootIndex = noteToIndex(root);
  const scale = SCALE_LIBRARY[scaleId] || SCALE_LIBRARY.ionian;
  const [zoneMinFret, zoneMaxFret] = ZONES[zone];
  const minFret =
    Array.isArray(fretRange) && Number.isInteger(fretRange[0]) ? fretRange[0] : zoneMinFret;
  const maxFret =
    Array.isArray(fretRange) && Number.isInteger(fretRange[1]) ? fretRange[1] : zoneMaxFret;
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
        noteName: noteFromIndex(noteIndex, root.includes("b")),
        isRoot: interval === 0,
      });
    }
  }
  return points;
}

function chordToneDegreesForQuality(quality) {
  const info = CHORD_QUALITIES[quality];
  return info && Array.isArray(info.formula) ? info.formula : ["1", "3", "5", "7"];
}

function getTemplateForRootString(quality, rootString) {
  const templates = VOICING_TEMPLATES[quality] || [];
  return templates.find((template) => template.rootString === rootString) || null;
}

function buildVoicingWithTemplate(chordSymbol, zone, template, options = {}) {
  const parsed = parseChordSymbol(chordSymbol);
  if (!parsed || !template) return null;
  const rootIndex = noteToIndex(parsed.root);
  if (rootIndex < 0) return null;
  const placement = rootPlacement(parsed.root, template.rootString, zone);
  const anchorFret = placement.fret;
  const window = fourFretWindow(anchorFret);

  const fretsBase = template.intervals.map((interval, idx) => {
    if (interval === null) return "x";
    const stringNumber = 6 - idx;
    const targetNoteIndex = (rootIndex + interval + 12) % 12;
    const candidates = candidateFretsForStringNote(targetNoteIndex, stringNumber);
    const fret = chooseClosestFret(candidates, anchorFret, window);
    if (fret === null || fret < 0 || fret > 16) return "x";
    return fret;
  });

  const withBuilderOptions = applyBuilderOptionsToFrets(
    fretsBase,
    template,
    rootIndex,
    anchorFret,
    { ...options, quality: parsed.quality }
  );
  const frets = applySlashBassIfNeeded(parsed, withBuilderOptions, anchorFret);
  const resolvedFingers = resolveFingerings(frets);

  const tones = frets.map((fret, idx) => {
    if (!Number.isInteger(fret)) return null;
    const stringNumber = 6 - idx;
    const noteIndex = (openNoteByString[stringNumber] + fret) % 12;
    const interval = (noteIndex - rootIndex + 12) % 12;
    return {
      degree: intervalDegreeLabel(interval, parsed.quality),
      noteName: noteFromIndex(noteIndex, parsed.root.includes("b")),
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

function movementCost(prevVoicing, nextVoicing) {
  if (!prevVoicing || !nextVoicing) return Number.POSITIVE_INFINITY;
  let cost = 0;
  for (let i = 0; i < 6; i += 1) {
    const prevFret = prevVoicing.frets[i];
    const nextFret = nextVoicing.frets[i];
    if (!Number.isInteger(prevFret) || !Number.isInteger(nextFret)) continue;
    cost += Math.abs(nextFret - prevFret);
  }
  return cost;
}

function buildSmoothVoicingSequence(bars, zone) {
  const sequence = [];
  bars.forEach((chord, idx) => {
    const parsed = parseChordSymbol(chord);
    if (!parsed) return;
    const options = [];
    [6, 5].forEach((rootString) => {
      const template = getTemplateForRootString(parsed.quality, rootString);
      if (!template) return;
      const candidate = buildVoicingWithTemplate(chord, zone, template);
      if (candidate) options.push(candidate);
    });
    const fallback = buildVoicing(chord, zone);
    if (fallback) options.push(fallback);
    if (!options.length) return;

    if (idx === 0 || !sequence.length) {
      sequence.push(options[0]);
      return;
    }

    const prev = sequence[sequence.length - 1];
    options.sort((a, b) => movementCost(prev, a) - movementCost(prev, b));
    sequence.push(options[0]);
  });
  return sequence;
}

function movedToneMask(prevVoicing, nextVoicing) {
  if (!prevVoicing || !nextVoicing) return [true, true, true, true, true, true];
  return nextVoicing.frets.map((fret, idx) => {
    if (!Number.isInteger(fret)) return false;
    return prevVoicing.frets[idx] !== fret;
  });
}

function nextToneOptions(mode, chord) {
  if (mode === "guide") {
    return ["3 + 7", "b3 + b7", "3 + b7"];
  }
  const parsed = parseChordSymbol(chord);
  const quality = parsed ? parsed.quality : "maj7";
  const labels = {
    maj7: "Major 7",
    m7: "Minor 7",
    dom7: "Dominant 7",
    m7b5: "Minor 7b5",
  };
  return ["Major 7", "Minor 7", "Dominant 7", "Minor 7b5"].filter((item) => item !== labels[quality]).slice(0, 3).concat(labels[quality]);
}

function generateEarQuestion(mode) {
  const roots = ROOT_NOTE_OPTIONS;
  const qualityPool = mode === "guide" ? ["maj7", "m7", "dom7"] : ["maj7", "m7", "dom7", "m7b5"];
  const quality = qualityPool[Math.floor(Math.random() * qualityPool.length)];
  const root = roots[Math.floor(Math.random() * roots.length)];
  const chord = chordSymbolFromRootQuality(root, quality);
  const correctAnswer =
    mode === "guide"
      ? quality === "maj7"
        ? "3 + 7"
        : quality === "m7"
          ? "b3 + b7"
          : "3 + b7"
      : quality === "maj7"
        ? "Major 7"
        : quality === "m7"
          ? "Minor 7"
          : quality === "dom7"
            ? "Dominant 7"
            : "Minor 7b5";

  const options = [...new Set(nextToneOptions(mode, chord))].slice(0, 4);
  if (!options.includes(correctAnswer)) {
    options[options.length - 1] = correctAnswer;
  }

  return { chord, correctAnswer, options: options.sort(() => Math.random() - 0.5) };
}

function scaleRunFrequencies(root, scaleId, zone) {
  const rootIndex = noteToIndex(root);
  if (rootIndex < 0) return [];
  const scale = SCALE_LIBRARY[scaleId] || SCALE_LIBRARY.ionian;
  const rootPoints = scalePointsForZone(root, scaleId, zone).filter((point) => point.isRoot);

  const targetMidi = zone === "mid" ? 60 : 48;
  let rootMidi = targetMidi;
  if (rootPoints.length) {
    rootMidi = rootPoints
      .slice()
      .sort((a, b) => Math.abs(a.midi - targetMidi) - Math.abs(b.midi - targetMidi))[0].midi;
  } else {
    for (let midi = zone === "mid" ? 52 : 40; midi <= 72; midi += 1) {
      if (((midi % 12) + 12) % 12 === rootIndex) {
        rootMidi = midi;
        break;
      }
    }
  }

  const ascendingMidi = [...scale.intervals, 12].map((interval) => rootMidi + interval);
  const descendingMidi = ascendingMidi.slice(0, ascendingMidi.length - 1).reverse();
  return [...ascendingMidi, ...descendingMidi].map((midi) => 440 * Math.pow(2, (midi - 69) / 12));
}

function scaleChordToneFrequencies(root, scaleId, zone) {
  const rootIndex = noteToIndex(root);
  if (rootIndex < 0) return [];
  const scale = SCALE_LIBRARY[scaleId] || SCALE_LIBRARY.ionian;
  const rootPoints = scalePointsForZone(root, scaleId, zone).filter((point) => point.isRoot);
  const targetMidi = zone === "mid" ? 60 : 48;
  const rootMidi = rootPoints.length
    ? rootPoints.slice().sort((a, b) => Math.abs(a.midi - targetMidi) - Math.abs(b.midi - targetMidi))[0].midi
    : targetMidi;
  const chordToneIntervals = [scale.intervals[0], scale.intervals[2], scale.intervals[4], scale.intervals[6]];
  return chordToneIntervals.map((interval) => 440 * Math.pow(2, (rootMidi + interval - 69) / 12));
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

function fourFretWindow(anchorFret) {
  let min = Math.max(0, anchorFret - 1);
  let max = min + 3;
  if (max > 16) {
    max = 16;
    min = 13;
  }
  return { min, max };
}

function chooseClosestFret(candidates, anchorFret, window = null) {
  if (!candidates.length) return null;

  if (window && Number.isInteger(window.min) && Number.isInteger(window.max)) {
    const inWindow = candidates.filter((fret) => fret >= window.min && fret <= window.max);
    if (!inWindow.length) return null;
    return inWindow.sort((a, b) => Math.abs(a - anchorFret) - Math.abs(b - anchorFret) || a - b)[0];
  }

  const closePool = candidates.filter((fret) => Math.abs(fret - anchorFret) <= 4);
  const pool = closePool.length ? closePool : candidates;
  return pool.sort((a, b) => Math.abs(a - anchorFret) - Math.abs(b - anchorFret) || a - b)[0];
}

function placeIntervalOnBestString(frets, preferredStrings, interval, rootIndex, anchorFret) {
  const window = fourFretWindow(anchorFret);
  const windowMin = window.min;
  const windowMax = window.max;
  const ranked = [];

  preferredStrings.forEach((stringNumber, rank) => {
    const arrayIdx = 6 - stringNumber;
    if (frets[arrayIdx] !== "x") return;

    const targetNoteIndex = (rootIndex + interval + 12) % 12;
    const candidates = candidateFretsForStringNote(targetNoteIndex, stringNumber);
    candidates.forEach((fret) => {
      const inWindow = fret >= windowMin && fret <= windowMax;
      if (!inWindow) return;
      const distance = Math.abs(fret - anchorFret);
      ranked.push({
        stringNumber,
        fret,
        score: distance + rank * 0.2,
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
  const quality = options.quality || null;
  const includeNaturalFifth = includeFifth && quality !== "m7b5" && quality !== "dim7";
  const extensionInterval = EXTENSION_INTERVALS[options.extension] ?? null;

  let next = [...frets];
  if (template.rootString === 6) {
    if (includeNaturalFifth) {
      next = placeIntervalOnBestString(next, [2, 4, 1], 7, rootIndex, anchorFret);
    }
    if (extensionInterval !== null) {
      next = placeIntervalOnBestString(next, [2, 4, 1], extensionInterval, rootIndex, anchorFret);
    }
    return next;
  }

  if (template.rootString === 5) {
    if (includeNaturalFifth) {
      next = placeIntervalOnBestString(next, [4, 2, 3], 7, rootIndex, anchorFret);
    }
    if (extensionInterval !== null) {
      next = placeIntervalOnBestString(next, [4, 2, 3], extensionInterval, rootIndex, anchorFret);
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

  const window = fourFretWindow(anchorFret);
  const candidates6 = candidateFretsForStringNote(bassIdx, 6);
  const candidates5 = candidateFretsForStringNote(bassIdx, 5);
  const fret6 = chooseClosestFret(candidates6, anchorFret, window);
  const fret5 = chooseClosestFret(candidates5, anchorFret, window);

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
  const window = fourFretWindow(anchorFret);

  const fretsBase = template.intervals.map((interval, idx) => {
    if (interval === null) return "x";
    const stringNumber = 6 - idx;
    const targetNoteIndex = (rootIndex + interval + 12) % 12;
    const candidates = candidateFretsForStringNote(targetNoteIndex, stringNumber);
    const fret = chooseClosestFret(candidates, anchorFret, window);
    if (fret === null || fret < 0 || fret > 16) return "x";
    return fret;
  });

  const withBuilderOptions = applyBuilderOptionsToFrets(
    fretsBase,
    template,
    rootIndex,
    anchorFret,
    { ...options, quality: parsed.quality }
  );
  const frets = applySlashBassIfNeeded(parsed, withBuilderOptions, anchorFret);
  const resolvedFingers = resolveFingerings(frets);

  const tones = frets.map((fret, idx) => {
    if (!Number.isInteger(fret)) return null;
    const stringNumber = 6 - idx;
    const noteIndex = (openNoteByString[stringNumber] + fret) % 12;
    const interval = (noteIndex - rootIndex + 12) % 12;
    return {
      degree: intervalDegreeLabel(interval, quality),
      noteName: noteFromIndex(noteIndex, root.includes("b")),
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

function jazzChordSymbolFromRootQuality(root, quality) {
  const normalizedRoot = normalizeNoteName(root);
  const info = JAZZ_QUALITY_NOTATION[quality] || JAZZ_QUALITY_NOTATION.maj7;
  return `${normalizedRoot}${info.symbol}`;
}

function chordQualityName(quality) {
  return (JAZZ_QUALITY_NOTATION[quality] || JAZZ_QUALITY_NOTATION.maj7).name;
}

function formatChordSymbolForDisplay(chordSymbol, options = {}) {
  const parsed = parseChordSymbol(chordSymbol);
  if (!parsed) return chordSymbol;
  const base = jazzChordSymbolFromRootQuality(parsed.root, parsed.quality);
  const withBass = parsed.bass ? `${base}/${parsed.bass}` : base;
  if (options.includeName !== true) return withBass;
  return `${withBass} (${chordQualityName(parsed.quality)})`;
}

function renderJazzNotationAid() {
  return '<p class="tutorial-card-copy"><strong>Jazz notation aid:</strong> △7 = major 7, m7 = minor 7, 7 = dominant 7, ø7 = half-diminished, °7 = diminished.</p>';
}

function renderDiagram(voicing, options = {}) {
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

  const markerFill = (degree, isRoot) => {
    if (isRoot) return "#d62828";
    if (degree === "b3" || degree === "b7") return "#f77f00";
    return "#111111";
  };

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
      const mask = Array.isArray(options.movedMask) ? options.movedMask : null;
      if (options.onlyMoved && mask && !mask[arrayIdx]) {
        continue;
      }
      const x = left + (fret - baseFret + 0.5) * fretGap;
      const fill = markerFill(tone ? tone.degree : "", tone && tone.isRoot);
      const degree = tone ? tone.degree : "1";
      const degreeFont = degree.length > 2 ? 6 : degree.length > 1 ? 7 : 9;
      layers += `<circle cx="${x}" cy="${y}" r="9.5" fill="${fill}" stroke="white" stroke-width="1.4"/>`;
      layers += `<text x="${x}" y="${y + 3}" text-anchor="middle" fill="white" font-family="IBM Plex Mono" font-size="${degreeFont}">${degree}</text>`;
      if (options.showNoteNames && tone && tone.noteName) {
        layers += `<text x="${x}" y="${y + 17}" text-anchor="middle" fill="#152534" font-family="IBM Plex Mono" font-size="8">${tone.noteName}</text>`;
      }
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

function renderScaleDiagram(root, scaleId, zone, options = {}) {
  const [zoneBaseFret] = ZONES[zone];
  const fretSpan = Number.isInteger(options.fretSpan) && options.fretSpan > 0 ? options.fretSpan : null;
  const baseFret = Number.isInteger(options.baseFret) ? options.baseFret : zoneBaseFret;
  const maxFret = fretSpan ? Math.min(16, baseFret + fretSpan - 1) : ZONES[zone][1];
  const points = scalePointsForZone(root, scaleId, zone, [baseFret, maxFret]);
  const onlyDegrees = Array.isArray(options.onlyDegrees) ? new Set(options.onlyDegrees) : null;
  const visiblePoints = onlyDegrees ? points.filter((point) => onlyDegrees.has(point.degree)) : points;
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

  const markerFill = (degree, isRoot) => {
    if (isRoot) return "#d62828";
    if (degree === "b3" || degree === "b7") return "#f77f00";
    return "#111111";
  };

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

  visiblePoints.forEach((point) => {
    // Match chord diagrams: high E on top, low E on bottom.
    const row = point.stringNumber - 1;
    const x = left + (point.fret - baseFret + 0.5) * fretGap;
    const y = top + row * stringGap;
    const fill = markerFill(point.degree, point.isRoot);
    const font = point.degree.length > 1 ? 7 : 9;
    layers += `<circle cx="${x}" cy="${y}" r="9.3" fill="${fill}" stroke="white" stroke-width="1.2"/>`;
    layers += `<text x="${x}" y="${y + 3}" text-anchor="middle" fill="white" font-family="IBM Plex Mono" font-size="${font}">${point.degree}</text>`;
    if (options.showNoteNames && point.noteName) {
      layers += `<text x="${x}" y="${y + 16}" text-anchor="middle" fill="#152534" font-family="IBM Plex Mono" font-size="8">${point.noteName}</text>`;
    }
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

function setMiniTunerOpen(isOpen) {
  if (!miniTunerPanel || !tunerToggleBtn) return;
  miniTunerPanel.hidden = !isOpen;
  tunerToggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  if (!isOpen) {
    stopMiniTunerMic();
  } else {
    updateMiniTunerDial(null);
  }
}

function updateMiniTunerDial(cents) {
  if (!tunerNeedle) return;
  if (!Number.isFinite(cents)) {
    tunerNeedle.style.setProperty("--needle-offset", "0px");
    return;
  }
  const safeCents = Math.max(-50, Math.min(50, cents));
  const trackWidth = tunerMeterTrack ? tunerMeterTrack.getBoundingClientRect().width : 220;
  const halfTravel = Math.max(30, trackWidth / 2 - 10);
  const offsetPx = (safeCents / 50) * halfTravel;
  tunerNeedle.style.setProperty("--needle-offset", `${offsetPx.toFixed(1)}px`);
}

async function playTunerReferenceTone(frequency, label) {
  try {
    const ctx = await getAudioContext();
    const noteStack = [
      { frequency: frequency, stringNumber: 6 },
      { frequency: frequency * 1.5, stringNumber: 4 },
      { frequency: frequency * 2, stringNumber: 2 },
    ];
    playGuitarStrum(ctx, noteStack, ctx.currentTime, {
      strumGap: 0.02,
      peakGain: 0.085,
      releaseSeconds: 2.4,
    });
    if (tunerStatus) {
      tunerStatus.textContent = `Playing ${label} (${frequency.toFixed(2)} Hz)`;
    }
  } catch (error) {
    console.error(error);
    if (tunerStatus) {
      tunerStatus.textContent = "Unable to play reference tone.";
    }
  }
}

function detectPitchAutoCorrelate(buffer, sampleRate) {
  const size = buffer.length;
  let rms = 0;
  for (let i = 0; i < size; i += 1) {
    const value = buffer[i];
    rms += value * value;
  }
  rms = Math.sqrt(rms / size);
  if (rms < 0.01) return -1;

  let bestOffset = -1;
  let bestCorrelation = 0;
  const minOffset = Math.floor(sampleRate / 500);
  const maxOffset = Math.floor(sampleRate / 70);

  for (let offset = minOffset; offset <= maxOffset; offset += 1) {
    let correlation = 0;
    const maxSamples = size - offset;
    for (let i = 0; i < maxSamples; i += 1) {
      correlation += Math.abs(buffer[i] - buffer[i + offset]);
    }
    correlation = 1 - correlation / maxSamples;

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }

  if (bestCorrelation < 0.85 || bestOffset === -1) return -1;
  return sampleRate / bestOffset;
}

function noteNameForFrequency(frequency) {
  const midi = 69 + 12 * Math.log2(frequency / 440);
  const nearestMidi = Math.round(midi);
  const cents = Math.round((midi - nearestMidi) * 100);
  const names = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  const name = names[((nearestMidi % 12) + 12) % 12];
  const octave = Math.floor(nearestMidi / 12) - 1;
  return { name, octave, cents };
}

function updateMiniTunerPitch() {
  if (!tunerState.analyser || !tunerPitchReadout) return;
  const buffer = new Float32Array(tunerState.analyser.fftSize);
  tunerState.analyser.getFloatTimeDomainData(buffer);
  const frequency = detectPitchAutoCorrelate(buffer, tunerState.analyser.context.sampleRate);

  if (frequency > 0) {
    const note = noteNameForFrequency(frequency);
    const tuning =
      Math.abs(note.cents) <= 5 ? "in tune" : note.cents > 0 ? `${note.cents}c sharp` : `${Math.abs(note.cents)}c flat`;
    tunerPitchReadout.textContent = `Mic: ${note.name}${note.octave} ${Math.round(frequency)} Hz (${tuning})`;
    updateMiniTunerDial(note.cents);
  } else {
    tunerPitchReadout.textContent = "Mic: listening...";
    updateMiniTunerDial(null);
  }

  tunerState.rafId = requestAnimationFrame(updateMiniTunerPitch);
}

async function startMiniTunerMic() {
  if (tunerState.micStream) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (tunerStatus) {
      tunerStatus.textContent = "Microphone input is not supported in this browser.";
    }
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
    const ctx = await getAudioContext();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    tunerState.micStream = stream;
    tunerState.micSource = source;
    tunerState.analyser = analyser;

    if (tunerMicStartBtn) tunerMicStartBtn.disabled = true;
    if (tunerMicStopBtn) tunerMicStopBtn.disabled = false;
    if (tunerStatus) tunerStatus.textContent = "Mic active: play one note at a time.";

    updateMiniTunerPitch();
  } catch (error) {
    console.error(error);
    if (tunerStatus) {
      tunerStatus.textContent = "Microphone permission denied or unavailable.";
    }
  }
}

function stopMiniTunerMic() {
  if (tunerState.rafId) {
    cancelAnimationFrame(tunerState.rafId);
    tunerState.rafId = null;
  }
  if (tunerState.micSource) {
    tunerState.micSource.disconnect();
    tunerState.micSource = null;
  }
  if (tunerState.analyser) {
    tunerState.analyser.disconnect();
    tunerState.analyser = null;
  }
  if (tunerState.micStream) {
    tunerState.micStream.getTracks().forEach((track) => track.stop());
    tunerState.micStream = null;
  }

  if (tunerMicStartBtn) tunerMicStartBtn.disabled = false;
  if (tunerMicStopBtn) tunerMicStopBtn.disabled = true;
  if (tunerPitchReadout) tunerPitchReadout.textContent = "Mic: --";
  updateMiniTunerDial(null);
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

async function playChordPreview(chordSymbol, moduleId, options = {}) {
  const ctx = await getAudioContext();
  const zone = moduleZone(moduleId);
  const includeFifth = options.includeFifth === true;
  const notes = chordFrequenciesFromSymbol(chordSymbol, zone, { includeFifth });
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
  const chordTones = scaleChordToneFrequencies(root, scaleId, zone);
  const runFrequencies = scaleRunFrequencies(root, scaleId, zone);
  if (!runFrequencies.length || !chordTones.length) return;
  playScaleRun(ctx, chordTones, ctx.currentTime, {
    stepSeconds: 0.24,
    peakGain: 0.095,
    releaseSeconds: 0.22,
  });
  const offset = chordTones.length * 0.24 + 0.14;
  playScaleRun(ctx, runFrequencies, ctx.currentTime + offset, {
    stepSeconds: 0.42,
    peakGain: 0.1,
    releaseSeconds: 0.42,
  });
}

function getNoiseBuffer(ctx) {
  if (backingTrackState.noiseBuffer) return backingTrackState.noiseBuffer;
  const length = Math.max(1, Math.floor(ctx.sampleRate * 0.25));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  backingTrackState.noiseBuffer = buffer;
  return buffer;
}

function scheduleNoiseHit(time, options = {}) {
  const ctx = backingTrackState.audioCtx;
  if (!ctx) return;
  const source = ctx.createBufferSource();
  const hp = ctx.createBiquadFilter();
  const lp = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  source.buffer = getNoiseBuffer(ctx);

  hp.type = "highpass";
  hp.frequency.setValueAtTime(options.hp || 3500, time);
  hp.Q.setValueAtTime(options.hpQ || 0.7, time);

  lp.type = "lowpass";
  lp.frequency.setValueAtTime(options.lp || 12000, time);
  lp.Q.setValueAtTime(options.lpQ || 0.6, time);

  const peak = options.peakGain || 0.08;
  const attack = options.attack || 0.0015;
  const release = options.release || 0.055;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(peak, time + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + release);

  source.connect(hp);
  hp.connect(lp);
  lp.connect(gain);
  gain.connect(ctx.destination);
  source.start(time);
  source.stop(time + Math.max(0.07, release + 0.02));
}

function scheduleKick(time, beatInBar) {
  const ctx = backingTrackState.audioCtx;
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  const accent = beatInBar === 1;

  osc.type = "sine";
  osc.frequency.setValueAtTime(accent ? 95 : 82, time);
  osc.frequency.exponentialRampToValueAtTime(45, time + 0.085);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(220, time);

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(accent ? 0.25 : 0.16, time + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.19);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.21);
}

function scheduleSnare(time, accent = false) {
  scheduleNoiseHit(time, {
    hp: 1200,
    lp: 7000,
    peakGain: accent ? 0.16 : 0.12,
    release: accent ? 0.14 : 0.11,
  });

  const ctx = backingTrackState.audioCtx;
  if (!ctx) return;
  const tone = ctx.createOscillator();
  const gain = ctx.createGain();
  tone.type = "triangle";
  tone.frequency.setValueAtTime(180, time);
  tone.frequency.exponentialRampToValueAtTime(110, time + 0.09);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(accent ? 0.07 : 0.05, time + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.11);
  tone.connect(gain);
  gain.connect(ctx.destination);
  tone.start(time);
  tone.stop(time + 0.12);
}

function scheduleHiHat(time, options = {}) {
  scheduleNoiseHit(time, {
    hp: 5200,
    lp: 13500,
    peakGain: options.peakGain || 0.07,
    release: options.release || 0.05,
  });
}

function scheduleJazzDrums(time, beatInBar) {
  if (beatInBar === 1 || beatInBar === 3) {
    scheduleKick(time, beatInBar);
  }
  if (beatInBar === 2 || beatInBar === 4) {
    scheduleSnare(time, true);
  }
  const brush = playAlongState.drumStyle === "brushes";
  const rideBusy = playAlongState.rideVariation === "busy";
  const rideSkip = playAlongState.rideVariation === "skip";
  scheduleHiHat(time, {
    peakGain: brush ? 0.055 : beatInBar === 2 || beatInBar === 4 ? 0.08 : 0.065,
    release: brush ? 0.085 : 0.05,
  });

  // Swung offbeat hat/ride.
  const beatSeconds = 60 / backingTrackState.tempo;
  const swingRatio = Math.max(0.5, Math.min(0.68, playAlongState.swing / 100));
  if (!rideSkip || beatInBar === 2 || beatInBar === 4) {
    scheduleHiHat(time + beatSeconds * swingRatio, {
      peakGain: brush ? 0.04 : 0.055,
      release: brush ? 0.07 : 0.04,
    });
  }
  if (rideBusy) {
    scheduleHiHat(time + beatSeconds * 0.34, {
      peakGain: brush ? 0.032 : 0.045,
      release: brush ? 0.06 : 0.035,
    });
  }
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

function bassMidiForDegree(root, degreeOffset, octave = 2) {
  const rootIndex = noteToIndex(root);
  if (rootIndex < 0) return null;
  const noteIndex = (rootIndex + degreeOffset + 12) % 12;
  return (octave + 1) * 12 + noteIndex;
}

function scheduleWalkingBass(time, chordSymbol, beatInBar, nextChordSymbol) {
  const ctx = backingTrackState.audioCtx;
  const parsed = parseChordSymbol(chordSymbol);
  if (!ctx || !parsed) return;

  const nextRoot = parseChordRoot(nextChordSymbol || chordSymbol) || parsed.root;
  const rootMidi = bassMidiForDegree(parsed.root, 0, 2);
  const thirdOffset = parsed.quality === "m7" || parsed.quality === "m7b5" || parsed.quality === "dim7" ? 3 : 4;
  const fifthOffset = parsed.quality === "m7b5" || parsed.quality === "dim7" ? 6 : 7;
  const nextRootMidi = bassMidiForDegree(nextRoot, 0, 2);
  if (!rootMidi || !nextRootMidi) return;

  let midi = rootMidi;
  if (beatInBar === 2) midi = bassMidiForDegree(parsed.root, fifthOffset, 2) || rootMidi;
  if (beatInBar === 3) midi = bassMidiForDegree(parsed.root, thirdOffset, 2) || rootMidi;
  if (beatInBar === 4) midi = nextRootMidi - 1;

  const frequency = 440 * Math.pow(2, (midi - 69) / 12);
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(frequency, time);
  osc.detune.setValueAtTime((Math.random() - 0.5) * 5, time);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(320, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.17, time + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.3);
}

function scheduleCompingChord(time, chordSymbol, beatInBar) {
  if (beatInBar !== 1 && beatInBar !== 3) return;
  const ctx = backingTrackState.audioCtx;
  const zone = moduleZone(backingTrackState.moduleId);
  const includeFifth = moduleIncludeFifth(backingTrackState.moduleId);
  const notes = chordFrequenciesFromSymbol(chordSymbol, zone, { includeFifth });
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
  const nextChord = backingTrackState.bars[(barIndex + 1) % backingTrackState.bars.length];
  const time = backingTrackState.nextNoteTime;

  if (backingTrackState.mode === "playalong") {
    scheduleCompingChord(time, chord, beatInBar);
    if (playAlongState.includeDrums) {
      scheduleJazzDrums(time, beatInBar);
    }
    if (playAlongState.includeMetronome) {
      scheduleClick(time, beatInBar);
    }
    if (playAlongState.includeWalkingBass) {
      scheduleWalkingBass(time, chord, beatInBar, nextChord);
    }
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
  if (quality === "maj7") return { label: "Major 7 (△7)", formula: "1 3 7" };
  if (quality === "m7") return { label: "Minor 7 (m7)", formula: "1 b3 b7" };
  if (quality === "dom7") return { label: "Dominant 7 (7)", formula: "1 3 b7" };
  if (quality === "m7b5") return { label: "Half-diminished (ø7)", formula: "1 b3 b5 b7" };
  if (quality === "dim7") return { label: "Diminished 7 (°7)", formula: "1 b3 b5 bb7" };
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
  const base = jazzChordSymbolFromRootQuality(root, quality);
  const extras = [];
  const allowNaturalFifth = quality !== "m7b5" && quality !== "dim7";
  if (includeFifth && allowNaturalFifth) extras.push("5");
  if (extension && extension !== "none") extras.push(extension);
  return extras.length ? base + "(" + extras.join(",") + ")" : base;
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
      ${renderDiagram(voicing, { showNoteNames: uiState.showNoteNames })}
      <p class="tutorial-card-copy">${summary.label} | Root on string ${rootString} | Formula: ${formula}</p>
    </article>
  `;
}

function guideToneIntervalsByQuality(quality) {
  if (quality === "maj7") return { third: 4, seventh: 11 };
  if (quality === "m7") return { third: 3, seventh: 10 };
  if (quality === "dom7") return { third: 4, seventh: 10 };
  if (quality === "m7b5") return { third: 3, seventh: 10 };
  return null;
}

function buildShellGuideToneVoicing(chordSymbol, zone, rootString, options = {}) {
  const parsed = parseChordSymbol(chordSymbol);
  if (!parsed || (rootString !== 6 && rootString !== 5)) return null;
  const rootIndex = noteToIndex(parsed.root);
  if (rootIndex < 0) return null;

  const guideTones = guideToneIntervalsByQuality(parsed.quality);
  if (!guideTones) return null;

  const includeFifth = options.includeFifth === true;
  const [zoneMin, zoneMax] = ZONES[zone];
  const zoneCenter = (zoneMin + zoneMax) / 2;
  const dInterval = rootString === 6 ? guideTones.seventh : guideTones.third;
  const gInterval = rootString === 6 ? guideTones.third : guideTones.seventh;

  const pickFret = (stringNumber, interval, anchorFret) => {
    const targetNoteIndex = (rootIndex + interval + 12) % 12;
    const candidates = candidateFretsForStringNote(targetNoteIndex, stringNumber).filter((fret) => fret > 0);
    const fret = chooseClosestFret(candidates, anchorFret);
    if (!Number.isInteger(fret) || fret < 0 || fret > 16) return null;
    return fret;
  };

  const rootFretCandidates = rootCandidates(parsed.root, rootString).filter((fret) => fret > 0);
  if (!rootFretCandidates.length) return null;
  let best = null;

  rootFretCandidates.forEach((rootFret) => {
    const dFret = pickFret(4, dInterval, rootFret);
    const gFret = pickFret(3, gInterval, rootFret);
    if (!Number.isInteger(dFret) || !Number.isInteger(gFret)) return;

    const inZonePenalty = rootFret >= zoneMin && rootFret <= zoneMax ? 0 : 8;
    const spreadPenalty = Math.abs(dFret - rootFret) + Math.abs(gFret - rootFret);
    const centerPenalty = Math.abs(rootFret - zoneCenter);
    const score = inZonePenalty + spreadPenalty * 0.2 + centerPenalty;

    if (!best || score < best.score) {
      best = { score, rootFret, dFret, gFret };
    }
  });

  if (!best) return null;

  const frets = ["x", "x", "x", "x", "x", "x"];
  frets[6 - rootString] = best.rootFret;
  frets[6 - 4] = best.dFret;
  frets[6 - 3] = best.gFret;
  if (includeFifth) {
    const fifthFret = pickFret(2, 7, best.rootFret);
    if (Number.isInteger(fifthFret)) {
      frets[6 - 2] = fifthFret;
    }
  }

  const tones = frets.map((fret, idx) => {
    if (!Number.isInteger(fret)) return null;
    const stringNumber = 6 - idx;
    const noteIndex = (openNoteByString[stringNumber] + fret) % 12;
    const interval = (noteIndex - rootIndex + 12) % 12;
    return {
      degree: intervalDegreeLabel(interval, parsed.quality),
      noteName: noteFromIndex(noteIndex, parsed.root.includes("b")),
      isRoot: interval === 0,
    };
  });

  return {
    chord: chordSymbol,
    name: `Root-${rootString} shell`,
    frets,
    tones,
    resolvedFingers: resolveFingerings(frets),
  };
}

function renderTutorialShellBuilderCard(root, quality, rootString, zone, includeFifth) {
  const chordSymbol = chordSymbolFromRootQuality(root, quality);
  const voicing = buildShellGuideToneVoicing(chordSymbol, zone, rootString, { includeFifth });
  if (!voicing) return "";

  const summary = qualitySummary(quality);
  const effectiveIncludeFifth = includeFifth && voicingHasDegree(voicing, "5");
  const labelSymbol = displayChordSymbol(root, quality, effectiveIncludeFifth, "none");
  const formula = tutorialFormulaWithOptions(summary.formula, effectiveIncludeFifth, "none");

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
          aria-label="Play ${labelSymbol}"
        >🔈</button>
      </div>
      ${renderDiagram(voicing, { showNoteNames: uiState.showNoteNames })}
      <p class="tutorial-card-copy">${summary.label} | Root on string ${rootString} | Formula: ${formula}</p>
    </article>
  `;
}

function renderTutorialModule() {
  const builderTopRow = [
    { quality: "maj7", rootString: 6, zone: "low" },
    { quality: "dom7", rootString: 6, zone: "low" },
    { quality: "m7", rootString: 6, zone: "low" },
    { quality: "m7b5", rootString: 6, zone: "low" },
    { quality: "dim7", rootString: 6, zone: "low" },
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
    { quality: "dom7", rootString: 5, zone: "mid" },
    { quality: "m7", rootString: 5, zone: "mid" },
    { quality: "m7b5", rootString: 5, zone: "mid" },
    { quality: "dim7", rootString: 5, zone: "mid" },
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
  const earChoiceButtons = (earTrainingState.currentChord ? earTrainingState.currentChord.options : []).map(
    (option) =>
      `<button type="button" class="extension-choice" data-ear-choice="${option}">${option}</button>`
  );

  return `
    <section class="lesson-block">
      <h3>Step 1 Tutorial: Chord Construction</h3>
      ${renderJazzNotationAid()}
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

    <section class="lesson-block">
      <h3>Ear Training</h3>
      <div class="builder-controls">
        <div class="builder-extension-wrap">
          <span>Mode</span>
          <div class="builder-extension-group" role="radiogroup" aria-label="Ear training mode">
            <button type="button" class="extension-choice ${earTrainingState.mode === "quality" ? "active" : ""}" data-ear-mode="quality">Chord quality</button>
            <button type="button" class="extension-choice ${earTrainingState.mode === "guide" ? "active" : ""}" data-ear-mode="guide">Guide tones (3rd/7th)</button>
          </div>
        </div>
      </div>
      <div class="player-controls">
        <button type="button" class="start-track-btn" id="earNewQuestionBtn">New Question</button>
        <button type="button" id="earPlayQuestionBtn" ${earTrainingState.currentChord ? "" : "disabled"}>Play Question</button>
      </div>
      <div class="builder-extension-group" style="margin-top:0.5rem;">
        ${earChoiceButtons.join("") || "<span class='tutorial-card-copy'>No question loaded yet.</span>"}
      </div>
      <p class="tutorial-card-copy">${earTrainingState.feedback}</p>
      <p class="tutorial-card-copy">Score: ${earTrainingState.score}/${earTrainingState.attempts}</p>
    </section>

  `;
}

function renderShellChordsModule() {
  const shellTopRow = [
    { quality: "maj7", rootString: 6, zone: "low" },
    { quality: "dom7", rootString: 6, zone: "low" },
    { quality: "m7", rootString: 6, zone: "low" },
  ]
    .map(({ quality, rootString, zone }) =>
      renderTutorialShellBuilderCard(
        shellBuilderState.root,
        quality,
        rootString,
        zone,
        false
      )
    )
    .join("");
  const shellBottomRow = [
    { quality: "maj7", rootString: 5, zone: "mid" },
    { quality: "dom7", rootString: 5, zone: "mid" },
    { quality: "m7", rootString: 5, zone: "mid" },
  ]
    .map(({ quality, rootString, zone }) =>
      renderTutorialShellBuilderCard(
        shellBuilderState.root,
        quality,
        rootString,
        zone,
        false
      )
    )
    .join("");

  return `
    <section class="lesson-block">
      <h3>Sub-step: Shell Chords</h3>
      ${renderJazzNotationAid()}
      <div class="builder-controls">
        <div class="builder-root-wrap">
          <span>Root</span>
          <div class="builder-root-group" role="radiogroup" aria-label="Shell chord root note">
            ${ROOT_NOTE_OPTIONS.map(
              (note) =>
                `<button type="button" class="root-choice ${shellBuilderState.root === note ? "active" : ""}" data-shell-root-option="${note}" aria-pressed="${shellBuilderState.root === note ? "true" : "false"}">${note}</button>`
            ).join("")}
          </div>
        </div>
      </div>

      <div class="builder-output">
        <div class="builder-stack">
          <h4 class="builder-row-label">6th-string root (3rd/7th fixed on D + G strings)</h4>
          <div class="diagram-grid tutorial-grid">${shellTopRow || "<p>Unable to build top row voicings.</p>"}</div>
          <h4 class="builder-row-label">5th-string root (3rd/7th fixed on D + G strings)</h4>
          <div class="diagram-grid tutorial-grid">${shellBottomRow || "<p>Unable to build bottom row voicings.</p>"}</div>
        </div>
      </div>
    </section>
  `;
}

function renderShellDiatonicCard(item, rootString, zone, voicingOverride = null) {
  const voicing = voicingOverride || buildShellGuideToneVoicing(item.chord, zone, rootString, { includeFifth: false });
  if (!voicing) return "";

  const summary = qualitySummary(item.quality);
  const chordLabel = formatChordSymbolForDisplay(item.chord, { includeName: true });
  return `
    <article class="chord-card">
      <div class="chord-card-top">
        <h4>${item.roman} - ${chordLabel}</h4>
        <button
          type="button"
          class="play-tutorial-chord-btn"
          data-root="${parseChordRoot(item.chord) || "C"}"
          data-quality="${item.quality}"
          data-root-string="${rootString}"
          data-zone="${zone}"
          data-include-fifth="0"
          aria-label="Play ${formatChordSymbolForDisplay(item.chord)}"
        >🔈</button>
      </div>
      ${renderDiagram(voicing, { showNoteNames: uiState.showNoteNames })}
      <p class="tutorial-card-copy">${summary.label} | Root on string ${rootString} | 3/7 on D + G strings</p>
    </article>
  `;
}

function shellDiatonicCardsFromOrder(degreeChords, rootString, zone, degreeOrder) {
  return degreeOrder
    .map((degreeIndex) => {
      const item = degreeChords[degreeIndex];
      if (!item) return "";
      const voicing = buildShellGuideToneVoicing(item.chord, zone, rootString, { includeFifth: false });
      return voicing ? renderShellDiatonicCard(item, rootString, zone, voicing) : "";
    })
    .join("");
}

function renderShellDiatonicModule() {
  const key = shellDiatonicState.key;
  const mode = shellDiatonicState.mode === "minor" ? "minor" : "major";
  const degreeChords = scaleChordsForKey(key, mode);
  const romanCells = degreeChords.map((item) => "<td>" + item.roman + "</td>").join("");
  const chordCells = degreeChords
    .map((item) => "<td>" + formatChordSymbolForDisplay(item.chord) + "</td>")
    .join("");
  const modeButtons = [
    { id: "major", label: "Major" },
    { id: "minor", label: "Minor" },
  ]
    .map((item) => {
      const active = mode === item.id;
      return (
        '<button type="button" class="root-choice ' +
        (active ? "active" : "") +
        '" data-shell-diatonic-mode-option="' +
        item.id +
        '" aria-pressed="' +
        (active ? "true" : "false") +
        '">' +
        item.label +
        "</button>"
      );
    })
    .join("");
  const keyButtons = ROOT_NOTE_OPTIONS.map((note) => {
    const active = key === note;
    return (
      '<button type="button" class="root-choice ' +
      (active ? "active" : "") +
      '" data-shell-diatonic-key-option="' +
      note +
      '" aria-pressed="' +
      (active ? "true" : "false") +
      '">' +
      note +
      "</button>"
    );
  }).join("");

  // Keep both paths aligned I -> I for easier comparison.
  const root5Order = [0, 1, 2, 3, 4, 5, 6, 0];
  const root6Order = [0, 1, 2, 3, 4, 5, 6, 0];
  const root6Cards = shellDiatonicCardsFromOrder(degreeChords, 6, "low", root6Order);
  const root5Cards = shellDiatonicCardsFromOrder(degreeChords, 5, "mid", root5Order);

  return `
    <section class="lesson-block">
      <h3>Step 1.3: Shell Diatonic 7th Chords</h3>
      <div class="builder-controls">
        <div class="builder-root-wrap">
          <span>Key</span>
          <div class="builder-root-group" role="radiogroup" aria-label="Shell diatonic key">
            ${keyButtons}
          </div>
        </div>
        <div class="builder-root-wrap">
          <span>Quality</span>
          <div class="builder-root-group" role="radiogroup" aria-label="Shell diatonic quality">
            ${modeButtons}
          </div>
        </div>
      </div>
      <p class="tutorial-card-copy">Diatonic seventh chords in <span class="chip">${key} ${mode}</span>.</p>
      ${renderJazzNotationAid()}
      <div class="table-scroll-wrap">
        <table class="formula-table major-scale-table">
          <tbody>
            <tr><th>Degree</th>${romanCells}</tr>
            <tr><th>Chord</th>${chordCells}</tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="lesson-block">
      <h3>6th-String Root Diatonic Path (I -> I)</h3>
      <div class="diagram-grid tutorial-grid">${root6Cards || "<p>Unable to build 6th-string diatonic shells.</p>"}</div>
    </section>

    <section class="lesson-block">
      <h3>5th-String Root Diatonic Path (I -> I)</h3>
      <div class="diagram-grid tutorial-grid">${root5Cards || "<p>Unable to build 5th-string diatonic shells.</p>"}</div>
    </section>
  `;
}

function wireTutorialChordPlayButtons() {
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

  wireTutorialChordPlayButtons();

  lessonContent.querySelectorAll("[data-ear-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      earTrainingState.mode = button.dataset.earMode === "guide" ? "guide" : "quality";
      earTrainingState.feedback = "Mode changed. Press New Question.";
      renderLesson();
    });
  });

  const newQuestionBtn = document.getElementById("earNewQuestionBtn");
  const playQuestionBtn = document.getElementById("earPlayQuestionBtn");
  if (newQuestionBtn) {
    newQuestionBtn.addEventListener("click", () => {
      earTrainingState.currentChord = generateEarQuestion(earTrainingState.mode);
      earTrainingState.correctAnswer = earTrainingState.currentChord.correctAnswer;
      earTrainingState.feedback = "Listen, then pick the correct answer.";
      renderLesson();
    });
  }
  if (playQuestionBtn) {
    playQuestionBtn.addEventListener("click", async () => {
      if (!earTrainingState.currentChord) return;
      await playChordPreview(earTrainingState.currentChord.chord, "shell_chords_foundation");
    });
  }
  lessonContent.querySelectorAll("[data-ear-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!earTrainingState.currentChord) return;
      earTrainingState.attempts += 1;
      const choice = button.dataset.earChoice || "";
      if (choice === earTrainingState.correctAnswer) {
        earTrainingState.score += 1;
        earTrainingState.feedback = `Correct: ${earTrainingState.correctAnswer}`;
      } else {
        earTrainingState.feedback = `Not quite. Correct answer: ${earTrainingState.correctAnswer}`;
      }
      renderLesson();
    });
  });
}

function wireShellChordsModule() {
  const shellRootButtons = lessonContent.querySelectorAll("[data-shell-root-option]");

  shellRootButtons.forEach((button) => {
    button.addEventListener("click", () => {
      shellBuilderState.root = button.dataset.shellRootOption || "C";
      renderLesson();
    });
  });

  wireTutorialChordPlayButtons();
}

function wireShellDiatonicModule() {
  lessonContent.querySelectorAll("[data-shell-diatonic-key-option]").forEach((button) => {
    button.addEventListener("click", () => {
      shellDiatonicState.key = button.dataset.shellDiatonicKeyOption || "C";
      renderLesson();
    });
  });
  lessonContent.querySelectorAll("[data-shell-diatonic-mode-option]").forEach((button) => {
    button.addEventListener("click", () => {
      shellDiatonicState.mode = button.dataset.shellDiatonicModeOption === "minor" ? "minor" : "major";
      renderLesson();
    });
  });

  wireTutorialChordPlayButtons();
}

function secondaryDominantProgression(root, quality) {
  const rootIndex = noteToIndex(root);
  if (rootIndex < 0) return [];
  const preferFlats = root.includes("b");
  const isMinorTarget = quality === "m7" || quality === "m7b5" || quality === "dim7";
  const iiRoot = noteFromIndex(rootIndex + 2, preferFlats);
  const vRoot = noteFromIndex(rootIndex + 7, preferFlats);
  const iiQuality = isMinorTarget ? "m7b5" : "m7";
  const vQuality = "dom7";

  return [
    {
      role: "ii",
      root: iiRoot,
      quality: iiQuality,
      chord: chordSymbolFromRootQuality(iiRoot, iiQuality),
    },
    {
      role: "V",
      root: vRoot,
      quality: vQuality,
      chord: chordSymbolFromRootQuality(vRoot, vQuality),
    },
    {
      role: "I",
      root,
      quality,
      chord: chordSymbolFromRootQuality(root, quality),
    },
  ];
}

function renderSecondaryDominantModule() {
  const targetRoot = secondaryDominantState.targetRoot;
  const targetQuality = secondaryDominantState.targetQuality;
  const progression = secondaryDominantProgression(targetRoot, targetQuality);
  const progressionText = progression.map((item) => formatChordSymbolForDisplay(item.chord)).join(" -> ");
  const root6Cards = progression
    .map((item) => renderTutorialShellBuilderCard(item.root, item.quality, 6, "low", false))
    .join("");
  const root5Cards = progression
    .map((item) => renderTutorialShellBuilderCard(item.root, item.quality, 5, "mid", false))
    .join("");

  return `
    <section class="lesson-block">
      <h3>Step 1.4: Secondary Dominant</h3>
      <p class="tutorial-card-copy"><strong>Goal:</strong> Given a target chord, output the most common jazz <strong>ii-V</strong> that resolves to it.</p>
      ${renderJazzNotationAid()}
      <div class="builder-controls">
        <div class="builder-root-wrap">
          <span>Target root</span>
          <div class="builder-root-group" role="radiogroup" aria-label="Secondary dominant target root">
            ${ROOT_NOTE_OPTIONS.map(
              (note) =>
                `<button type="button" class="root-choice ${targetRoot === note ? "active" : ""}" data-secondary-root-option="${note}" aria-pressed="${targetRoot === note ? "true" : "false"}">${note}</button>`
            ).join("")}
          </div>
        </div>
        <div class="builder-extension-wrap">
          <span>Target quality</span>
          <div class="builder-extension-group" role="radiogroup" aria-label="Secondary dominant target quality">
            ${[
              { quality: "maj7", label: "maj7" },
              { quality: "m7", label: "m7" },
              { quality: "dom7", label: "7" },
              { quality: "m7b5", label: "m7b5" },
            ]
              .map(
                (item) =>
                  `<button type="button" class="extension-choice ${targetQuality === item.quality ? "active" : ""}" data-secondary-quality-option="${item.quality}" aria-pressed="${targetQuality === item.quality ? "true" : "false"}">${item.label}</button>`
              )
              .join("")}
          </div>
        </div>
      </div>

      <p class="tutorial-card-copy"><strong>Result:</strong> <span class="chip">${progressionText || "No valid target chord selected."}</span></p>
      <div class="table-scroll-wrap">
        <table class="formula-table major-scale-table">
          <tbody>
            <tr><th>Function</th>${progression.map((item) => `<td>${item.role}</td>`).join("")}</tr>
            <tr><th>Chord</th>${progression
              .map((item) => `<td>${formatChordSymbolForDisplay(item.chord, { includeName: true })}</td>`)
              .join("")}</tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="lesson-block">
      <h3>6th-String Shells (ii -> V -> I)</h3>
      <div class="diagram-grid tutorial-grid">${root6Cards || "<p>Unable to build 6th-string shells for this target.</p>"}</div>
    </section>

    <section class="lesson-block">
      <h3>5th-String Shells (ii -> V -> I)</h3>
      <div class="diagram-grid tutorial-grid">${root5Cards || "<p>Unable to build 5th-string shells for this target.</p>"}</div>
    </section>
  `;
}

function wireSecondaryDominantModule() {
  lessonContent.querySelectorAll("[data-secondary-root-option]").forEach((button) => {
    button.addEventListener("click", () => {
      secondaryDominantState.targetRoot = button.dataset.secondaryRootOption || "C";
      renderLesson();
    });
  });
  lessonContent.querySelectorAll("[data-secondary-quality-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const quality = button.dataset.secondaryQualityOption;
      secondaryDominantState.targetQuality = ["maj7", "m7", "dom7", "m7b5"].includes(quality)
        ? quality
        : "maj7";
      renderLesson();
    });
  });

  wireTutorialChordPlayButtons();
}

function renderScaleModule() {
  const scale = SCALE_LIBRARY[scaleModuleState.scaleId] || SCALE_LIBRARY.ionian;
  const chordTonesOnly = scaleModuleState.chordTonesOnly === true;
  const step3ScaleFretSpan = 7;
  const selectedToneDegrees = chordToneDegreesForQuality(scale.targetQuality);
  const selectedDiagramOptions = {
    showNoteNames: uiState.showNoteNames,
    onlyDegrees: chordTonesOnly ? selectedToneDegrees : null,
    fretSpan: step3ScaleFretSpan,
  };
  const applyProgression = PROGRESSION_MODULES.find((module) => module.id === scaleModuleState.applyModuleId) || PROGRESSION_MODULES[0];
  const applyData = applyProgression ? PROGRESSION_DATA[applyProgression.id] : null;
  const applyBars = applyData
    ? transposeBarsFromTonic(applyData.bars, applyData.tonic || "C", scaleModuleState.applyKey)
    : [];
  const applyMarkup = applyBars
    .map((chord, idx) => {
      const recommendedId = recommendedScaleIdForChord(chord);
      const recommended = SCALE_LIBRARY[recommendedId] || SCALE_LIBRARY.ionian;
      const active = recommendedId === scaleModuleState.scaleId ? "active-bar" : "";
      return `<div class="bar-item ${active}">Bar ${idx + 1}: <strong>${formatChordSymbolForDisplay(chord)}</strong><br/><small>Recommended: ${recommended.name}</small></div>`;
    })
    .join("");
  const applyScaleDiagrams = applyBars
    .map((chord, idx) => {
      const root = parseChordRoot(chord) || scaleModuleState.root;
      const scaleId = recommendedScaleIdForChord(chord);
      return `
        <article class="chord-card">
          <h4>Bar ${idx + 1}: ${formatChordSymbolForDisplay(chord, { includeName: true })}</h4>
          <p class="tutorial-card-copy">${scaleIdLabel(scaleId)}</p>
          ${renderScaleDiagram(root, scaleId, "low", {
            showNoteNames: uiState.showNoteNames,
            onlyDegrees: chordTonesOnly
              ? chordToneDegreesForQuality((SCALE_LIBRARY[scaleId] || SCALE_LIBRARY.ionian).targetQuality)
              : null,
            fretSpan: step3ScaleFretSpan,
          })}
        </article>
      `;
    })
    .join("");

  return `
    <section class="lesson-block">
      <h3>Jazz Scales</h3>
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
      ${renderJazzNotationAid()}
      <div class="fingering-controls">
        <label>
          <input data-scale-chord-tones-only-toggle="1" type="checkbox" ${chordTonesOnly ? "checked" : ""}/>
          Just show chord tones
        </label>
      </div>
      <div class="player-controls">
        <button type="button" class="start-track-btn" id="playScaleLowBtn">Play Jazz Scale (Low Zone)</button>
        <button type="button" class="start-track-btn" id="playScaleMidBtn">Play Jazz Scale (Mid Zone)</button>
      </div>
      <h4>Scale Fingerboards</h4>
      <div class="diagram-grid">
        <article class="chord-card">
          <h4>Low Zone</h4>
          ${renderScaleDiagram(scaleModuleState.root, scaleModuleState.scaleId, "low", selectedDiagramOptions)}
        </article>
        <article class="chord-card">
          <h4>Mid Zone</h4>
          ${renderScaleDiagram(scaleModuleState.root, scaleModuleState.scaleId, "mid", selectedDiagramOptions)}
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
      <div class="transpose-chip-wrap">
        <span>Key</span>
        <div class="transpose-chip-group" role="radiogroup" aria-label="Apply progression key">
          ${ROOT_NOTE_OPTIONS.map(
            (note) =>
              `<button type="button" class="transpose-choice ${scaleModuleState.applyKey === note ? "active" : ""}" data-apply-key-option="${note}" aria-pressed="${scaleModuleState.applyKey === note ? "true" : "false"}">${note}</button>`
          ).join("")}
        </div>
      </div>
      <div class="fingering-controls">
        <label>
          <input data-scale-chord-tones-only-toggle="1" type="checkbox" ${chordTonesOnly ? "checked" : ""}/>
          Just show chord tones
        </label>
      </div>
      <p class="tutorial-card-copy">Bars highlighted in gold match your currently selected scale.</p>
      <div class="bar-grid">${applyMarkup}</div>
      <div class="diagram-grid tutorial-grid apply-scale-grid">${applyScaleDiagrams}</div>
    </section>

    <section class="lesson-block">
      <h3>Play-Along Loop</h3>
      <p>Guitar comping loop with optional jazz drums, swing feel, and walking bass.</p>
      <div class="fingering-controls">
        <label>
          <input data-scale-chord-tones-only-toggle="1" type="checkbox" ${chordTonesOnly ? "checked" : ""}/>
          Just show chord tones
        </label>
      </div>
      <div class="practice-player">
        <label>
          Progression
          <select id="playAlongProgressionSelect" class="tempo-input">
            ${PROGRESSION_MODULES.map(
              (item) => `<option value="${item.id}" ${item.id === playAlongState.progressionId ? "selected" : ""}>${item.title}</option>`
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
        <details class="advanced-options">
          <summary>More options</summary>
          <label>
            <input id="playAlongDrumsToggle" type="checkbox" ${playAlongState.includeDrums ? "checked" : ""} />
            Include jazz drum groove
          </label>
          <label>
            <input id="playAlongMetronomeToggle" type="checkbox" ${playAlongState.includeMetronome ? "checked" : ""} />
            Include metronome click
          </label>
          <label>
            <input id="playAlongWalkingBassToggle" type="checkbox" ${playAlongState.includeWalkingBass ? "checked" : ""} />
            Include walking bass
          </label>
          <label>
            Swing feel (${playAlongState.swing}%)
            <input id="playAlongSwingInput" type="range" min="50" max="68" step="1" value="${playAlongState.swing}" />
          </label>
          <label>
            Drum style
            <select id="playAlongDrumStyleSelect" class="tempo-input">
              <option value="sticks" ${playAlongState.drumStyle === "sticks" ? "selected" : ""}>Sticks</option>
              <option value="brushes" ${playAlongState.drumStyle === "brushes" ? "selected" : ""}>Brushes</option>
            </select>
          </label>
          <label>
            Ride pattern
            <select id="playAlongRideVariationSelect" class="tempo-input">
              <option value="classic" ${playAlongState.rideVariation === "classic" ? "selected" : ""}>Classic</option>
              <option value="skip" ${playAlongState.rideVariation === "skip" ? "selected" : ""}>Skip accents</option>
              <option value="busy" ${playAlongState.rideVariation === "busy" ? "selected" : ""}>Busy</option>
            </select>
          </label>
        </details>
        <div class="player-controls">
          <button id="startPlayAlongBtn" class="start-track-btn" type="button">Start Play-Along Loop</button>
          <button id="stopPlayAlongBtn" class="stop-track-btn" type="button" disabled>Stop</button>
        </div>
        <p id="playAlongStatus" class="track-status">Stopped</p>
      </div>
      <div id="playAlongBarGrid" class="bar-grid">${transposeBarsFromTonic(
        (PROGRESSION_DATA[playAlongState.progressionId] || PROGRESSION_DATA.major_iivi).bars,
        (PROGRESSION_DATA[playAlongState.progressionId] || PROGRESSION_DATA.major_iivi).tonic || "C",
        playAlongState.key
      )
        .map(
          (chord, idx) =>
            `<div class="bar-item" data-bar-index="${idx}">Bar ${idx + 1}: <strong>${formatChordSymbolForDisplay(chord)}</strong></div>`
        )
        .join("")}</div>
      <div class="diagram-grid tutorial-grid apply-scale-grid">${transposeBarsFromTonic(
        (PROGRESSION_DATA[playAlongState.progressionId] || PROGRESSION_DATA.major_iivi).bars,
        (PROGRESSION_DATA[playAlongState.progressionId] || PROGRESSION_DATA.major_iivi).tonic || "C",
        playAlongState.key
      )
        .map((chord, idx) => {
          const root = parseChordRoot(chord) || playAlongState.key;
          const scaleId = recommendedScaleIdForChord(chord);
          return `
            <article class="chord-card">
              <h4>Bar ${idx + 1}: ${formatChordSymbolForDisplay(chord, { includeName: true })}</h4>
              <p class="tutorial-card-copy">${scaleIdLabel(scaleId)}</p>
              ${renderScaleDiagram(root, scaleId, "low", {
                showNoteNames: uiState.showNoteNames,
                onlyDegrees: chordTonesOnly
                  ? chordToneDegreesForQuality((SCALE_LIBRARY[scaleId] || SCALE_LIBRARY.ionian).targetQuality)
                  : null,
                fretSpan: step3ScaleFretSpan,
              })}
            </article>
          `;
        })
        .join("")}</div>
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
  lessonContent.querySelectorAll("[data-apply-key-option]").forEach((button) => {
    button.addEventListener("click", () => {
      scaleModuleState.applyKey = button.dataset.applyKeyOption || "C";
      renderLesson();
    });
  });

  const playLowBtn = document.getElementById("playScaleLowBtn");
  const playMidBtn = document.getElementById("playScaleMidBtn");

  lessonContent.querySelectorAll("[data-scale-chord-tones-only-toggle]").forEach((toggle) => {
    toggle.addEventListener("change", () => {
      scaleModuleState.chordTonesOnly = toggle.checked;
      renderLesson();
    });
  });

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

  wirePlayAlongModule();
}

function renderMajorScaleModule() {
  const key = majorScaleStepState.key;
  const zone = majorScaleStepState.zone;
  const includeFifth = majorScaleStepState.includeFifth === true;
  const degreeChords = majorScaleChordsForKey(key);

  const romanCells = degreeChords.map((item) => "<td>" + item.roman + "</td>").join("");
  const chordCells = degreeChords
    .map((item) => "<td>" + formatChordSymbolForDisplay(item.chord) + "</td>")
    .join("");

  const diagramsMarkup = degreeChords
    .map((item) => {
      const voicing = buildVoicing(item.chord, zone, { includeFifth });
      if (!voicing) {
        return (
          '<article class="chord-card">' +
          "<h4>" +
          item.roman +
          " - " +
          formatChordSymbolForDisplay(item.chord, { includeName: true }) +
          "</h4>" +
          '<p class="tutorial-card-copy">No voicing found in this zone.</p>' +
          "</article>"
        );
      }

      return (
        '<article class="chord-card">' +
        '<div class="chord-card-top">' +
        "<h4>" +
        item.roman +
        " - " +
        formatChordSymbolForDisplay(item.chord, { includeName: true }) +
        "</h4>" +
        '<button type="button" class="play-chord-btn" data-chord="' +
        item.chord +
        '" data-module="major_scale_harmony" data-include-fifth="' +
        (includeFifth ? "1" : "0") +
        '" aria-label="Play ' +
        formatChordSymbolForDisplay(item.chord) +
        '">🔈</button>' +
        "</div>" +
        renderDiagram(voicing, { showNoteNames: uiState.showNoteNames }) +
        "</article>"
      );
    })
    .join("");

  const keyButtons = ROOT_NOTE_OPTIONS.map((note) => {
    const active = key === note;
    return (
      '<button type="button" class="root-choice ' +
      (active ? "active" : "") +
      '" data-major-key-option="' +
      note +
      '" aria-pressed="' +
      (active ? "true" : "false") +
      '">' +
      note +
      "</button>"
    );
  }).join("");

  return (
    '<section class="lesson-block">' +
    "<h3>Step 4: Major Scales</h3>" +
    '<div class="builder-controls">' +
    '<div class="builder-root-wrap">' +
    "<span>Key</span>" +
    '<div class="builder-root-group" role="radiogroup" aria-label="Major scale key">' +
    keyButtons +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="fingering-controls major-scale-fingering-controls">' +
    "<label>" +
    "<span>Add 5th</span>" +
    '<input id="majorScaleIncludeFifthToggle" type="checkbox" ' +
    (includeFifth ? "checked" : "") +
    "/>" +
    "</label>" +
    "</div>" +
    '<p class="tutorial-card-copy">Diatonic seventh chords in <span class="chip">' +
    key +
    " major</span>.</p>" +
    renderJazzNotationAid() +
    '<div class="table-scroll-wrap">' +
    '<table class="formula-table major-scale-table">' +
    "<tbody>" +
    "<tr><th>Degree</th>" +
    romanCells +
    "</tr>" +
    "<tr><th>Chord</th>" +
    chordCells +
    "</tr>" +
    "</tbody>" +
    "</table>" +
    "</div>" +
    "</section>" +
    '<section class="lesson-block">' +
    "<h3>" + key + " Major Jazz Scale Chord Fingerings</h3>" +
    '<div class="diagram-grid">' +
    diagramsMarkup +
    "</div>" +
    "</section>"
  );
}

function wireMajorScaleModule() {
  lessonContent.querySelectorAll("[data-major-key-option]").forEach((button) => {
    button.addEventListener("click", () => {
      majorScaleStepState.key = button.dataset.majorKeyOption || "C";
      renderLesson();
    });
  });

  const includeFifthToggle = document.getElementById("majorScaleIncludeFifthToggle");
  if (includeFifthToggle) {
    includeFifthToggle.addEventListener("change", () => {
      majorScaleStepState.includeFifth = includeFifthToggle.checked;
      renderLesson();
    });
  }

  wireChordPreviewButtons();
}


function wirePlayAlongModule() {
  const progressionSelect = document.getElementById("playAlongProgressionSelect");
  const tempoInput = document.getElementById("playAlongTempoInput");
  const drumsToggle = document.getElementById("playAlongDrumsToggle");
  const metronomeToggle = document.getElementById("playAlongMetronomeToggle");
  const walkingBassToggle = document.getElementById("playAlongWalkingBassToggle");
  const swingInput = document.getElementById("playAlongSwingInput");
  const drumStyleSelect = document.getElementById("playAlongDrumStyleSelect");
  const rideVariationSelect = document.getElementById("playAlongRideVariationSelect");
  const startBtn = document.getElementById("startPlayAlongBtn");
  const stopBtn = document.getElementById("stopPlayAlongBtn");
  const statusEl = document.getElementById("playAlongStatus");
  const barEls = Array.from(lessonContent.querySelectorAll("#playAlongBarGrid .bar-item"));
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

  if (drumsToggle) {
    drumsToggle.addEventListener("change", () => {
      playAlongState.includeDrums = drumsToggle.checked;
      if (backingTrackState.isPlaying && backingTrackState.moduleId === "play_along_loop") {
        statusEl.textContent = playAlongState.includeDrums
          ? "Jazz drum groove enabled"
          : "Jazz drum groove disabled";
      }
    });
  }

  if (metronomeToggle) {
    metronomeToggle.addEventListener("change", () => {
      playAlongState.includeMetronome = metronomeToggle.checked;
      if (backingTrackState.isPlaying && backingTrackState.moduleId === "play_along_loop") {
        statusEl.textContent = playAlongState.includeMetronome
          ? "Metronome click enabled"
          : "Metronome click disabled";
      }
    });
  }

  if (walkingBassToggle) {
    walkingBassToggle.addEventListener("change", () => {
      playAlongState.includeWalkingBass = walkingBassToggle.checked;
    });
  }
  if (swingInput) {
    swingInput.addEventListener("input", () => {
      playAlongState.swing = Math.max(50, Math.min(68, Number(swingInput.value) || 60));
    });
  }
  if (drumStyleSelect) {
    drumStyleSelect.addEventListener("change", () => {
      playAlongState.drumStyle = drumStyleSelect.value === "brushes" ? "brushes" : "sticks";
    });
  }
  if (rideVariationSelect) {
    rideVariationSelect.addEventListener("change", () => {
      const value = rideVariationSelect.value;
      playAlongState.rideVariation = ["classic", "skip", "busy"].includes(value) ? value : "classic";
    });
  }

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
  const includeFifth = moduleIncludeFifth(module.id);

  const barsMarkup = bars
    .map(
      (chord, idx) =>
        `<div class="bar-item" data-bar-index="${idx}">Bar ${idx + 1}: <strong>${formatChordSymbolForDisplay(chord)}</strong></div>`
    )
    .join("");

  const diagramsMarkup = uniqueChords
    .map((chord) => {
      const voicing = buildVoicing(chord, selectedZone, { includeFifth });
      if (!voicing) return "";
      return `
        <article class="chord-card">
          <div class="chord-card-top">
            <h4>${formatChordSymbolForDisplay(chord, { includeName: true })}</h4>
            <button type="button" class="play-chord-btn" data-chord="${chord}" data-module="${module.id}" data-include-fifth="${includeFifth ? "1" : "0"}" aria-label="Play ${formatChordSymbolForDisplay(chord)}">🔈</button>
          </div>
          ${renderDiagram(voicing, { showNoteNames: uiState.showNoteNames })}
        </article>
      `;
    })
    .join("");

  return `
    <section class="lesson-block">
      <h3>Progression: ${module.title}</h3>
      <p><strong>Key/Context:</strong> ${data.keyLabel} <span class="chip">Transpose key: ${transposeKey}</span></p>
      ${renderJazzNotationAid()}
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
      <div class="fingering-controls">
        <label>
          <span>Add 5th</span>
          <input id="progressionIncludeFifth-${module.id}" type="checkbox" ${includeFifth ? "checked" : ""}/>
        </label>
      </div>
      <div class="diagram-grid">${diagramsMarkup}</div>
    </section>
  `;
}
function wireChordPreviewButtons() {
  lessonContent.querySelectorAll(".play-chord-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const includeFifth = button.dataset.includeFifth === "1";
      await playChordPreview(button.dataset.chord || "", button.dataset.module || activeModuleId, { includeFifth });
    });
  });
}

function wirePracticePlayer(module, data) {
  const transposeButtons = lessonContent.querySelectorAll("[data-transpose-option]");
  const tempoInput = document.getElementById(`tempoInput-${module.id}`);
  const includeFifthInput = document.getElementById(`progressionIncludeFifth-${module.id}`);
  const startBtn = document.getElementById(`startTrackBtn-${module.id}`);
  const stopBtn = document.getElementById(`stopTrackBtn-${module.id}`);
  const statusEl = document.getElementById(`trackStatus-${module.id}`);
  const barEls = Array.from(lessonContent.querySelectorAll(".bar-item"));

  if (!tempoInput || !startBtn || !stopBtn || !statusEl) return;

  if (includeFifthInput) {
    includeFifthInput.addEventListener("change", () => {
      includeFifthSelectionByModule[module.id] = includeFifthInput.checked;
      stopBackingTrack();
      renderLesson();
    });
  }

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
    if (module.id === "shell_chords_substep") {
      lessonContent.innerHTML = renderShellChordsModule();
      wireShellChordsModule();
    } else if (module.id === "shell_diatonic_7ths") {
      lessonContent.innerHTML = renderShellDiatonicModule();
      wireShellDiatonicModule();
    } else if (module.id === "secondary_dominant") {
      lessonContent.innerHTML = renderSecondaryDominantModule();
      wireSecondaryDominantModule();
    } else {
      lessonContent.innerHTML = renderTutorialModule();
      wireTutorialModule();
    }
    return;
  }

  if (module.kind === "scales") {
    lessonContent.innerHTML = renderScaleModule();
    wireScaleModule();
    return;
  }

  if (module.kind === "major_scales") {
    lessonContent.innerHTML = renderMajorScaleModule();
    wireMajorScaleModule();
    return;
  }

  lessonContent.innerHTML = renderProgressionModule(module);
  wireChordPreviewButtons();
  wirePracticePlayer(module, PROGRESSION_DATA[module.id]);
}

function renderModuleNav() {
  const step1Modules = TUTORIAL_MODULES;
  const step2Modules = PROGRESSION_MODULES;
  const step3Module = MODULES.find((module) => module.kind === "scales");
  const step4Module = MODULES.find((module) => module.kind === "major_scales");
  const step1Markup = step1Modules
    .map((module, idx) => {
      return `
        <li>
          <button type="button" data-module-id="${module.id}">
            <strong>${idx + 1}. ${module.title}</strong>
          </button>
        </li>
      `;
    })
    .join("");

  const step2Markup = step2Modules
    .map((module, idx) => {
      return `
        <li>
          <button type="button" data-module-id="${module.id}">
            <strong>${idx + 1}. ${module.title}</strong>
          </button>
        </li>
      `;
    })
    .join("");

  moduleNav.innerHTML = `
    <li class="nav-section">Step 1: Foundation</li>
    ${step1Markup}
    <li class="nav-section">Step 2: Progressions</li>
    ${step2Markup}
    <li class="nav-section">Step 3: Scales</li>
    <li>
      <button type="button" data-module-id="${step3Module.id}">
        <strong>${step3Module.title}</strong>
      </button>
    </li>
    <li class="nav-section">Step 4: Major Scales</li>
    <li>
      <button type="button" data-module-id="${step4Module.id}">
        <strong>${step4Module.title}</strong>
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
    const tutorialIndex = TUTORIAL_MODULES.findIndex((item) => item.id === module.id) + 1;
    stageModuleLabel.textContent = `Step 1 of 4 - Foundation ${tutorialIndex}/${TUTORIAL_MODULES.length}`;
    stageTitle.textContent = module.title;
  } else if (module.kind === "progression") {
    const progressionIndex = PROGRESSION_MODULES.findIndex((item) => item.id === module.id) + 1;
    stageModuleLabel.textContent = `Step 2 of 4 - Progression ${progressionIndex}/${PROGRESSION_MODULES.length}`;
    stageTitle.textContent = module.title;
  } else if (module.kind === "scales") {
    stageModuleLabel.textContent = "Step 3 of 4 - Scales";
    stageTitle.textContent = module.title;
  } else {
    stageModuleLabel.textContent = "Step 4 of 4 - Major Scales";
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

function triggerEmojiRain() {
  const emojis = ["🎸", "🎵", "🎶", "🎼", "🎷", "🎺", "🥁"];
  const total = 48;

  for (let i = 0; i < total; i += 1) {
    const item = document.createElement("span");
    item.className = "emoji-rain-item";
    item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    item.style.left = `${Math.random() * 100}vw`;
    item.style.animationDuration = `${2.7 + Math.random() * 1.8}s`;
    item.style.animationDelay = `${Math.random() * 0.6}s`;
    item.style.fontSize = `${1.1 + Math.random() * 1.2}rem`;
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 4700);
  }
}

function bootstrapApp() {
  try {
    if (showNoteNamesToggle) {
      showNoteNamesToggle.checked = uiState.showNoteNames;
      showNoteNamesToggle.addEventListener("change", () => {
        uiState.showNoteNames = showNoteNamesToggle.checked;
        renderLesson();
      });
    }

    renderModuleNav();
    setActiveModule(activeModuleId);

    prevModuleBtn.addEventListener("click", () => stepModule(-1));
    nextModuleBtn.addEventListener("click", () => stepModule(1));
    if (easterEggGuitarBtn) {
      easterEggGuitarBtn.addEventListener("click", triggerEmojiRain);
    }
    if (tunerToggleBtn && miniTunerPanel) {
      tunerToggleBtn.addEventListener("click", () => {
        const nextOpen = miniTunerPanel.hidden;
        setMiniTunerOpen(nextOpen);
      });
    }
    if (tunerCloseBtn) {
      tunerCloseBtn.addEventListener("click", () => setMiniTunerOpen(false));
    }
    tunerStringButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const frequency = Number(button.dataset.tunerFrequency || 0);
        const label = button.dataset.tunerNote || "note";
        if (frequency > 0) {
          await playTunerReferenceTone(frequency, label);
        }
      });
    });
    if (tunerMicStartBtn) {
      tunerMicStartBtn.addEventListener("click", startMiniTunerMic);
    }
    if (tunerMicStopBtn) {
      tunerMicStopBtn.addEventListener("click", stopMiniTunerMic);
    }
  } catch (error) {
    console.error(error);
    if (lessonContent) {
      lessonContent.innerHTML = `<section class="lesson-block"><h3>App Error</h3><p>Something failed while loading this lesson. Hard refresh and try again.</p><p><code>${String(error.message || error)}</code></p></section>`;
    }
  }
}

bootstrapApp();
