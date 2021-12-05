import React from 'react';
//import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';



export default function Contact() {
  return (
    <MDBFooter bgColor='light' className="font-medium pt-6 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="5">
            <h5 className="title">Restaurant Timing:</h5>
            <p>
               We are open from: <br/>
               Monday-Friday    :11:30 AM - 10:00 PM <br/>  
               Saturday    :   11:30 AM - 10:30 PM   <br/>  
               Sunday  :   11:30 AM - 09:30 PM    <br/>
            </p>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title"> Contact us!</h5>
            <ul>
               <li><i class="bi bi-telephone-fill"> Phone: ########## </i></li>
               <li><i class="bi bi-envelope-check"> Email: thelemontree@gmail.com </i></li>  
              
            </ul>
          </MDBCol>
          <MDBCol md="2">
            <h5 className="title">Follow us on:</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!"><i class="bi bi-instagram"> Instagram</i></a>
              </li>
              <li className="list-unstyled">
                <a href="#!"><i class="bi bi-facebook">Facebook</i></a>
              </li>
              <li className="list-unstyled">
                <a href="#!"><i class="bi bi-snapchat">Pintrest</i></a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:TheLemontree.com 
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}


