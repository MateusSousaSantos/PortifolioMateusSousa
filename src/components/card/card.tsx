
const Card = ({ name, img , cardStyle }: { name: string, img: string, cardStyle: any }) => {
    return (
        <div className={`card ${cardStyle}`}>
            <img src={img} alt={name} />
            <h2>{name}</h2>
        </div>
    );
};

export default Card;