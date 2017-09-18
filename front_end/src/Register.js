import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, Col, ControlLabel, Checkbox, Panel} from 'react-bootstrap'
import MaskedFormControl from 'react-bootstrap-maskedinput'

var DatePicker = require("react-bootstrap-date-picker");

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:'',
      lastName:'',
      DOB:'',
      phone:'',
      hasInsurance: false,
      insuranceCarrier:'',
      insuranceID:'',
      insuranceActive: false,
      copay: '',
      registered: false,
      message: ''
    }
    this.handleDOBChange=this.handleDOBChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleHasInsuranceChange=this.handleHasInsuranceChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.saveRegister=this.saveRegister.bind(this);
  }

  parseDate(input) {
    const split = input.split('T');
    const time = split[1]
    const day = split[0];

    return day;
  }

  handleDOBChange(value) {
    console.log("handle DOB:" + value)
    this.setState({
      DOB: value
    });

    console.log(this.state.DOB)
  }
  handleHasInsuranceChange(event) {
    console.log("existing" + event.target.id + " = " + this.state.hasInsurance)
    console.log(event.target.id + " = " + event.target.checked)
    this.setState({
      hasInsurance: event.target.checked
    });
  }
  handleChange(event) {
    console.log(event.target.id + " = " + event.target.value)
    if(event.target.id === "firstName")
      this.setState({ firstName: event.target.value });
    else if(event.target.id === "lastName")
      this.setState({ lastName: event.target.value });
    else if(event.target.id === "phone")
      this.setState({ phone: event.target.value });
    else if(event.target.id === "carrier")
      this.setState({ insuranceCarrier: event.target.value });
    else if(event.target.id === "insuranceId")
      this.setState({ insuranceID: event.target.value });
  }

  saveRegister(event){
    var apiBaseUrl = "http://localhost:8081/v1/patients/";
    
    var self = this;
    var payload = {
      "firstName": this.state.firstName,
      "lastName":this.state.lastName,
      "DOB": this.parseDate(this.state.DOB),
      "phone":this.state.phone,
      "insuranceCarrier":this.state.insuranceCarrier,
      "insuranceID":this.state.insuranceID,
      "insuranceActive": this.state.insuranceActive,
      "copay": this.state.copay
    }
    console.log(payload);
    axios.post(apiBaseUrl, payload)
      .then(function (response) {
        console.log(response);
        if(response.status < 300){
          console.log("Registration successfull");
          console.log(response.data);
          self.setState({registered:true});
        }
        else{
          console.log("Error ocurred on saving data: ", response.data.code);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit(event){
    console.log("calling handleSubmit");
    event.preventDefault();

    var eligUrl = "http://localhost:8081/v1/elig";

    var self = this;

    var elig_payload= { 
        "member": {
          "first_name": this.state.firstName,
          "last_name": this.state.lastName,
          "id": this.insuranceID,
          "birth_date": this.parseDate(this.state.DOB)
        },
        "provider": {
          "first_name": "Marty",
          "last_name": "Seeger",
          "npi": "1234567890"
        },
        "trading_partner_id": this.state.insuranceCarrier
    }
    console.log(JSON.stringify(elig_payload))

    axios.post(eligUrl, elig_payload)
     .then(function (response) {
       console.log(response.status);
        if(response.status < 300){
          console.log("data from server")
          console.log(response.data);

          if(response.data){
            var eligibility = response.data;
            var insActive = response.data.active?response.data.active:false;
            var copay = response.data.copay?response.data.copay:null;
            console.log("Is Active: " + insActive);
            var msg = "Welcome " + self.state.firstName + " " + self.state.lastName + ".";
            if(insActive){
              msg += "Your insurance is currently active, your expected copay is $" + copay + "."
            }
            else{
              msg += "You do not have health insurance."
            }
            self.setState({
              insuranceActive: insActive,
              copay: copay,
              message: msg
            });

            }
        }
        else{
          console.log("No eligibility data");
        }
        self.saveRegister(event);
     })
     .catch(function (error) {
       console.log(error);
     });

  }

  render() {
    // console.log("props",this.props);
    return (
        <div>
          <div className="form-block">
            {!this.state.registered &&(
          <Form action="" horizontal name="register"  onSubmit={this.handleSubmit} >
            <FormGroup>
              <Col smOffset={2} sm={5} componentClass={ControlLabel}>
                Please register your personal info ....
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                First Name
              </Col>
              <Col sm={5}>
                <FormControl required id="firstName" type="text" placeholder="First Name" 
                onChange ={this.handleChange} value={this.state.firstName} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Last Name
              </Col>
              <Col sm={5}>
                <FormControl required id="lastName" type="text" placeholder="Last Name" 
                onChange ={this.handleChange} value={this.state.lastName} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                DOB
              </Col>
              <Col sm={5}>
              <DatePicker id="dob-datepicker" required style={{width:'100%', backgroundColor:'#FFEEEE'}}
              onChange={this.handleDOBChange} value={this.state.DOB} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Phone number
              </Col>
              <Col sm={5}>
                <MaskedFormControl id="phone" type='text' name='phoneNumber' mask='111-111-1111'
                onChange={this.handleChange} value={this.state.phone}  />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={5}>
                <Checkbox id="hasInsurance" 
                onChange = {this.handleHasInsuranceChange} value={this.state.hasInsurance}>
                  Do you have health insurance?
                </Checkbox>
              </Col>
            </FormGroup>
            <Panel key={1} collapsible={!this.state.hasInsurance}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Insurance carrier
                </Col>
                <Col sm={5}>
                  <FormControl required={this.state.hasInsurance?"required":""} id="carrier" type="text" placeholder="Insurance Carrier" 
                  onChange ={this.handleChange} value={this.state.insuranceCarrier} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Insurance ID
                </Col>
                <Col sm={5}>
                  <FormControl required={this.state.hasInsurance?"required":""} id="insuranceId" type="text" placeholder="xxx-xxx-xxxx" 
                  onChange ={this.handleChange} value={this.state.insuranceID} />
                </Col>
              </FormGroup>
            </Panel>
            <Button bsStyle="success" type="submit">
              Register
            </Button>
          </Form>
          )}
          </div>
          <div className="res-block">

            {this.state.registered && (
              <div>
                <h3> {this.state.message}</h3>
                <br/><br/>
                <a href="https://www.gohealthuc.com/about/">Click here to go to GoHealth Urgent Care</a>
          	</div>
            )}
          </div>
        </div>
    );
  }
}

export default Register;