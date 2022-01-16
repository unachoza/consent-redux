//@ts-nocheck
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { config } from './config';
import { getAirgap } from './init';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch';
import Tooltip from './ToolTip/Tooltip';
import './ui.css';

let initialized = false;
// UI root node in DOM
let root: Element | undefined;

const setupConsentManagerUI = async (): Promise<void> => {
  console.log('Initializing Consent Manager UI...');

  const airgap = await getAirgap();
  const massiveObj = airgap.getPurposeTypes();
  console.log('Purpose types config:', airgap.getPurposeTypes());
  console.log('Consent Manager UI config:', config);

  const consentObj = airgap.getConsent();
  console.log({ consentObj }, 'teh words');
  const obj = airgap.getPurposeTypes();
  console.log('this here', obj);

  // TODO: Setup your consent manager UI DOM here
  const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    const newText = config.body.split('\n').map((str) => {
      return <p>{str}</p>;
    });
    return (
      <>
        <section>
          <header>
            <h2>{config.consentManagerTitle}</h2>
          </header>
          <p>{newText}</p>
          <h3>{config.prefsHeader}</h3>
          {Object.keys(massiveObj).map((key) => {
                console.log(massiveObj[key].name, 'hereherere');
                return (
                  <div className="both">
                  <ToggleSwitch label={massiveObj[key].name} />
                  <span>
                    {' '}
                    <img
                      src={`https://res.cloudinary.com/dh41vh9dx/image/upload/v1619578173/3946401821543238897.svg`}
                        className="info-icon"
                      alt="information icon"
                      onClick={toggling}
                    />
                    </span>
                    
                    {isOpen && <Tooltip toggling={toggling} text={massiveObj[key].description} />}
                    </div>
                );
              })}
          <pre>{JSON.stringify(airgap.getConsent(), null, 2)}</pre>
          <h3>Tracking purpose types</h3>
          <pre>{JSON.stringify(airgap.getPurposeTypes(), null, 2)}</pre>
          <h3>Consent Manager UI config</h3>
          <pre>{JSON.stringify(config, null, 2)}</pre>
        </section>
      </>
    );
  };

  root = document.createElement('div');
  root.className = 'ConsentManager';
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root,
  );
  document.body.firstElementChild?.before(root);
  // END: TODO: Setup your consent manager UI DOM here

  initialized = true;
  console.log('Consent Manager UI initialized');
};

const showConsentManagerUI = async () => {
  const airgap = await getAirgap();
  console.log('Current consent:', airgap.getConsent());

  // TODO: Display your consent manager UI here
};

export const showConsentManager = async () => {
  console.log('transcend.showConsentManager() called');
  if (!initialized) {
    await setupConsentManagerUI();
  }
  await showConsentManagerUI();
};
