import React from 'react';
import UsersProfile from '../component/userview/UsersProfile';
import AccordionDescription from '../component/companyview/AccordionDescripcion';
import { DescriptionAccordion } from '../component/companyview/DescriptionAccordion';
import UserExperience from '../component/userview/UserExperience';
import UserLenguages from '../component/userview/UserLenguages';
import UserProjects from '../component/userview/UserProjects';
import UserFavs from '../component/userview/UserFavs';
import { EditFavoritesUserAccordion } from '../component/userview/FavsUserAccordion';
import { EditLanguageUserAccordion } from '../component/userview/lenguagesUserAccordion';
import { EditExperienceUserAccordion } from '../component/userview/experinceUserAccordion';
import EditProjectsAccordion from '../component/userview/projecstUserAccordion';
import '../../styles/userview.css';

export const Userview = () => {
    return (

        <div className="container contenedor">
            <div className='body'>
                <UsersProfile />


                <AccordionDescription title="Descripción">
                    <DescriptionAccordion />
                </AccordionDescription>

                <UserExperience title="Experiencia">
                    <EditExperienceUserAccordion />
                </UserExperience>

                <UserFavs title="Favs">
                    <EditFavoritesUserAccordion />
                </UserFavs>

                <UserLenguages title="Idiomas">
                    <EditLanguageUserAccordion />
                </UserLenguages>

                <UserProjects title="Proyectos">
                    <EditProjectsAccordion />
                </UserProjects>




            </div>
        </div>

    )
};


