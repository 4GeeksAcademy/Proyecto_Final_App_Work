import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from "../../store/appContext";
import {ProfileImage} from '../ProfileImage';
import { ButtonEdit } from './EditCompanyName';
import { EditCompanyDescription } from './EditCompanyDescription';
import { EditCompanyPhone } from './EditCompanyPhone';
import { EditCompanyMail } from './EditCompanyMail';
import ProfileProgress from '../ProfileProgress';
import CountrySelector from '../userview/Dropdown';
import CheckoutForm from "../../component/Checkout";
import Stars from '../stars';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const CompanyProfile = () => {

    const [progress, setProgress] = React.useState(0);
    return (
        <div style={styles.pageContainer}>
            <div className="row" style={styles.row}>
                <div className="col-lg-9" style={styles.flexContainer}>
                    <div className="card mb-4" style={styles.profileCard}>
                        <div className="row">
                            <div className="col-md-2" style={styles.profileColumn}>
                                <div style={styles.profileImageContainer}>
                                    <ProfileImage />

                                </div>
                            </div>

                            <div className="col-md-7" style={styles.centerColumn}>
                                <div style={styles.topLeftAligned}>
                                    <div style={styles.userNameContainer}>
                                        <ButtonEdit />
                                    </div>

                                </div>
                                <div style={styles.rightAligned}>
                                    <div style={styles.contactContainer}>
                                        <EditCompanyPhone />
                                        <EditCompanyMail />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2" style={styles.rightColumn}>
                                <div style={styles.rightAlignedContainer}>
                                    <div style={styles.starsContainer}>
                                        <Stars rating={4.3} />
                                    </div>
                                    <div style={styles.countrySelectorContainer}>
                                        <CountrySelector />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="col-lg-3 text-center" style={styles.flexContainer}>
                    <div className="card" style={styles.progressCard}>
                        <ProfileProgress progress={78} />


                    </div>
                </div>
            </div>
        </div>
    );
};
const styles = {
    pageContainer: {
        width: 'calc(100% - 10px)',
        height: '300px',
        margin: '5px',
        padding: '0',
        boxSizing: 'border-box',
    },
    row: {
        height: '100%',
        margin: '0',
        padding: '0',
        display: 'flex',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    profileColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '0',
        padding: '0',
    },
    profileImageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttonEditContainer: {
        marginLeft: '30px',
    },
    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
    },
    topLeftAligned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '10px',
        marginBottom: '10px',
    },
    companyDescriptionContainer: {
        marginBottom: '10px',
        marginLeft: '30px',

    },
    contactContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px',
    },
    rightColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '0',
    },
    rightAlignedContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    starsContainer: {
        marginBottom: '20px',
        marginRight: '30px',
    },
    countrySelectorContainer: {
        marginBottom: '20px',
        marginRight: '30px',
    },
    profileCard: {
        backgroundColor: '#bed5e2',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
    },
    progressCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
    },
};

export default CompanyProfile;
