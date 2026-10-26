const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>XINGZHI WU</h3>
            <p>Berkeley, California · Available for part-time opportunities</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://github.com/xingzhi0317" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="mailto:xingzhi0317@berkeley.edu">Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} XINGZHI WU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;