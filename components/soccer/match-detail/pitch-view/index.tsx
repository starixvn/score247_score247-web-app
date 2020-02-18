import React from "react";

type Props = {
  pitchView: string;
};

export default function PitchView(props: Props) {
    return(
      <div className="pitch-view" dangerouslySetInnerHTML={{__html: props.pitchView}}>
      </div>
    );
}
