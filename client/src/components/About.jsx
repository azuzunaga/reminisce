import React from 'react';
import '../styles/about.css';
import ghBlack from '../assets/githubBlack.png';
import ghRed from '../assets/githubRed.png';
import lnBlack from '../assets/lnBlack.png';
import lnBlue from '../assets/lnBlue.png';

class About extends React.Component {
  render () {
    return (
      <div className="about-container">
        <h1 className="about-header">
          About Us
        </h1>
        <ul className="dev-list">
          <li className="gabriel">
            <h3>Gabriel Talavera</h3>
            <p>Bio</p>
            <ul className="contact-info">
              <li>
                <a href="https://github.com/gabrieltal"
                  target="_blank" rel="noopener noreferrer">
                  <img src={ghBlack}
                    onMouseOver={e => e.currentTarget.src=ghRed}
                    onMouseOut={e => e.currentTarget.src=ghBlack}/>
              </a>
              </li>
              <li>
              <a href="https://www.linkedin.com/in/gvtalavera/"
                target="_blank" rel="noopener noreferrer">
                <img src={lnBlack}
                  onMouseOver={e => e.currentTarget.src=lnBlue}
                  onMouseOut={e => e.currentTarget.src=lnBlack}/>
              </a>
              </li>
            </ul>
          </li>



          <li className="ian">
            <h3>Ian MacLeod</h3>
            <p>Bio</p>
            <ul className="contact-info">
              <li>
                <a href="https://github.com/Ian-MacLeod"
                  target="_blank" rel="noopener noreferrer">
                  <img src={ghBlack}
                    onMouseOver={e => e.currentTarget.src=ghRed}
                    onMouseOut={e => e.currentTarget.src=ghBlack}/>
                </a>
              </li>
              <li>
              <a href="https://www.linkedin.com/in/ian-macleod-6421a2137/"
                target="_blank" rel="noopener noreferrer">
                <img src={lnBlack}
                  onMouseOver={e => e.currentTarget.src=lnBlue}
                  onMouseOut={e => e.currentTarget.src=lnBlack}/>
              </a>
              </li>
            </ul>
          </li>

          <li className="americo">
            <h3>Americo Zuzunaga</h3>
            <p>Bio</p>
            <ul className="contact-info">
              <li>
                <a href="https://github.com/azuzunaga"
                  target="_blank" rel="noopener noreferrer">
                  <img src={ghBlack}
                    onMouseOver={e => e.currentTarget.src=ghRed}
                    onMouseOut={e => e.currentTarget.src=ghBlack}/>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/americozuzunaga/"
                  target="_blank" rel="noopener noreferrer">
                  <img src={lnBlack}
                    onMouseOver={e => e.currentTarget.src=lnBlue}
                    onMouseOut={e => e.currentTarget.src=lnBlack}/>
                </a>
              </li>
            </ul>
          </li>



          <li className="kimberly">
            <h3>Kimberly Allgeier</h3>
            <p>Bio</p>
            <ul className="contact-info">
              <li>
                <a href="https://github.com/youknowhu"
                  target="_blank" rel="noopener noreferrer">
                  <img src={ghBlack}
                    onMouseOver={e => e.currentTarget.src=ghRed}
                    onMouseOut={e => e.currentTarget.src=ghBlack}/>
                </a>
              </li>
              <li>
              <a href="https://www.linkedin.com/in/kimberly-hu/"
                target="_blank" rel="noopener noreferrer">
                <img src={lnBlack}
                  onMouseOver={e => e.currentTarget.src=lnBlue}
                  onMouseOut={e => e.currentTarget.src=lnBlack}/>
              </a>
              </li>
            </ul>
          </li>


        </ul>
      </div>
    )
  }
}

export default About;
