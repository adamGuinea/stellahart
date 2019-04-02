# stellahart

Online store with React and GraphQL, follow <a href="https://stellahart-next.herokuapp.com/">this link</a> to see. Sign in with email: 'user@gmail.com' password: 'user' to access account permissions and order history. Currently hosted on a free Heroku dyno which sleeps after 30mins, please be patient on initial load.

# <h2>Features</h2>

<ul>
  <li>
      <p>React</p>
    <ul>
      <li><strong>Next.js</strong> for server-side rendering, routing, and tooling</li>
      <li>Using <strong>Styled Components</strong> for consistency and to avoid potential collisions</li>
      <li><strong>React-Apollo</strong> for interfacing with Apollo Client
    </ul>
  </li>

  <li>
    <p>Apollo Client</p>
    <ul>
      <li>For performing GraphQL mutations</li>
      <li>Fetching GraphQL queries</li>
      <li>Caching data</li>
      <li>Error and loading UI states</li>
    </ul>
 </li>
 
  <li>
    <p>GraphQL Yoga</p>
    <ul>
      <li>Implementing query and mutation resolvers</li>
      <li>Custom server-side logic</li>
      <li>Charging credit cards</li>
      <li>Sending email</li>
      <li>Performing authentication</li>
      <li>Checking permissions</li>
    </ul>
  </li>

  <li>
      <p>Prisma</p>
    <ul>
      <li>Queried directly from yoga server</li>
      <li>For interfacing with data relationships</li>
      <li>Providing a set of CRUD APIs for MySQL database</li>
    </ul>
  </li>
