import { Button,Table } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import CampaignContract from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

export async function getServerSideProps(context) {
  const { params } = context;
  const address = params.address;
  const campaign = CampaignContract(address);
  const requestsLength = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestsLength))
      .fill()
      .map((element,index) => {
        return campaign.methods.requests(index).call();
      })
  );
  // console.log(requests);
  return {
    props: {
      address: address,
      requestsLength: requestsLength,
      requests: JSON.parse(JSON.stringify(requests)),
      approversCount:approversCount
    },
  };
}

function Requests(props) {
  const { address, requestsLength,requests,approversCount} = props;
  const { Header, HeaderCell, Row, Body } = Table;
  

  const renderRows=()=>{
    return requests.map((request,index)=>{
      return(
        <RequestRow request={request} id={index} key={index} address={address} approversCount={approversCount}/>
    )
    })
  }

  return (
    <>
      <Layout>
        <h3>Requests List</h3>
        <Link href={`/campaigns/${address}/requests/new`}>
          <Button primary floated="right">Add Request</Button>
        </Link>
        <Table style={{ marginTop: '5rem' }} striped celled textAlign="center">
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>ApprovalsCount</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {renderRows()}
                    </Body>
                </Table>
                <div>Found {requestsLength} requests</div>
      </Layout>
    </>
  );
}

export default Requests;
