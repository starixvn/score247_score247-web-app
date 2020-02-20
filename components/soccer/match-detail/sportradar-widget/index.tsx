import React from "react";
import appSetting from "../../../../app-settings";

type Props = {
    matchId: string,
    widgetId: string,
    widgetName: string
};

class SportRadarWidget extends React.Component<Props> {
    componentDidMount() {
        const script = document.createElement("script");
        script.async = true;
        script.innerHTML = `(function(a,b,c,d,e,f,g,h,i){a[e]||(i=a[e]=function(){(a[e].q=a[e].q||[]).push(arguments)},i.l=1*new Date,i.o=f,
        g=b.createElement(c),h=b.getElementsByTagName(c)[0],g.async=1,g.src=d,g.setAttribute("n",e),h.parentNode.insertBefore(g,h)
        )})(window,document,"script","https://widgets.sir.sportradar.com/${appSetting.sportRadarWidgetKey}/widgetloader","SIR", {
            language: 'en'
        });
        SIR('addWidget', '#sr-widget', 'match.lmtPlus', {scoreboard: 'disable', momentum: 'disable',tabsPosition: 'top',matchId: ${this.props.matchId.split(":")[2]}, tabs: {
            1: ['statistics', 'headToHead', 'timeline', 'standings']
            }});`;

        document.body.appendChild(script);
    }

    render() {
        const secondIndex = 2;
        const id = this.props.matchId.split(":")[secondIndex];

        return (<div className="ball-tracker-content" id={this.props.widgetId} data-sr-widget={this.props.widgetName} data-sr-match-id={id}></div>);
    }
}

export default SportRadarWidget;