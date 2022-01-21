import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, FormField, Input, Label, Message } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import CampaignContract from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";


export async function getServerSideProps(context) {
    const { params } = context;
    const address = params.address;
  
    return {
      props: {
        address: address,
      },
    };
  }

function NewRequest(props){
    const route = useRouter();
    const {address} = props
    const [value,setValue] = useState({
        description:'',
        amount:'',
        recipient:'',
        loading:false,
        errorMessage:''
    })

    const onChange = e=>{
        setValue({...value,[e.target.name]:e.target.value})
    }

    const onSubmit=async e=>{
        e.preventDefault();
        setValue(value=>({...value,loading:true,errorMessage:''}))
        const campaign = CampaignContract(address);
        const {description,amount,recipient} = value;
        
        try {
            const accounts = await web3.eth.getAccounts();
           
            await campaign.methods.createRequest(description,web3.utils.toWei(amount,'ether'),recipient).send({
                from: accounts[0]
            })
           route.push(`/campaigns/${address}/requests`)
            
        } catch (err) {
            setValue(value=>({...value,errorMessage:err.message}))
        }
        setValue(value=>({...value,loading:false}))
    }

    return(
        <Layout>
            <Link href={`/campaigns/${address}/requests`}>
            <Button>Back</Button></Link>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!!value.errorMessage}>
                <FormField>
                    <Label>Description</Label>
                    <Input value={value.description} name="description" onChange={onChange}/>
                </FormField>
                <FormField>
                    <Label>Value in Ether</Label>
                    <Input value={value.amount} name="amount" onChange={onChange}/>
                </FormField>
                <FormField>
                    <Label>Recipient</Label>
                    <Input value={value.recipient} name="recipient" onChange={onChange}/>
                </FormField>
                <Message error header="Oops!" content={value.errorMessage}/>
                <Button primary loading={value.loading}>Create!</Button>
            </Form>
        </Layout>
    )
}

export default NewRequest;