import * as React from "react";

import * as Utils from "../Utils";
import { Vector2D } from '../Vector2D';
import { Size2D } from "../Size2D";
import { Rect2D } from '../Rect2D';
import { PitchLetter } from "../PitchLetter";
import { ScaleType, ScaleTypeGroup } from "../Scale";
import { Pitch } from "../Pitch";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { Chord, ChordScaleFormula } from "../Chord";
import { PianoKeyboard } from "./PianoKeyboard";
import { playPitches } from '../Piano';
import * as PianoScaleDronePlayer from "./PianoScaleDronePlayer";
import { GuitarScaleViewer } from './Quizzes/GuitarScales';
import { getStandardGuitarTuning, getPreferredGuitarScaleShape } from './GuitarFretboard';
import { ScaleAudioPlayer } from './ScaleAudioPlayer';

const validSharpKeyPitches = [
  null,
  null,
  new Pitch(PitchLetter.C, 1, 3),
  null,
  null,
  new Pitch(PitchLetter.F, 1, 3),
  null
];
const validNaturalKeyPitches = [
  new Pitch(PitchLetter.A, 0, 3),
  new Pitch(PitchLetter.B, 0, 3),
  new Pitch(PitchLetter.C, 0, 3),
  new Pitch(PitchLetter.D, 0, 3),
  new Pitch(PitchLetter.E, 0, 3),
  new Pitch(PitchLetter.F, 0, 3),
  new Pitch(PitchLetter.G, 0, 3)
];
const validFlatKeyPitches = [
  new Pitch(PitchLetter.A, -1, 3),
  new Pitch(PitchLetter.B, -1, 3),
  new Pitch(PitchLetter.C, -1, 4),
  new Pitch(PitchLetter.D, -1, 3),
  new Pitch(PitchLetter.E, -1, 3),
  null,
  new Pitch(PitchLetter.G, -1, 3)
];

interface IScaleViewerProps {
  title?: string;
  scaleTypeGroups?: Array<ScaleTypeGroup>;
  renderAllScaleShapes: boolean;
  playSimultaneously?: boolean;
  showPianoKeyboard?: boolean;
  showGuitarFretboard?: boolean;
  isEmbedded?: boolean;
}
interface IScaleViewerState {
  rootPitch: Pitch;
  scaleTypeGroup: ScaleTypeGroup;
  scaleType: ScaleType;
}

export class ScaleViewer extends React.Component<IScaleViewerProps, IScaleViewerState> {
  public constructor(props: IScaleViewerProps) {
    super(props);

    this.state = {
      rootPitch: new Pitch(PitchLetter.C, 0, 4),
      scaleTypeGroup: this.scaleTypeGroups[0],
      scaleType: this.scaleTypeGroups[0].scaleTypes[0]
    };
  }

