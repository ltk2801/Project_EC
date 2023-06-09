'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/app/api/bareURL';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import avatar from "@/assets/images/omrp_logo_white.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const actions = [
    {
        title: 'Hổ trợ khách hàng',
        to: '/employee/customer_support',
    },
    {
        title: 'Quản lý đối tác',
        to: '/employee/manage_partner',
    },
    {
        title: 'Quản lý hợp đồng',
        to: '/employee/manage_contract',
    },
]

type CONTRACT = {
    ID_CONTRACT: string,
    ID_Partners: string,
    'Tên Doanh Nghiệp': string;
}

type ApiResponse = {
    message: string;
    contracts: CONTRACT[];
    totalItems: string;
    perPage: number;
    currentPage: number;
};

const cx = classNames.bind(styles);
function ManagePartner() {
    const [contracts, setContracts] = useState<CONTRACT[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [currentGroup, setCurrentGroup] = useState(1);

    useEffect(() => {
        axios
        .get<ApiResponse>(`${baseURL}/employee/contract??page=1&perPage=100`)
        .then((response) => setContracts(response.data.contracts))
        .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const contractsPerPage = 5;

    const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    };
    const startIndex = (currentPage - 1) * contractsPerPage;
    const endIndex = Math.min(startIndex + contractsPerPage, contracts.length);
    const currentContracts = contracts.slice(startIndex, endIndex);
    const groupSize = 3;
    const totalPages = Math.ceil(contracts.length / contractsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
          handlePageChange(currentPage + 1);
          if (currentPage % groupSize === 0) {
            setCurrentGroup(currentGroup + 1);
          }
        }
      };
      
      const handlePrevPage = () => {
        if (currentPage > 1) {
          handlePageChange(currentPage - 1);
          if ((currentPage - 1) % groupSize === 0) {
            setCurrentGroup(currentGroup - 1);
          }
        }
      };
      // Get the label element by class name
    // var label = document.getElementsByClassName("ID_contract")[0];

    // // Add a click event listener to the label
    // label.addEventListener("click", function(event) {
    // // Prevent the default action of the label
    // event.preventDefault();
    // });


    const user=useSelector((state:any)=> state.auth.login.currentUser)

    const cusID = user?.user?.userId
    const permiss = user?.user?.permission;
    const pms : number = Number(permiss);

    if(pms === 4){
        return ( <div className={cx('manage_partner')}>
        <div className={cx('manage_partner-wrapper')}>
        <Header name_view='Nhân viên' />
        <div className={cx('manage_partner-middle')}>
            <div className={cx('manage_partner-middle__wrapper')}>
                <Sidebar author='Nhân viên' page_path='/employee/manage_partner' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('manage_partner-content')}>
                    <div className={cx('manage_partner-title')}>
                        <label 
                                className={cx("manage_partner-title__label2")}
                            >
                                Danh sách đối tác 
                        </label>
                    </div>
                    <div className={cx('manage_partner-nav')}>
                        <label 
                            className={cx("manage_partner-nav__label1")}
                        >
                            Doanh nghiệp 
                        </label>
                        <label 
                            className={cx("manage_partner-nav__label2")}
                        >
                            Mã doanh nghiệp 
                        </label>
                        <label 
                            className={cx("manage_partner-nav__label2")}
                        >
                            Mã hợp đồng 
                        </label>  
                    </div>
                    {currentContracts.map((contract)=>{
                        return (
                                <div key={contract.ID_CONTRACT} className={cx('manage_partner-info')}>
                                    <label 
                                        className={cx("manage_partner-info__label1")}
                                    >
                                        {contract['Tên Doanh Nghiệp']} 
                                    </label>
                                    <label 
                                        className={cx("manage_partner-info__label3")}
                                    >
                                        {contract.ID_Partners} 
                                    </label>
                                    <Link href={{ pathname: "/employee/contract_detail/:id", query: { id: contract.ID_CONTRACT } }}>
                                        <label 
                                            className={cx("manage_contract-info__label3","ID_contract")}
                                        >
                                            {contract.ID_CONTRACT} 
                                        </label>
                                    </Link>  
                                </div>)
                    })}
                    <div className={cx("pagination")}>
                        <button onClick={handlePrevPage} className={cx("prev-btn")}>
                            <FontAwesomeIcon className={cx('btn__icon')} icon={faChevronLeft} size="2x"/>    
                        </button>
                        {Array.from(
                        { length: Math.min(groupSize, totalPages - (currentGroup - 1) * groupSize) },
                        (_, index) => {
                            const pageNumber = (currentGroup - 1) * groupSize + index + 1;
                            return (
                            <button
                                key={index}
                                onClick={() => handlePageChange(pageNumber)}
                                className={cx(
                                "page_number",
                                pageNumber === currentPage ? "active" : ""
                                )}
                            >
                                {pageNumber}
                            </button>
                            );
                        }
                        )}
                        <button onClick={handleNextPage} className={cx("next-btn")}>
                            <FontAwesomeIcon className={cx('btn__icon')} icon={faChevronRight} size="2x"/>
                        </button>
                    </div>
                    <style jsx>{`
                    .active {
                        color: var(--primary-color-1);
                    }
                    `}</style> 
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> )}
    else {
        return (  <div > <label> You do not have permission to access this page </label></div>)}
}

export default ManagePartner;
