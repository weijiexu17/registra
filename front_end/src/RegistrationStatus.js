import React, { Component } from 'react';

class RegistrationStatus extends React.Component{
   render() {
      return (
         <div>
            {this.props.statusProp.registered && (
              <div>
                <h3> {this.props.statusProp.message}</h3>
                <br/><br/>
                <a href="https://www.gohealthuc.com/about/">Click here to go to GoHealth Urgent Care</a>
            </div>
            )}
         </div>
      )
   }
}

export default RegistrationStatus;