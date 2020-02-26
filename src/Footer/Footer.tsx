import React from 'react'
import './Footer.css'
import { Icon } from '@iconify/react';
import linkedinFilled from '@iconify/icons-ant-design/linkedin-filled';
import githubFilled from '@iconify/icons-ant-design/github-filled';



function Footer() {
  return (
    <div className="Footer">
      <header className="Footer-header">
        <p>
          <a href="https://github.com/franpog859" target="_blank" rel="noopener noreferrer">
            <Icon icon={githubFilled} className="Icon" />
          </a>
          <a href="https://www.linkedin.com/in/franciszekpogodzinski/" target="_blank" rel="noopener noreferrer">
            <Icon icon={linkedinFilled} className="Icon" />
          </a>
        </p>
      </header>
    </div>
  )
}

export default Footer
