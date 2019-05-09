import * as React from "react";
import { Card, CardContent } from '@material-ui/core';

import App from "./App";
import * as Utils from "../Utils";
import { GuitarFretboard, renderGuitarNoteHighlightsAndNoteNames, GuitarNote, GuitarFretboardMetrics } from './GuitarFretboard';
import * as GuitarNotes from "./Quizzes/GuitarNotes";
import { Pitch } from '../Pitch';
import { PitchLetter } from '../PitchLetter';
import { createStudyFlashCardGroupComponent } from './StudyFlashCards';
import { MAX_MAIN_CARD_WIDTH } from './Style';

const noteGroups = [
  {
    color: "lightgreen",
    notes: [
      new GuitarNote(new Pitch(PitchLetter.G, 0, 2), 0),
      new GuitarNote(new Pitch(PitchLetter.A, 0, 2), 0),
      new GuitarNote(new Pitch(PitchLetter.B, 0, 2), 0),
      new GuitarNote(new Pitch(PitchLetter.C, 0, 3), 1),
      new GuitarNote(new Pitch(PitchLetter.D, 0, 3), 1),
      new GuitarNote(new Pitch(PitchLetter.E, 0, 3), 1),
      new GuitarNote(new Pitch(PitchLetter.F, 0, 3), 2),
      
      new GuitarNote(new Pitch(PitchLetter.G, 0, 4), 5),
      new GuitarNote(new Pitch(PitchLetter.A, 0, 4), 5),
      new GuitarNote(new Pitch(PitchLetter.B, 0, 4), 5)
    ]
  },
  {
    color: "lightsalmon",
    notes: [
      new GuitarNote(new Pitch(PitchLetter.G, 0, 3), 2),
      new GuitarNote(new Pitch(PitchLetter.A, 0, 3), 2),
      new GuitarNote(new Pitch(PitchLetter.B, 0, 3), 2),
      new GuitarNote(new Pitch(PitchLetter.C, 0, 4), 3),
      new GuitarNote(new Pitch(PitchLetter.D, 0, 4), 3),
      new GuitarNote(new Pitch(PitchLetter.E, 0, 4), 3),
      new GuitarNote(new Pitch(PitchLetter.F, 0, 4), 4)
    ]
  },
  {
    color: "lightblue",
    notes: [
      new GuitarNote(new Pitch(PitchLetter.G, 0, 4), 4),
      new GuitarNote(new Pitch(PitchLetter.A, 0, 4), 4),
      new GuitarNote(new Pitch(PitchLetter.B, 0, 3), 4),
      new GuitarNote(new Pitch(PitchLetter.C, 0, 3), 0),
      new GuitarNote(new Pitch(PitchLetter.D, 0, 3), 0),
      new GuitarNote(new Pitch(PitchLetter.E, 0, 2), 0),
      new GuitarNote(new Pitch(PitchLetter.F, 0, 3), 1),
      
      new GuitarNote(new Pitch(PitchLetter.C, 0, 5), 5),
      new GuitarNote(new Pitch(PitchLetter.D, 0, 5), 5),
      new GuitarNote(new Pitch(PitchLetter.E, 0, 4), 5)
    ]
  },
  {
    color: "yellow",
    notes: [
      new GuitarNote(new Pitch(PitchLetter.G, 0, 3), 1),
      new GuitarNote(new Pitch(PitchLetter.A, 0, 2), 1),
      new GuitarNote(new Pitch(PitchLetter.B, 0, 2), 1),
      new GuitarNote(new Pitch(PitchLetter.C, 0, 4), 2),
      new GuitarNote(new Pitch(PitchLetter.D, 0, 3), 2),
      new GuitarNote(new Pitch(PitchLetter.E, 0, 3), 2),
      new GuitarNote(new Pitch(PitchLetter.F, 0, 4), 3)
    ]
  },
  {
    color: "turquoise",
    notes: [
      new GuitarNote(new Pitch(PitchLetter.G, 0, 3), 3),
      new GuitarNote(new Pitch(PitchLetter.A, 0, 3), 3),
      new GuitarNote(new Pitch(PitchLetter.B, 0, 3), 3),
      new GuitarNote(new Pitch(PitchLetter.C, 0, 4), 4),
      new GuitarNote(new Pitch(PitchLetter.D, 0, 4), 4),
      new GuitarNote(new Pitch(PitchLetter.E, 0, 4), 4),
      new GuitarNote(new Pitch(PitchLetter.F, 0, 2), 0),
      
      new GuitarNote(new Pitch(PitchLetter.F, 0, 4), 5)
    ]
  },
  {
    color: "lightgray",
    notes: [
      new GuitarNote(new Pitch(PitchLetter.F, 1, 2), 0),
      new GuitarNote(new Pitch(PitchLetter.G, 1, 2), 0),
      new GuitarNote(new Pitch(PitchLetter.A, 1, 2), 0),
      new GuitarNote(new Pitch(PitchLetter.C, 1, 3), 0),
      new GuitarNote(new Pitch(PitchLetter.D, 1, 3), 0),
      
      new GuitarNote(new Pitch(PitchLetter.F, 1, 3), 1),
      new GuitarNote(new Pitch(PitchLetter.G, 1, 3), 1),
      new GuitarNote(new Pitch(PitchLetter.A, 1, 2), 1),
      new GuitarNote(new Pitch(PitchLetter.C, 1, 3), 1),
      new GuitarNote(new Pitch(PitchLetter.D, 1, 3), 1),

      new GuitarNote(new Pitch(PitchLetter.F, 1, 3), 2),
      new GuitarNote(new Pitch(PitchLetter.G, 1, 3), 2),
      new GuitarNote(new Pitch(PitchLetter.A, 1, 3), 2),
      new GuitarNote(new Pitch(PitchLetter.C, 1, 4), 2),
      new GuitarNote(new Pitch(PitchLetter.D, 1, 3), 2),

      new GuitarNote(new Pitch(PitchLetter.F, 1, 4), 3),
      new GuitarNote(new Pitch(PitchLetter.G, 1, 3), 3),
      new GuitarNote(new Pitch(PitchLetter.A, 1, 3), 3),
      new GuitarNote(new Pitch(PitchLetter.C, 1, 4), 3),
      new GuitarNote(new Pitch(PitchLetter.D, 1, 4), 3),
      
      new GuitarNote(new Pitch(PitchLetter.F, 1, 4), 4),
      new GuitarNote(new Pitch(PitchLetter.G, 1, 4), 4),
      new GuitarNote(new Pitch(PitchLetter.A, 1, 4), 4),
      new GuitarNote(new Pitch(PitchLetter.C, 1, 4), 4),
      new GuitarNote(new Pitch(PitchLetter.D, 1, 4), 4),
      
      new GuitarNote(new Pitch(PitchLetter.F, 1, 4), 5),
      new GuitarNote(new Pitch(PitchLetter.G, 1, 4), 5),
      new GuitarNote(new Pitch(PitchLetter.A, 1, 4), 5),
      new GuitarNote(new Pitch(PitchLetter.C, 1, 5), 5),
      new GuitarNote(new Pitch(PitchLetter.D, 1, 5), 5)
    ]
  }
];

