//import web3 from "../ethereum/web3";
import Link from "next/link";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { CardGroup, Button } from "semantic-ui-react";
 
  
//const campaigns = await factory.methods.getCampaign().call();
export async function getStaticProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {
    props: {
      campaigns: campaigns,
    },
  };
}  
function Index(props) {
  
  const renderCampaigns = () => {
    const items = props.campaigns.map((campaign) => {
      return {
        header: campaign,
        description:(<Link href={`/campaigns/${campaign}`}><a>View Campaign</a></Link>),
        fluid: true,
      };
    });

    return <CardGroup items={items} />;
  };

  
  return (
    
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new"><a>
        <Button
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        />
        </a></Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
}
export default Index;
