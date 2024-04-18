import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomInput from '../CustomInput/CustomInput';
import Button from '../Button/Button';
import CustomForm from '../CustomForm/CustomForm';
import s from './AuthForm.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { getToastStyles } from '../../helpers/helpers';
import Notification from '../Notification/Notification';
import { Link } from 'react-router-dom';

function AuthForm({ formType = 'login' }) {
    function onSubmit(values, actions) {
        console.log(values);
        toast.success('Success!');
        actions.resetForm();
    }

    const initialValues = {
        ...(formType === 'register' && { name: '' }),
        email: '',
        password: '',
    };

    const authSchema = Yup.object().shape({
        ...(formType === 'register' && { name: Yup.string().min(3, 'Too short').max(50, 'Too long').required('Required') }),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(5, 'Too short').required('Required'),
    });

    return (
        <div className={s.form_wrapper}>
            <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={authSchema}>
                <CustomForm>
                    {formType === 'register' && <CustomInput customInputType="name">Enter your name</CustomInput>}
                    <CustomInput customInputType="email">Enter your email</CustomInput>
                    <CustomInput customInputType="password" type="password">
                        Enter your password
                    </CustomInput>
                    <Button type="submit">{formType}</Button>
                </CustomForm>
            </Formik>
            <Notification>
                You {formType === 'register' ? 'already have an account?' : "don't have an account?"}{' '}
                <Link className={s.link} to={formType === 'register' ? '/login' : '/register'}>
                    {formType === 'register' ? 'Login' : 'Register'}
                </Link>
            </Notification>
            <Toaster {...getToastStyles()} />
        </div>
    );
}

export default AuthForm;
