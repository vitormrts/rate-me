import * as S from "./AddClassroomModal.style";
import { Input } from "../../inputs";
import { Button } from "../../buttons";
import { useState } from "react";
import { useClassrooms } from "../../../hooks";
import { toast } from "react-toastify";
import content from "../../../content";

const AddClassroomModal = ({ close }) => {
  const { addClassroom } = useClassrooms();

  const initialState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onSuccess = () => {
    toast.success("Classroom created successfully");
    close();
  };

  const onError = () => {
    toast.error("There was an error creating the room");
  };

  const validate = (formErrors) => {
    const isValid = Object.keys(formErrors).every((key) => !formErrors[key]);
    return isValid;
  };

  const checkEmpty = (value) => {
    if (!value) {
      return content.errors.input.empty;
    }
  };

  const handleOnClick = () => {
    const data = { ...formData };
    const formErrors = {
      name: checkEmpty(data.name),
      description: checkEmpty(data.description),
    };
    setErrors(formErrors);
    const isValid = validate(formErrors);
    if (isValid) {
      (async () => {
        const success = await addClassroom(data);
        success ? onSuccess() : onError();
      })();
    }
  };

  const onChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <S.Form>
      <S.Title>Create a classroom</S.Title>
      <Input
        label="Name"
        placeholder=""
        onChange={onChange}
        name="name"
        error={errors.name}
        value={formData.name}
      />
      <Input
        label="Description"
        placeholder=""
        onChange={onChange}
        name="description"
        error={errors.description}
        value={formData.description}
      />
      <Button text="Create classroom" onClick={handleOnClick} />
    </S.Form>
  );
};

export default AddClassroomModal;