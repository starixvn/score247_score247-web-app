import React, { useState } from "react";
import GeneralInfo from "../general-info";
import BallTracker from "../ball-tracker";
import { MatchInfo } from "../../../../apis/soccer/models/match-info";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Advertisement from "../../../common/advertisement";
import { MatchLineups } from "../../../../apis/soccer/models";
import TeamLineUps from "./team-lineups";

type Props = {
  matchInfo: MatchInfo;
  matchLineUps: MatchLineups | null;
};

const Desktop: React.FC<Props> = props => {
  const [selectedTabIndex, setTab] = useState(0);

  return (
    <>
      <div className="banner-top">
        <div className="banner-left">
          <Advertisement
            imageSrc="/static/images/ads-banner-detail-2.png"
            href="#"
          />
        </div>
        <div className="banner-center">
          <Advertisement imageSrc="/static/images/ads-banner-1.png" href="#" />
        </div>
        <div className="banner-right">
          <Advertisement
            imageSrc="/static/images/ads-banner-detail-3.png"
            href="#"
          />
        </div>
      </div>
      <GeneralInfo match={props.matchInfo.Match} />

      <Tabs selectedIndex={selectedTabIndex} onSelect={setTab}>
        <div>
          <TabList>
            <Tab>Info</Tab>
            <Tab>Commentary</Tab>
            <Tab>Statistics</Tab>
            <Tab>H2H</Tab>
            <Tab>Table</Tab>
          </TabList>
        </div>
        <TabPanel forceRender={true}>
          <div className="info-tab">
            <div className="line-ups left">
              {props.matchLineUps && (
                <TeamLineUps
                  lineUps={props.matchLineUps.Home}
                  pitchView={props.matchLineUps.PitchView}
                />
              )}
              <div className="pitch-view">
                <img src="/static/images/pitch.svg" alt="pitch"></img>
              </div>
              <div className="sub-wrapper">
                <div className="substitution">
                  <div className="sub-title">substitution</div>
                  <div className="subtitution-item sub-line">
                    <div className="time">85'</div>
                    <div className="player player-in">
                      <span>3</span><span>R.Vinagre</span>
                    </div>
                    <div className="">In</div>
                    <div className="player player-out">
                      <span>7</span><span>P.Neto</span>
                    </div>
                    <div className="">Out</div>
                  </div>
                </div>
                <div className="substittute-player">
                  <div className="sub-title">Substitute player</div>
                  <div className="sub-player-item sub-line">
                    <div><span>3</span>R.Vinagre</div>
                    <div>IN</div>
                  </div>
                  <div className="sub-player-item sub-line">
                    <div><span>8</span>M.Gibbs-White</div>
                  </div>
                  <div className="sub-player-item sub-line">
                    <div><span>12</span>J.Ruddy</div>
                  </div>
                  <div className="sub-player-item sub-line">
                    <div><span>14</span>R.Bennett</div>
                  </div>
                  <div className="sub-player-item sub-line">
                    <div><span>15</span>M.Kilman</div>
                  </div>
                  <div className="sub-player-item sub-line">
                    <div><span>23</span>B.Bennett</div>
                  </div>
                  <div className="sub-player-item sub-line">
                    <div><span>34</span>O.Buur</div>
                  </div>
                </div>
                <div className="coach">
                  <div className="sub-title">Coach</div>
                  <div className="coach-name sub-line">Nuno Espirito Santo</div>
                </div>
              </div>

            </div>
            <BallTracker matchId={props.matchInfo.Match.Id} />
            <div className="line-ups right">
              {props.matchLineUps && (
                <TeamLineUps
                  lineUps={props.matchLineUps.Away}
                  pitchView={props.matchLineUps.PitchView}
                />
              )}
              <div className="pitch-view">
                <img src="/static/images/pitch.svg" alt="pitch"></img>
              </div>
              <div className="substitution"></div>
              <div className="substittute-player"></div>
              <div className="coach"></div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>This is Commentary page</TabPanel>
        <TabPanel>This is Statistics page</TabPanel>
        <TabPanel>This is H2H page</TabPanel>
        <TabPanel>This is Table page</TabPanel>
      </Tabs>
    </>
  );
};

export default Desktop;
