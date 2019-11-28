import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NumericInput from "react-numeric-input";

const ModalExample = props => {
  const { buttonLabel, className, item } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  var Quantity = 0;

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        
        <ModalBody>
         {"  "}
          {item.desc
                }
          
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