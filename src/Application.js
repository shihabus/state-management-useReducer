import React, { useReducer, useCallback, useContext } from 'react';

// React.memo
// useMemo: call the function only if the args are different
// useCallBack: return a memoised function back

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';
import { GrudgeContext } from './GrudgeContext';

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

const reducer = (state, action) => {
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state];
  }
  if (action.type === GRUDGE_FORGIVE) {
    return state.map(item => {
      if (item.id !== action.payload) return item;
      return { ...item, forgiven: !item.forgiven };
    });
  }
  return state;
};

const Application = () => {
  // const [grudges, setGrudges] = useState(initialState);
  // const [grudges, dispatch] = useReducer(reducer, initialState);

  // const addGrudge = grudge => {
  //   grudge.id = id();
  //   grudge.forgiven = false;
  //   setGrudges([grudge, ...grudges]);
  // };

  // const toggleForgiveness = id => {
  //   setGrudges(
  //     grudges.map(grudge => {
  //       if (grudge.id !== id) return grudge;
  //       return { ...grudge, forgiven: !grudge.forgiven };
  //     })
  //   );
  // };

  // const addGrudge = useCallback(
  //   ({ person, reason }) => {
  //     dispatch({
  //       type: GRUDGE_ADD,
  //       payload: {
  //         person,
  //         reason,
  //         forgiven: false,
  //         id: id()
  //       }
  //     });
  //   },
  //   [dispatch]
  // );

  // const toggleForgiveness = useCallback(
  //   id => {
  //     dispatch({
  //       type: GRUDGE_FORGIVE,
  //       payload: id
  //     });
  //   },
  //   [dispatch]
  // );

  // return (
  //   <div className="Application">
  //     <NewGrudge onSubmit={addGrudge} />
  //     <Grudges grudges={grudges} onForgive={toggleForgiveness} />
  //   </div>
  // );

  const { undo, isPast } = useContext(GrudgeContext);

  return (
    <div className="Application">
      <NewGrudge />
      <section>
        <button disabled={!isPast} onClick={undo}>
          Undo
        </button>
        <button>Redo</button>
      </section>
      <Grudges />
    </div>
  );
};

export default Application;
