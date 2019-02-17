import dva from 'dva';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import './index.css';
import './common.css';
import './cover.css';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/competition/competition').default);
app.model(require('./models/competition/competitionDetail').default);
app.model(require('./models/service/service').default);
app.model(require('./models/service/serviceList').default);
app.model(require('./models/app').default);
app.model(require('./models/index').default);
app.model(require('./models/notice').default);
app.model(require('./models/park/park').default);
app.model(require('./models/activity').default);
app.model(require('./models/home').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
