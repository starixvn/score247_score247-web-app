import * as React from "react";
import Layout from "../../components/layout";
import { LocalizedPage,withTranslation } from "../../common/helpers/Localizer";
import { ResourceType, CommonResourceKey } from "../../common/resources";

const TVPage: LocalizedPage = ({ t }) => {
  const breadcrumbs = [t(CommonResourceKey.E_SPORTS), t(CommonResourceKey.TV_SCHEDULES)];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <h1>E-Sports - TV</h1>
    </Layout>
  );
};

TVPage.getInitialProps = async () => {
  return {
    namespacesRequired: [ResourceType.E_SPORTS]
  };
};

export default withTranslation()(TVPage);
