import './index.css';
import { Form, Input, Button, Divider } from 'antd';

function LoginPageComponent() {
    const onSubmit = (values) => {
        console.log(values);
    };
    return (
        <div id="login-wrap">
            <div id="login-headline">로그인</div>
            <Form name="login" onFinish={onSubmit}>
                <Form.Item name="userID" rules={[{ required: true, message: '아이디를 입력해주세요.' }]}>
                    <div>
                        <img src="/images/user.png" id="id-img-icon" alt="id-icon" />
                        <Input id="login-id" placeholder="아이디" />
                    </div>
                </Form.Item>
                <Form.Item name="userPW" rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}>
                    <div>
                        <img src="/images/padlock.png" id="pw-img-icon" alt="pw-icon" />
                        <Input.Password id="login-pw" placeholder="비밀번호" />
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button id="login-submit-btn" size="large" htmlType="submit">
                        로그인
                    </Button>
                </Form.Item>
                <Divider />
                <Button id="to-signup-btn">회원 가입</Button>
            </Form>
        </div>
    );
}

export default LoginPageComponent;
