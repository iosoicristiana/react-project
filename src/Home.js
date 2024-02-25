import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default Home;