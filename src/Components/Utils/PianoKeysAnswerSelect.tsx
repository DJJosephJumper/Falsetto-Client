import * as React from "react";
import { Button } from "@material-ui/core";

import { Pitch } from "../../lib/TheoryLib/Pitch";
import { AnswerDifficulty } from "../../Study/AnswerDifficulty";
import { PianoKeyboard } from "./PianoKeyboard";
import { Rect2D } from '../../lib/Core/Rect2D';
import { Size2D } from '../../lib/Core/Size2D';
import { Vector2D } from '../../lib/Core/Vector2D';
import { toggleArrayElementCustomEquals, uniq, immutableRemoveIfFoundInArray, immutableAddIfNotFoundInArray } from '../../lib/Core/ArrayUtils';

export interface IPianoKeysAnswerSelectProps {
  size: Size2D;
  lowestPitch: Pitch;
  highestPitch: Pitch;
  correctAnswer: Array<Pitch>;
  maxNumPitches?: number;
  onAnswer: (answerDifficulty: AnswerDifficulty, answer: any) => void;
  lastCorrectAnswer: any;
  incorrectAnswers: Array<any>;
  instantConfirm: boolean;
}

export interface IPianoKeysAnswerSelectState {
  selectedPitches: Array<Pitch>;
}

export class PianoKeysAnswerSelect extends React.Component<IPianoKeysAnswerSelectProps, IPianoKeysAnswerSelectState> {
  public constructor(props: IPianoKeysAnswerSelectProps) {
    super(props);
    
    this.state = {
      selectedPitches: []
    };
  }

  public render(): JSX.Element {
    // TODO: use lastCorrectAnswer
    const { size, lowestPitch, highestPitch, instantConfirm } = this.props;

    const confirmAnswerButton = !instantConfirm
      ? (
        <div style={{padding: "1em 0"}}>
          <Button
            onClick={event => this.confirmAnswer()}
            disabled={this.state.selectedPitches.length === 0}
            variant="contained"
          >
            Confirm Answer
          </Button>
        </div>
      )
      : null;

    return (
      <div>
        <PianoKeyboard
          rect={new Rect2D(size, new Vector2D(0, 0))}
          lowestPitch={lowestPitch}
          highestPitch={highestPitch}
          pressedPitches={this.state.selectedPitches}
          onKeyPress={pitch => this.onPitchClick(pitch)}
          onKeyRelease={pitch => this.onPitchRelease(pitch)}
          style={{ width: "100%", maxWidth: `${size.width}px` }}
        />
        {confirmAnswerButton}
      </div>
    );
  }

  private onPitchClick(pitch: Pitch) {
    let newSelectedPitches = immutableAddIfNotFoundInArray(
      this.state.selectedPitches,
      pitch,
      p => p.equals(pitch)
    );

    if (this.props.maxNumPitches && (newSelectedPitches.length > this.props.maxNumPitches)) {
      newSelectedPitches = newSelectedPitches.slice(1);
    }
    
    this.setState({ selectedPitches: newSelectedPitches }, () => {
      if (this.props.instantConfirm) {
        this.confirmAnswer();
      }
    });
  }
  
  private onPitchRelease(pitch: Pitch) {
    if (!this.props.instantConfirm) { return; }

    // If instantConfirm is on, we want to unselect the pitch when the key is released.
    let newSelectedPitches = immutableRemoveIfFoundInArray(
      this.state.selectedPitches,
      p => p.equals(pitch)
    );
    
    this.setState({ selectedPitches: newSelectedPitches });
  }

  private confirmAnswer() {
    const selectedPitchMidiNumbersNoOctave = uniq(
      this.state.selectedPitches
        .map(pitch => pitch.midiNumberNoOctave)
    );
    const correctAnswerMidiNumbersNoOctave = uniq(
      this.props.correctAnswer
        .map(pitch => pitch.midiNumberNoOctave)
    );

    const isCorrect = (selectedPitchMidiNumbersNoOctave.length === correctAnswerMidiNumbersNoOctave.length) &&
      (selectedPitchMidiNumbersNoOctave.every(guess =>
        correctAnswerMidiNumbersNoOctave.some(answer =>
          guess === answer
        )
      ));
    this.props.onAnswer(isCorrect ? AnswerDifficulty.Easy : AnswerDifficulty.Incorrect, selectedPitchMidiNumbersNoOctave);
  }
}