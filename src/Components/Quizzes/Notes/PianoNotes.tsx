import * as React from "react";

import { Vector2D } from '../../../Vector2D';
import { Size2D } from "../../../Size2D";
import { Rect2D } from '../../../Rect2D';
import * as FlashCardUtils from "../Utils";
import { PianoKeyboard } from "../../PianoKeyboard";
import { FlashCard } from "../../../FlashCard";
import { FlashCardGroup } from "../../../FlashCardGroup";
import { AnswerDifficulty } from "../../../StudyAlgorithm";
import { Pitch } from "../../../Pitch";
import { PitchLetter } from "../../../PitchLetter";

const notes = ["C", "C#/D♭", "D", "D#/E♭", "E", "F", "F#/G♭", "G", "G#/A♭", "A", "A#/B♭", "B"];

export function createFlashCardGroup(): FlashCardGroup {
  const group = new FlashCardGroup("Piano Notes", createFlashCards);
  group.containerHeight = "120px";
  group.moreInfoUri = "http://www.thejazzpianosite.com/jazz-piano-lessons/the-basics/overview/";
  group.renderAnswerSelect = renderAnswerSelect;

  return group;
}
export function createFlashCards(): FlashCard[] {
  return notes
    .map((_, i) => FlashCard.fromRenderFns(
      () => (
        <PianoKeyboard
          rect={new Rect2D(new Size2D(200, 100), new Vector2D(0, 0))}
          lowestPitch={new Pitch(PitchLetter.C, 0, 4)}
          highestPitch={new Pitch(PitchLetter.B, 0, 4)}
          pressedPitches={[Pitch.createFromMidiNumber((new Pitch(PitchLetter.C, 0, 4)).midiNumber + i)]}
        />
      ),
      notes[i]
    ));
}
export function renderAnswerSelect(
  width: number, height: number,
  flashCards: FlashCard[],
  enabledFlashCardIndices: number[],
  areFlashCardsInverted: boolean,
  flashCardIndex: number,
  flashCard: FlashCard,
  onAnswer: (answerDifficulty: AnswerDifficulty, answer: any) => void,
  lastCorrectAnswer: any,
  incorrectAnswers: Array<any>
) {
  return (
    <div>
      {!areFlashCardsInverted ? FlashCardUtils.renderNoteAnswerSelect(
        width, height, flashCards, enabledFlashCardIndices, areFlashCardsInverted,
        flashCardIndex, flashCard, onAnswer, lastCorrectAnswer, incorrectAnswers) : null}
      {areFlashCardsInverted ? FlashCardUtils.renderDistinctFlashCardSideAnswerSelect(
        width, height, flashCards, enabledFlashCardIndices, areFlashCardsInverted,
        flashCardIndex, flashCard, onAnswer, lastCorrectAnswer, incorrectAnswers) : null}
    </div>
  );
}