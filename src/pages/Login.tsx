
import { Button } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();

    const [login, ] = useLoginMutation();

    const onsubmit = async (data:FieldValues) => {
        const toastId = toast.loading('Loading in')
        try {
            const userInfo = {
                id: data.id,
                password: data.password
            };
            const res = await login(userInfo).unwrap();
            const user = verifyToken(res.data.accessToken) as TUser;
            console.log(user)
            dispatch(setUser({ user: user, token: res.data.accessToken }));
            toast.success('Logged in successfully!', { id: toastId, duration: 2000 })
            navigate(`/${user.role}/dashboard`)
        } catch (error) {
            toast.error('Something went wrong!', { id: toastId, duration: 2000 })
        }
    }
    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <div>
                <label htmlFor="id">ID</label>
                <input type="text" id='id' {...register('id')} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="text" id='password' {...register('password')} />
            </div>
            <Button htmlType='submit'>Login</Button>
        </form>
    );
};

export default Login;