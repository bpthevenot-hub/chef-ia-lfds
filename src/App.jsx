import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Welcome from './components/Welcome';
import CategorySelect from './components/CategorySelect';
import Accompaniments from './components/Accompaniments';
import SauceQuantity from './components/SauceQuantity';
import CookingTheater from './components/CookingTheater';
import FinalPlate from './components/FinalPlate';
import { CATEGORIES, STARCHES, SIDES } from './data/foods';
import { COOKING_SCENES } from './data/scenes';
import { preloadImages } from './utils/preload';
import './styles/components/App.css';

const SCREENS = ['welcome', 'category', 'accomp', 'sauce', 'cooking', 'plate'];

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [prevScreen, setPrevScreen] = useState(null);
  const [state, setState] = useState({
    category: '',
    starch: '',
    side: '',
    freeText: '',
    sauceLevel: 'classic',
  });

  // Preload all images on mount
  useEffect(() => {
    const urls = [
      ...CATEGORIES.map((c) => c.photo),
      ...CATEGORIES.map((c) => c.plateImg),
      ...STARCHES.map((s) => s.photo),
      ...SIDES.map((s) => s.photo),
      ...COOKING_SCENES.filter((s) => s.photo).map((s) => s.photo),
    ];
    preloadImages(urls);
  }, []);

  const goTo = useCallback((next) => {
    setPrevScreen(screen);
    setScreen(next);
    if (navigator.vibrate) navigator.vibrate(15);
  }, [screen]);

  const updateState = useCallback((patch) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const restart = useCallback(() => {
    setState({ category: '', starch: '', side: '', freeText: '', sauceLevel: 'classic' });
    goTo('welcome');
  }, [goTo]);

  return (
    <div className="app">
      <Header visible={screen !== 'welcome'} />

      <div className="screens">
        <Screen id="welcome" current={screen} prev={prevScreen}>
          <Welcome onStart={() => goTo('category')} />
        </Screen>

        <Screen id="category" current={screen} prev={prevScreen}>
          <CategorySelect
            selected={state.category}
            onSelect={(cat) => {
              updateState({ category: cat });
              setTimeout(() => goTo('accomp'), 400);
            }}
          />
        </Screen>

        <Screen id="accomp" current={screen} prev={prevScreen}>
          <Accompaniments
            state={state}
            updateState={updateState}
            onValidate={() => goTo('sauce')}
          />
        </Screen>

        <Screen id="sauce" current={screen} prev={prevScreen}>
          <SauceQuantity
            selected={state.sauceLevel}
            onSelect={(level) => {
              updateState({ sauceLevel: level });
              setTimeout(() => goTo('cooking'), 500);
            }}
          />
        </Screen>

        <Screen id="cooking" current={screen} prev={prevScreen}>
          <CookingTheater
            active={screen === 'cooking'}
            onComplete={() => goTo('plate')}
          />
        </Screen>

        <Screen id="plate" current={screen} prev={prevScreen}>
          <FinalPlate state={state} onRestart={restart} />
        </Screen>
      </div>

      <div className="app-footer">
        La Française des Sauces · Une cuillerée suffit
      </div>
    </div>
  );
}

/** Screen wrapper with enter/exit transitions */
function Screen({ id, current, prev, children }) {
  const isActive = current === id;
  const isExiting = prev === id && current !== id;

  let className = 'screen';
  if (isActive) className += ' screen--active';
  if (isExiting) className += ' screen--exit';
  if (id === 'welcome') className += ' screen--welcome';
  if (id === 'cooking') className += ' screen--dark';

  return <div className={className}>{children}</div>;
}
