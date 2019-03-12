import dva from 'dva';
import './index.css';
import './common.css';
import './cover.css';

// 1. Initialize
const app = dva();

window.g_app = app; //开放全局app变量

// 2. Plugins
// app.use(createLoading());

// 3. Model
app.model(require('./models/competition/competition').default);
app.model(require('./models/service/service').default);
app.model(require('./models/app').default);
app.model(require('./models/index').default);
app.model(require('./models/notice').default);
app.model(require('./models/article').default);
app.model(require('./models/park/park').default);
app.model(require('./models/activity').default);
app.model(require('./models/home').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
