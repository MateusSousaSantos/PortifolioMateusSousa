import "../terminal-list.css";
import { IoLogoJavascript } from "react-icons/io5";
import { BiLogoTypescript } from "react-icons/bi";
import { SiCsharp } from "react-icons/si";
import { IoLogoHtml5 } from "react-icons/io5";
import { SiCss3 } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";
import { FaLaravel } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { BiLogoPostgresql } from "react-icons/bi";

export const AboutSkills: React.FC = () => {
  return (
    <div className="command-component">
      <div className="about_me">
        <p>My Skills</p>
        <div className="skills">
            <ul>
              <li>HTML <IoLogoHtml5/></li>
              <li>CSS <SiCss3/></li>
              <li>JavaScript <IoLogoJavascript/></li>
              <li>Typescript <BiLogoTypescript/></li>
              <li>SQL <BiLogoPostgresql/></li>
              <li>C# <SiCsharp/></li>
                <li>Java <FaJava/></li>
            </ul>
            <ul>
              <li>React <FaReact/></li>
              <li>React Native <TbBrandReactNative/></li>
              <li>Laravel <FaLaravel/></li>
              <li>Node.js <FaNodeJs/></li>
              <li>Express <SiExpress/></li>
              <li>Firebase <IoLogoFirebase/></li>
            </ul>
        </div>
      </div>
    </div>
  );
};
