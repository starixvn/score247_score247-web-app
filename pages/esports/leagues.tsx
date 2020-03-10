import * as React from "react";
import Layout from "../../components/layout";
import { LocalizedPage, withTranslation } from "../../common/helpers/Localizer";
import { CommonResourceKey, ResourceType } from "../../common/resources";

const LeaguesPage: LocalizedPage = ({ t }) => {
  const breadcrumbs = [t(CommonResourceKey.E_SPORTS), t(CommonResourceKey.LEAGUES)];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <h1>E-Sports - Leagues</h1>
    </Layout>
  );
};

LeaguesPage.getInitialProps = async () => {
  return {
    namespacesRequired: [ResourceType.E_SPORTS]
  };
};

export default withTranslation()(LeaguesPage);
