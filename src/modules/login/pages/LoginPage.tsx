import authService, {
  LoginServiceParams,
} from "@/modules/login/services/auth.service";
import { Button, Card, Form, Input } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values: LoginServiceParams) => {
    const { err } = await authService.login(values);

    // handle error
    if (err) {
      toast.error(err.join(" "));
      return;
    }
    navigate("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    toast.error(errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card title="Login">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ username: "", password: "" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
