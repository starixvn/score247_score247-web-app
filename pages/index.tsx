import * as React from "react";
import Layout from "../components/layout";
import DateBar from "../components/common/date-bar";
import Banner from "../components/common/banner";
import { DateTimeFormat } from "../common/constants";
import { WithTranslation } from "next-i18next";
import { isSameDay } from "date-fns";
import { formatDate } from "../common/helpers/date-time-helper";
import DateSwitch from "../components/common/date-switch";
import FilterSoccerTable from "../components/soccer/filter-table";
import { SoccerSignalRClient } from "../apis/soccer/soccer-signalr-client";
import appSettings from "../app-settings";
import { MatchEventSignalRMessage } from "../apis/soccer/models/signalr-messages";
import { DeviceContextConsumer } from "../contexts/device-context";
import { DeviceContextType } from "../contexts/device-context-type";
import withLoadingPage from "../hoc/with-loading-page";
import LeftBar from "../components/common/left-bar";
import RightBar from "../components/common/right-bar";
import { ResourceType, CommonResourceKey } from "../common/resources";
import { withTranslation } from "../common/helpers/Localizer";

type State = {
  selectedDate: Date;
  onlyLiveMatch: boolean;
  soccerSignalRClient?: SoccerSignalRClient;
};

class SoccerPage extends React.Component<WithTranslation, State> {
  today: Date = new Date();
  filterSoccerTable: React.RefObject<FilterSoccerTable>;
  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      onlyLiveMatch: false,
      soccerSignalRClient: undefined
    };
    this.filterSoccerTable = React.createRef<FilterSoccerTable>();
  }

  static async getInitialProps() {
    return {
      namespacesRequired: [ResourceType.SOCCER]
    };
  }

  async componentDidMount() {
    this.setupSignalClient();
  }

  matchEventHandler = (message: MatchEventSignalRMessage) => {
    this.filterSoccerTable.current?.matchEventHandler(message);
  };

  handleDateChange = async (date: Date) => {
    this.setState({
      selectedDate: date,
      onlyLiveMatch: false
    });

    await this.filterSoccerTable.current?.handleDateChange(date);
  };

  handleLiveButtonClick = async () => {
    this.setState({ onlyLiveMatch: true });
    await this.filterSoccerTable.current?.handleLiveButtonClick();
  };

  private setupSignalClient() {
    const eventHandlers = {
      MatchEvent: this.matchEventHandler
    };

    const client = new SoccerSignalRClient(
      appSettings.soccerPublisherUrl,
      eventHandlers
    );

    this.setState(
      {
        soccerSignalRClient: client
      },
      () => {
        client.start();
      }
    );
  }

  renderDateSwitch = ({ isMobile }: DeviceContextType) => (
    <>
      {!this.state.onlyLiveMatch && !isMobile && (
        <DateSwitch
          currentDate={this.state.selectedDate}
          onClick={this.handleDateChange}
        />
      )}
    </>
  );

  buildBreadcrumbs = () => {
    const { t, i18n } = this.props;
    const breadcrumbs = [t(CommonResourceKey.SOCCER)];

    if (this.state.onlyLiveMatch) {
      breadcrumbs.push(t(CommonResourceKey.LIVE_MATCH));
    } else {
      breadcrumbs.push(
        isSameDay(this.today, this.state.selectedDate)
          ? this.props.t(CommonResourceKey.TODAY)
          : formatDate(
              this.state.selectedDate,
              DateTimeFormat.DATE_ONLY,
              i18n.language
            )
      );
    }

    return breadcrumbs;
  };

  render() {
    const { t } = this.props;
    const breadcrumbs = this.buildBreadcrumbs();
    
    return (
      <Layout title={t(CommonResourceKey.SOCCER)} breadcrumbs={breadcrumbs}>
        <LeftBar />
        <div className="main-container">
          <Banner url="#" imgSrc="/static/images/ads-banner-1.jpg" />
          <DateBar
            onDateChange={this.handleDateChange}
            onLiveMatchChange={this.handleLiveButtonClick}
            onlyLiveMatch={this.state.onlyLiveMatch}
            selectedDate={this.state.selectedDate}
          />
          <div className="content">
            <FilterSoccerTable ref={this.filterSoccerTable} />
            <DeviceContextConsumer>
              {this.renderDateSwitch}
            </DeviceContextConsumer>
          </div>
        </div>
        <RightBar />
      </Layout>
    );
  }
}

export default withTranslation()(SoccerPage);
