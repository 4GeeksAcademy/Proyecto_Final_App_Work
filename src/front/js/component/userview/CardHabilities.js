import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';


const SkillRow = ({ skill }) => {
    return (
        <tr>
            <td>
                <img src={skill.icon} alt={skill.language} style={{ width: '40px', height: '40px' }} />
                <span style={{ marginLeft: '10px' }}>{skill.language}</span>
            </td>
            <td>{skill.experience}</td>
            <td>
                <a href={skill.certificateLink} target="_blank" rel="noopener noreferrer">
                    {skill.certificateName || 'No certificate'}
                </a>
            </td>
            <td>
                <FaUpload style={{ marginRight: '10px' }} />
                {skill.projects}
            </td>
        </tr>
    );
};


const SkillsTable = () => {
    const [skills, setSkills] = useState([

    ]);

    const [showModal, setShowModal] = useState(false);
    const [newSkill, setNewSkill] = useState({
        language: '',
        icon: '',
        experience: '',
        projects: '',
        certificateName: '',
        certificateLink: '#',
    });

    const handleAddSkill = (e) => {
        e.preventDefault();

        if (!newSkill.language || !newSkill.experience || newSkill.projects <= 0) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }


        let iconUrl = '';
        switch (newSkill.language) {
            case 'JavaScript':
                iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png';
                break;
            case 'HTML':
                iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg';
                break;
            case 'CSS':
                iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg';
                break;
            case 'Python':
                iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg';
                break;
            default:
                break;
        }


        setSkills([...skills, { ...newSkill, icon: iconUrl }]);


        setNewSkill({ language: '', experience: '', projects: 0, certificateName: '', certificateLink: '#', icon: '' });
        setShowModal(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setNewSkill({ ...newSkill, certificateName: e.target.files[0].name });
        }
    };

    return (
        <div className="card mb-4" style={{ borderRadius: '8px', padding: '20px', backgroundColor: 'white' }}>
            <div className="card-header" style={{ backgroundColor: '#6793AE', color: 'white', borderRadius: '8px 8px 0 0', padding: '15px' }}>
                <h4 className="mb-0 text-center">Habilidades</h4>
            </div>
            <div className="card-body">
                <Button variant="outline-secondary" onClick={() => setShowModal(true)}>
                    Añadir Habilidad
                </Button>
                <table className="table table-borderless table-hover table-striped text-center mt-4" style={{ backgroundColor: '#D9D9D9' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#61a6f2', color: 'white' }}>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill, index) => (
                            <SkillRow key={index} skill={skill} />
                        ))}
                    </tbody>
                </table>
            </div>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Nueva Habilidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddSkill}>
                        <div className="form-group">
                            <label htmlFor="language">Lenguaje:</label>
                            <select
                                id="language"
                                className="form-control"
                                value={newSkill.language}
                                onChange={(e) => setNewSkill({ ...newSkill, language: e.target.value })}
                            >
                                <option value="">Seleccionar Lenguaje</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="HTML">HTML</option>
                                <option value="CSS">CSS</option>
                                <option value="Python">Python</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="experience">Experiencia:</label>
                            <input
                                id="experience"
                                type="text"
                                className="form-control"
                                value={newSkill.experience}
                                onChange={(e) => setNewSkill({ ...newSkill, experience: e.target.value })}
                                placeholder="e.g. 2 años"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="projects">Proyectos Realizados:</label>
                            <input
                                id="projects"
                                type="number"
                                className="form-control"
                                value={newSkill.projects}
                                onChange={(e) => setNewSkill({ ...newSkill, projects: parseInt(e.target.value) || 0 })}
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="certificate">Subir Certificado:</label>
                            <input
                                id="certificate"
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                                aria-label="Upload certificate"
                            />
                        </div>

                        <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                            Añadir Habilidad
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SkillsTable;