const step3Diagram1NoteGroups = [
  {
    color: noteGroups[0].color,
    notes: noteGroups[0].notes.slice(0, 7)
  }
];
const step3Diagram1Notes = Utils.flattenArrays<GuitarNote>(step3Diagram1NoteGroups
  .map(ng => ng.notes));

const step4Diagram1NoteGroups = step3Diagram1NoteGroups.concat([
  {
    color: noteGroups[1].color,
    notes: noteGroups[1].notes.slice(0, 6)
  }
]);
const step4Diagram1Notes = Utils.flattenArrays<GuitarNote>(step4Diagram1NoteGroups
  .map(ng => ng.notes));

const step5Diagram1NoteGroups = step4Diagram1NoteGroups.concat([
  {
    color: noteGroups[1].color,
    notes: noteGroups[1].notes.slice(6)
  },
  {
    color: noteGroups[2].color,
    notes: noteGroups[2].notes.slice(0, 2)
  }
]);
const step5Diagram1Notes = Utils.flattenArrays<GuitarNote>(step5Diagram1NoteGroups
  .map(ng => ng.notes));

const step6Diagram1NoteGroups = step5Diagram1NoteGroups.concat([
  {
    color: noteGroups[4].color,
    notes: noteGroups[4].notes.slice(0, 6)
  }
]);
const step6Diagram1Notes = Utils.flattenArrays<GuitarNote>(step6Diagram1NoteGroups
  .map(ng => ng.notes));

