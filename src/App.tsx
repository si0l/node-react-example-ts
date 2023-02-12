import React from 'react';
import axios, { AxiosResponse } from 'axios';
import Loading from './components/Loading';

type MyProps = object;

type MyState = {
  users: MyUser[],
  loading: boolean
};

type MyUser = {
  id: {
    value: string
  },
  cell: string,
  name: {
    first: string,
  }
};

class App extends React.Component<MyProps, MyState> {

  constructor(props: MyProps) {
    super(props);
    this.state = {
      users: [],
      loading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getUsers(): Promise<void> {
    this.setState({ loading: true });
    const response: AxiosResponse = await axios('https://api.randomuser.me/?nat=US&results=5');
    this.setState({ users: [...this.state.users, ...response.data.results] })
    this.setState({ loading: false });
  }

  async componentDidMount() {
    this.getUsers();
  }

  render() {
    const { loading, users } = this.state;
    return <div className='App'>
      <form onSubmit={this.handleSubmit}>
        <input type='submit' value='Load users'></input>
      </form>
      {loading ? <Loading message="Loading" /> : users.map(user =>
        <div key={user.id.value}>
          <h3 style={{ color: 'red' }}>{user.name.first}</h3>
          <div>{user.cell}</div>
        </div>)}
    </div>
  }

  handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    this.getUsers();
    console.log('users loaded');
  }

}

export default App;
