import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import loadReducer from '../../store/loadReducer';
import reducer from './store/reducer';
import Index from './Index/index';
import { I18NContext } from '../../components/I18N/I18N';

@loadReducer(reducer)
class ModuleLayout extends Component{
  static contextType: Object = I18NContext;

  render(): React.ChildrenArray<React.Element>{
    const { createForm }: { createForm: Object } = this.context.languagePack;

    return [
      <Helmet key="helmet">
        <title>{ createForm.title }</title>
      </Helmet>,
      <Switch key="main">
        <Route path="/CreateForm" component={ Index } exact={ true } />
      </Switch>
    ];
  }
}

export default ModuleLayout;