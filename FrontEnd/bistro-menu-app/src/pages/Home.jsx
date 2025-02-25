import { Form, Button, Container } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <h2>Home Page</h2>

        <div className='row border search-filter'>
            <div className='col-6'>
                <input class="form-control me-2 boarderless-form" type="search" placeholder="Search" aria-label="Search" />
            </div>
            <div className='col-6'>
                <input class="form-control me-2 boarderless-form" type="Filter" placeholder="Filter" aria-label="Filter" />
            </div>
        </div>
        <div className='row'>




        </div>


    </Container>
  );
}

export default Home;