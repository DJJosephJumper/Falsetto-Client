import * as React from 'react';

import * as Utils from "../../Utils";
import { Quiz } from "../../Quiz";
import { Quiz as QuizComponent } from "../Quiz";

import Button from "@material-ui/core/Button";

export class ScaleFamilies extends React.Component<{}, {}> {
  public static createQuiz(): Quiz {
    const chordTypes = [
      "Ionian",
      "Lydian",
      "Lydian aug",
      "Ionian aug",
      "Major Petatonic",
      "Major Blues",
      "Augmented",
      "Dorian",
      "Phrygian",
      "Aeolian",
      "Melodic Minor",
      "Dorian b2",
      "Harmonic Minor",
      "Dorian #4",
      "Minor Pentatonic",
      "Minor Blues",
      "Locrian",
      "Locrian nat2",
      "Locrian nat6",
      "Mixolydian",
      "Mixolydian #11",
      "Mixolydian b6",
      "Altered Dominant",
      "Phrygian Major",
      "Dominant Diminished",
      "Whole Tone",
      "Major Pentatonic",
      "Minor Pentatonic",
      "Major Blues",
      "Minor Blues",
      "Tonic Diminished",
      "Altered Dominant bb7",
      "Whole Tone",
      "Augmented"
    ];
    const scaleFamilies = [
      "Major7",
      "Major7",
      "Major7",
      "Major7",
      "Major7",
      "Major7",
      "Major7",
      "Minor7",
      "Minor7",
      "Minor7",
      "Minor7",
      "Minor7",
      "Minor7",
      "Minor7",
      "Minor7",
      "Minor7",
      "Minor7b5",
      "Minor7b5",
      "Minor7b5",
      "Dom7",
      "Dom7",
      "Dom7",
      "Dom7",
      "Dom7",
      "Dom7",
      "Dom7",
      "Dom7",
      "Dom7",
      "Dom7",
      "Dom7",
      "Diminished",
      "Diminished",
      "Augmented",
      "Augmented"
    ];
    const answers = Utils.uniq(scaleFamilies);
    const questionAnswerIndices = scaleFamilies.map(answer => answers.indexOf(answer));

    return new Quiz(
      "Scale Families",
      chordTypes.map(ct => (() => <span style={{ fontSize: "2em" }}>{ct}</span>)),
      questionAnswerIndices,
      selectAnswerIndex => {
        const answerButtons = answers.map((answer, i) => {
          return <span key={i} style={{padding: "1em"}}><Button onClick={event => selectAnswerIndex(i)} variant="outlined" color="primary">{answer}</Button></span>;
        }, this);
        return <div style={{lineHeight: 3}}>{answerButtons}</div>;
      }
    );
  }
  
  constructor(props: {}) {
    super(props);
    this.quiz = ScaleFamilies.createQuiz();
  }

  public render(): JSX.Element {
    return <QuizComponent quiz={this.quiz} />;
  }

  private quiz: Quiz;
}