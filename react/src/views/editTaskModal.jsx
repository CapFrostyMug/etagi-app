import {useEffect} from "react";
import {
    Form,
    Modal,
    Button,
    FormGroup,
    ModalBody,
    ModalHeader,
    ModalTitle,
    Col,
    Row
} from "react-bootstrap";

const EditTaskModal = function EditTaskModal
    (
        {
            editTaskModalShowed,
            setEditTaskModalShowed,
            task,
            selectsData,
            onSubmit,
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

        setEditTaskModalShowed(false);
        onSubmit(formData, task.id);
    };

    useEffect(() => console.log(task), [task]);

    return (
        <Modal
            show={editTaskModalShowed}
            onHide={() => setEditTaskModalShowed(false)}
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
                            defaultValue={task.title}
                            type="text"
                            placeholder="Заголовок для задачи"
                            required/>
                    </FormGroup>

                    <FormGroup controlId="description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            defaultValue={task.description}
                            as="textarea"
                            placeholder="Краткое описание для задачи"
                            required/>
                    </FormGroup>

                    <FormGroup
                        controlId="executor"
                        className="horizontalBlockItem">
                        <Form.Label>Исполнитель</Form.Label>
                        <Form.Select aria-label="Исполнитель"
                                     defaultValue={task.executor.id}>
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
                            <Form.Select aria-label="Приоритет задачи"
                                         defaultValue={task.priority.id}>
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
                            <Form.Select aria-label="Статус задачи"
                                         defaultValue={task.status.id}>
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
                                defaultValue={task.date_end}
                                type="date"
                                placeholder="дата завершения"
                                required/>
                        </FormGroup>
                    </Row>

                    <Row className="mb-2">
                        <FormGroup md="5" as={Col}>
                            <Button
                                variant="secondary"
                                onClick={() => setEditTaskModalShowed(false)}>
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
    );
};

export default EditTaskModal;
