import { Button, Col, Flex } from "antd";
import PHFrom from "../../../components/form/PHFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthsOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademiSemesterMutation } from "../../../redux/features/admin/academicMangement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
    const [addAcademicSemester] = useAddAcademiSemesterMutation()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Loading...")
        console.log(data)
        const name = semesterOptions[Number(data?.name) - 1]?.label
        const semesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth
        }
        try {
            const res = (await addAcademicSemester(semesterData))as TResponse;
            if (res.error) {
                toast.error(res.data.error.message, { id: toastId })
            } else {
                toast.success("Semester created !", { id: toastId })

            }
        } catch (err) {
            toast.error("something went wrong ", { id: toastId })
        }
        console.log(semesterData)
    }
    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <PHFrom onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>

                    <PHSelect label="Name" name="name" options={semesterOptions} />
                    <PHSelect label="Year" name="year" options={yearOptions} />
                    <PHSelect
                        label="Start Month"
                        name="startMonth"
                        options={monthsOptions}
                    />
                    <PHSelect label="End Month" name="endMonth" options={monthsOptions} />
                    <Button htmlType="submit">Submit</Button>
                </PHFrom>
            </Col>
        </Flex>

    );
};

export default CreateAcademicSemester;