const step7Diagram1NoteGroups = step6Diagram1NoteGroups.concat([
  {
    color: noteGroups[2].color,
    notes: [
      noteGroups[2].notes[2],
      noteGroups[2].notes[5]
    ]
  },
  {
    color: noteGroups[3].color,
    notes: [
      noteGroups[3].notes[1],
      noteGroups[3].notes[4]
    ]
  }
]);
const step7Diagram1Notes = Utils.flattenArrays<GuitarNote>(step7Diagram1NoteGroups
  .map(ng => ng.notes));

const step8Diagram1NoteGroups = step7Diagram1NoteGroups.concat([
  {
    color: noteGroups[2].color,
    notes: [
      noteGroups[2].notes[3],
      noteGroups[2].notes[6]
    ]
  },
  {
    color: noteGroups[3].color,
    notes: [
      noteGroups[3].notes[2],
      noteGroups[3].notes[3],
      noteGroups[3].notes[5],
      noteGroups[3].notes[6]
    ]
  },
  {
    color: noteGroups[4].color,
    notes: [
      noteGroups[4].notes[6]
    ]
  }
]);
const step8Diagram1Notes = Utils.flattenArrays<GuitarNote>(step8Diagram1NoteGroups
  .map(ng => ng.notes));

const step9Diagram1NoteGroups = step8Diagram1NoteGroups.concat([
  {
    color: noteGroups[2].color,
    notes: [
      noteGroups[2].notes[4]
    ]
  },
  {
    color: noteGroups[3].color,
    notes: [
      noteGroups[3].notes[0]
    ]
  }
]);
const step9Diagram1Notes = Utils.flattenArrays<GuitarNote>(step9Diagram1NoteGroups
  .map(ng => ng.notes));

const step10Diagram1NoteGroups = step9Diagram1NoteGroups.concat([
  {
    color: noteGroups[5].color,
    notes: noteGroups[5].notes.slice(0, 25)
  }
]);;
const step10Diagram1Notes = Utils.flattenArrays<GuitarNote>(step10Diagram1NoteGroups
  .map(ng => ng.notes));
  
const step10Diagram2NoteGroups = noteGroups;
const step10Diagram2Notes = Utils.flattenArrays<GuitarNote>(step10Diagram2NoteGroups
  .map(ng => ng.notes));

export interface IGuitarNotesLessonProps {
}
export interface IGuitarNotesLessonState {
}
export class GuitarNotesLesson extends React.Component<IGuitarNotesLessonProps, IGuitarNotesLessonState> {
  public constructor(props: IGuitarNotesLessonProps) {
    super(props);
    
    this.state = {};
  }
  public render(): JSX.Element {
    const fretboardWidth = 400;
    const fretboardHeight = 140;
    const fretboardStyle = { width: "100%", maxWidth: "400px", height: "auto" };

    return (
      <Card style={{ maxWidth: MAX_MAIN_CARD_WIDTH, marginBottom: "6em" }}>
        <CardContent>
          <h1>Learn the Notes on Guitar in 10 Easy Steps</h1>

          <p>Being able to identify all of the notes on your instrument is vital to becoming a skilled musician, and learning this skill on guitar is quicker and easier than you might think. Let's get started!</p>
          
          <h3>Introduction</h3>
          <p>There are 6 strings and (usually) up to 24 frets on a guitar:</p>
          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={0.8 * fretboardHeight}
              pressedNotes={[]}
              fretCount={24}
              style={fretboardStyle}
            />
          </p>

          <p>This means that there are 150 notes to learn! Luckily, you can learn them all in only 10 easy steps by leveraging a few rules to drastically reduce number of notes you need to memorize.</p>
          
          <h3>Step 1</h3>
          <p>The first rule is that the notes repeat every 12 frets. This means that we can ignore all fretted notes after the 11th fret and wrap around instead (so the 12th fret is the same as the open string, the 13th fret is the same as the 1st fret, and so on). Now we are left with this section of the guitar:</p>
          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => this.renderFretNumbers(metrics)}
              style={fretboardStyle}
            />
          </p>

          <h3>Step 2</h3>
          <p>The second rule is that the highest string's notes and the lowest string's notes have the exact same names. So, we can ignore the highest string (the one at the top of the fretboard diagrams) when memorizing notes and wrap around to the lowest string instead. Now we are left with the notes highlighted in green:</p>
          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => {
                const y = 0.75 * metrics.stringSpacing;

                return (
                  <g>
                    <rect
                      x={0} y={y}
                      width={metrics.width} height={metrics.height - y}
                      fill="green"
                      fillOpacity={0.3}>
                    </rect>
                    {this.renderFretNumbers(metrics)}
                  </g>
                );
              }}
              style={fretboardStyle}
            />
          </p>

