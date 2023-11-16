import PropTypes from 'prop-types';

const EstrellasRatingComponent = ({ rating }) => {
    const maxStars = 5;
    const filledStars = Math.round(rating * maxStars) / maxStars;

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <span
                    key={i}
                    className={`fa ${i <= filledStars ? 'fa-star' : 'fa-star-o'}`}
                ></span>
            );
        }
        stars.push(<span key="rating"> ({rating})</span>);
        return stars;
    };

    return <div className="star-rating m-1">{renderStars()}</div>;
};

EstrellasRatingComponent.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default EstrellasRatingComponent;
