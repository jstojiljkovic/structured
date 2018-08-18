import React from 'react';
import { Button } from "reactstrap";
import Modal from "../../../../components/user-interface/modal/modal";

const compete = (props) => (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h3> </h3>
        <div className="btn-toolbar mb-2 mb-md-0">
            <h4 className="m-auto" style={{position: 'absolute', left: '0%', paddingLeft: '1.5rem'}}>
                {props.competeType === 'COMPETE_BREADTH'
                    ? 'Breadth-first search'
                    : 'Depth-first search'
                }
            </h4>

            <Button outline color="secondary"
                    disabled={!props.graphManaged}
                    onClick={() => props.competeEnded()}
            >
                <i className="fas fa-check"></i> Submit solution
            </Button>

            <Modal title="Help!" buttonCondition buttonLabel="Help!" buttonClass="btn-outline">
                {props.competeHelp()}
            </Modal>
        </div>
    </div>
);


export default compete;