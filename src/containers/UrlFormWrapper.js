import { connect } from 'react-redux'
import { fetchUrl } from '../actions/urlActions'
import UrlForm from '../Components/UrlForm'

const mapStateToProps = (state) => {
    return {
        fetched: state.url.fetched,
        fetching: state.url.fetching,
        shorten: state.url.shorten,
        url: state.url.url,
        validate: state.url.validate,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchClick: url => {
            dispatch(fetchUrl(url));
        }
    }
}

const UrlFormWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(UrlForm)

export default UrlFormWrapper