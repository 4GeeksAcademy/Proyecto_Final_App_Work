import React from 'react';
import CompanyProfile from '../component/companyview/CompanyProfile';
import AccordionSection from '../component/companyview/AccordionSection';
import AccordionDescription from '../component/companyview/AccordionDescripcion';
import '../../styles/Companyview.css'
import { DescriptionAccordion } from '../component/companyview/DescriptionAccordion';
import OfferManager from '../component/companyview/OfferManager';

export const Companyview = () => {
    return (

        <div className="contenedor container">
            <div className='body'>
                <CompanyProfile />


                <AccordionDescription title="Descripción">
                    <DescriptionAccordion />
                </AccordionDescription>

                <AccordionSection title="Ofertas">
                    <div className="d-flex flex-wrap">
                        <OfferManager />

                    </div>
                </AccordionSection>
            </div>
        </div>

    );
};


