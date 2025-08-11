import { Button, Modal } from 'react-bootstrap'

interface Props {
    show: boolean,
    handleClose: () => void,
}

export default function AddProduct({ show, handleClose }: Props) {
    return (
        <Modal show={show} centered size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
