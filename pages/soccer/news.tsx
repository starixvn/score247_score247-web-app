import * as React from "react";
import Layout from "../../components/layout";
import { LocalizedPage, withTranslation } from "../../common/helpers/Localizer";
import { CommonResourceKey, ResourceType } from "../../common/resources";

const NewsPage: LocalizedPage = ({ t }) => {
  const breadcrumbs = [t(CommonResourceKey.SOCCER), t(CommonResourceKey.NEWS)];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <h1>Soccer - News</h1>
    </Layout>
  );
};

NewsPage.getInitialProps = async () => {
  return {
    namespacesRequired: [ResourceType.SOCCER]
  };
};

export default withTranslation()(NewsPage);
