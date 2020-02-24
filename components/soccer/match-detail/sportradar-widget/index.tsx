import "./style.scss";
import React from "react";

type Props = {
    matchId: string;
    widgetId: string;
    tabName: string;
    disablePitch?: boolean;
    className?: string;
};

export const WidgetTab = {
    TIMELINE: "timeline",
    STATISTICS: "statistics",
    H2H: "headToHead",
    STANDINGS: "standings",
    LINEUPS: "lineups"
};

class SportRadarWidget extends React.Component<Props> {
    private readonly secondIndex = 2;
    id: string;

    constructor(props: Props) {
        super(props);
        this.id = this.props.matchId.split(":")[this.secondIndex];
    }

    public static defaultProps: Partial<Props> = {
        disablePitch: true,
        className: ""
    };

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
        const { className, widgetId } = this.props;

        return (<div className={className} id={widgetId} data-sr-widget="match.lmtPlus" data-sr-match-id={this.id}></div>);
    }
}

export default SportRadarWidget;