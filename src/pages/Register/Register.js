// import React, { useState } from 'react';
// import { Form, Input, Button } from 'antd';
// import { http } from '../../services/config';

// const RegisterForm = ({ history }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await http.post('/register', formData);
//       console.log(response.data); 
//       history.push('/login'); 
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <Form onFinish={handleSubmit}>
//       <Form.Item label="Username" name="username" rules={[{ required: true }]}>
//         <Input onChange={handleInputChange} />
//       </Form.Item>
//       <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
//         <Input onChange={handleInputChange} />
//       </Form.Item>
//       <Form.Item label="Password" name="password" rules={[{ required: true }]}>
//         <Input.Password onChange={handleInputChange} />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Đăng ký
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default RegisterForm;
