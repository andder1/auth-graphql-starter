import React from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/getCurrentUser';

const Dashboard = () => {  
  return (
    <div>
      <h3>Dashboard</h3>
    </div>
  )
}

export default graphql(query)(Dashboard);
