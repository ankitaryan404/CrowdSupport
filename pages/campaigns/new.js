import Layout from "../../components/Layout";
import { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

function CampaignNew() {
  const route = useRouter();
  const [minContr, setMinContr] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const accounts = await web3.eth.getAccounts();
    setError("");
 
    try {
      await factory.methods.createCampaign(minContr).send({
        from: accounts[0],
      });
      route.push('/');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h3>Create a campaign</h3>
      <Form onSubmit={onSubmit} error={!!error}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minContr}
            onChange={(e) => setMinContr(e.target.value)}
          />
        </Form.Field>

        <Message error header="Oops" content={error} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

export default CampaignNew;
