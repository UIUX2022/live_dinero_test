import "./categoryCard.scss";
import { Link } from "react-router-dom";
const CategoryCard = ({ name, img, bg, id }) => {
  return (
    <>
      <div className="catrgory_card mt-3">
        <Link to={`/services/${id}`}>
          <div
            className="card_head_img mx-auto"
            style={{ backgroundColor: `${bg}` }}
          >
            <img
              src={img}
              className=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/img/placeholder.png";
              }}
            />
          </div>
          <h5 className="text-center">{name}</h5>
        </Link>
      </div>
    </>
  );
};
export default CategoryCard;
