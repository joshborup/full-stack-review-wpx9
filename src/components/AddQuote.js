import React from 'react';

function AddQuote(props) {
  const { user } = props;
  
  return (
    <div>
      {user
        ? <div>You COULD add a quote here</div>
        : <div>You need to log in</div>
      }
    </div>
  )
}