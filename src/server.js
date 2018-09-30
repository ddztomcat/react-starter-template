import express from 'express';
import {matchPath, StaticRouter} from 'react-router-dom';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import routes from '@/routes';
import App from '@/view/app';
import html from './html';
const projectConfig = require('../project-config');


const server = express();

server.use('/public', express.static('./public'));
server.use(async function(req, res, next) {
    if(req.method === 'GET') {
        let matchResult = null;
        const route = routes.find(f => {
            matchResult = matchPath(req.path, {
                path: f.path,
                exact: f.exact || false,
                strict: f.exact || false
            });
            return matchResult ? true : false;
        });
        if(route) {
            console.info(`${req.path} is matched : ${JSON.stringify(matchResult)}`);
            const context = {};
            const markup = renderToStaticMarkup(
                <StaticRouter
                    location={req.url}
                    context={context}>
                    <App />
                </StaticRouter>
            );
            console.info(`${req.path}  : ${markup}`);
            const content = html.getHtml()
                .replace('div id="root"></div>', `div id="root">${markup}</div>`);
            res.send(content);
        }else {
            next();
        }
    }
    next();
});
server.listen(projectConfig.PORT, function() {
    console.info(`runtime environment = ${process.env.NODE_ENV}`);
    console.info(`address http://127.0.0.1:${projectConfig.PORT}`);
});
