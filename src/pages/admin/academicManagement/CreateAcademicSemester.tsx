import { Button, Col, Flex } from "antd";
import PHFrom from "../../../components/form/PHFrom";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";


const CreateAcademicSemester = () => {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
    }
    return (
        <Flex justify="center" align="center"> 
            <Col span={6}>
                <PHFrom onSubmit={onSubmit}>
                    <PHInput type="text" name="name" label="Name"/>
                    <PHInput type="text" name="year" label="Year" />
                    <PHSelect />
                    <Button htmlType="submit">Submit</Button>
                </PHFrom>
            </Col>
        </Flex>

    );
};

export default CreateAcademicSemester;