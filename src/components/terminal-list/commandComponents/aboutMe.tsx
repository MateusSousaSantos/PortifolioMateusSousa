import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import fotoMinha from '../../../assets/images/mateus_eu_mesmo.png';
import "../terminal-list.css";

export const aboutMe: React.FC = () => {
  const birthYear = new Date("2007-01-07");
  const myAge = new Date().getFullYear() - birthYear.getFullYear();
  const current_college = {
    colegio: "Colegio e Faculdade Cotemig",
    link: "https://www.cotemig.com.br/",
  };
  return (
    <div className="command-component">
      <pre>-----</pre>
      {`

      Hello! My name is Mateus de Sousa Santos, and I am a passionate and dedicated student at ${current_college.colegio}.
      I am currently in my 3 year of high school, where I have been honing my skills and expanding my knowledge in various areas of software development.
      `}

      <div>
        <pre>-----</pre>
        <pre>My social media:</pre>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="social_midia_div">
            <div>
              <FaLinkedin />
              <span>Linkedin</span>
              <a
                href="https://www.linkedin.com/in/mateus-de-sousa-santos-646945264/"
                target="_blank"
              >
                Mateus de Sousa Santos
              </a>
            </div>
            <div>
              <FaGithub />
              <span>Github</span>
              <a
                href="https://www.linkedin.com/in/mateus-de-sousa-santos-646945264/"
                target="_blank"
              >
                MateusSousaSantos
              </a>
            </div>
            <div>
              <MdAlternateEmail />
              <span>Email</span>
              <a
                href="https://www.linkedin.com/in/mateus-de-sousa-santos-646945264/"
                target="_blank"
              >
                mateus.sousa.santos@gmail.com
              </a>
            </div>
          </div>
          <div>
            <p>
              A little{" "}
              <span className="byte">
                byte
                <p className="pun">pun intended</p>
              </span>
              about me:
            </p>
            <div style={{display:'flex', flexDirection:'row'}}>
              
              <img height={200} width={200} src={fotoMinha}/>
              <p style={{margin: 15}}>{`
              I am ${myAge} years old and i have a passion for creativity, i love all types of art, but my favorites are drawing,
              painting and development, i want to be able to express my fellings and thougths trough my work, thats why i am always looking 
              for new ways to improve my skills.
              `}</p>

            </div>
          </div>
        </div>
      </div>
      <pre>-----</pre>
    </div>
  );
};
