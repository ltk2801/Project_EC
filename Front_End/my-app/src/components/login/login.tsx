import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image'
import styles from "./login.module.css"
import background from "@/assets/images/background.jpg"
import logo from "@/assets/images/omrp_logo_transparent.png"
import { loginUser } from '@/redux/apiRequests';
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useRouter } from 'next/navigation'
const cx = classNames.bind(styles);

export default function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const router=useRouter();
    const handleSubmit =  (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const newUser = {
        username: username,
        password: password,
      };
  loginUser(newUser, dispatch,router);

    }


    return  (<div className={cx('login')}>
        <div className={cx('login-wrapper')}>
        <label 
                htmlFor="form__login-taikhoan-input" 
                className={cx("form__input-label")}
            >
                Tài khoản
            </label>
            <input 
                type="email" 
                className={cx("form__input" )}
                id={cx("form__login-taikhoan-input")}
                placeholder="Tài khoản"  
            />
            <label 
                htmlFor="form__login-password-input" 
                className={cx("form__input-label")}
            >
                Mật khẩu
            </label>
            <input 
                type="password" 
                className={cx("form__input" )}
                id={cx("form__login-password-input")}
                placeholder="Mật khẩu"  
            />
            <label 
                htmlFor="form__login-forgot" 
                className={cx("form__forgot-label")}
            >
                Quên mật khẩu ?
            </label>
            <button type="submit" className={cx('form__login-btn')}>Đăng nhập</button>
        </div>
    </div>) ;
}