import React, { useState } from "react";
import {
  Button,
  Modal,
  ListGroup,
  ListGroupItem,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import NumericInput from "react-numeric-input";

const ModalExample = props => {
  const { buttonLabel, className, item } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  var Quantity = 0;

  return (
    <div>
      <Button outline color="info" onClick={toggle} block>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody>
          <h3>Description</h3>
          {item.desc}
          <br /> <h3>Benefits</h3>
          <ListGroup flush>
            {item.benefits.map(b => (
              <ListGroupItem disabled>{b}</ListGroupItem>
            ))}
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              toggle();
            }}
          >
            Close
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
