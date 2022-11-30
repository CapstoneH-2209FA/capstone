import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaRegCopyright } from 'react-icons/fa';
import Modal from "./Modal";

function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const iconClicked = ()=> setModalOpen(true)

  return (
    <div>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      <div >

            <div>
              <p><FaRegCopyright /> Copyright 2022</p>
            </div>
            <div>
              <p className='icon'>About us:
              <FaGithub onClick={iconClicked}/> |
              <FaLinkedin onClick={iconClicked}/>
              </p>
          </div>

        </div>
    </div>
  )
}

export default Footer
