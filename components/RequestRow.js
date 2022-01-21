import {Table,Label, Button, Icon } from "semantic-ui-react";
import CampaignContract from "../ethereum/campaign";
import web3 from "../ethereum/web3";

function RequestRow(props) {
    
    const {Row,Cell} = Table;
    const { request,id,approversCount,address } = props;
    const{description,value,recipient,complete,approvalCount} = request

    const handleApprove=async ()=>{
        const accounts = await web3.eth.getAccounts();
        const campaign = CampaignContract(address);
        try {
            await campaign.methods.approveRequest(id).send({
                from:accounts[0]
            })
        
            
        } catch (error) {
            console.error(error.message)
        }
        
    }

    const readyToFinalize = approvalCount>approversCount/2;


    const handleFinalize=async ()=>{
        const accounts = await web3.eth.getAccounts();
        const campaign = CampaignContract(address);
        try {
            await campaign.methods.finalizeRequest(id).send({
                from:accounts[0]
            })
        } catch (error) {
            console.error(error.message);
        }
       
    }
  
  return (
    <Row disabled={complete} positive={readyToFinalize && !complete}>
      <Cell>
        <Label ribbon>{id}</Label>
      </Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>
        {approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {complete ? (
          <Icon color="green" name="checkmark" size="large" />
        ) : (
          <Button
            onClick={handleApprove}
            color="green"
            basic
          >
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {complete ? (
          <Icon color="green" name="checkmark" size="large" />
        ) : (
          <Button
            onClick={handleFinalize}
            color="teal"
            basic
          >
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}

export default RequestRow;
