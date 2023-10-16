import { Button, Form, Input, Modal, Select } from "antd";
import { PostRoleParams } from "../repositories/roles.repository";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import RolesService from "../services/roles.service";
import { RoleModelType } from "../store/roles.store";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { useMst } from "@/common/store/root.store";

type RoleFormModalProps = {
  open: boolean;
  editMode?: boolean;
  editData?: RoleModelType | null;
  onModalClose: () => void;
};

const formItemLayout = {
  labelCol: {
    sm: { span: 5 },
  },
  wrapperCol: {
    sm: { span: 24 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    sm: { span: 24, offset: 5 },
  },
};

export const RoleFormModal = observer(
  ({ open, editMode, editData, onModalClose }: RoleFormModalProps) => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [form] = Form.useForm();
    const store = useMst();

    const permissionsParsed = useMemo(() => {
      return store.permissions.permissions.map((item) => ({
        label: item.name,
        value: item.code,
      }));
    }, [store.permissions.permissions]);

    const filterOption = (
      input: string,
      option?: { label: string; value: string },
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const initialValues = {
      name: "",
      description: "",
      permissions: [""],
    };

    useEffect(() => {
      if (editData) {
        form.setFieldValue("name", editData.name);
        form.setFieldValue("description", editData.description);
        form.setFieldValue("permissions", editData.permissions);
      }
    }, [editData, form]);

    const createRole = async (values: PostRoleParams) => {
      const { result, err } = await RolesService.postRole(values);

      if (err) {
        toast.error(`Couldn't create role. ${err.join(" ")}`);
        setSubmitLoading(false);
        return;
      }
      toast.success("Role created");

      setSubmitLoading(false);
      onModalClose();
      form.resetFields();
    };

    const updateRole = async (values: PostRoleParams) => {
      if (!editData) {
        setSubmitLoading(false);
        return;
      }

      const { result, err } = await RolesService.putRole({
        ...values,
        id: editData?.id,
      });

      if (err) {
        toast.error(`Couldn't update role. ${err.join(" ")}`);
        setSubmitLoading(false);
        return;
      }
      toast.success("Role updated");

      setSubmitLoading(false);
      onModalClose();
      form.resetFields();
    };

    const onFormSubmit = async (values: PostRoleParams) => {
      if (editMode) updateRole(values);
      else createRole(values);
    };

    const onFormSubmitFailed = () => {
      setSubmitLoading(false);
    };

    const onModalCancel = () => {
      form.resetFields();
      onModalClose();
    };

    const onModalOk = () => {
      setSubmitLoading(true);
      form.submit();
    };
    return (
      <>
        <Modal
          title={
            editMode ? `Edit ${editData?.name || "Role"}` : "Create New Role"
          }
          open={open}
          onCancel={onModalCancel}
          footer={[
            <Button key="back" onClick={onModalCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={submitLoading}
              onClick={onModalOk}
            >
              Save
            </Button>,
          ]}
        >
          <Form
            className="mt-5"
            form={form}
            name={editMode ? "editRole" : "createRole"}
            labelCol={{ span: 5 }}
            initialValues={initialValues}
            onFinish={onFormSubmit}
            onFinishFailed={onFormSubmitFailed}
            autoComplete="off"
          >
            <Form.Item<PostRoleParams>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<PostRoleParams>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input description" }]}
            >
              <Input />
            </Form.Item>

            <Form.List
              name="permissions"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(new Error("At least 1 permission"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? "Permissions" : ""}
                      required={true}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input permission or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Select
                          showSearch
                          style={{ width: "60%" }}
                          placeholder="Select a permission"
                          optionFilterProp="children"
                          filterOption={filterOption}
                          options={permissionsParsed}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item wrapperCol={{ span: 24, offset: 5 }}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </Modal>
      </>
    );
  },
);
