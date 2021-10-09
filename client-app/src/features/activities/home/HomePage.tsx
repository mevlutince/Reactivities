import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment ,Image, Button } from "semantic-ui-react";

export default function HomePage(){
    return(
       <Segment inverted textAlign='center' vertical className='masthead'>
           <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='assets/logo.png' style ={{marginBottom:12}}/>
                    Reactivities
                </Header>
                <Header as='h2' inverted content='Welcome to Reactivities' />
                <Button as={Link} to='/activities' size='huge'>Take me to Activities!</Button>
           </Container>
       </Segment>
    )

}



<Container style={{margin:'7em'}}>
<h1>Here is Home Page</h1>
<h3>Go to <Link to='/activities'>Activities</Link></h3>
</Container>