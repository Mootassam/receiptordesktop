import { ConnectedRouter } from 'connected-react-router';
import {
  configureStore,
  getHistory,
} from './modules/store';
import { Provider } from 'react-redux';
import RoutesComponent from './view/shared/routes/RoutesComponent';
import jQuery from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import "./App.css"


const store = configureStore();

const App = (props) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={getHistory()}>
        <RoutesComponent />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
