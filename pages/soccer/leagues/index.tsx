import * as React from "react";
import Layout from "../../../components/layout";
import { LocalizedPage, withTranslation } from "../../../common/helpers/Localizer";
import { CommonResourceKey, ResourceType } from "../../../common/resources";

const LeaguesPage: LocalizedPage = ({ t }) => {
  const breadcrumbs = [t(CommonResourceKey.SOCCER), t(CommonResourceKey.LEAGUES)];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <h1>Soccer - Leagues</h1>
    </Layout>
  );
};

LeaguesPage.getInitialProps = async () => {
  return {
    namespacesRequired: [ResourceType.SOCCER]
  };
};

export default withTranslation()(LeaguesPage);
