import React from 'react';
import {ProfileImage} from '../ProfileImage';
import { UserNameEdit } from './EditUserName';
import { EditUserPhone } from './EditUserPhone';
import { EditUserMail } from './EditUserMail';
import ProfileProgress from '../ProfileProgress';
import CountrySelector from '../userview/Dropdown';
import Stars from '../stars';
import SkillRow from './CardHabilities';
import CarrerSelector from './dropdownuser';
import { EditUserPrice } from './EditUserPriceH';

const UsersProfile = () => {
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
                                    <div style={styles.priceContainer}>
                                        <EditUserPrice />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-7" style={styles.centerColumn}>
                                <div style={styles.topLeftAligned}>
                                    <div style={styles.userNameContainer}>
                                        <UserNameEdit />
                                    </div>
                                    <div style={styles.carrerSelectorContainer}>
                                        <CarrerSelector />
                                    </div>
                                </div>
                                <div style={styles.rightAligned}>
                                    <div style={styles.contactContainer}>
                                        <EditUserPhone />
                                        <EditUserMail />
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

                    <div className="card" style={styles.skillCard}>
                        <SkillRow />
                    </div>
                </div>

                <div className="col-lg-3 text-center" style={styles.flexContainer}>
                    <div className="card" style={styles.progressCard}>
                        <ProfileProgress progress={78} />
                        
                        <div className="row justify-content-around">
                            <div className="col-6">
                                <div className="text-start">
                                    <p>Proyectos completados</p>
                                    <p>Proyectos en curso</p>
                                    <p>Calificación de clientes</p>
                                    <p>Penalizaciones</p>
                                    <p>Certificados</p>
                                    <p>Favoritos</p>
                                    <p>Proyectos destacados</p>
                                    <p>Empresas con las que trabajaste</p>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="text-end">
                                    <p>5</p>
                                    <p>4</p>
                                    <p>7</p>
                                    <p>1</p>
                                    <p>9</p>
                                    <p>5</p>
                                    <p>7</p>
                                    <p>6</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        width: 'calc(100% - 10px)',
        height: '700px',
        margin: '5px',
        padding: '0',
        boxSizing: 'border-box',
    },
    row: {
        height: '700px',
        display: 'flex',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '700px',
    },
    profileColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
        marginLeft: '10px',
    },
    profileImageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    priceContainer: {
        marginTop: '20px',
    },
    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
    },
    topLeftAligned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
    },
    rightAligned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    contactContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px', 
    },
    userNameContainer: {
        marginBottom: '20px',
    },
    carrerSelectorContainer: {
        marginBottom: '20px',
    },
    starsContainer: {
        marginBottom: '20px',
    },
    countrySelectorContainer: {
        marginBottom: '20px',
    },
    profileCard: {
        backgroundColor: '#bed5e2',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        flex: 1,
    },
    skillCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        flex: 1,
    },
    progressCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
    },
    rightAlignedContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: '20px',
    },
};

export default UsersProfile;
