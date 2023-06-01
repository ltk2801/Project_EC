'use client';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import UpdateProductForm from '@/app/components/update_product_form/page';
import avatar from "@/assets/images/omrp_logo_white.png"

const actions = [
    {
        title: 'Danh sách tài khoản',
        to: '/list_account',
    },
    {
        title: 'Thêm sản phẩm',
        to: '/add_product',
    },
    {
        title: 'Danh sách sản phẩm',
        to: '/list_product',
    },
]

// type url = {
//     id: number,
//     img: string,
// }
  
// type PRODUCT = {
//     ID_PRODUCTS: number;
//     NAME: string;
//     INFOR_PRODUCTS: string | null;
//     QUANTITY: number,
//     PRICE: number,
//     URL: url[],
//     TYPE_PROD: string
// }

const cx = classNames.bind(styles);
function UpdateProduct({ id }: { id: number }) {
    return ( <div className={cx('add_product')}>
        <div className={cx('add_product-wrapper')}>
        <Header name_view='Admin'/>
        <div className={cx('add_product-middle')}>
            <div className={cx('add_product-middle__wrapper')}>
                <Sidebar author='Admin' page_path='/list_product' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('add_product-content')}>
                    <UpdateProductForm idProduct={id} />
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default UpdateProduct;
