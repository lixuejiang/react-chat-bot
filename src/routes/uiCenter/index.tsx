import React, { PureComponent, Suspense } from 'react';
import {
  Route, RouteComponentProps, Switch, Link,
} from 'dva/router';
import { connect } from 'react-redux';
import {
  MView,
  MHeader,
} from '@/components';
import { menus } from './constants';
import styles from './index.less';

class MagicUIPage extends PureComponent<RouteComponentProps, {}> {
  render() {
    const { match } = this.props;
    return (
      <MView className={styles.container}>
        <MHeader
          title="MagicUI"
          left="公共组件库"
          back
        />
        <MView.RowTable className={styles.wrap}>
          <MView.ColTable width={300} className={styles.menus}>
            {menus.map(menu => (
              <div className={styles.items} key={menu.name}>
                <h3>{menu.title}</h3>
                {menu.items && menu.items.map((item: any) => (
                  <Link to={`${match.path}/${menu.name}/${item.name}`} key={item.name} className={styles.item}>
                    <span>{`${['Base'].includes(menu.name) ? 'M' : ''}${item.name}`}</span>
                    <span className={styles.name}>{item.title}</span>
                  </Link>
                ))}
              </div>
            ))}
          </MView.ColTable>
          <MView.ColTable>
            <Suspense fallback={<div />}>
              <Switch>
                {menus.map(menu => {
                  return menu.items && menu.items.map((item: any, index: number) => (
                    <Route
                      key={`${menu.name}-${item.name}`}
                      exact
                      path={`${match.path}/${menu.name}/${item.name}`}
                      component={(props: any) => <item.page {...props} />}
                    />
                  ));
                })}
              </Switch>
            </Suspense>
          </MView.ColTable>
        </MView.RowTable>
      </MView>
    );
  }
}

export default connect()(MagicUIPage);
