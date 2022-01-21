import Layout from "../../../components/Layout";
import CampaignContract from "../../../ethereum/campaign";
import { Button, Card, Grid, GridColumn, GridRow } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../components/ContributeForm";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { params } = context;
  const address = params.address;
  const campaign = CampaignContract(address);

  const summary = await campaign.methods.getSummary().call();

  return {
    props: { 
      address: address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      contributersCount: summary[3],
      manager: summary[4],
    },
  };
}

function CampaignDetails(props) {
  const {
    address,
    minimumContribution,
    balance,
    requestsCount,
    contributersCount,
    manager,
  } = props;

  const renderCards = () => {
    const items = [
      {
        header: (
          <span
            className="header"
            style={{
              width: "100%",
              overflowWrap: "break-word",
              textOverflow: "ellipsis",
            }}
          >
            {manager}
          </span>
        ),
        description:
          "The Manager created this campaign, and can create requests to withdraw money.",
        meta: "Address of Manager",
      },
      {
        header: minimumContribution,
        description:
          "You must contribute at least " +
          minimumContribution +
          " (wei) to become an approver.",
        meta: "Minimum Contribution (wei)",
      },
      {
        header: requestsCount,
        description:
          "A request tries to withdraw money from a contract. Request must be approved by approvers.",
        meta: "Number of Requests",
      },
      {
        header: contributersCount,
        description:
          "Number of people who have already donated for this campaign.",
        meta: "Number of Approvers",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        description:
          "The Balance is how much money this campaign has left to sepnd.",
        meta: "Campaign Balance (eth)",
      }
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h2>Campaign Details</h2>
      <Grid>
        <GridRow>
        <GridColumn width={10}>
          {renderCards()}
        </GridColumn>
        <GridColumn width={6}>
          <ContributeForm address={props.address} />
        </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
          <Link href={`/campaigns/${address}/requests`}>
            <Button primary>View Requests</Button>
          </Link>
          </GridColumn>
        </GridRow>
      </Grid>
    </Layout>
  );
}

export default CampaignDetails;
