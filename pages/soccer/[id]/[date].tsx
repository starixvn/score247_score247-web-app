import "../styles.scss";
import React from "react";
import Layout from "../../../components/layout";
import { LocalizedPage, withTranslation } from "../../../common/helpers/Localizer";
import SoccerMatchDetail from "../../../components/soccer/match-detail";
import { CommonResourceKey, ResourceType, SoccerResourceKey } from "../../../common/resources";

type Props = {
    matchId: string | string[];
    eventDate: string
};

const SoccerMatchDetailPage: LocalizedPage<Props> = props => {
    const { t, matchId, eventDate } = props;
    return (
        <Layout
            title={t(CommonResourceKey.SOCCER)}
            breadcrumbs={[
                t(CommonResourceKey.SOCCER),
                t(SoccerResourceKey.MATCH_INFO, { ns: ResourceType.SOCCER })
            ]}
        >
            <SoccerMatchDetail matchId={matchId} eventDate={eventDate} />
        </Layout>
    );
};

SoccerMatchDetailPage.getInitialProps = async ({ query }) => {
    const { id, date } = query;

    return {
        matchId: id,
        eventDate: date.toString(),
        namespacesRequired: [ResourceType.SOCCER]
    };
};

export default withTranslation()(SoccerMatchDetailPage);
