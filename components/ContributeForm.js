import { useRouter } from "next/router";
import { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import CampaignContract from "../ethereum/campaign";
import web3 from "../ethereum/web3";


function ContributeForm({ address }) {
    const route = useRouter();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaign = CampaignContract(address);

    setLoading(true); 
    setError("");
 
    try {
        const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value:web3.utils.toWei(amount,'ether')
      });
      route.push(`/campaigns/${address}`);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
    setAmount('');
  };

  return (
    <Form
      onSubmit={handleSubmit}
      error={!!error}
    >
      <Form.Field style={{ marginBottom: "4px" }}>
        <label>Amount To Contribute</label>
        <Input
          labelPosition="right"
          placeholder="Amount"
          label="ether"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        >
        </Input>
      </Form.Field>
      <Message error header="Oops" content={error} />
      <Button primary loading={loading} type="submit">
        CONTRIBUTE
      </Button>
    </Form>
  );
}

export default ContributeForm;
