import Row from "react-bootstrap/Row";
import {
    Form,
    Modal,
    Button,
    FormGroup,
    ModalBody,
    ModalHeader,
    ModalTitle,
    Col,
} from "react-bootstrap";

export default function TaskForm
    (
        {
            newTaskModalShowed,
            setNewTaskModalShowed,
            onSubmit,
            selectsData
        }
    )
{
    const handleSubmitForm = (event) => {

        event.preventDefault();

        const form = event.currentTarget;
        const formData = {
            title: form.title.value,
            description: form.description.value,
            priority: selectsData.priorities.find(item => item.id = Number(form.priority.value)),
            status: selectsData.statuses.find(item => item.id = Number(form.status.value)),
            executor: selectsData.executors.find(item => item.id = Number(form.executor.value)),
            date_end: form.date_end.value,
        };

        form.reset();
        setNewTaskModalShowed(false);
        onSubmit(formData);
    };

    return (
        <Modal
            show={newTaskModalShowed}
            onHide={() => setNewTaskModalShowed(false)}
            centered
        >
            <ModalHeader closeButton>
                <ModalTitle>Новая задача</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Form onSubmit={handleSubmitForm}>
                    <FormGroup controlId="title">
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Заголовок для задачи"
                            required/>
                    </FormGroup>

                    <FormGroup controlId="description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Краткое описание для задачи"
                            required/>
                    </FormGroup>

                    <FormGroup
                        controlId="executor"
                        className="horizontalBlockItem">
                        <Form.Label>Исполнитель</Form.Label>
                        <Form.Select aria-label="Исполнитель">
                            {selectsData?.executors.map((item) => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                        </Form.Select>
                    </FormGroup>

                    <Row className="mb-3">
                        <FormGroup
                            as={Col}
                            md="5"
                            controlId="priority"
                            className="horizontalBlockItem">
                            <Form.Label>Приоритет</Form.Label>
                            <Form.Select aria-label="Приоритет задачи">
                                {selectsData?.priorities.map((item) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </FormGroup>

                        <FormGroup
                            as={Col}
                            md="5"
                            controlId="status"
                            className="horizontalBlockItem">
                            <Form.Label>Статус</Form.Label>
                            <Form.Select aria-label="Статус задачи">
                                {selectsData?.statuses.map((item) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </FormGroup>

                        <FormGroup
                            as={Col}
                            md="5"
                            controlId="date_end"
                            className="horizontalBlockItem">
                            <Form.Label>Дата окончания</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="дата завершения"
                                required/>
                        </FormGroup>
                    </Row>

                    <Row className="mb-2">
                        <FormGroup md="5" as={Col}>
                            <Button
                                variant="secondary"
                                onClick={() => setNewTaskModalShowed(false)}>
                                Отмена
                            </Button>
                        </FormGroup>

                        <FormGroup md="5" as={Col}>
                            <Button variant="primary" type="submit">
                                Создать задачу
                            </Button>
                        </FormGroup>
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
}
