import React from 'react';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

type Token = {
	token: string;
}
interface QueryParams extends Request {
	query: Token;
}

export default function ResetPage(request: QueryParams) {
	const { query } = request;
  if (!request.query?.token) {
    return (
      <div>
        <p>Sorry, you need a token to be here</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset Your Password {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
