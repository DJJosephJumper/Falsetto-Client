import { Quiz } from "../../Quiz";
import { createTextMultipleChoiceQuiz } from "../Quiz";

export function createQuiz(): Quiz {
  const chordNotes = [
    "1 3 5",
    "1 b3 5",
    "1 b3 b5",
    "1 3 #5",
    "1 2 5",
    "1 4 5",
    "1 #4 5",
    "1 4 5b",
    "1 b2 5",
    "1 3 5 7",
    "1 3 5 b7",
    "1 b3 5 b7",
    "1 b3 b5 b7",
    "1 b3 b5 bb7",
    "1 3 #5 7",
    "1 b3 5 7",
    "1 3 #5 b7",
    "1 b3 b5 7",
    "1 b3 #5 b7",
    "1 4 b7",
    "1 4 7",
    "1 #4 7"
  ];
  const chordTypes = [
    "major",
    "minor",
    "diminished",
    "augmented",
    "sus2",
    "sus4",
    "lydian",
    "sus4b5",
    "phryg",
    "maj7",
    "7",
    "-7",
    "-7b5",
    "dim7",
    "+Ma7",
    "-Ma7",
    "+7",
    "dimMa7",
    "-7#5",
    "quartal",
    "quartal aug.",
    "G+4Q"
  ];
  
  return createTextMultipleChoiceQuiz(
    "Chord Notes",
    chordNotes,
    chordTypes,
    chordTypes,
    false
  );
}