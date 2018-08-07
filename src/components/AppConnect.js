import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as actionCreators from '../actions/actionsCreators';
import App from './App';
import * as fromItemsActions from '../actions/inbox';
import * as draftActions from '../actions/draft';
import * as sentActions from '../actions/sent';

const mapStateToProps = state => ({
  itemsCurrentPage: fromItemsActions.getItemsCurrentPage(state),
  itemsErrored: fromItemsActions.getItemsErrored(state),
  itemsLastPage: fromItemsActions.getItemsLastPage(state),
  itemsPaged: fromItemsActions.getItemsPaged(state),
  itemsRequested: fromItemsActions.getItemsRequested(state),
  sentItems: state,
  draftItems: state,
});

const mapDispatchToProps = {
  fetchItems: fromItemsActions.fetchItems,
  addMailToDraft: draftActions.addMailToDraft,
  addMailToSent: sentActions.addMailToSent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
