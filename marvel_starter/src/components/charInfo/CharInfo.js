import "./charInfo.scss";
import PropTypes from "prop-types";
import { Component } from "react";
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };
  marvelServices = new MarvelServices();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelServices
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };
  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0 ? (
          <li className="char__comics-item">No comics with this personage</li>
        ) : (
          comics.slice(0, 10).map((item, i) => (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          ))
        )}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
