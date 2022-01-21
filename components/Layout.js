import Header from './Header';
import "semantic-ui-css/semantic.min.css";
import { Container } from 'semantic-ui-react';

export default props=>{
    return(
        <Container>
            <Header/>
            {props.children}
        </Container>
    );
}