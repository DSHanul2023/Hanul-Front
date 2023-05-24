import SideBarComponent from "./sections/sidebarcomponent";
import BoardComponent from "./sections/boardcomponent";
import { Row, Col } from 'reactstrap';

const CommunityComponents = () => {
    return (
      <div>
        <div className='community'>
          <Row>
            <Col md="3">
              <SideBarComponent />
            </Col>
            <Col>
              <BoardComponent />
            </Col>
          </Row>
        </div>
      </div>
    );
  };
  
  export default CommunityComponents;