  public render(): JSX.Element {
    const title = this.props.title
      ? this.props.title
      : "Scale Viewer";
    
    const pitches = ChordScaleFormula.parse(this.state.scaleType.formulaString).getPitches(this.state.rootPitch);
    const pitchStrings = pitches
      .map(pitch => pitch.toString(false));
    const pitchesString = pitchStrings.join(", ");

    const intervals = this.state.scaleType.getIntervals();
    const intervalStrings = intervals
      .map((interval, i) => (i === 0) ? "R" : interval.toString());
    const intervalsString = intervalStrings.join(", ");

    const pianoGuitarStyle = { width: "100%", maxWidth: "400px", height: "auto" };

    const pianoSize = new Size2D(400, 100);
    const guitarSize = new Size2D(400, 140);
    
    const onKeyPress = this.props.playSimultaneously
      ? ((pitch: Pitch) => {
        const pitchMidiNumberNoOctaves = pitches.map(p => p.midiNumberNoOctave);

        if (Utils.arrayContains(pitchMidiNumberNoOctaves, pitch.midiNumberNoOctave)) {
          playPitches([pitch]);
        }
      })
      : (pitch: Pitch) => PianoScaleDronePlayer.onKeyPress(this.state.scaleType, this.state.rootPitch, pitch);
    
    const showPianoKeyboard = (this.props.showPianoKeyboard !== undefined)
      ? this.props.showPianoKeyboard
      : true;
    const showGuitarFretboard = (this.props.showGuitarFretboard !== undefined)
      ? this.props.showGuitarFretboard
      : true;

    const guitarRootPitch = new Pitch(
      this.state.rootPitch.letter,
      this.state.rootPitch.signedAccidental,
      this.state.rootPitch.octaveNumber - 2
    );
    
    const baseButtonStyle: any = { textTransform: "none" };

    const numPitchesToPlay = showPianoKeyboard
      ? pitches.length
      : getPreferredGuitarScaleShape(this.state.scaleType, this.state.rootPitch, getStandardGuitarTuning(6)).length;

    return (
      <Card>
        <CardContent>
          <div style={{display: "flex"}}>
            <Typography gutterBottom={true} variant="h5" component="h2" style={{flexGrow: 1}}>
              {title}
            </Typography>
          </div>
        
          <div style={{textAlign: "center"}}>
            <Typography gutterBottom={true} variant="h6" component="h4">
              Root Pitch
            </Typography>
            <div style={{padding: "1em 0"}}>
              {this.renderRootPitchRow(validSharpKeyPitches)}
              {this.renderRootPitchRow(validNaturalKeyPitches)}
              {this.renderRootPitchRow(validFlatKeyPitches)}
            </div>
            
            <Typography gutterBottom={true} variant="h6" component="h4">
              Category
            </Typography>
            <div style={{padding: "1em 0"}}>
              {this.scaleTypeGroups.map(scaleTypeGroup => {
                return (
                  <Button
                    key={scaleTypeGroup.name}
                    onClick={event => this.onScaleTypeGroupClick(scaleTypeGroup)}
                    variant="contained"
                    style={baseButtonStyle}
                  >
                    {scaleTypeGroup.name}
                  </Button>
                );
              })}
            </div>

            <Typography gutterBottom={true} variant="h6" component="h4">
              Type
            </Typography>
            <div style={{padding: "1em 0"}}>
              {this.state.scaleTypeGroup.scaleTypes.map(scaleType => {
                const buttonStyle: any = { ...baseButtonStyle };
                const isPressed = scaleType.name === this.state.scaleType.name;
                if (isPressed) {
                  buttonStyle.backgroundColor = "#959595";
                }

                return (
                  <Button
                    key={scaleType.name}
                    onClick={event => this.onScaleTypeClick(scaleType)}
                    variant="contained"
                    style={buttonStyle}
                  >
                    {scaleType.name}
                  </Button>
                );
            })}
            </div>
            <div style={{fontSize: "1.5em"}}>
              <p>{this.state.rootPitch.toString(false)} {this.state.scaleType.name}</p>
              <p>{pitchesString}</p>
              <p>{this.state.scaleType.formulaString}</p>
              <p>{intervalsString}</p>
            </div>

            <div>
              <p>
                <ScaleAudioPlayer scale={this.state.scaleType} rootPitch={this.state.rootPitch} pitchCount={numPitchesToPlay} onGetExports={e => this.stopPlayingAudioFn = e.stopPlayingFn} />
              </p>
            </div>

            <div>
              <div>
                {showPianoKeyboard ? (
                  <PianoKeyboard
                    rect={new Rect2D(pianoSize, new Vector2D(0, 0))}
                    lowestPitch={new Pitch(PitchLetter.C, 0, 4)}
                    highestPitch={new Pitch(PitchLetter.B, 0, 5)}
                    onKeyPress={onKeyPress}
                    renderExtrasFn={metrics => PianoScaleDronePlayer.renderExtrasFn(metrics, pitches, this.state.rootPitch)}
                    style={pianoGuitarStyle}
                  />
                ) : null}
              </div>

              <div style={{marginTop: "1em"}}>
                {showGuitarFretboard ? (
                  <GuitarScaleViewer
                    scaleType={this.state.scaleType}
                    rootPitch={guitarRootPitch}
                    size={guitarSize}
                    renderAllScaleShapes={this.props.renderAllScaleShapes} />
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  private get scaleTypeGroups(): Array<ScaleTypeGroup> {
    return this.props.scaleTypeGroups
      ? this.props.scaleTypeGroups
      : ScaleType.Groups;
  }
  private renderRootPitchRow(rootPitches: Array<Pitch | null>): JSX.Element {
    const useGuitarRootPitches = this.props.showPianoKeyboard === false;

    return (
      <div>
        {rootPitches.map(pitch => {
          const style: any = { textTransform: "none" };
          
          const isPressed = pitch && (pitch.equalsNoOctave(this.state.rootPitch));
          if (isPressed) {
            style.backgroundColor = "#959595";
          }

          return (
            pitch
              ? (
                <Button
                  onClick={event => this.onRootPitchClick(pitch)}
                  variant="contained"
                  style={style}
                >
                  {pitch.toString(false)}
                </Button>
              )
              : (
                <Button
                  variant="contained"
                  style={{ visibility: "hidden" }}
                />
              )
          );
        })}
      </div>
    );
  }

  private onRootPitchClick(rootPitch: Pitch) {
    this.setState({ rootPitch: rootPitch }, this.onScaleChange.bind(this));
  }
  private onScaleTypeGroupClick(scaleTypeGroup: ScaleTypeGroup) {
    this.setState({ scaleTypeGroup: scaleTypeGroup }, this.onScaleChange.bind(this));
  }
  private onScaleTypeClick(scaleType: ScaleType) {
    this.setState({ scaleType: scaleType }, this.onScaleChange.bind(this));
  }

  private stopPlayingAudioFn: (() => void) | null = null;

  private onScaleChange() {
    if (this.stopPlayingAudioFn) {
      this.stopPlayingAudioFn();
      this.stopPlayingAudioFn = null;
    }
  }
}