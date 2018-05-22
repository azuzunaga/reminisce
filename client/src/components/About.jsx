import React from 'react';
import '../styles/about.css';
import ghBlack from '../assets/githubBlack.png';
import ghRed from '../assets/githubRed.png';
import lnBlack from '../assets/lnBlack.png';
import lnBlue from '../assets/lnBlue.png';
import kimmyHeadshot from '../assets/kimmyHeadshot.jpg';
import gabrielHeadshot from '../assets/gabrielHeadshot.jpg';
import ianHeadshot from '../assets/ianHeadshot.jpg';
import americoHeadshot from '../assets/americoHeadshot.jpg';


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
            <div className='bio-content'>
              <div className='about-left'>
                <img src={gabrielHeadshot}
                  alt="Gabriel Talavera"
                  className='about-headshot'/>

              </div>
              <p>Gabriel has never written one line of bad code.
                His greatest weaknesses are that he works too hard
                and he cares too much. When Gabriel isn't referring to
                himself in the third person or coding he enjoys writing,
                watching movies and long walks on the beach.
              </p>
            </div>
            <ul className="contact-info">
              <li>
                <a href="https://github.com/gabrieltal"
                  target="_blank" rel="noopener noreferrer">
                  <img src={ghBlack}
                    alt="GitHub"
                    onMouseOver={e => e.currentTarget.src=ghRed}
                    onMouseOut={e => e.currentTarget.src=ghBlack}/>
              </a>
              </li>
              <li>
              <a href="https://www.linkedin.com/in/gvtalavera/"
                target="_blank" rel="noopener noreferrer">
                <img src={lnBlack}
                  alt="LinkedIn"
                  onMouseOver={e => e.currentTarget.src=lnBlue}
                  onMouseOut={e => e.currentTarget.src=lnBlack}/>
              </a>
              </li>
            </ul>
          </li>



          <li className="ian">
            <h3>Ian MacLeod</h3>
            <div className='bio-content'>
              <div className='about-left'>
                <img src={ianHeadshot}
                  alt="Ian MacLeod"
                  className='about-headshot'/>

              </div>
              <p>Ian wrote his first line of code when he was just ten years old. Since then, he has been fascinated by the process of coding.
              The moments when the solution to a tricky problem or an elusive bug clicks into place make him lose track of time and code for hours at a time.
              Right now his tools of choice are Ruby, Rails, Python, Flask, Django, React, and Redux, but he loves to pick up new languages and technologies, too.</p>
            </div>
            <ul className="contact-info">
              <li>
                <a href="https://github.com/Ian-MacLeod"
                  target="_blank" rel="noopener noreferrer">
                  <img src={ghBlack}
                    alt="GitHub"
                    onMouseOver={e => e.currentTarget.src=ghRed}
                    onMouseOut={e => e.currentTarget.src=ghBlack}/>
                </a>
              </li>
              <li>
              <a href="https://www.linkedin.com/in/ian-macleod-6421a2137/"
                target="_blank" rel="noopener noreferrer">
                <img src={lnBlack}
                  alt="LinkedIn"
                  onMouseOver={e => e.currentTarget.src=lnBlue}
                  onMouseOut={e => e.currentTarget.src=lnBlack}/>
              </a>
              </li>
            </ul>
          </li>

          <li className="americo">
            <h3>Americo Zuzunaga</h3>

            <div className='bio-content'>
              <div className='about-left'>
                <img src={americoHeadshot}
                  alt="Americo Zuzunaga"
                  className='about-headshot'/>

              </div>
              <p> Americo loves figuring out how things work - from rebuilding the brake calipers of his motorcycle, to integrating a new API into one of his projects, or learning the latest frontend library.
              He fell in love with coding on first sight; what started as a chance encounter with R and statistics has blossomed into full stack web applications and JS games and visualizations.
              When not in front of a computer, you can find him on a bicycle exploring the Marin Headlands, hiking, or cozied up on the couch with a book.</p>
            </div>
            <ul className="contact-info">
              <li>
                <a href="https://github.com/azuzunaga"
                  target="_blank" rel="noopener noreferrer">
                  <img src={ghBlack}
                    alt="GitHub"
                    onMouseOver={e => e.currentTarget.src=ghRed}
                    onMouseOut={e => e.currentTarget.src=ghBlack}/>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/americozuzunaga/"
                  target="_blank" rel="noopener noreferrer">
                  <img src={lnBlack}
                    alt="LinkedIn"
                    onMouseOver={e => e.currentTarget.src=lnBlue}
                    onMouseOut={e => e.currentTarget.src=lnBlack}/>
                </a>
              </li>
            </ul>
          </li>



          <li className="kimberly">
            <h3>Kimmy Allgeier</h3>
            <div className='bio-content'>
              <div className='about-left'>
                <img src={kimmyHeadshot}
                  alt="Kimmy Allgeier"
                  className='about-headshot'/>

              </div>

              <p>Kimmy is passionate about user-centric design. With past experience in implementation and product management,
              she has experienced first-hand the importance of deeply understanding the customer when building a feature. She is excited to continue building and creating awesome user expriences.
              When not in front of a computer, Kimmy loves exploring the outdoors. She is currently on a mission to visit all the U.S. national parks. Next up: Channel Islands! </p>

            </div>

            <ul className="contact-info">
              <li>
                <a href="https://github.com/youknowhu"
                  target="_blank" rel="noopener noreferrer">
                  <img src={ghBlack}
                    alt="GitHub"
                    onMouseOver={e => e.currentTarget.src=ghRed}
                    onMouseOut={e => e.currentTarget.src=ghBlack}/>
                </a>
              </li>
              <li>
              <a href="https://www.linkedin.com/in/kimberly-hu/"
                target="_blank" rel="noopener noreferrer">
                <img src={lnBlack}
                  alt="LinkedIn"
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