          <h3>Step 3</h3>
          <p>Memorize these 7 notes and the shape they make. Note that from reading from the bottom-up and left to right follows the musical alphabet (which cycles back to A after G).</p>
          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => this.renderDiagramExtras(metrics, step3Diagram1NoteGroups)}
              style={fretboardStyle}
            />
          </p>
          <p>
            {createStudyFlashCardGroupComponent(
              GuitarNotes.createFlashCardGroup(step3Diagram1Notes), false, true, "Step 3 Quiz", { margin: "0 auto" }, false)}
          </p>
          
          <h3>Step 4</h3>
          <p>Memorize this rule: If you move up 2 strings and right 2 frets (or move in the exact opposite direction) from any note, that note has the same name as the starting note.</p>
          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => this.renderDiagramExtras(metrics, step4Diagram1NoteGroups)}
              style={fretboardStyle}
            />
          </p>
          <p>
            {createStudyFlashCardGroupComponent(
              GuitarNotes.createFlashCardGroup(step4Diagram1Notes), false, true, "Step 4 Quiz", { margin: "0 auto" }, false)}
          </p>

          <h3>Step 5</h3>
          <p>We stopped on the 3rd highest string because there is a special rule you must follow to continue: When moving from the 3rd highest string to the 2nd highest string, you must shift one fret to the right (and therefore when crossing back from the 2nd highest string to the 3rd highest string, you must shift one fret to the left).</p>
          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => this.renderDiagramExtras(metrics, step5Diagram1NoteGroups)}
              style={fretboardStyle}
            />
          </p>

          <p>We could continue on with this pattern but it can be difficult to follow while wrapping around the fretboard, so we will learn the rest of the notes another way.</p>

          <p>
            {createStudyFlashCardGroupComponent(
              GuitarNotes.createFlashCardGroup(step5Diagram1Notes), false, true, "Step 5 Quiz", { margin: "0 auto" }, false)}
          </p>

          <h3>Step 6</h3>
          <p>Memorize this rule: If you move up 3 strings and left 3 frets from any note (or in the opposite direction), that note has the same name as the starting note. The previous rule for moving between the 2nd-highest and 3rd-highest strings still holds!</p>

          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => this.renderDiagramExtras(metrics, step6Diagram1NoteGroups)}
              style={fretboardStyle}
            />
          </p>
          <p>
            {createStudyFlashCardGroupComponent(
              GuitarNotes.createFlashCardGroup(step6Diagram1Notes), false, true, "Step 6 Quiz", { margin: "0 auto" }, false)}
          </p>
          
          <h3>Step 7</h3>
          <p>Memorize the remaining open string notes. From the lowest string to the 2nd highest string, they are E, A, D, G, B. The highest string's note names are exactly the same as the lowest string's notes, so we are ignoring the highest string for now.</p>
          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => this.renderDiagramExtras(metrics, step7Diagram1NoteGroups)}
              style={fretboardStyle}
            />
          </p>
          <p>
            {createStudyFlashCardGroupComponent(
              GuitarNotes.createFlashCardGroup(step7Diagram1Notes), false, true, "Step 7 Quiz", { margin: "0 auto" }, false)}
          </p>

          <h3>Step 8</h3>
          <p>Memorize this rule: C is always directly to the right of B, and F is always directly to the right of E.</p>
          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => this.renderDiagramExtras(metrics, step8Diagram1NoteGroups)}
              style={fretboardStyle}
            />
          </p>
          <p>
            {createStudyFlashCardGroupComponent(
              GuitarNotes.createFlashCardGroup(step8Diagram1Notes), false, true, "Step 8 Quiz", { margin: "0 auto" }, false)}
          </p>

          <h3>Step 9</h3>
          <p>Memorize the D on the 10th fret of the lowest string, and the G on the 10th fret of the 2nd lowest string:</p>

          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => this.renderDiagramExtras(metrics, step9Diagram1NoteGroups)}
              style={fretboardStyle}
            />
          </p>

          <p>You have now learned all of the natural (non sharp/flat) notes on the guitar fretboard, and there is only one more step to learn the rest of the notes!</p>
          
          <p>
            {createStudyFlashCardGroupComponent(
              GuitarNotes.createFlashCardGroup(step9Diagram1Notes), false, true, "Step 9 Quiz", { margin: "0 auto" }, false)}
          </p>
          
          <h3>Step 10</h3>
          <p>To identify the rest of the notes (accidental notes, whose names have added symbols as well), simply add a '#' (read "sharp") to the natural note to the left, or add a 'b' (read "flat") to the natural note to the right. Yes, each of these notes has two possible names, and which name you use depends on the context (more info. on this in the {App.instance.renderNavLink("/essential-music-theory", "Essential Music Theory")} lesson)! But for now we will just label each accidental note with both possible names.</p>
          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => this.renderDiagramExtras(metrics, step10Diagram1NoteGroups)}
              style={fretboardStyle}
            />
          </p>
          <p>Because the lowest and highest strings have the same note names, and because the note names repeat every 12 frets, you have now identified every note on the fretboard!</p>
          <p style={{ textAlign: "center" }}>
            <GuitarFretboard
              width={fretboardWidth} height={fretboardHeight}
              pressedNotes={[]}
              renderExtrasFn={metrics => this.renderDiagramExtras(metrics, step10Diagram2NoteGroups)}
              style={fretboardStyle}
            />
          </p>

          <h3>Test Your Knowledge</h3>
          <p>Now, you can practice your knowledge on your guitar, or using the exercise below.</p>
          <p>
            {createStudyFlashCardGroupComponent(
              GuitarNotes.createFlashCardGroup(step10Diagram2Notes), false, true, "Final Quiz", { margin: "0 auto" })}
          </p>
        </CardContent>
      </Card>
    );
  }
  private renderDiagramExtras(
    metrics: GuitarFretboardMetrics,
    diagramNoteGroups: Array<{ color: string, notes: Array<GuitarNote> }>
  ): JSX.Element {
    return (
      <g>
        {diagramNoteGroups
          .map(dng => renderGuitarNoteHighlightsAndNoteNames(
            metrics, dng.notes, dng.color
          ))}
        {this.renderFretNumbers(metrics)}
      </g>
    );
  }
  private renderFretNumbers(metrics: GuitarFretboardMetrics): JSX.Element {
    const fretNumbers = Utils.range(0, 11);
    return (
      <g>
        {fretNumbers.map(fretNumber => {
          const fontSize = 12;
          let x = metrics.getNoteX(fretNumber) - (0.4 * fontSize);
          if (fretNumber == 0) {
            x -= 0.25 * metrics.fretSpacing;
          }

          const y = metrics.height + 20;
          const textStyle: any = {
            fontSize: `${fontSize}px`,
            fontWeight: "bold"
          };

          return (
            <text
              x={x} y={y}
              style={textStyle}>
              {fretNumber}
            </text>
          );
        })}
      </g>
    );
  }
}