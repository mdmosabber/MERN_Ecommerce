import React from 'react';

const ToggleMenu = ({ children }) => {
  const toggleMenu = () => {
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');
    let topbar = document.querySelector('.topbar');
    toggle.classList.toggle('active');
    navigation.classList.toggle('active');
    main.classList.toggle('active');
    topbar.classList.toggle('active');
  };

  return (
    <div className="toggle" onClick={toggleMenu}>
      {children}
    </div>
  );
};

export default ToggleMenu;
