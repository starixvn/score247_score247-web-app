import "./style.scss";
import React from "react";

type Props = {
    matchId: string,
    widgetId: string,
    tabName: string,
    disablePitch: boolean
};

class SportRadarWidget extends React.Component<Props> {
    private readonly secondIndex = 2;
    id: string;

    constructor(props: Props) {
        super(props);
        this.id = this.props.matchId.split(":")[this.secondIndex];
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.async = true;
        script.innerHTML = `SIR(
            'addWidget', 
            '#${this.props.widgetId}', 
            'match.lmtPlus', 
            {
                scoreboard: 'disable', 
                momentum: 'disable',
                tabsPosition: 'disable', 
                disablePitch: '${this.props.disablePitch}',
                matchId: ${this.id},
                tabs: {1: ['${this.props.tabName}']}
            }
            );`;

        document.body.appendChild(script);
    }

    render() {
        return (<div className="ball-tracker-content" id={this.props.widgetId} data-sr-widget="match.lmtPlus" data-sr-match-id={this.id}></div>);
    }
}

export default SportRadarWidget;