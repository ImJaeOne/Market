import './index.css';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Divider, message } from 'antd';
import axios from 'axios';

function LoginPageComponent() {
    const history = useHistory();
    const onSubmit = (values) => {
        console.log(values);
        axios
            .post('http://localhost:3006/api/loginCheck', {
                userEmail: values.userEmail,
                userPW: values.userPW,
            })
            .then((result) => {
                console.log('로그인 :', result);
                message.info(`로그인 성공`);
                history.push(`/`);
            })
            .catch((error) => {
                message.error(`로그인 실패`);
                console.error(error);
            });
    };
    return (
        <div id="login-wrap">
            <div id="login-headline">로그인</div>
            <Form name="login" onFinish={onSubmit}>
                <Form.Item name="userEmail" rules={[{ required: true, message: '아이디를 입력해주세요.' }]}>
                    <div className="textinput">
                        <img
                            src="/images/free-icon-email-closed-outlined-back-envelope-interface-symbol-54290.png"
                            className="id-img-icon"
                            alt="id-icon"
                        />
                        <Input className="login-placeholder" size="large" placeholder="아이디" />
                    </div>
                </Form.Item>
                <Form.Item name="userPW" rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}>
                    <div>
                        <img src="/images/padlock.png" className="pw-img-icon" alt="pw-icon" />
                        <Input.Password className="login-placeholder" size="large" placeholder="비밀번호" />
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button id="login-submit-btn" size="large" htmlType="submit">
                        로그인
                    </Button>
                </Form.Item>
                <Divider />
                <Button
                    id="to-signup-btn"
                    onClick={() => {
                        history.push('/signup');
                    }}
                >
                    회원 가입
                </Button>
            </Form>
        </div>
    );
}

export default LoginPageComponent;
