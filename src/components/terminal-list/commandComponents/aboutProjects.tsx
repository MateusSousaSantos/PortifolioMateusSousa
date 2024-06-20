import "../terminal-list.css";
import Aria from "../../../assets/images/Aria.png";
import AriaInGame from "../../../assets/images/AriaInGame.png" ;
import CotemigSite from "../../../assets/images/cotemig_site.png";  
import CavernaDoMestre from "../../../assets/images/caverna_do_mestre.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

export const AboutProjects: React.FC = () => {
  const Card = ({ src, cardText }: { src: string; cardText: string }) => {
    return (
      <div className="card">
        <img src={src} alt="card-img" />
        <p>{cardText}</p>
      </div>
    );
  };

  const cardInfo = [
    {
      src: Aria,
      cardText: "This is Aria the protagonist of my game",
    },
    {
      src: AriaInGame,
      cardText: "This is her, in game sprite",
    },
  ];
  const changeCard = (
    currentCard: number,
    typeChange: "forward" | "backwards"
  ) => {
    if (typeChange === "forward") {
      if (currentCard === cardInfo.length - 1) {
        setCurrentCard(0);
      } else {
        setCurrentCard(currentCard + 1);
      }
    } else {
      if (currentCard === 0) {
        setCurrentCard(cardInfo.length - 1);
      } else {
        setCurrentCard(currentCard - 1);
      }
    }
  };

  const [currentCard, setCurrentCard] = useState(0);

  return (
    <div className="command-component">
      <pre>-----</pre>
      <a href="https://github.com/MateusSousaSantos/somnium" target="_blank">
        Somnium
      </a>
      <div className="somniumDiv">
        <div className="text">
          <p style={{ margin: 5 }}>
            Its my C# based game, made on{" "}
            <a href="https://unity.com/pt" target="_blank">
              Unity
            </a>
            , its a top down shooter game, with a simple story and a couple of
            mechanics, and is currently in development. but you can check it out
            on my Github page!
          </p>
        </div>
        <div className="images">
          <div
            className="button"
            onClick={() => changeCard(currentCard, "backwards")}
          >
            <IoIosArrowBack />
          </div>
          <div className="cards">
            <Card
              src={cardInfo[currentCard].src}
              cardText={cardInfo[currentCard].cardText}
            />
          </div>
          <div
            className="button"
            onClick={() => changeCard(currentCard, "forward")}
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      <p>Caverna do Mestre</p>
      <div className="siteDiv">
        <div className="text">
          <p style={{ margin: 5 }}>
            Its a E-Commerce site made solely with plain HTML, CSS and JS, its a
            project that I made to learn more about web development, and its a sit
            that sells RPG itens for master of diverse RPG systems. you can find the source code
            on my Github page!
          </p>
        </div>
        <div className="images_site">
          <img
            className={"cavernaDoMestre"}
            src={CavernaDoMestre}
            alt="caverna_do_mestre"
          />
        </div>
      </div>
      <p>Cotemig - Remake </p>
      <div className="siteDiv">
        <div className="text">
          <p style={{ margin: 5 }}>
            Its a remake of my School site made solely with plain HTML, CSS its another
            project that I made to learn more about web development, and its a site
            that shows all the information about my school and some more details, you can find the source code
            on my Github page!
          </p>
        </div>
        <div className="images_site">
          <img
            className={"cavernaDoMestre"}
            src={CotemigSite}
            alt="caverna_do_mestre"
          />
        </div>
      </div>
      <pre>-----</pre>
    </div>
  );
};
